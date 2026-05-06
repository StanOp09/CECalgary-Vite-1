import Stripe from "stripe";

let _instance;
export const getStripe = () => (_instance ??= new Stripe(process.env.STRIPE_SECRET_KEY));
