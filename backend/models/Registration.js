import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    attendees: { type: Number, required: true, min: 1, default: 1 },

    // optional: for basic dedupe / tracking
    source: { type: String, default: "website" },
  },
  { timestamps: true }
);

// Helpful indexes
registrationSchema.index({ email: 1, createdAt: -1 });

const Registration =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);

export default Registration;
