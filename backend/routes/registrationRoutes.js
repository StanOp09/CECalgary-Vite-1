import express from "express";
import Registration from "../models/Registration.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { fullName, email, phone, attendees } = req.body;

    // Basic validation
    if (!fullName || !email || !phone) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const attendeesNum = Number(attendees || 1);
    if (Number.isNaN(attendeesNum) || attendeesNum < 1) {
      return res.status(400).json({ message: "Attendees must be 1 or more." });
    }

    // Optional: prevent exact duplicate within a short window (e.g., 2 minutes)
    // (You can remove this if you don't want it.)
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
    const recentDuplicate = await Registration.findOne({
      email: email.toLowerCase().trim(),
      createdAt: { $gte: twoMinutesAgo },
    });

    if (recentDuplicate) {
      return res.status(409).json({
        message:
          "It looks like you already registered recently. Please check your email/phone and try again later.",
      });
    }

    const doc = await Registration.create({
      fullName,
      email,
      phone,
      attendees: attendeesNum,
    });

    return res.status(201).json({
      message: "Registration received! We look forward to seeing you.",
      registrationId: doc._id,
    });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ message: "Server error. Try again later." });
  }
});

export default router;
