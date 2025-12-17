import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/payment", (req, res) => {
  stripe.charges.create({
    source: req.body.tokenID,
  });
});

module.exports = router;
