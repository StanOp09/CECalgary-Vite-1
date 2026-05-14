import dotenv from "dotenv";
import mongoose from "mongoose";
import Registration from "../models/Registration.js";

dotenv.config({ path: new URL("../.env", import.meta.url).pathname });

await mongoose.connect(process.env.MONGO_URI, { tlsAllowInvalidCertificates: true });
const { deletedCount } = await Registration.deleteMany({});
console.log(`Deleted ${deletedCount} registration(s). Collection is now empty.`);
await mongoose.disconnect();
