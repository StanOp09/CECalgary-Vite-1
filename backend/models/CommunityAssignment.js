import mongoose from "mongoose";

// Existing: weekReached (optional to keep)
const weekReachedSchema = new mongoose.Schema(
  {
    1: { type: Number, default: 0 },
    2: { type: Number, default: 0 },
    3: { type: Number, default: 0 },
    4: { type: Number, default: 0 },
    5: { type: Number, default: 0 },
    6: { type: Number, default: 0 },
    7: { type: Number, default: 0 },
    8: { type: Number, default: 0 },
    9: { type: Number, default: 0 },
    10: { type: Number, default: 0 },
    11: { type: Number, default: 0 },
    12: { type: Number, default: 0 },
  },
  { _id: false }
);

// NEW: per-week scoreboard report
const weeklyReportSchema = new mongoose.Schema(
  {
    netGrowthPeople: { type: Number, default: 0 }, // e.g. +2, +3...
    retentionPercent: { type: Number, default: 0 }, // 0–100
    guestReturnees: { type: Number, default: 0 }, // 0,1,2,3...
    reportingStatus: {
      type: String,
      enum: ["on-time", "late", "none"],
      default: "none",
    },
  },
  { _id: false }
);

// NEW: week 1..12 -> weeklyReport
const weeklyReportsSchema = new mongoose.Schema(
  {
    1: { type: weeklyReportSchema, default: () => ({}) },
    2: { type: weeklyReportSchema, default: () => ({}) },
    3: { type: weeklyReportSchema, default: () => ({}) },
    4: { type: weeklyReportSchema, default: () => ({}) },
    5: { type: weeklyReportSchema, default: () => ({}) },
    6: { type: weeklyReportSchema, default: () => ({}) },
    7: { type: weeklyReportSchema, default: () => ({}) },
    8: { type: weeklyReportSchema, default: () => ({}) },
    9: { type: weeklyReportSchema, default: () => ({}) },
    10: { type: weeklyReportSchema, default: () => ({}) },
    11: { type: weeklyReportSchema, default: () => ({}) },
    12: { type: weeklyReportSchema, default: () => ({}) },
  },
  { _id: false }
);

const communityAssignmentSchema = new mongoose.Schema(
  {
    communityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
      required: true,
      unique: true,
    },

    // persists for the community
    pcfLeaderName: { type: String, default: "" },
    cellLeaderName: { type: String, default: "" },
    housesCovered: { type: Number, default: 0 },

    targetTotalPeople: { type: Number, default: 24 },

    // keep if you still want the “2 per week” tracking
    weekReached: { type: weekReachedSchema, default: () => ({}) },

    // NEW scoreboard per week
    weeklyReports: { type: weeklyReportsSchema, default: () => ({}) },
  },
  { timestamps: true }
);

export default mongoose.model("CommunityAssignment", communityAssignmentSchema);
