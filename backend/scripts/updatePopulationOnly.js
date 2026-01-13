import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import csv from "csv-parser";
import dotenv from "dotenv";
import Community from "../models/Community.js";

dotenv.config();

const FILE = path.resolve("data/2021_calgary_communities.csv");

function norm(s) {
  return String(s || "")
    .trim()
    .toUpperCase();
}

function toNumber(raw) {
  const s = String(raw ?? "").trim();
  if (!s) return null;
  const cleaned = s.replace(/,/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Mongo connected");
  console.log("DB name:", mongoose.connection.name);

  const rows = [];
  await new Promise((resolve, reject) => {
    fs.createReadStream(FILE)
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", resolve)
      .on("error", reject);
  });

  console.log(`Rows read: ${rows.length}`);

  const ops = rows
    .filter((r) => r["COMMUNITY_NAME"])
    .map((r) => {
      const geoId = norm(r["COMMUNITY_NAME"]);
      const pop = toNumber(r["TOTAL_POP_HOUSEHOLD"]);
      const population = pop ?? 0; // blanks -> 0

      return {
        updateOne: {
          filter: { geoId },
          update: { $set: { "stats.estimatedPopulation": population } },
          upsert: false, // only update existing docs
        },
      };
    });

  const res = await Community.bulkWrite(ops, { ordered: false });

  console.log("✅ Done", {
    matched: res.matchedCount,
    modified: res.modifiedCount,
  });

  const gt0 = await Community.countDocuments({
    "stats.estimatedPopulation": { $gt: 0 },
  });
  console.log("DB communities with population > 0:", gt0);

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
