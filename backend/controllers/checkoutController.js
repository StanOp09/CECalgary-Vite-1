import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { amount, category, email, frequency } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const parsedAmount = Number(amount);
    if (!parsedAmount || parsedAmount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    let session;

    if (frequency === "one-time") {
      session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: email,
        line_items: [
          {
            price_data: {
              currency: "cad",
              unit_amount: Math.round(parsedAmount * 100),
              product_data: {
                name: `Church Giving - ${category}`,
              },
            },
            quantity: 1,
          },
        ],

        metadata: { category, frequency },
        success_url: `${process.env.FRONTEND_URL}/success`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      });
    }

    if (frequency === "monthly") {
      session = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer_email: email,
        line_items: [
          {
            price_data: {
              currency: "cad",
              unit_amount: Math.round(parsedAmount * 100),
              recurring: { interval: "month" },
              product_data: {
                name: `Monthly ${category} Giving`,
              },
            },
            quantity: 1,
          },
        ],
        metadata: { category, frequency },
        success_url: `${process.env.FRONTEND_URL}/success`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      });
    }

    if (!session) {
      return res.status(400).json({ error: "Invalid frequency value" });
    }

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: err.message });
  }
};
