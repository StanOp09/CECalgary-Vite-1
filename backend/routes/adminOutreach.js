import { Router } from "express";
import { requireAdmin } from "../middleware/requireAdmin.js";
import Community from "../models/Community.js";
import CommunityAssignment from "../models/CommunityAssignment.js";

const router = Router();

router.get("/admin/communities", requireAdmin("outreach-admin"), async (req, res) => {
  try {
    const communities = await Community.find().sort({ name: 1 }).lean();
    res.json(communities);
  } catch (err) {
    console.error("Communities fetch error:", err);
    res.status(500).json({ error: "Failed to load communities" });
  }
});

router.get("/admin/community-assignments", requireAdmin("outreach-admin"), async (req, res) => {
  try {
    const assignments = await CommunityAssignment.find().lean();
    res.json(assignments);
  } catch (err) {
    console.error("Assignments fetch error:", err);
    res.status(500).json({ error: "Failed to load assignments" });
  }
});

router.put(
  "/admin/community-assignments/:communityId",
  requireAdmin("outreach-admin"),
  async (req, res) => {
    try {
      const { communityId } = req.params;

      const exists = await Community.exists({ _id: communityId });
      if (!exists) return res.status(404).json({ error: "Community not found" });

      const patch = req.body || {};

      if (patch.weekReached && typeof patch.weekReached === "object") {
        for (const [k, v] of Object.entries(patch.weekReached)) {
          const weekNum = Number(k);
          if (weekNum >= 1 && weekNum <= 12) {
            const n = Number(v);
            patch.weekReached[k] = Number.isFinite(n) && n >= 0 ? Math.trunc(n) : 0;
          } else {
            delete patch.weekReached[k];
          }
        }
      }

      if (patch.weeklyReports && typeof patch.weeklyReports === "object") {
        const clean = {};

        for (const [weekKey, report] of Object.entries(patch.weeklyReports)) {
          const weekNum = Number(weekKey);
          if (!(weekNum >= 1 && weekNum <= 12)) continue;
          if (!report || typeof report !== "object") continue;

          const netGrowthPeople = Math.max(0, Math.trunc(Number(report.netGrowthPeople || 0)));

          let retentionPercent = Number(report.retentionPercent || 0);
          if (!Number.isFinite(retentionPercent)) retentionPercent = 0;
          retentionPercent = Math.max(0, Math.min(100, Math.trunc(retentionPercent)));

          const guestReturnees = Math.max(0, Math.trunc(Number(report.guestReturnees || 0)));

          const allowedStatuses = new Set(["on-time", "late", "none"]);
          const reportingStatus = allowedStatuses.has(report.reportingStatus)
            ? report.reportingStatus
            : "none";

          clean[String(weekNum)] = { netGrowthPeople, retentionPercent, guestReturnees, reportingStatus };
        }

        patch.weeklyReports = clean;
      }

      if (typeof patch.pcfLeaderName === "string")
        patch.pcfLeaderName = patch.pcfLeaderName.trim();
      if (typeof patch.cellLeaderName === "string")
        patch.cellLeaderName = patch.cellLeaderName.trim();

      if (patch.housesCovered != null) {
        const n = Number(patch.housesCovered);
        patch.housesCovered = Number.isFinite(n) && n >= 0 ? Math.trunc(n) : 0;
      }

      if (patch.targetTotalPeople != null) {
        const n = Number(patch.targetTotalPeople);
        patch.targetTotalPeople = Number.isFinite(n) && n > 0 ? Math.trunc(n) : 24;
      }

      const updated = await CommunityAssignment.findOneAndUpdate(
        { communityId },
        { $set: patch, $setOnInsert: { communityId } },
        { upsert: true, new: true },
      ).lean();

      res.json(updated);
    } catch (err) {
      console.error("Assignment upsert error:", err);
      res.status(500).json({ error: "Failed to save assignment" });
    }
  },
);

export default router;
