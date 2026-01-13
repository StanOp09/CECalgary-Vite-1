import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import csv from "csv-parser";
import dotenv from "dotenv";
import Community from "../models/Community.js";

dotenv.config();

const FILE = path.resolve("data/2021_calgary_communities.csv");

function normalizeGeoId(name) {
  return String(name || "")
    .trim()
    .toUpperCase();
}

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Mongo connected");

  const rows = [];

  fs.createReadStream(FILE)
    .pipe(csv())
    .on("data", (row) => rows.push(row))
    .on("end", async () => {
      console.log(`Read ${rows.length} rows`);

      for (const row of rows) {
        const name = row["COMMUNITY_NAME"];
        if (!name) continue;

        const geoId = normalizeGeoId(name);

        // This file includes population:
        const population = Number(row["TOTAL_POP_HOUSEHOLD"] || 0);

        await Community.findOneAndUpdate(
          { geoId },
          {
            name: String(name).trim(),
            geoId,
            stats: {
              houses: 0, // not in this dataset
              apartments: 0, // not in this dataset
              estimatedPopulation: Number.isFinite(population) ? population : 0,
            },
          },
          { upsert: true, new: true }
        );
      }

      console.log("✅ Import complete");
      process.exit(0);
    });
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
