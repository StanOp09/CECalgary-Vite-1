import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    amount: {
      type: Number, // store in CAD dollars (not cents)
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
      default: "monthly", // optional, but recommended since monthly is your UI default
    },
    currency: {
      type: String,
      required: true,
      uppercase: true,
    },
    stripeSessionId: {
      type: String,
      required: true,
    },
    stripeCustomerId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "canceled"],
      default: "pending", // pending | completed | failed
    },
  },
  { timestamps: true }
);

export default mongoose.model("Donation", donationSchema);
