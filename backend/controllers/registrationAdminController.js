import Registration from "../models/Registration.js";

export const getRegistrationDashboard = async (req, res) => {
  try {
    const registrations = await Registration.find();

    const totalRegistrations = registrations.length;

    const totalAttendees = registrations.reduce(
      (sum, r) => sum + (r.attendees || 0),
      0
    );

    // Group by day
    const chartMap = registrations.reduce((acc, r) => {
      const day = r.createdAt.toISOString().split("T")[0];
      acc[day] = (acc[day] || 0) + (r.attendees || 0);
      return acc;
    }, {});

    const chartData = Object.entries(chartMap).map(([date, attendees]) => ({
      date,
      attendees,
    }));

    res.json({
      totalRegistrations,
      totalAttendees,
      chartData,
    });
  } catch (err) {
    console.error("Registration dashboard error:", err);
    res.status(500).json({ error: "Failed to load registration dashboard" });
  }
};
