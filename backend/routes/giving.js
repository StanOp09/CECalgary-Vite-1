import { Router } from "express";
import express from "express";
import jwt from "jsonwebtoken";
import { getStripe } from "../lib/stripe.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { toMinorUnits, fromMinorUnits } from "../utils/currency.js";
import Donation from "../models/Donation.js";

const router = Router();

// CLIENT_URL may be comma-separated for CORS — use only the first value for Stripe redirects
const getClientBase = () => (process.env.CLIENT_URL || "").split(",")[0].trim();

const ALLOWED_CURRENCIES = new Set([
  "usd", "eur", "jpy", "gbp", "aud", "cad", "chf", "cny", "hkd", "nzd",
  "inr", "ngn", "kes", "ghs", "zar", "sgd", "sek", "nok", "dkk", "pln",
  "mxn", "brl",
]);

const ALLOWED_FREQUENCIES = new Set(["one-time", "weekly", "biweekly", "monthly"]);

const RECURRING_MAP = {
  monthly: { interval: "month" },
  weekly: { interval: "week", interval_count: 1 },
  biweekly: { interval: "week", interval_count: 2 },
};

// ── Scheduled one-time giving (setup mode → charge on due date) ───────────────

router.post("/create-scheduled-checkout", async (req, res) => {
  try {
    const { amount, category, email, currency, scheduledDate } = req.body;

    if (!currency) return res.status(400).json({ error: "Missing currency" });
    const curr = String(currency).toLowerCase();
    if (!ALLOWED_CURRENCIES.has(curr))
      return res.status(400).json({ error: "Unsupported currency" });
    if (!amount || !email || !category || !scheduledDate)
      return res.status(400).json({ error: "Missing fields" });

    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt <= 0)
      return res.status(400).json({ error: "Invalid amount" });

    const date = new Date(scheduledDate);
    if (isNaN(date.getTime()) || date <= new Date())
      return res.status(400).json({ error: "scheduledDate must be a future date" });

    // Normalize to end-of-UTC-day so the midnight cron fires on the correct
    // calendar day for Calgary users (UTC-6/UTC-7) — without this, a date-only
    // string parses to UTC midnight and the cron charges the evening before.
    date.setUTCHours(23, 59, 59, 999);

    // Setup mode: collect and save the card — no charge yet
    const session = await getStripe().checkout.sessions.create({
      mode: "setup",
      customer_email: email,
      currency: curr,
      setup_intent_data: {
        metadata: { amount: String(amt), currency: curr, category, scheduledDate },
      },
      success_url: `${getClientBase()}/success?scheduled=true`,
      cancel_url: `${getClientBase()}/cancel`,
    });

    await Donation.create({
      email,
      amount: amt,
      currency: curr.toUpperCase(),
      category,
      frequency: "one-time",
      stripeSessionId: session.id,
      scheduledDate: date,
      status: "scheduled",
    });

    return res.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error("Scheduled checkout error:", err);
    return res.status(500).json({ error: err?.message || "Checkout failed" });
  }
});

// ── Checkout ──────────────────────────────────────────────────────────────────

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { amount, category, email, frequency, currency, scheduledDate } = req.body;

    if (!currency) return res.status(400).json({ error: "Missing currency" });
    const curr = String(currency).toLowerCase();
    if (!ALLOWED_CURRENCIES.has(curr))
      return res.status(400).json({ error: "Unsupported currency" });
    if (!ALLOWED_FREQUENCIES.has(frequency))
      return res.status(400).json({ error: "Invalid frequency" });
    if (!amount || !email || !category || !frequency)
      return res.status(400).json({ error: "Missing fields" });

    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt <= 0)
      return res.status(400).json({ error: "Invalid amount" });

    const isRecurring = frequency !== "one-time";
    const recurring = isRecurring ? RECURRING_MAP[frequency] : undefined;
    if (isRecurring && !recurring)
      return res.status(400).json({ error: "Invalid recurring config" });

    // Resolve a valid future Unix timestamp from the optional scheduledDate
    let anchorTimestamp = null;
    if (scheduledDate) {
      const d = new Date(scheduledDate);
      if (!isNaN(d.getTime()) && d > new Date()) {
        anchorTimestamp = Math.floor(d.getTime() / 1000);
      }
    }

    const session = await getStripe().checkout.sessions.create({
      mode: isRecurring ? "subscription" : "payment",
      customer_email: email,
      subscription_data: isRecurring
        ? {
            metadata: { category, frequency },
            // Use trial_end to delay the first charge to the chosen date —
            // billing_cycle_anchor is limited to the next natural billing period
            ...(anchorTimestamp ? { trial_end: anchorTimestamp } : {}),
          }
        : undefined,
      payment_intent_data: !isRecurring
        ? { metadata: { category, frequency, ...(scheduledDate ? { scheduledDate } : {}) } }
        : undefined,
      line_items: [
        {
          price_data: {
            currency: curr,
            unit_amount: toMinorUnits(amt, curr),
            recurring,
            product_data: { name: `Giving - ${category}` },
          },
          quantity: 1,
        },
      ],
      success_url: `${getClientBase()}/success`,
      cancel_url: `${getClientBase()}/cancel`,
    });

    // Return the URL immediately — webhook handles the completed record.
    // DB insert here is best-effort for pending tracking only.
    res.json({ sessionId: session.id, url: session.url });

    if (!isRecurring) {
      Donation.create({
        email,
        amount: amt,
        currency: currency.toUpperCase(),
        category,
        frequency,
        stripeSessionId: session.id,
        status: "pending",
        ...(scheduledDate ? { scheduledDate: new Date(scheduledDate) } : {}),
      }).catch((e) => console.error("Pending donation record failed:", e.message));
    }
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return res.status(500).json({ error: err?.message || "Checkout failed" });
  }
});

// ── Billing portal ────────────────────────────────────────────────────────────

router.post("/create-portal-session", requireAdmin("giving-admin"), async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes("@"))
      return res.status(400).json({ error: "Valid email is required" });

    const customers = await getStripe().customers.list({ email, limit: 1 });
    const customer = customers.data?.[0];

    if (!customer)
      return res.status(404).json({
        error: "No Stripe customer found for this email. Make a donation first.",
      });

    const portalSession = await getStripe().billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${getClientBase()}/giving`,
    });

    return res.json({ url: portalSession.url });
  } catch (err) {
    console.error("Portal session error:", err);
    return res.status(500).json({ error: err?.message || "Portal failed" });
  }
});

// ── Webhook ───────────────────────────────────────────────────────────────────

router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = getStripe().webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      if (session.mode === "setup") {
        // Scheduled one-time gift: save the payment method so we can charge later
        const setupIntent = await getStripe().setupIntents.retrieve(session.setup_intent);
        await Donation.updateOne(
          { stripeSessionId: session.id, status: "scheduled" },
          {
            stripeCustomerId: session.customer,
            stripePaymentMethodId: setupIntent.payment_method,
          },
        );
      } else if (session.mode !== "subscription") {
        await Donation.updateMany(
          { stripeSessionId: session.id, status: "pending" },
          { status: "completed", stripeCustomerId: session.customer },
        );
      }
    }

    if (event.type === "invoice.paid") {
      const invoice = event.data.object;
      const subscription = await getStripe().subscriptions.retrieve(invoice.subscription);

      let email = invoice.customer_email;
      if (!email && invoice.customer) {
        const customer = await getStripe().customers.retrieve(invoice.customer);
        email = customer?.email || null;
      }

      await Donation.updateOne(
        { stripeInvoiceId: invoice.id },
        {
          $setOnInsert: {
            email,
            amount: fromMinorUnits(invoice.amount_paid, invoice.currency),
            currency: invoice.currency.toUpperCase(),
            category: subscription.metadata.category || "general giving",
            frequency: subscription.metadata.frequency || "monthly",
            stripeCustomerId: invoice.customer,
            stripeSessionId: invoice.subscription,
            status: "completed",
          },
        },
        { upsert: true },
      );
    }

    if (event.type === "invoice.payment_failed") {
      const invoice = event.data.object;
      await Donation.updateOne(
        { stripeInvoiceId: invoice.id },
        {
          $setOnInsert: {
            email: invoice.customer_email || null,
            amount: fromMinorUnits(invoice.amount_due, invoice.currency),
            currency: invoice.currency.toUpperCase(),
            category: "general giving",
            frequency: "monthly",
            stripeCustomerId: invoice.customer,
            stripeSubscriptionId: invoice.subscription,
            status: "failed",
          },
        },
        { upsert: true },
      );
    }

    return res.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return res.status(500).json({ error: "Webhook failed" });
  }
});

// ── Giving dashboard ──────────────────────────────────────────────────────────

router.get("/admin/giving-dashboard", requireAdmin("giving-admin"), async (req, res) => {
  try {
    const { category, search, currency } = req.query;

    const match = { status: "completed" };
    if (category && category !== "all") match.category = category;
    if (search) match.email = { $regex: String(search), $options: "i" };
    if (currency && currency !== "all") match.currency = String(currency).toUpperCase();

    const isRecurring = (f) => ["weekly", "biweekly", "monthly"].includes(f);
    const donations = await Donation.find(match).lean();

    const totalsByCurrencyAgg = await Donation.aggregate([
      { $match: match },
      { $group: { _id: "$currency", total: { $sum: "$amount" }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    const totalsByCurrency = totalsByCurrencyAgg.reduce((acc, row) => {
      acc[row._id || "UNKNOWN"] = {
        total: Number(row.total || 0),
        count: Number(row.count || 0),
      };
      return acc;
    }, {});

    const monthlyTotalsByCurrencyAgg = await Donation.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            currency: "$currency",
            month: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          },
          total: { $sum: "$amount" },
        },
      },
      {
        $project: { _id: 0, currency: "$_id.currency", month: "$_id.month", total: 1 },
      },
      { $sort: { currency: 1, month: 1 } },
    ]);

    const monthlyTotalsByCurrency = monthlyTotalsByCurrencyAgg.reduce((acc, row) => {
      const c = row.currency || "UNKNOWN";
      acc[c] = acc[c] || [];
      acc[c].push({ month: row.month, total: Number(row.total || 0) });
      return acc;
    }, {});

    const currencyOptionsAgg = await Donation.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: "$currency" } },
      { $sort: { _id: 1 } },
    ]);
    const currencyOptions = currencyOptionsAgg.map((r) => r._id).filter(Boolean);

    const totalDonors = new Set(donations.map((d) => d.email)).size;
    const recurringDonors = new Set(
      donations.filter((d) => isRecurring(d.frequency)).map((d) => d.email),
    ).size;

    const activeSubscriptionsCount = await Donation.distinct("stripeSubscriptionId", {
      ...match,
      stripeSubscriptionId: { $ne: null },
    }).then((ids) => ids.length);

    res.json({
      totalsByCurrency,
      monthlyTotalsByCurrency,
      currencyOptions,
      totalDonors,
      recurringDonors,
      activeSubscriptionsCount,
    });
  } catch (err) {
    console.error("Giving dashboard error:", err);
    res.status(500).json({ error: "Failed to load giving dashboard" });
  }
});

// ── SSE: live donation stream ─────────────────────────────────────────────────

router.get("/admin/recent-donations/stream", async (req, res) => {
  const token = req.query.token;
  if (!token) return res.sendStatus(401);

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.sendStatus(401);
  }
  if (decoded.role !== "giving-admin") return res.sendStatus(403);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  const sendLatest = async () => {
    const data = await Donation.find({ status: "completed" })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  await sendLatest();

  const ping = setInterval(() => res.write(`event: ping\ndata: {}\n\n`), 25000);
  const stream = Donation.watch([], { fullDocument: "updateLookup" });

  stream.on("change", async (c) => {
    const doc = c.fullDocument;
    if (doc?.status === "completed") {
      res.write(`data: ${JSON.stringify([doc])}\n\n`);
    }
  });

  stream.on("error", (e) => console.error("Change stream error:", e));

  req.on("close", () => {
    clearInterval(ping);
    stream.close();
    res.end();
  });
});

export default router;
