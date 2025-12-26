import express from "express";
import { createPortalSession } from "../controllers/portalController.js";
const router = express.Router();

router.post("/create-portal-session", createPortalSession);

export default router;
