import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// app.post("/create-checkout-session", async (req, res) => {
//   try {
//     const { amount, category, email } = req.body; // <- include email
//     console.log("Received request:", { amount, category, email });

//     // Optional: validate email
//     if (!email || !email.includes("@")) {
//       return res.status(400).json({ error: "Invalid email" });
//     }

//     const session = await stripe.checkout.sessions.create({
//       mode: "payment",
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "cad",
//             unit_amount: Math.round(Number(amount) * 100),
//             product_data: { name: `Church Giving - ${category}` },
//           },
//           quantity: 1,
//         },
//       ],
//       metadata: { category },
//       customer_email: email, // use validated email
//       success_url: "http://localhost:5173/success",
//       cancel_url: "http://localhost:5173/cancel",
//     });

//     console.log("Stripe session created:", session.id);
//     console.log("Creating session for email:", email);

//     res.json({ url: session.url });
//   } catch (err) {
//     console.error("Stripe session error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

app.post("/create-checkout-session", async (req, res) => {
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

    // ONE-TIME GIVING
    // if (frequency === "one-time") {
    //   session = await stripe.checkout.sessions.create({
    //     mode: "payment",
    //     payment_method_types: ["card"],
    //     customer_email: email,
    //     line_items: [
    //       {
    //         price_data: {
    //           currency: "cad",
    //           unit_amount: Math.round(amount * 100),
    //           product_data: {
    //             name: `Church Giving - ${category}`,
    //           },
    //         },
    //         quantity: 1,
    //       },
    //     ],
    //     metadata: { category, frequency },
    //     success_url: "http://localhost:5173/success",
    //     cancel_url: "http://localhost:5173/cancel",
    //   });
    // }
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
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cancel",
      });
    }

    // MONTHLY RECURRING GIVING
    // if (frequency === "monthly") {
    //   session = await stripe.checkout.sessions.create({
    //     mode: "subscription",
    //     payment_method_types: ["card"],
    //     customer_email: email,
    //     line_items: [
    //       {
    //         price_data: {
    //           currency: "cad",
    //           unit_amount: Math.round(amount * 100),
    //           recurring: { interval: "month" },
    //           product_data: {
    //             name: `Monthly ${category} Giving`,
    //           },
    //         },
    //         quantity: 1,
    //       },
    //     ],
    //     metadata: { category, frequency },
    //     success_url: "http://localhost:5173/success",
    //     cancel_url: "http://localhost:5173/cancel",
    //   });
    // }
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
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cancel",
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
});

// Create a Stripe Customer Portal session
app.post("/create-portal-session", async (req, res) => {
  try {
    const { email } = req.body;

    // Find the Stripe customer by email
    const customers = await stripe.customers.list({ email, limit: 1 });
    const customer = customers.data[0];

    if (!customer) {
      return res
        .status(404)
        .json({ error: "Customer not found. Make a donation first." });
    }

    // Create a portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: "http://localhost:5173", // redirect back to your site
    });

    res.json({ url: portalSession.url });
  } catch (err) {
    console.error("Error creating portal session:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/subscriptions/:customerId", async (req, res) => {
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
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
