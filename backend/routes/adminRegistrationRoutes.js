import express from "express";
import { getRegistrationDashboard } from "../controllers/registrationAdminController.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
// or import from server if still inline

const router = express.Router();

router.get(
  "/dashboard",
  requireAdmin("registration-admin"),
  getRegistrationDashboard
);

export default router;
