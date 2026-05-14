import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    amount: {
      type: Number, // major units (e.g. dollars)
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    frequency: {
      type: String,
      enum: ["one-time", "weekly", "biweekly", "monthly"],
      required: true,
    },

    currency: {
      type: String,
      required: true,
      uppercase: true,
    },

    // 🔹 Checkout session (one-time OR subscription start)
    stripeSessionId: {
      type: String,
    },

    // 🔹 Stripe subscription (recurring only)
    stripeSubscriptionId: {
      type: String,
      index: true,
    },

    // 🔹 Stripe invoice (recurring only, unique per charge)
    stripeInvoiceId: {
      type: String,
      unique: true,
      sparse: true, // allows null for one-time donations
    },

    stripeCustomerId: {
      type: String,
      index: true,
    },

    status: {
      type: String,
      enum: ["pending", "completed", "failed", "canceled"],
      default: "pending",
    },

    scheduledDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Donation", donationSchema);
