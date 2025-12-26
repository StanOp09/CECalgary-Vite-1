import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPortalSession = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the Stripe customer by email
    const customers = await stripe.customers.list({ email, limit: 1 });
    // Log the results
    console.log("Stripe customer lookup:", customers.data);

    const customer = customers.data[0];

    if (!customer) {
      console.log("No customer found for email:", email);
      return res
        .status(404)
        .json({ error: "Customer not found. Make a donation first." });
    }

    // Create a portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${process.env.FRONTEND_URL}`,
    });

    console.log("Portal session created:", portalSession.url);
    res.json({ url: portalSession.url });
  } catch (err) {
    console.error("Error creating portal session:", err);
    res.status(500).json({ error: err.message });
  }
};
