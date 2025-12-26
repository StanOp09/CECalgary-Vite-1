import express from "express";
import { listSubscriptions } from "../controllers/subscriptionController.js";
const router = express.Router();

router.get("/:customerId", listSubscriptions);

export default router;
