// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import checkoutRoutes from "./routes/checkoutRoutes.js";
// import portalRoutes from "./routes/portalRoutes.js";
// import subscriptionRoutes from "./routes/subscriptionRoutes.js";
// import Stripe from "stripe";

// import bodyParser from "body-parser";
// dotenv.config();

// const app = express();
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     methods: ["GET", "POST"],
//   })
// );

// app.use(express.json());

// // // Routes
// // app.use("/checkout", checkoutRoutes);
// // app.use("/portal", portalRoutes);
// // app.use("/subscriptions", subscriptionRoutes);

// // Ensure Stripe secret key exists
// if (!process.env.STRIPE_SECRET_KEY) {
//   throw new Error("STRIPE_SECRET_KEY is missing in .env");
// }

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// app.post("/create-checkout-session", async (req, res) => {
//   try {
//     const { amount, category, email, frequency } = req.body;

//     if (!email || !email.includes("@")) {
//       return res.status(400).json({ error: "Invalid email" });
//     }

//     const parsedAmount = Number(amount);
//     if (!parsedAmount || parsedAmount <= 0) {
//       return res.status(400).json({ error: "Invalid amount" });
//     }

//     let session;

//     if (frequency === "one-time") {
//       session = await stripe.checkout.sessions.create({
//         mode: "payment",
//         customer_email: email,
//         line_items: [
//           {
//             price_data: {
//               currency: "cad",
//               unit_amount: Math.round(parsedAmount * 100),
//               product_data: {
//                 name: `Church Giving - ${category}`,
//               },
//             },
//             quantity: 1,
//           },
//         ],

//         metadata: { category, frequency },
//         success_url: `${process.env.FRONTEND_URL}/success`,
//         cancel_url: `${process.env.FRONTEND_URL}/cancel`,
//       });
//     }

//     if (frequency === "monthly") {
//       session = await stripe.checkout.sessions.create({
//         mode: "subscription",
//         customer_email: email,
//         line_items: [
//           {
//             price_data: {
//               currency: "cad",
//               unit_amount: Math.round(parsedAmount * 100),
//               recurring: { interval: "month" },
//               product_data: {
//                 name: `Monthly ${category} Giving`,
//               },
//             },
//             quantity: 1,
//           },
//         ],
//         metadata: { category, frequency },
//         success_url: `${process.env.FRONTEND_URL}/success`,
//         cancel_url: `${process.env.FRONTEND_URL}/cancel`,
//       });
//     }

//     if (!session) {
//       return res.status(400).json({ error: "Invalid frequency value" });
//     }

//     res.json({ url: session.url });
//   } catch (err) {
//     console.error("Stripe error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // Create a Stripe Customer Portal session
// app.post("/create-portal-session", async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Find the Stripe customer by email
//     const customers = await stripe.customers.list({ email, limit: 1 });
//     // Log the results
//     console.log("Stripe customer lookup:", customers.data); // <-- log this

//     const customer = customers.data[0];

//     if (!customer) {
//       console.log("No customer found for email:", email); // <-- log this
//       return res
//         .status(404)
//         .json({ error: "Customer not found. Make a donation first." });
//     }

//     // Create a portal session
//     const portalSession = await stripe.billingPortal.sessions.create({
//       customer: customer.id,
//       return_url: `${process.env.FRONTEND_URL}`, // redirect back to your site
//     });

//     console.log("Portal session created:", portalSession.url); // <-- log this
//     res.json({ url: portalSession.url });
//   } catch (err) {
//     console.error("Error creating portal session:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// app.get("/subscriptions/:customerId", async (req, res) => {
//   try {
//     const { customerId } = req.params;
//     const subscriptions = await stripe.subscriptions.list({
//       customer: customerId,
//     });
//     res.json(subscriptions.data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ***********VERSION 2****************

// import express from "express";
// import Stripe from "stripe";
// import cors from "cors";
// import dotenv from "dotenv";
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// dotenv.config();

// const app = express();
// app.use(cors({ origin: process.env.FRONTEND_URL, methods: ["GET", "POST"] }));
// app.use(express.json());

// // REGISTRATION SECTION
// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Define a schema and model
// const registrationSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   attendees: { type: Number, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const Registration = mongoose.model("Registration", registrationSchema);

// // Routes
// app.post("/register", async (req, res) => {
//   try {
//     const { fullName, email, phone, attendees } = req.body;
//     const registration = new Registration({
//       fullName,
//       email,
//       phone,
//       attendees,
//     });
//     await registration.save();
//     res.status(201).json({ message: "Registration successful" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// app.get("/registrations", async (req, res) => {
//   try {
//     const registrations = await Registration.find().sort({ createdAt: -1 });
//     res.json(registrations);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // STRIPE SECTION
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// app.post("/create-checkout-session", async (req, res) => {
//   try {
//     const { amount, category, email, frequency } = req.body;

//     if (!email || !email.includes("@")) {
//       return res.status(400).json({ error: "Invalid email" });
//     }

//     const parsedAmount = Number(amount);
//     if (!parsedAmount || parsedAmount <= 0) {
//       return res.status(400).json({ error: "Invalid amount" });
//     }

//     let session;

//     if (frequency === "one-time") {
//       session = await stripe.checkout.sessions.create({
//         mode: "payment",
//         customer_email: email,
//         line_items: [
//           {
//             price_data: {
//               currency: "cad",
//               unit_amount: Math.round(parsedAmount * 100),
//               product_data: {
//                 name: `Church Giving - ${category}`,
//               },
//             },
//             quantity: 1,
//           },
//         ],
//         metadata: { category, frequency },
//         success_url: `${process.env.FRONTEND_URL}/success`,
//         cancel_url: `${process.env.FRONTEND_URL}/cancel`,
//       });
//     }

//     if (frequency === "monthly") {
//       session = await stripe.checkout.sessions.create({
//         mode: "subscription",
//         customer_email: email,
//         line_items: [
//           {
//             price_data: {
//               currency: "cad",
//               unit_amount: Math.round(parsedAmount * 100),
//               recurring: { interval: "month" },
//               product_data: {
//                 name: `Monthly ${category} Giving`,
//               },
//             },
//             quantity: 1,
//           },
//         ],
//         metadata: { category, frequency },
//         success_url: `${process.env.FRONTEND_URL}/success`,
//         cancel_url: `${process.env.FRONTEND_URL}/cancel`,
//       });
//     }

//     if (!session) {
//       return res.status(400).json({ error: "Invalid frequency value" });
//     }

//     res.json({ url: session.url });
//   } catch (err) {
//     console.error("Stripe error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // Create a Stripe Customer Portal session
// app.post("/create-portal-session", async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Find the Stripe customer by email
//     const customers = await stripe.customers.list({ email, limit: 1 });
//     const customer = customers.data[0];

//     if (!customer) {
//       return res
//         .status(404)
//         .json({ error: "Customer not found. Make a donation first." });
//     }

//     // Create a portal session
//     const portalSession = await stripe.billingPortal.sessions.create({
//       customer: customer.id,
//       return_url: `${process.env.FRONTEND_URL}/success`, // redirect back to your site
//     });

//     res.json({ url: portalSession.url });
//   } catch (err) {
//     console.error("Error creating portal session:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// app.get("/subscriptions/:customerId", async (req, res) => {
//   try {
//     const { customerId } = req.params;
//     const subscriptions = await stripe.subscriptions.list({
//       customer: customerId,
//     });
//     res.json(subscriptions.data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ***********VERSION 3****************
import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, methods: ["GET", "POST"] }));
app.use(express.json());

const requireAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// ---------------------------
// MongoDB - Registration
// ---------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const registrationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  attendees: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Registration = mongoose.model("Registration", registrationSchema);

// Registration routes
app.get("/register", (req, res) => {
  res.status(200).json({
    message: "Register endpoint is live. Use POST to submit data.",
  });
});

app.post("/register", async (req, res) => {
  try {
    const { fullName, email, phone, attendees } = req.body;
    const registration = new Registration({
      fullName,
      email,
      phone,
      attendees,
    });
    await registration.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/registrations", async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json(registrations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ADMIN DASHBOARD ROUTE
app.get("/admin/dashboard", requireAdmin, async (req, res) => {
  const registrations = await Registration.find();

  const totalAttendees = registrations.reduce((sum, r) => sum + r.attendees, 0);

  // Group by date
  const chartMap = {};
  registrations.forEach((r) => {
    const day = r.createdAt.toISOString().split("T")[0];
    chartMap[day] = (chartMap[day] || 0) + r.attendees;
  });

  const chartData = Object.entries(chartMap).map(([date, attendees]) => ({
    _id: date,
    attendees,
  }));

  res.json({
    totalRegistrations: registrations.length,
    totalAttendees,
    chartData,
  });
});

app.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;

  if (email !== process.env.ADMIN_EMAIL) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isValid = bcrypt.compareSync(password, process.env.ADMIN_PASSWORD_HASH);

  if (!isValid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ role: "admin", email }, process.env.JWT_SECRET, {
    expiresIn: "8h",
  });

  res.json({ token });
  console.log("JWT issued");
});

// ---------------------------
// Stripe - Donations
// ---------------------------
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is missing in .env");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

    if (frequency === "one-time") {
      session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: email,
        line_items: [
          {
            price_data: {
              currency: "cad",
              unit_amount: Math.round(parsedAmount * 100),
              product_data: { name: `Church Giving - ${category}` },
            },
            quantity: 1,
          },
        ],
        metadata: { category, frequency },
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
      });
    } else if (frequency === "monthly") {
      session = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer_email: email,
        line_items: [
          {
            price_data: {
              currency: "cad",
              unit_amount: Math.round(parsedAmount * 100),
              recurring: { interval: "month" },
              product_data: { name: `Monthly ${category} Giving` },
            },
            quantity: 1,
          },
        ],
        metadata: { category, frequency },
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
      });
    } else {
      return res.status(400).json({ error: "Invalid frequency value" });
    }

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/create-portal-session", async (req, res) => {
  try {
    const { email } = req.body;
    const customers = await stripe.customers.list({ email, limit: 1 });
    const customer = customers.data[0];

    if (!customer) {
      return res
        .status(404)
        .json({ error: "Customer not found. Make a donation first." });
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${process.env.CLIENT_URL}/success`,
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

// ---------------------------
// Start server
// ---------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
