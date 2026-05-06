import { Router } from "express";
import { requireAdmin } from "../middleware/requireAdmin.js";
import Registration from "../models/Registration.js";

const router = Router();

// ── Dashboard stats ───────────────────────────────────────────────────────────

router.get("/admin/dashboard", requireAdmin("registration-admin"), async (req, res) => {
  try {
    const now = new Date();
    const startOfToday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

    const [totals, chartAgg, todayCount] = await Promise.all([
      Registration.aggregate([
        {
          $group: {
            _id: null,
            totalRegistrations: { $sum: 1 },
            totalAttendees: { $sum: "$attendees" },
          },
        },
      ]),
      Registration.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            attendees: { $sum: "$attendees" },
            registrations: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      Registration.countDocuments({ createdAt: { $gte: startOfToday } }),
    ]);

    const { totalRegistrations = 0, totalAttendees = 0 } = totals[0] ?? {};

    res.json({
      totalRegistrations,
      totalAttendees,
      todayCount,
      chartData: chartAgg,
    });
  } catch (err) {
    console.error("Registration dashboard error:", err);
    res.status(500).json({ error: "Failed to load registration dashboard" });
  }
});

// ── Registrations list (search + pagination) ──────────────────────────────────

router.get("/admin/registrations", requireAdmin("registration-admin"), async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit ?? 50), 500);
    const skip  = Math.max(Number(req.query.skip  ?? 0), 0);
    const raw   = String(req.query.search ?? "").trim();

    const filter = raw
      ? {
          $or: [
            { fullName: { $regex: raw, $options: "i" } },
            { email:    { $regex: raw, $options: "i" } },
            { phone:    { $regex: raw, $options: "i" } },
          ],
        }
      : {};

    const [registrations, total] = await Promise.all([
      Registration.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Registration.countDocuments(filter),
    ]);

    res.json({ registrations, total });
  } catch (err) {
    console.error("Registrations list error:", err);
    res.status(500).json({ error: "Failed to fetch registrations" });
  }
});

// ── CSV export ────────────────────────────────────────────────────────────────

router.get("/admin/registrations.csv", requireAdmin("registration-admin"), async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 }).lean();

    const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;

    const header = ["Full Name", "Email Address", "Phone Number", "Registration Type", "Number of Attendees", "Attendee Names", "Registered At"];
    const rows   = registrations.map((r) => [
      esc(r.fullName),
      esc(r.email),
      esc(r.phone),
      esc(r.registrationType ?? "self"),
      esc(r.attendees),
      esc(Array.isArray(r.attendeeNames) ? r.attendeeNames.join("; ") : ""),
      esc(r.createdAt ? new Date(r.createdAt).toISOString() : ""),
    ]);

    const csv = [header.join(","), ...rows.map((row) => row.join(","))].join("\n");

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="registrations.csv"`);
    return res.status(200).send(csv);
  } catch (err) {
    console.error("CSV export error:", err);
    return res.status(500).json({ error: "Failed to export CSV" });
  }
});

export default router;
