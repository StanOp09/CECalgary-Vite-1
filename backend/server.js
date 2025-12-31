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
// import express from "express";
// import Stripe from "stripe";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import Donation from "./models/Donation.js";

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors({ origin: process.env.CLIENT_URL, methods: ["GET", "POST"] }));
// app.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   async (req, res) => {
//     const sig = req.headers["stripe-signature"];
//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(
//         req.body,
//         sig,
//         process.env.STRIPE_WEBHOOK_SECRET
//       );
//     } catch (err) {
//       console.error("Webhook signature verification failed:", err.message);
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     try {
//       switch (event.type) {
//         case "checkout.session.completed": {
//           const session = event.data.object;

//           await Donation.findOneAndUpdate(
//             { stripeSessionId: session.id },
//             {
//               status: "completed",
//               stripeCustomerId: session.customer,
//             }
//           );
//           break;
//         }

//         case "invoice.paid": {
//           const invoice = event.data.object;

//           await Donation.create({
//             email: invoice.customer_email,
//             amount: invoice.amount_paid / 100,
//             category: "monthly-renewal",
//             frequency: "monthly",
//             stripeCustomerId: invoice.customer,
//             stripeSessionId: invoice.subscription,
//             status: "completed",
//           });
//           break;
//         }

//         case "customer.subscription.deleted": {
//           const subscription = event.data.object;

//           await Donation.updateMany(
//             { stripeCustomerId: subscription.customer },
//             { status: "canceled" }
//           );
//           break;
//         }

//         default:
//           console.log("Unhandled event:", event.type);
//       }

//       res.json({ received: true });
//     } catch (err) {
//       console.error("Webhook processing failed:", err);
//       res.status(500).json({ error: "Webhook handler error" });
//     }
//   }
// );

// app.use(express.json());

// const requireAdmin = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ error: "No token provided" });
//   }

//   try {
//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (decoded.role !== "admin") {
//       return res.status(403).json({ error: "Forbidden" });
//     }

//     req.admin = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ error: "Invalid token" });
//   }
// };

// // ---------------------------
// // MongoDB - Registration
// // ---------------------------
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// const registrationSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   attendees: { type: Number, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const Registration = mongoose.model("Registration", registrationSchema);

// // Registration routes
// app.get("/register", (req, res) => {
//   res.status(200).json({
//     message: "Register endpoint is live. Use POST to submit data.",
//   });
// });

// // app.post("/register", async (req, res) => {
// //   try {
// //     const { fullName, email, phone, attendees } = req.body;
// //     const registration = new Registration({
// //       fullName,
// //       email,
// //       phone,
// //       attendees,
// //     });
// //     await registration.save();
// //     res.status(201).json({ message: "Registration successful" });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: "Server error" });
// //   }
// // });

// app.post("/register", async (req, res) => {
//   try {
//     const { fullName, email, phone, attendees } = req.body || {};

//     if (!fullName || !email || !phone || !attendees) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const registration = new Registration({
//       fullName,
//       email,
//       phone,
//       attendees: Number(attendees),
//     });

//     await registration.save();

//     res.status(201).json({ message: "Registration successful" });
//   } catch (err) {
//     console.error("Registration error:", err);
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

// app.get("/health", (req, res) => {
//   res.json({ status: "ok" });
// });

// // ADMIN DASHBOARD ROUTE
// app.get("/admin/dashboard", requireAdmin, async (req, res) => {
//   const registrations = await Registration.find();

//   const totalAttendees = registrations.reduce((sum, r) => sum + r.attendees, 0);

//   // Group by date
//   const chartMap = {};
//   registrations.forEach((r) => {
//     const day = r.createdAt.toISOString().split("T")[0];
//     chartMap[day] = (chartMap[day] || 0) + r.attendees;
//   });

//   const chartData = Object.entries(chartMap).map(([date, attendees]) => ({
//     _id: date,
//     attendees,
//   }));

//   res.json({
//     totalRegistrations: registrations.length,
//     totalAttendees,
//     chartData,
//   });
// });

// app.post("/admin/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (email !== process.env.ADMIN_EMAIL) {
//     return res.status(401).json({ error: "Invalid credentials" });
//   }

//   const isValid = bcrypt.compareSync(password, process.env.ADMIN_PASSWORD_HASH);

//   if (!isValid) {
//     return res.status(401).json({ error: "Invalid credentials" });
//   }

//   const token = jwt.sign({ role: "admin", email }, process.env.JWT_SECRET, {
//     expiresIn: "8h",
//   });

//   res.json({ token });
//   console.log("JWT issued");
// });

// // ---------------------------
// // Stripe - Donations
// // ---------------------------
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
//               product_data: { name: `Church Giving - ${category}` },
//             },
//             quantity: 1,
//           },
//         ],
//         metadata: { category, frequency },
//         success_url: `${process.env.CLIENT_URL}/success`,
//         cancel_url: `${process.env.CLIENT_URL}/cancel`,
//       });
//     } else if (frequency === "monthly") {
//       session = await stripe.checkout.sessions.create({
//         mode: "subscription",
//         customer_email: email,
//         line_items: [
//           {
//             price_data: {
//               currency: "cad",
//               unit_amount: Math.round(parsedAmount * 100),
//               recurring: { interval: "month" },
//               product_data: { name: `Monthly ${category} Giving` },
//             },
//             quantity: 1,
//           },
//         ],
//         metadata: { category, frequency },
//         success_url: `${process.env.CLIENT_URL}/success`,
//         cancel_url: `${process.env.CLIENT_URL}/cancel`,
//       });
//     } else {
//       return res.status(400).json({ error: "Invalid frequency value" });
//     }

//     // ✅ SAVE DONATION IN DATABASE (PENDING)
//     await Donation.create({
//       email,
//       amount: parsedAmount,
//       category,
//       frequency,
//       stripeSessionId: session.id,
//       stripeCustomerId: session.customer || null,
//       status: "pending",
//     });

//     res.json({ url: session.url });
//   } catch (err) {
//     console.error("Stripe error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// app.post("/create-portal-session", async (req, res) => {
//   try {
//     const { email } = req.body;
//     const customers = await stripe.customers.list({ email, limit: 1 });
//     const customer = customers.data[0];

//     if (!customer) {
//       return res
//         .status(404)
//         .json({ error: "Customer not found. Make a donation first." });
//     }

//     const portalSession = await stripe.billingPortal.sessions.create({
//       customer: customer.id,
//       return_url: `${process.env.CLIENT_URL}/success`,
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

// // ---------------------------
// // Start server
// // ---------------------------
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ***********VERSION 4****************
// import express from "express";
// import Stripe from "stripe";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import Donation from "./models/Donation.js";

// dotenv.config();

// if (!process.env.STRIPE_SECRET_KEY) {
//   throw new Error("STRIPE_SECRET_KEY is missing in .env");
// }

// if (!process.env.STRIPE_WEBHOOK_SECRET) {
//   throw new Error("STRIPE_WEBHOOK_SECRET is missing in .env");
// }

// const app = express();
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     methods: ["GET", "POST"],
//   })
// );

// app.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   async (req, res) => {
//     const sig = req.headers["stripe-signature"];
//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(
//         req.body,
//         sig,
//         process.env.STRIPE_WEBHOOK_SECRET
//       );
//     } catch (err) {
//       console.error("Webhook signature verification failed:", err.message);
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     try {
//       switch (event.type) {
//         case "checkout.session.completed": {
//           try {
//             const session = event.data.object;

//             await Donation.findOneAndUpdate(
//               { stripeSessionId: session.id },
//               {
//                 status: "completed",
//                 stripeCustomerId: session.customer,
//               }
//             );
//             console.log("Donation marked completed:", session.id);
//           } catch (err) {
//             console.error("Failed updating donation:", err);
//           }
//           break;
//         }

//         case "invoice.paid": {
//           try {
//             const invoice = event.data.object;

//             // <-- Safeguard goes here
//             if (!invoice.customer_email || !invoice.amount_paid) {
//               console.warn("Skipping invoice event — missing data", invoice.id);
//               break; // exit this case early
//             }

//             await Donation.create({
//               email: invoice.customer_email,
//               amount: invoice.amount_paid / 100,
//               category: "monthly-renewal",
//               frequency: "monthly",
//               stripeCustomerId: invoice.customer,
//               stripeSessionId: invoice.subscription,
//               status: "completed",
//             });
//             console.log("Donation marked completed:", invoice.id);
//           } catch {
//             console.error("Failed updating donation:", err);
//           }
//           break;
//         }

//         case "customer.subscription.deleted": {
//           try {
//             const subscription = event.data.object;

//             await Donation.updateMany(
//               { stripeCustomerId: subscription.customer },
//               { status: "canceled" }
//             );
//             console.log("Donation marked completed:", subscription.id);
//           } catch {
//             console.error("Failed updating donation:", err);
//           }
//           break;
//         }

//         default:
//           console.log("Unhandled event:", event.type);
//       }

//       res.json({ received: true });
//     } catch (err) {
//       console.error("Webhook processing failed:", err);
//       res.status(500).json({ error: "Webhook handler error" });
//     }
//   }
// );

// app.use(express.json());

// // const requireAdmin = (req, res, next) => {
// //   const authHeader = req.headers.authorization;

// //   if (!authHeader) {
// //     return res.status(401).json({ error: "No token provided" });
// //   }

// //   try {
// //     const token = authHeader.split(" ")[1];
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);

// //     if (decoded.role !== "admin") {
// //       return res.status(403).json({ error: "Forbidden" });
// //     }

// //     req.admin = decoded;
// //     next();
// //   } catch {
// //     return res.status(401).json({ error: "Invalid token" });
// //   }
// // };

// const requireAdmin = (role) => (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).json({ error: "No token" });

//   try {
//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (decoded.role !== role)
//       return res.status(403).json({ error: "Forbidden" });

//     req.admin = decoded;
//     next();
//   } catch {
//     return res.status(401).json({ error: "Invalid token" });
//   }
// };

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// const registrationSchema = new mongoose.Schema({
//   fullName: String,
//   email: String,
//   phone: String,
//   attendees: Number,
//   createdAt: { type: Date, default: Date.now },
// });

// const Registration = mongoose.model("Registration", registrationSchema);

// app.get("/health", (req, res) => {
//   res.json({ status: "ok" });
// });

// app.post("/register", async (req, res) => {
//   const { fullName, email, phone, attendees } = req.body;

//   if (!fullName || !email || !phone || !attendees) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   await Registration.create({
//     fullName,
//     email,
//     phone,
//     attendees: Number(attendees),
//   });

//   res.status(201).json({ message: "Registration successful" });
// });

// app.post("/admin/login", async (req, res) => {
//   const { email, password } = req.body;

//   const isPasswordValid = bcrypt.compareSync(
//     password,
//     process.env.ADMIN_PASSWORD_HASH
//   );

//   if (!isPasswordValid) {
//     return res.status(401).json({ error: "Invalid credentials" });
//   }

//   let role = null;

//   if (email === process.env.REGISTRATION_ADMIN_EMAIL) {
//     role = "registration-admin";
//   } else if (email === process.env.GIVING_ADMIN_EMAIL) {
//     role = "giving-admin";
//   } else {
//     return res.status(401).json({ error: "Not an admin account" });
//   }

//   const token = jwt.sign({ role, email }, process.env.JWT_SECRET, {
//     expiresIn: "8h",
//   });

//   res.json({ token, role });
// });

// // app.post("/admin/login", async (req, res) => {
// //   const { email, password } = req.body;

// //   if (email !== process.env.ADMIN_EMAIL) {
// //     return res.status(401).json({ error: "Invalid credentials" });
// //   }

// //   const isValid = bcrypt.compareSync(password, process.env.ADMIN_PASSWORD_HASH);

// //   if (!isValid) {
// //     return res.status(401).json({ error: "Invalid credentials" });
// //   }

// //   const role =
// //     email === process.env.GIVING_ADMIN_EMAIL
// //       ? "giving-admin"
// //       : "registration-admin";

// //   const token = jwt.sign({ role, email }, process.env.JWT_SECRET, {
// //     expiresIn: "8h",
// //   });

// //   res.json({ token });
// // });

// // // ADMIN DASHBOARD ROUTE
// // app.get("/admin/dashboard", requireAdmin, async (req, res) => {
// //   const registrations = await Registration.find();

// //   const totalAttendees = registrations.reduce((sum, r) => sum + r.attendees, 0);

// //   // Group by date
// //   const chartMap = {};
// //   registrations.forEach((r) => {
// //     const day = r.createdAt.toISOString().split("T")[0];
// //     chartMap[day] = (chartMap[day] || 0) + r.attendees;
// //   });

// //   const chartData = Object.entries(chartMap).map(([date, attendees]) => ({
// //     _id: date,
// //     attendees,
// //   }));

// //   res.json({
// //     totalRegistrations: registrations.length,
// //     totalAttendees,
// //     chartData,
// //   });
// // });

// app.get(
//   "/admin/dashboard",
//   requireAdmin("registration-admin"),
//   async (req, res) => {
//     const registrations = await Registration.find();

//     const totalAttendees = registrations.reduce(
//       (sum, r) => sum + r.attendees,
//       0
//     );

//     // Group by date
//     const chartMap = {};
//     registrations.forEach((r) => {
//       const day = r.createdAt.toISOString().split("T")[0];
//       chartMap[day] = (chartMap[day] || 0) + r.attendees;
//     });

//     const chartData = Object.entries(chartMap).map(([date, attendees]) => ({
//       _id: date,
//       attendees,
//     }));

//     res.json({
//       totalRegistrations: registrations.length,
//       totalAttendees,
//       chartData,
//     });
//   }
// );

// app.post("/create-checkout-session", async (req, res) => {
//   const { amount, category, email, frequency } = req.body;

//   const parsedAmount = Number(amount);
//   if (!parsedAmount || parsedAmount <= 0) {
//     return res.status(400).json({ error: "Invalid amount" });
//   }

//   const session = await stripe.checkout.sessions.create({
//     mode: frequency === "monthly" ? "subscription" : "payment",
//     customer_email: email,
//     line_items: [
//       {
//         price_data: {
//           currency: "cad",
//           unit_amount: Math.round(parsedAmount * 100),
//           recurring:
//             frequency === "monthly" ? { interval: "month" } : undefined,
//           product_data: { name: `Church Giving - ${category}` },
//         },
//         quantity: 1,
//       },
//     ],
//     success_url: `${process.env.CLIENT_URL}/success`,
//     cancel_url: `${process.env.CLIENT_URL}/cancel`,
//   });

//   await Donation.create({
//     email,
//     amount: parsedAmount,
//     category,
//     frequency,
//     stripeSessionId: session.id,
//     status: "pending",
//   });

//   res.json({ url: session.url });
// });

// // ADMIN – GIVING DASHBOARD
// app.get(
//   "/admin/giving-dashboard",
//   requireAdmin("giving-admin"),
//   async (req, res) => {
//     try {
//       // Only completed donations count
//       const completedDonations = await Donation.find({
//         status: "completed",
//       });

//       // 1️⃣ Total donations (money)
//       const totalDonations = completedDonations.reduce(
//         (sum, d) => sum + d.amount,
//         0
//       );

//       // 2️⃣ Monthly totals
//       const monthlyMap = {};
//       completedDonations.forEach((d) => {
//         const month = d.createdAt.toISOString().slice(0, 7); // YYYY-MM
//         monthlyMap[month] = (monthlyMap[month] || 0) + d.amount;
//       });

//       const monthlyTotals = Object.entries(monthlyMap).map(
//         ([month, total]) => ({
//           month,
//           total,
//         })
//       );

//       // 3️⃣ Category breakdown
//       const categoryMap = {};
//       completedDonations.forEach((d) => {
//         categoryMap[d.category] = (categoryMap[d.category] || 0) + d.amount;
//       });

//       const categoryBreakdown = Object.entries(categoryMap).map(
//         ([category, total]) => ({
//           category,
//           total,
//         })
//       );

//       // 4️⃣ Active subscriptions
//       const activeSubscriptions = await Donation.find({
//         frequency: "monthly",
//         status: "completed",
//       }).distinct("stripeCustomerId");

//       res.json({
//         totalDonations,
//         monthlyTotals,
//         categoryBreakdown,
//         activeSubscriptionsCount: activeSubscriptions.length,
//       });
//     } catch (err) {
//       console.error("Giving dashboard error:", err);
//       res.status(500).json({ error: "Server error" });
//     }
//   }
// );

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ***********VERSION 5 – FULL SERVER.JS****************
// import express from "express";
// import Stripe from "stripe";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import Donation from "./models/Donation.js";

// dotenv.config();

// // ---------- ENV CHECKS ----------
// if (!process.env.STRIPE_SECRET_KEY)
//   throw new Error("STRIPE_SECRET_KEY missing");
// if (!process.env.STRIPE_WEBHOOK_SECRET)
//   throw new Error("STRIPE_WEBHOOK_SECRET missing");
// if (!process.env.MONGO_URI) throw new Error("MONGO_URI missing");
// if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET missing");

// const app = express();
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // ---------- MIDDLEWARE ----------
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );

// // ---------- CHECKOUT SESSION ----------
// app.post("/create-checkout-session", async (req, res) => {
//   const { amount, category, email, frequency } = req.body;
//   const parsedAmount = Number(amount);
//   if (!parsedAmount || parsedAmount <= 0)
//     return res.status(400).json({ error: "Invalid amount" });

//   const session = await stripe.checkout.sessions.create({
//     mode: frequency === "monthly" ? "subscription" : "payment",
//     customer_email: email,
//     line_items: [
//       {
//         price_data: {
//           currency: "cad",
//           unit_amount: Math.round(parsedAmount * 100),
//           recurring:
//             frequency === "monthly" ? { interval: "month" } : undefined,
//           product_data: { name: `Church Giving - ${category}` },
//         },
//         quantity: 1,
//       },
//     ],
//     success_url: `${process.env.CLIENT_URL}/success`,
//     cancel_url: `${process.env.CLIENT_URL}/cancel`,
//   });

//   await Donation.create({
//     email,
//     amount: parsedAmount,
//     category,
//     frequency,
//     stripeSessionId: session.id,
//     status: "pending",
//   });

//   res.json({ url: session.url });
// });

// // ---------- STRIPE WEBHOOK ----------
// app.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   async (req, res) => {
//     const sig = req.headers["stripe-signature"];
//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(
//         req.body,
//         sig,
//         process.env.STRIPE_WEBHOOK_SECRET
//       );
//     } catch (err) {
//       console.error("Webhook signature verification failed:", err.message);
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     try {
//       switch (event.type) {
//         case "checkout.session.completed": {
//           const session = event.data.object;
//           const donations = await Donation.find({
//             stripeSessionId: session.id,
//           });
//           if (donations.length > 0) {
//             const updates = donations.map((d) =>
//               withRetry(() =>
//                 Donation.findByIdAndUpdate(d._id, {
//                   status: "completed",
//                   stripeCustomerId: session.customer,
//                 })
//               )
//             );
//             await Promise.allSettled(updates);
//             console.log("Updated donations for session:", session.id);
//           }
//           break;
//         }

//         case "invoice.paid": {
//           const invoice = event.data.object;
//           if (!invoice.customer_email || !invoice.amount_paid) break;

//           const exists = await Donation.findOne({
//             stripeSessionId: invoice.subscription,
//           });
//           if (!exists) {
//             await withRetry(() =>
//               Donation.create({
//                 email: invoice.customer_email,
//                 amount: invoice.amount_paid / 100,
//                 category: "monthly-renewal",
//                 frequency: "monthly",
//                 stripeCustomerId: invoice.customer,
//                 stripeSessionId: invoice.subscription,
//                 status: "completed",
//               })
//             );
//             console.log("Donation created for invoice:", invoice.id);
//           }
//           break;
//         }

//         case "customer.subscription.deleted": {
//           const subscription = event.data.object;
//           await withRetry(() =>
//             Donation.updateMany(
//               { stripeCustomerId: subscription.customer },
//               { status: "canceled" }
//             )
//           );
//           console.log("Canceled donations for subscription:", subscription.id);
//           break;
//         }

//         default:
//           console.log("Unhandled event:", event.type);
//       }

//       res.json({ received: true });
//     } catch (err) {
//       console.error("Webhook processing failed:", err);
//       res.status(500).json({ error: "Webhook handler error" });
//     }
//   }
// );

// app.use(express.json()); // for normal routes

// // ---------- HELPER: RETRY ----------
// async function withRetry(fn, retries = 3, delay = 1000) {
//   let lastError;
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await fn();
//     } catch (err) {
//       lastError = err;
//       console.warn(`Retry ${i + 1}/${retries} failed:`, err.message);
//       await new Promise((res) => setTimeout(res, delay));
//     }
//   }
//   throw lastError;
// }

// // ---------- MONGOOSE CONNECTION ----------
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // ---------- MODELS ----------
// const registrationSchema = new mongoose.Schema({
//   fullName: String,
//   email: String,
//   phone: String,
//   attendees: Number,
//   createdAt: { type: Date, default: Date.now },
// });
// const Registration = mongoose.model("Registration", registrationSchema);

// // ---------- AUTH MIDDLEWARE ----------
// const requireAdmin = (role) => (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).json({ error: "No token" });

//   try {
//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (decoded.role !== role)
//       return res.status(403).json({ error: "Forbidden" });

//     req.admin = decoded;
//     next();
//   } catch {
//     return res.status(401).json({ error: "Invalid token" });
//   }
// };

// // ---------- HEALTH CHECK ----------
// app.get("/health", (req, res) => res.json({ status: "ok" }));

// // ---------- REGISTRATION ----------
// app.post("/register", async (req, res) => {
//   const { fullName, email, phone, attendees } = req.body;
//   if (!fullName || !email || !phone || !attendees)
//     return res.status(400).json({ error: "Missing required fields" });

//   await Registration.create({
//     fullName,
//     email,
//     phone,
//     attendees: Number(attendees),
//   });
//   res.status(201).json({ message: "Registration successful" });
// });

// // ---------- ADMIN LOGIN ----------
// app.post("/admin/login", async (req, res) => {
//   const { email, password } = req.body;

//   const isPasswordValid = bcrypt.compareSync(
//     password,
//     process.env.ADMIN_PASSWORD_HASH
//   );
//   if (!isPasswordValid)
//     return res.status(401).json({ error: "Invalid credentials" });

//   let role = null;
//   if (email === process.env.REGISTRATION_ADMIN_EMAIL)
//     role = "registration-admin";
//   else if (email === process.env.GIVING_ADMIN_EMAIL) role = "giving-admin";
//   else return res.status(401).json({ error: "Not an admin account" });

//   const token = jwt.sign({ role, email }, process.env.JWT_SECRET, {
//     expiresIn: "8h",
//   });
//   res.json({ token, role });
// });

// // ---------- ADMIN DASHBOARD ----------
// app.get(
//   "/admin/dashboard",
//   requireAdmin("registration-admin"),
//   async (req, res) => {
//     const registrations = await Registration.find();
//     const totalAttendees = registrations.reduce(
//       (sum, r) => sum + r.attendees,
//       0
//     );

//     const chartMap = {};
//     registrations.forEach((r) => {
//       const day = r.createdAt.toISOString().split("T")[0];
//       chartMap[day] = (chartMap[day] || 0) + r.attendees;
//     });
//     const chartData = Object.entries(chartMap).map(([date, attendees]) => ({
//       _id: date,
//       attendees,
//     }));

//     res.json({
//       totalRegistrations: registrations.length,
//       totalAttendees,
//       chartData,
//     });
//   }
// );

// // ---------- GIVING DASHBOARD ----------
// app.get(
//   "/admin/giving-dashboard",
//   requireAdmin("giving-admin"),
//   async (req, res) => {
//     try {
//       const completedDonations = await Donation.find({ status: "completed" });

//       const totalDonations = completedDonations.reduce(
//         (sum, d) => sum + d.amount,
//         0
//       );

//       const monthlyMap = {};
//       completedDonations.forEach((d) => {
//         const month = d.createdAt.toISOString().slice(0, 7);
//         monthlyMap[month] = (monthlyMap[month] || 0) + d.amount;
//       });
//       const monthlyTotals = Object.entries(monthlyMap).map(
//         ([month, total]) => ({ month, total })
//       );

//       const categoryMap = {};
//       completedDonations.forEach(
//         (d) =>
//           (categoryMap[d.category] = (categoryMap[d.category] || 0) + d.amount)
//       );
//       const categoryBreakdown = Object.entries(categoryMap).map(
//         ([category, total]) => ({ category, total })
//       );

//       const activeSubscriptions = await Donation.find({
//         frequency: "monthly",
//         status: "completed",
//       }).distinct("stripeCustomerId");

//       res.json({
//         totalDonations,
//         monthlyTotals,
//         categoryBreakdown,
//         activeSubscriptionsCount: activeSubscriptions.length,
//       });
//     } catch (err) {
//       console.error("Giving dashboard error:", err);
//       res.status(500).json({ error: "Server error" });
//     }
//   }
// );

// // GET recent donations
// app.get(
//   "/admin/recent-donations",
//   requireAdmin("giving-admin"),
//   async (req, res) => {
//     try {
//       const donations = await Donation.find({ status: "completed" })
//         .sort({ createdAt: -1 }) // newest first
//         .limit(10); // last 10 donations

//       res.json(donations);
//     } catch (err) {
//       console.error("Error fetching recent donations:", err);
//       res.status(500).json({ error: "Server error" });
//     }
//   }
// );

// // ----- Real-time Donations SSE -----
// app.get(
//   "/admin/recent-donations/stream",
//   (req, res, next) => {
//     const token = req.query.token;
//     if (!token) return res.status(401).json({ error: "No token" });

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       if (decoded.role !== "giving-admin")
//         return res.status(403).json({ error: "Forbidden" });
//       req.admin = decoded;
//       next();
//     } catch {
//       return res.status(401).json({ error: "Invalid token" });
//     }
//   },
//   async (req, res) => {
//     res.setHeader("Content-Type", "text/event-stream");
//     res.setHeader("Cache-Control", "no-cache");
//     res.setHeader("Connection", "keep-alive");

//     const keepAlive = setInterval(() => res.write(": keep-alive\n\n"), 20000);

//     const sendDonations = async () => {
//       const donations = await Donation.find({ status: "completed" })
//         .sort({ createdAt: -1 })
//         .limit(50);
//       res.write(`data: ${JSON.stringify(donations)}\n\n`);
//     };
//     sendDonations();

//     const changeStream = Donation.watch([], { fullDocument: "updateLookup" });
//     changeStream.on("change", (change) => {
//       if (
//         ["insert", "update"].includes(change.operationType) &&
//         change.fullDocument.status === "completed"
//       ) {
//         res.write(`data: ${JSON.stringify([change.fullDocument])}\n\n`);
//       }
//     });

//     req.on("close", () => {
//       clearInterval(keepAlive);
//       changeStream.close();
//       res.end();
//     });
//   }
// );
// // app.get(
// //   "/admin/recent-donations/stream",
// //   requireAdmin("giving-admin"),
// //   async (req, res) => {
// //     res.setHeader("Content-Type", "text/event-stream");
// //     res.setHeader("Cache-Control", "no-cache");
// //     res.setHeader("Connection", "keep-alive");

// //     const keepAlive = setInterval(() => res.write(": keep-alive\n\n"), 20000);

// //     const sendDonations = async () => {
// //       const donations = await Donation.find({ status: "completed" })
// //         .sort({ createdAt: -1 })
// //         .limit(50);
// //       res.write(`data: ${JSON.stringify(donations)}\n\n`);
// //     };
// //     sendDonations();

// //     const changeStream = Donation.watch([], { fullDocument: "updateLookup" });
// //     changeStream.on("change", (change) => {
// //       if (
// //         ["insert", "update"].includes(change.operationType) &&
// //         change.fullDocument.status === "completed"
// //       ) {
// //         res.write(`data: ${JSON.stringify([change.fullDocument])}\n\n`);
// //       }
// //     });

// //     req.on("close", () => {
// //       clearInterval(keepAlive);
// //       changeStream.close();
// //       res.end();
// //     });
// //   }
// // );

// // ---------- START SERVER ----------
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ***********VERSION 6 – FULL SERVER.JS****************
import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Donation from "./models/Donation.js";
// import spotifyRoutes from "./spotify.js";

dotenv.config();

// ---------- ENV CHECKS ----------
[
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "MONGO_URI",
  "JWT_SECRET",
].forEach((v) => {
  if (!process.env[v]) throw new Error(`${v} missing`);
});

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ---------- CORS ----------
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  })
);

// ---------- BODY PARSER (EXCEPT WEBHOOK) ----------
app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next(); // Stripe needs raw body
  } else {
    express.json()(req, res, next);
  }
});

// ---------- RETRY HELPER ----------
async function withRetry(fn, retries = 3, delay = 1000) {
  let lastErr;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw lastErr;
}

// ---------- MONGO ----------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

// ---------- MODELS ----------
const registrationSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  attendees: Number,
  createdAt: { type: Date, default: Date.now },
});
const Registration = mongoose.model("Registration", registrationSchema);

// ---------- AUTH ----------
const requireAdmin = (role) => (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "No token" });

  try {
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== role)
      return res.status(403).json({ error: "Forbidden" });
    req.admin = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

// ---------- HEALTH ----------
app.get("/health", (_, res) => res.json({ ok: true }));

// ---------- CHECKOUT ----------
app.post("/create-checkout-session", async (req, res) => {
  const { amount, category, email, frequency } = req.body;

  if (!amount || !email)
    return res.status(400).json({ error: "Missing fields" });

  const session = await stripe.checkout.sessions.create({
    mode: frequency === "monthly" ? "subscription" : "payment",
    customer_email: email,
    subscription_data:
      frequency === "monthly"
        ? {
            metadata: {
              category,
              frequency,
            },
          }
        : undefined,

    line_items: [
      {
        price_data: {
          currency: "cad",
          unit_amount: Math.round(Number(amount) * 100),
          recurring:
            frequency === "monthly" ? { interval: "month" } : undefined,
          product_data: { name: `Giving - ${category}` },
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
  });

  await Donation.create({
    email,
    amount,
    category,
    frequency,
    stripeSessionId: session.id,
    status: "pending",
  });

  res.json({ url: session.url });
});

// ---------- STRIPE WEBHOOK ----------
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        // 🔥 Skip subscriptions
        if (session.mode === "subscription") return;

        await Donation.updateMany(
          { stripeSessionId: session.id },
          {
            status: "completed",
            stripeCustomerId: session.customer,
          }
        );
      }

      if (event.type === "invoice.paid") {
        const invoice = event.data.object;

        const subscription = await stripe.subscriptions.retrieve(
          invoice.subscription
        );

        await Donation.create({
          email: invoice.customer_email,
          amount: invoice.amount_paid / 100,
          category: subscription.metadata.category || "general giving",
          frequency: "monthly",
          stripeCustomerId: invoice.customer,
          stripeSessionId: invoice.subscription,
          status: "completed",
        });
      }

      res.json({ received: true });
    } catch (err) {
      res.status(500).json({ error: "Webhook failed" });
    }
  }
);

// ---------- ADMIN LOGIN ----------
app.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;

  if (!bcrypt.compareSync(password, process.env.ADMIN_PASSWORD_HASH))
    return res.status(401).json({ error: "Invalid credentials" });

  const role =
    email === process.env.GIVING_ADMIN_EMAIL
      ? "giving-admin"
      : email === process.env.REGISTRATION_ADMIN_EMAIL
      ? "registration-admin"
      : null;

  if (!role) return res.status(401).json({ error: "Not admin" });

  const token = jwt.sign({ email, role }, process.env.JWT_SECRET, {
    expiresIn: "8h",
  });

  res.json({ token, role });
});

// ---------- GIVING DASHBOARD ----------
app.get(
  "/admin/giving-dashboard",
  requireAdmin("giving-admin"),
  async (req, res) => {
    const { category, search } = req.query;

    const query = { status: "completed" };

    // ✅ Filter by category
    if (category && category !== "all") {
      query.category = category;
    }

    // ✅ Filter by donor (email for now)
    if (search) {
      query.email = { $regex: search, $options: "i" };
    }

    const donations = await Donation.find(query);

    const totalDonations = donations.reduce((s, d) => s + d.amount, 0);

    // Monthly totals
    const monthlyTotals = Object.values(
      donations.reduce((acc, d) => {
        const m = d.createdAt.toISOString().slice(0, 7);
        acc[m] = acc[m] || { month: m, total: 0 };
        acc[m].total += d.amount;
        return acc;
      }, {})
    );

    // ✅ Total donors (unique emails)
    const totalDonors = new Set(donations.map((d) => d.email)).size;

    // ✅ Recurring donors (unique emails with monthly frequency)
    const recurringDonors = new Set(
      donations.filter((d) => d.frequency === "monthly").map((d) => d.email)
    ).size;

    // Active subscriptions (already correct)
    const activeSubscriptionsCount = donations.filter(
      (d) => d.frequency === "monthly"
    ).length;

    // const activeSubscriptionsCount = await Donation.distinct(
    //   "stripeCustomerId",
    //   { frequency: "monthly", status: "donations" }
    // ).then((r) => r.length);

    res.json({
      totalDonations,
      monthlyTotals,
      activeSubscriptionsCount,
      totalDonors,
      recurringDonors,
    });
  }
);

// ---------- SSE ----------
app.get("/admin/recent-donations/stream", async (req, res) => {
  const token = req.query.token;
  if (!token) return res.sendStatus(401);

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded.role !== "giving-admin") return res.sendStatus(403);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");

  const send = async () => {
    const data = await Donation.find({ status: "completed" })
      .sort({ createdAt: -1 })
      .limit(50);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  send();

  const stream = Donation.watch([], { fullDocument: "updateLookup" });
  stream.on("change", (c) => {
    if (c.fullDocument?.status === "completed") {
      res.write(`data: ${JSON.stringify([c.fullDocument])}\n\n`);
    }
  });

  req.on("close", () => stream.close());
});

// app.use("/api/spotify", spotifyRoutes);

// ---------- START ----------
app.listen(3000, () => console.log("Server running on 3000"));
