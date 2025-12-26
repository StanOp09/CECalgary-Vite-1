import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const listSubscriptions = async (req, res) => {
  try {
    const { customerId } = req.params;
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
    });
    res.json(subscriptions.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
