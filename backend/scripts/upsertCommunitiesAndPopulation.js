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
  await new Promise((resolve, reject) => {
    fs.createReadStream(FILE)
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", resolve)
      .on("error", reject);
  });

  console.log(`Rows read: ${rows.length}`);

  const ops = rows
    .filter((row) => row["COMMUNITY_NAME"])
    .map((row) => {
      const displayName = String(row["COMMUNITY_NAME"]).trim();
      const geoId = norm(displayName);

      const popRaw = row["TOTAL_POP_HOUSEHOLD"];
      const population = Number.isFinite(Number(popRaw)) ? Number(popRaw) : 0;

      return {
        updateOne: {
          filter: { geoId },
          update: {
            $setOnInsert: {
              geoId,
              // name only on insert, but NEVER set it elsewhere in this update
              name: displayName,
              sector: "",
              "stats.houses": 0,
              "stats.apartments": 0,
            },
            $set: {
              "stats.estimatedPopulation": population,
            },
          },
          upsert: true,
        },
      };
    });

  console.log(`Prepared ops: ${ops.length}`);

  const res = await Community.bulkWrite(ops, { ordered: false });

  console.log("✅ Done");
  console.log({
    matched: res.matchedCount,
    modified: res.modifiedCount,
    upserted: res.upsertedCount,
  });

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
