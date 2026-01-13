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

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Mongo connected");

  const rows = [];

  // 1) Read CSV fully first
  await new Promise((resolve, reject) => {
    fs.createReadStream(FILE)
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", resolve)
      .on("error", reject);
  });

  console.log(`Rows read: ${rows.length}`);
  console.log("CSV headers:", Object.keys(rows[0]));

  // 2) Build bulk operations
  const ops = [];
  for (const row of rows) {
    const name = row["COMMUNITY_NAME"];
    const pop = row["TOTAL_POP_HOUSEHOLD"];

    if (!name) continue;

    const geoId = norm(name);
    const population = Number(pop);

    if (!Number.isFinite(population)) continue;

    ops.push({
      updateOne: {
        filter: { geoId },
        update: { $set: { "stats.estimatedPopulation": population } },
        upsert: true,
      },
    });
  }

  console.log(`Prepared updates: ${ops.length}`);

  // 3) Execute in chunks (prevents payload too large)
  const chunkSize = 500;
  let modified = 0;
  let upserted = 0;
  let matched = 0;

  for (let i = 0; i < ops.length; i += chunkSize) {
    const chunk = ops.slice(i, i + chunkSize);
    const res = await Community.bulkWrite(chunk, { ordered: false });

    modified += res.modifiedCount || 0;
    matched += res.matchedCount || 0;
    upserted += res.upsertedCount || 0;
  }

  console.log("✅ Bulk update complete");
  console.log({ matched, modified, upserted });

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
