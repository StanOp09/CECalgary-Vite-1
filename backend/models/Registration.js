import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    attendees: { type: Number, required: true, min: 1, default: 1 },

    registrationType: { type: String, enum: ["self", "household"], default: "self" },
    attendeeNames: [{ type: String, trim: true }],

    // optional: for basic dedupe / tracking
    source: { type: String, default: "website" },
  },
  { timestamps: true }
);

registrationSchema.index({ createdAt: -1 });

const Registration =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);

export default Registration;
