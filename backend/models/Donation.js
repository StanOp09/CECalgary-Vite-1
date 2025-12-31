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
      enum: ["one-time", "monthly"],
      required: true,
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
