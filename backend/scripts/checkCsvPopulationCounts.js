import fs from "fs";
import path from "path";
import csv from "csv-parser";

const FILE = path.resolve("data/2021_calgary_communities.csv");

function toNumber(raw) {
  const s = String(raw ?? "").trim();
  if (!s) return null;
  const cleaned = s.replace(/,/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

let rows = 0;
let gt0 = 0;
let eq0 = 0;
let nonNumeric = 0;

fs.createReadStream(FILE)
  .pipe(csv())
  .on("data", (row) => {
    rows++;
    const n = toNumber(row["TOTAL_POP_HOUSEHOLD"]);
    if (n === null) nonNumeric++;
    else if (n > 0) gt0++;
    else eq0++;
  })
  .on("end", () => {
    console.log({ rows, gt0, eq0, nonNumeric });
  });
