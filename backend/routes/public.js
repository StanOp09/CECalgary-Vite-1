import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Registration from "../models/Registration.js";

const router = Router();

router.get("/health", (_, res) => res.json({ ok: true }));

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, phone, attendees, registrationType, attendeeNames, needsRide, source } = req.body;

    if (!fullName || !email || !phone) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const attendeesNum = Number(attendees ?? 1);
    if (Number.isNaN(attendeesNum) || attendeesNum < 1) {
      return res.status(400).json({ message: "Attendees must be 1 or more." });
    }

    const validType = registrationType === "household" ? "household" : "self";
    const names = Array.isArray(attendeeNames)
      ? attendeeNames.map((n) => String(n ?? "").trim()).filter(Boolean)
      : [];

    await Registration.create({
      fullName,
      email,
      phone,
      attendees: attendeesNum,
      registrationType: validType,
      attendeeNames: names,
      needsRide: needsRide === true,
      source: source || "website",
    });

    return res.status(201).json({
      message: "Registration received! We look forward to seeing you.",
    });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ message: "Server error. Try again later." });
  }
});

router.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;

  if (!bcrypt.compareSync(password, process.env.ADMIN_PASSWORD_HASH))
    return res.status(401).json({ error: "Invalid credentials" });

  const role =
    email === process.env.GIVING_ADMIN_EMAIL
      ? "giving-admin"
      : email === process.env.REGISTRATION_ADMIN_EMAIL
        ? "registration-admin"
        : email === process.env.OUTREACH_ADMIN_EMAIL
          ? "outreach-admin"
          : null;

  if (!role) return res.status(401).json({ error: "Not admin" });

  const token = jwt.sign({ email, role }, process.env.JWT_SECRET, {
    expiresIn: "8h",
  });

  res.json({ token, role });
});

export default router;
