import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./db.js";
import publicRoutes from "./routes/public.js";
import givingRoutes from "./routes/giving.js";
import adminRegistrationRoutes from "./routes/adminRegistration.js";
import adminOutreachRoutes from "./routes/adminOutreach.js";
import { startScheduledGivingJob } from "./jobs/chargeScheduledDonations.js";

dotenv.config();

["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "MONGO_URI", "JWT_SECRET"].forEach((v) => {
  if (!process.env[v]) throw new Error(`${v} missing`);
});

const app = express();

// ── CORS ──────────────────────────────────────────────────────────────────────
const allowedOrigins = new Set([
  ...(process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",") : []),
]);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.has(origin)) return callback(null, true);
      // Allow any localhost port in development
      if (/^http:\/\/localhost:\d+$/.test(origin)) return callback(null, true);
      return callback(new Error("CORS not allowed"));
    },
    methods: ["GET", "POST", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// ── Body parser (skip for Stripe webhook — needs raw body) ────────────────────
app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") return next();
  express.json()(req, res, next);
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.use(publicRoutes);
app.use(givingRoutes);
app.use(adminRegistrationRoutes);
app.use(adminOutreachRoutes);

// ── Start ─────────────────────────────────────────────────────────────────────
connectDB().catch(console.error);
startScheduledGivingJob();
app.listen(3000, () => console.log("Server running on 3000"));
