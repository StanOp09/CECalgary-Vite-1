import cron from "node-cron";
import { getStripe } from "../lib/stripe.js";
import { toMinorUnits } from "../utils/currency.js";
import Donation from "../models/Donation.js";

// Runs every day at midnight — charges all scheduled donations due today or earlier
export function startScheduledGivingJob() {
  cron.schedule("0 0 * * *", async () => {
    console.log("[cron] Running scheduled giving charge job");

    const due = await Donation.find({
      status: "scheduled",
      scheduledDate: { $lte: new Date() },
      stripePaymentMethodId: { $exists: true, $ne: null },
    });

    console.log(`[cron] Found ${due.length} scheduled donation(s) to process`);

    for (const donation of due) {
      try {
        const curr = donation.currency.toLowerCase();

        const paymentIntent = await getStripe().paymentIntents.create({
          amount: toMinorUnits(donation.amount, curr),
          currency: curr,
          customer: donation.stripeCustomerId,
          payment_method: donation.stripePaymentMethodId,
          confirm: true,
          off_session: true,
          metadata: {
            category: donation.category,
            donationId: String(donation._id),
          },
        });

        await Donation.updateOne(
          { _id: donation._id },
          {
            status: paymentIntent.status === "succeeded" ? "completed" : "failed",
            stripeSessionId: paymentIntent.id,
          },
        );

        console.log(`[cron] Charged donation ${donation._id}: ${paymentIntent.status}`);
      } catch (err) {
        console.error(`[cron] Failed to charge donation ${donation._id}:`, err.message);
        await Donation.updateOne({ _id: donation._id }, { status: "failed" });
      }
    }
  });

  console.log("[cron] Scheduled giving job registered (runs daily at midnight)");
}
