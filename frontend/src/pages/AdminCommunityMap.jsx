// import { useEffect, useMemo, useState } from "react";
// import { MapContainer, GeoJSON } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// const [draft, setDraft] = useState(null);
// const [isDirty, setIsDirty] = useState(false);
// const [isSaving, setIsSaving] = useState(false);

// // --- helpers ---
// const TARGET_TOTAL = 24;
// const NO_RESIDENTS_FILL = "#9ca3af";

// function netGrowthPoints(netGrowthPeople) {
//   const n = Number(netGrowthPeople || 0);
//   if (n >= 5) return 40;
//   if (n >= 3) return 30;
//   if (n >= 2) return 20;
//   return 0;
// }

// function retentionPoints(retentionPercent) {
//   const p = Number(retentionPercent || 0);
//   if (p >= 80) return 25;
//   if (p >= 70) return 20;
//   if (p >= 60) return 15;
//   if (p >= 50) return 10;
//   return 0;
// }

// function guestConversionPoints(guestReturnees) {
//   const n = Number(guestReturnees || 0);
//   if (n >= 3) return 20;
//   if (n >= 1) return 10; // 1–2
//   return 0;
// }

// function reportingPoints(reportingStatus) {
//   if (reportingStatus === "on-time") return 15;
//   if (reportingStatus === "late") return 10; // you can tune to 5–10
//   return 0; // "none"
// }

// function totalScore(report) {
//   const r = report || {};
//   return (
//     netGrowthPoints(r.netGrowthPeople) +
//     retentionPoints(r.retentionPercent) +
//     guestConversionPoints(r.guestReturnees) +
//     reportingPoints(r.reportingStatus)
//   );
// }

// function statusFromScore(score) {
//   if (score >= 85)
//     return { label: "Excellent", colorClass: "bg-green-600 text-white" };
//   if (score >= 65)
//     return { label: "Recovering", colorClass: "bg-yellow-400 text-black" };
//   return { label: "PFCC intervention", colorClass: "bg-red-600 text-white" };
// }

// function norm(s) {
//   return String(s || "")
//     .trim()
//     .toUpperCase();
// }

// function sumWeeks(weekReached) {
//   if (!weekReached) return 0;
//   let total = 0;
//   for (let i = 1; i <= 12; i++) total += Number(weekReached[String(i)] || 0);
//   return total;
// }

// function getWeekCellClass(v) {
//   const n = Number(v || 0);
//   if (n === 2) return "bg-green-500 text-white";
//   if (n === 1) return "bg-yellow-400 text-black";
//   return "bg-red-500 text-white";
// }

// function getMapFillColor(percent) {
//   if (percent >= 80) return "#16a34a";
//   if (percent >= 60) return "#facc15";
//   if (percent >= 50) return "#3b82f6";
//   return "#ef4444";
// }

// function clampInt(v, min, max) {
//   const n = Number(v);
//   if (Number.isNaN(n)) return min;
//   return Math.max(min, Math.min(max, Math.trunc(n)));
// }

// // --- page ---
// export default function AdminCommunityMap() {
//   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//   const [geojson, setGeojson] = useState(null);

//   // communities: [{ _id, name, geoId, stats }]
//   const [communities, setCommunities] = useState([]);

//   // assignments keyed by communityId
//   const [assignments, setAssignments] = useState({});

//   // store normalized key for hover (prevents mismatch)
//   const [hoveredKey, setHoveredKey] = useState(null);

//   const [selectedCommunityId, setSelectedCommunityId] = useState(null);
//   const [selectedWeek, setSelectedWeek] = useState("1");

//   // Map geoId -> community (normalized)
//   const communityByGeoId = useMemo(() => {
//     const map = {};
//     for (const c of Array.isArray(communities) ? communities : []) {
//       map[norm(c.geoId)] = c;
//     }
//     return map;
//   }, [communities]);

//   const selectedCommunity = useMemo(() => {
//     const list = Array.isArray(communities) ? communities : [];
//     return list.find((c) => c._id === selectedCommunityId) || null;
//   }, [communities, selectedCommunityId]);

//   const selectedAssignment = useMemo(() => {
//     if (!selectedCommunityId) return null;
//     return assignments[selectedCommunityId] || null;
//   }, [assignments, selectedCommunityId]);

//   const weekReport = selectedAssignment?.weeklyReports?.[selectedWeek] || {
//     netGrowthPeople: 0,
//     retentionPercent: 0,
//     guestReturnees: 0,
//     reportingStatus: "none",
//   };

//   useEffect(() => {
//     if (!selectedCommunityId) {
//       setDraft(null);
//       setIsDirty(false);
//       return;
//     }

//     const a = assignments[selectedCommunityId] || {};

//     const report = a?.weeklyReports?.[selectedWeek] || {
//       netGrowthPeople: 0,
//       retentionPercent: 0,
//       guestReturnees: 0,
//       reportingStatus: "none",
//     };

//     setDraft({
//       // persistent fields
//       pcfLeaderName: a.pcfLeaderName || "",
//       cellLeaderName: a.cellLeaderName || "",
//       housesCovered: a.housesCovered || 0,
//       targetTotalPeople: a.targetTotalPeople ?? TARGET_TOTAL,

//       // optional legacy weekly reached
//       weekReachedValue: Number(a?.weekReached?.[selectedWeek] || 0),

//       // per-week report
//       weeklyReport: { ...report },
//     });

//     setIsDirty(false);
//   }, [selectedCommunityId, selectedWeek, assignments]);

//   const score = totalScore(weekReport);
//   const status = statusFromScore(score);

//   // Load GeoJSON (place in /public/geo/calgary-communities.geojson)
//   useEffect(() => {
//     fetch("/geo/calgary-communities.geojson")
//       .then((r) => r.json())
//       .then((data) => setGeojson(data))
//       .catch((err) => {
//         console.error("Failed to load GeoJSON:", err);
//       });
//   }, []);

//   // Load DB data
//   useEffect(() => {
//     async function load() {
//       const token = localStorage.getItem("adminToken");
//       if (!token) throw new Error("Missing admin token");

//       // --- communities ---
//       const cRes = await fetch(`${BACKEND_URL}/admin/communities`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const cJson = await cRes.json().catch(() => ({}));
//       if (!cRes.ok)
//         throw new Error(cJson?.error || "Failed to load communities");

//       const cArray = Array.isArray(cJson) ? cJson : cJson.communities;
//       if (!Array.isArray(cArray)) {
//         console.error("Unexpected communities response:", cJson);
//         throw new Error("Communities response is not an array");
//       }
//       setCommunities(cArray);

//       // --- assignments ---
//       const aRes = await fetch(`${BACKEND_URL}/admin/community-assignments`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const aJson = await aRes.json().catch(() => ({}));
//       if (!aRes.ok)
//         throw new Error(aJson?.error || "Failed to load assignments");

//       const aArray = Array.isArray(aJson) ? aJson : aJson.assignments;
//       if (!Array.isArray(aArray)) {
//         console.error("Unexpected assignments response:", aJson);
//         throw new Error("Assignments response is not an array");
//       }

//       const map = {};
//       for (const a of aArray) map[a.communityId] = a;
//       setAssignments(map);
//     }

//     if (BACKEND_URL) load().catch((err) => console.error(err));
//   }, [BACKEND_URL]);

//   function getFeatureGeoId(feature) {
//     return (
//       feature?.properties?.COMMUNITY_NAME ||
//       feature?.properties?.COMM_NAME ||
//       feature?.properties?.name ||
//       feature?.id ||
//       ""
//     );
//   }

//   // Style polygons based on assignment progress
//   const geoJsonStyle = (feature) => {
//     const geoId = getFeatureGeoId(feature);
//     const key = norm(geoId);

//     const community = communityByGeoId[key];

//     const population = Number(community?.stats?.estimatedPopulation || 0);
//     const noResidents = population === 0;

//     const assignment = community ? assignments[community._id] : null;
//     const totalReached = assignment ? sumWeeks(assignment.weekReached) : 0;
//     const percent = TARGET_TOTAL ? (totalReached / TARGET_TOTAL) * 100 : 0;

//     const isHovered = hoveredKey && key === hoveredKey;

//     return {
//       weight: isHovered ? 3 : 2,
//       color: "#111827",
//       fillOpacity: noResidents ? 0.55 : 0.85,
//       fillColor: noResidents ? NO_RESIDENTS_FILL : getMapFillColor(percent),
//     };
//   };

//   const onEachFeature = (feature, layer) => {
//     const geoId = getFeatureGeoId(feature);
//     const key = norm(geoId);

//     layer.on({
//       mouseover: () => setHoveredKey(key),
//       mouseout: () => setHoveredKey(null),
//       click: () => {
//         if (!communities.length) {
//           alert("Communities still loading—try again in a second.");
//           return;
//         }

//         const community = communityByGeoId[key];
//         if (community) {
//           setSelectedCommunityId(community._id);
//         } else {
//           console.warn("No DB community match for:", { geoId, key });
//           alert(`Clicked ${geoId} but no matching Community.geoId in DB yet.`);
//         }
//       },
//     });

//     // Tooltip
//     const community = communityByGeoId[key];
//     if (community) {
//       const s = community.stats || {};

//       const pop = community.stats?.estimatedPopulation ?? "-";
//       const popLabel = Number(pop) === 0 ? "No residents (census)" : pop;

//       layer.bindTooltip(
//         `
//         <div style="font-size:12px">
//           <div style="font-weight:700">${community.name}</div>

//           <div>Population: ${popLabel}</div>
//         </div>
//         `,
//         { sticky: true }
//       );
//     }
//   };

//   async function saveAssignmentPatch(communityId, patch) {
//     const token = localStorage.getItem("adminToken");

//     // optimistic update
//     setAssignments((prev) => ({
//       ...prev,
//       [communityId]: { ...(prev[communityId] || { communityId }), ...patch },
//     }));

//     const res = await fetch(
//       `${BACKEND_URL}/admin/community-assignments/${communityId}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(patch),
//       }
//     );

//     const data = await res.json().catch(() => ({}));

//     if (!res.ok) {
//       console.error("Save failed:", data);
//       alert(data?.error || "Failed to save assignment");
//       return;
//     }

//     // replace optimistic state with server truth
//     setAssignments((prev) => ({
//       ...prev,
//       [communityId]: data,
//     }));
//   }

//   function weekValue() {
//     if (!selectedAssignment?.weekReached) return 0;
//     return Number(selectedAssignment.weekReached[selectedWeek] || 0);
//   }

//   const totalReached = selectedAssignment
//     ? sumWeeks(selectedAssignment.weekReached)
//     : 0;

//   const percent = (totalReached / TARGET_TOTAL) * 100;

//   const populatedCommunities = useMemo(() => {
//     return (Array.isArray(communities) ? communities : [])
//       .filter((c) => Number(c?.stats?.estimatedPopulation || 0) > 0)
//       .sort((a, b) => a.name.localeCompare(b.name));
//   }, [communities]);

//   async function saveDraft() {
//     if (!selectedCommunityId || !draft) return;

//     const token = localStorage.getItem("adminToken");
//     setIsSaving(true);

//     // Build the patch payload for this community
//     const patch = {
//       pcfLeaderName: draft.pcfLeaderName,
//       cellLeaderName: draft.cellLeaderName,
//       housesCovered: clampInt(draft.housesCovered, 0, 1_000_000),
//       targetTotalPeople: clampInt(draft.targetTotalPeople, 1, 1_000_000),

//       weeklyReports: {
//         ...(selectedAssignment?.weeklyReports || {}),
//         [selectedWeek]: {
//           netGrowthPeople: clampInt(draft.weeklyReport.netGrowthPeople, 0, 999),
//           retentionPercent: clampInt(
//             draft.weeklyReport.retentionPercent,
//             0,
//             100
//           ),
//           guestReturnees: clampInt(draft.weeklyReport.guestReturnees, 0, 999),
//           reportingStatus: draft.weeklyReport.reportingStatus || "none",
//         },
//       },

//       // optional legacy field
//       weekReached: {
//         ...(selectedAssignment?.weekReached || {}),
//         [selectedWeek]: clampInt(draft.weekReachedValue, 0, 1000),
//       },
//     };

//     try {
//       const res = await fetch(
//         `${BACKEND_URL}/admin/community-assignments/${selectedCommunityId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(patch),
//         }
//       );

//       const data = await res.json().catch(() => ({}));
//       if (!res.ok) throw new Error(data?.error || "Save failed");

//       // Update local assignments cache with server truth
//       setAssignments((prev) => ({ ...prev, [selectedCommunityId]: data }));
//       setIsDirty(false);
//     } catch (err) {
//       alert(err.message || "Failed to save");
//     } finally {
//       setIsSaving(false);
//     }
//   }

//   return (
//     <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_420px] mb-24">
//       {/* MAP */}
//       <div className="h-[calc(100vh-0px)]">
//         <MapContainer
//           center={[51.0447, -114.0719]}
//           zoom={11}
//           className="h-full w-full"
//         >
//           {/* No TileLayer => clean block map */}
//           {geojson && (
//             <GeoJSON
//               data={geojson}
//               style={geoJsonStyle}
//               onEachFeature={onEachFeature}
//             />
//           )}
//         </MapContainer>
//       </div>

//       {/* DETAILS PANEL */}
//       <div className="border-l bg-white p-4 overflow-auto">
//         <div className="border-l bg-white p-4 overflow-auto space-y-4">
//           {/* ALWAYS VISIBLE: Week + Community dropdowns */}
//           <div className="rounded border p-3 space-y-3">
//             <label className="block text-sm">
//               Week
//               <select
//                 className="mt-1 w-full border rounded p-2"
//                 value={selectedWeek}
//                 onChange={(e) => setSelectedWeek(e.target.value)}
//               >
//                 {Array.from({ length: 12 }).map((_, i) => (
//                   <option key={i + 1} value={String(i + 1)}>
//                     Week {i + 1}
//                   </option>
//                 ))}
//               </select>
//             </label>

//             <label className="block text-sm">
//               Community (population &gt; 0)
//               <select
//                 className="mt-1 w-full border rounded p-2"
//                 value={selectedCommunityId || ""}
//                 onChange={(e) => setSelectedCommunityId(e.target.value || null)}
//               >
//                 <option value="">Select a community…</option>
//                 {populatedCommunities.map((c) => (
//                   <option key={c._id} value={c._id}>
//                     {c.name} ({c.stats?.estimatedPopulation ?? 0})
//                   </option>
//                 ))}
//               </select>
//             </label>
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={saveDraft}
//               disabled={!isDirty || isSaving}
//               className={`px-4 py-2 rounded font-semibold ${
//                 !isDirty || isSaving
//                   ? "bg-gray-200 text-gray-500"
//                   : "bg-indigo-600 text-white hover:bg-indigo-700"
//               }`}
//             >
//               {isSaving ? "Saving..." : "Save"}
//             </button>

//             {isDirty && !isSaving && (
//               <span className="text-sm text-orange-600">Unsaved changes</span>
//             )}
//           </div>

//           {/* If nothing selected yet */}
//           {!selectedCommunity ? (
//             <div className="text-gray-600">
//               Select a community from the dropdown (or click one on the map).
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {/* Header */}
//               <div>
//                 <h2 className="text-xl font-bold">{selectedCommunity.name}</h2>
//               </div>

//               {/* Community stats */}
//               <div className="rounded border p-3">
//                 <h3 className="font-semibold mb-2">Community Stats</h3>
//                 <div className="text-sm grid grid-cols-2 gap-2">
//                   <div>Estimated Population</div>
//                   <div className="font-medium">
//                     {selectedCommunity.stats?.estimatedPopulation ?? "-"}
//                   </div>
//                 </div>
//               </div>

//               {/* Leader details (persist) */}
//               <div className="rounded border p-3 space-y-3">
//                 <h3 className="font-semibold">Cell Leader Details</h3>

//                 <label className="block text-sm">
//                   PCF Leader Name
//                   <input
//                     className="mt-1 w-full border rounded p-2"
//                     value={selectedAssignment?.pcfLeaderName || ""}
//                     onChange={(e) =>
//                       saveAssignmentPatch(selectedCommunityId, {
//                         pcfLeaderName: e.target.value,
//                       })
//                     }
//                   />
//                 </label>

//                 <label className="block text-sm">
//                   Cell Leader Name
//                   <input
//                     className="mt-1 w-full border rounded p-2"
//                     value={selectedAssignment?.cellLeaderName || ""}
//                     onChange={(e) =>
//                       saveAssignmentPatch(selectedCommunityId, {
//                         cellLeaderName: e.target.value,
//                       })
//                     }
//                   />
//                 </label>

//                 <label className="block text-sm">
//                   Houses Covered
//                   <input
//                     type="number"
//                     className="mt-1 w-full border rounded p-2"
//                     value={selectedAssignment?.housesCovered || 0}
//                     onChange={(e) =>
//                       saveAssignmentPatch(selectedCommunityId, {
//                         housesCovered: clampInt(e.target.value, 0, 1_000_000),
//                       })
//                     }
//                   />
//                 </label>

//                 <label className="block text-sm">
//                   Target Total People (default 24)
//                   <input
//                     type="number"
//                     className="mt-1 w-full border rounded p-2"
//                     value={
//                       selectedAssignment?.targetTotalPeople ?? TARGET_TOTAL
//                     }
//                     onChange={(e) =>
//                       saveAssignmentPatch(selectedCommunityId, {
//                         targetTotalPeople: clampInt(
//                           e.target.value,
//                           1,
//                           1_000_000
//                         ),
//                       })
//                     }
//                   />
//                 </label>
//               </div>

//               {/* Scoring Board (per selectedWeek) */}
//               <div className="rounded border p-3 space-y-3">
//                 <div className="flex items-center gap-2">
//                   <h3 className="font-semibold">Scoring Board</h3>
//                   <div
//                     className={`ml-auto px-3 py-1 rounded font-semibold ${status.colorClass}`}
//                   >
//                     {score} pts — {status.label}
//                   </div>
//                 </div>

//                 <label className="block text-sm">
//                   Net Growth (new people)
//                   <input
//                     type="number"
//                     className="mt-1 w-full border rounded p-2"
//                     value={weekReport.netGrowthPeople}
//                     onChange={(e) => {
//                       const val = clampInt(e.target.value, 0, 999);
//                       saveAssignmentPatch(selectedCommunityId, {
//                         weeklyReports: {
//                           ...(selectedAssignment?.weeklyReports || {}),
//                           [selectedWeek]: {
//                             ...weekReport,
//                             netGrowthPeople: val,
//                           },
//                         },
//                       });
//                     }}
//                   />
//                   <div className="text-xs text-gray-500 mt-1">
//                     2=20pts, 3–4=30pts, 5+=40pts
//                   </div>
//                 </label>

//                 <label className="block text-sm">
//                   Retention (%)
//                   <input
//                     type="number"
//                     className="mt-1 w-full border rounded p-2"
//                     value={weekReport.retentionPercent}
//                     onChange={(e) => {
//                       const val = clampInt(e.target.value, 0, 100);
//                       saveAssignmentPatch(selectedCommunityId, {
//                         weeklyReports: {
//                           ...(selectedAssignment?.weeklyReports || {}),
//                           [selectedWeek]: {
//                             ...weekReport,
//                             retentionPercent: val,
//                           },
//                         },
//                       });
//                     }}
//                   />
//                   <div className="text-xs text-gray-500 mt-1">
//                     50–59=10, 60–69=15, 70–79=20, 80%+=25
//                   </div>
//                 </label>

//                 <label className="block text-sm">
//                   Guest Conversion (returnees)
//                   <input
//                     type="number"
//                     className="mt-1 w-full border rounded p-2"
//                     value={weekReport.guestReturnees}
//                     onChange={(e) => {
//                       const val = clampInt(e.target.value, 0, 999);
//                       saveAssignmentPatch(selectedCommunityId, {
//                         weeklyReports: {
//                           ...(selectedAssignment?.weeklyReports || {}),
//                           [selectedWeek]: {
//                             ...weekReport,
//                             guestReturnees: val,
//                           },
//                         },
//                       });
//                     }}
//                   />
//                   <div className="text-xs text-gray-500 mt-1">
//                     0=0, 1–2=10, 3+=20
//                   </div>
//                 </label>

//                 <label className="block text-sm">
//                   Reporting
//                   <select
//                     className="mt-1 w-full border rounded p-2"
//                     value={weekReport.reportingStatus}
//                     onChange={(e) => {
//                       saveAssignmentPatch(selectedCommunityId, {
//                         weeklyReports: {
//                           ...(selectedAssignment?.weeklyReports || {}),
//                           [selectedWeek]: {
//                             ...weekReport,
//                             reportingStatus: e.target.value,
//                           },
//                         },
//                       });
//                     }}
//                   >
//                     <option value="on-time">On time & accurate (15 pts)</option>
//                     <option value="late">Late or incomplete (10 pts)</option>
//                     <option value="none">No report (0 pts)</option>
//                   </select>
//                 </label>
//               </div>

//               {/* Weekly People Reached (optional to keep) */}
//               <div className="rounded border p-3 space-y-3">
//                 <h3 className="font-semibold">Weekly People Reached</h3>

//                 <div className="flex items-center gap-2">
//                   <div
//                     className={`ml-auto px-3 py-2 rounded text-sm font-semibold ${getWeekCellClass(
//                       weekValue()
//                     )}`}
//                   >
//                     Week {selectedWeek}: {weekValue()}
//                   </div>
//                 </div>

//                 <label className="block text-sm">
//                   Total people reached in Week {selectedWeek} (target is 2)
//                   <input
//                     type="number"
//                     className="mt-1 w-full border rounded p-2"
//                     value={weekValue()}
//                     onChange={(e) => {
//                       const val = clampInt(e.target.value, 0, 1000);
//                       const current = selectedAssignment?.weekReached || {};
//                       saveAssignmentPatch(selectedCommunityId, {
//                         weekReached: { ...current, [selectedWeek]: val },
//                       });
//                     }}
//                   />
//                 </label>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useMemo, useState } from "react";
// import { MapContainer, GeoJSON } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// // --- constants ---
// const TARGET_TOTAL = 24;
// const NO_RESIDENTS_FILL = "#9ca3af";

// // --- helpers ---
// function netGrowthPoints(netGrowthPeople) {
//   const n = Number(netGrowthPeople || 0);
//   if (n >= 5) return 40;
//   if (n >= 3) return 30;
//   if (n >= 2) return 20;
//   return 0;
// }

// function retentionPoints(retentionPercent) {
//   const p = Number(retentionPercent || 0);
//   if (p >= 80) return 25;
//   if (p >= 70) return 20;
//   if (p >= 60) return 15;
//   if (p >= 50) return 10;
//   return 0;
// }

// function guestConversionPoints(guestReturnees) {
//   const n = Number(guestReturnees || 0);
//   if (n >= 3) return 20;
//   if (n >= 1) return 10;
//   return 0;
// }

// function reportingPoints(reportingStatus) {
//   if (reportingStatus === "on-time") return 15;
//   if (reportingStatus === "late") return 10;
//   return 0;
// }

// function totalScore(report) {
//   const r = report || {};
//   return (
//     netGrowthPoints(r.netGrowthPeople) +
//     retentionPoints(r.retentionPercent) +
//     guestConversionPoints(r.guestReturnees) +
//     reportingPoints(r.reportingStatus)
//   );
// }

// function statusFromScore(score) {
//   if (score >= 85)
//     return { label: "Excellent", colorClass: "bg-green-600 text-white" };
//   if (score >= 65)
//     return { label: "Recovering", colorClass: "bg-yellow-400 text-black" };
//   return { label: "PFCC intervention", colorClass: "bg-red-600 text-white" };
// }

// function norm(s) {
//   return String(s || "")
//     .trim()
//     .toUpperCase();
// }

// function sumWeeks(weekReached) {
//   if (!weekReached) return 0;
//   let total = 0;
//   for (let i = 1; i <= 12; i++) total += Number(weekReached[String(i)] || 0);
//   return total;
// }

// function getWeekCellClass(v) {
//   const n = Number(v || 0);
//   if (n >= 2) return "bg-green-500 text-white";
//   if (n === 1) return "bg-yellow-400 text-black";
//   return "bg-red-500 text-white";
// }

// function getMapFillColor(percent) {
//   if (percent >= 80) return "#16a34a";
//   if (percent >= 60) return "#facc15";
//   if (percent >= 50) return "#3b82f6";
//   return "#ef4444";
// }

// function clampInt(v, min, max) {
//   const n = Number(v);
//   if (Number.isNaN(n)) return min;
//   return Math.max(min, Math.min(max, Math.trunc(n)));
// }

// function getFeatureGeoId(feature) {
//   return (
//     feature?.properties?.COMMUNITY_NAME ||
//     feature?.properties?.COMM_NAME ||
//     feature?.properties?.name ||
//     feature?.id ||
//     ""
//   );
// }

// export default function AdminCommunityMap() {
//   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//   const [geojson, setGeojson] = useState(null);
//   const [communities, setCommunities] = useState([]);
//   const [assignments, setAssignments] = useState({});

//   const [hoveredKey, setHoveredKey] = useState(null);
//   const [selectedCommunityId, setSelectedCommunityId] = useState(null);
//   const [selectedWeek, setSelectedWeek] = useState("1");

//   // ✅ draft state (must be inside component)
//   const [draft, setDraft] = useState(null);
//   const [isDirty, setIsDirty] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);

//   const communityByGeoId = useMemo(() => {
//     const map = {};
//     for (const c of Array.isArray(communities) ? communities : []) {
//       map[norm(c.geoId)] = c;
//     }
//     return map;
//   }, [communities]);

//   const selectedCommunity = useMemo(() => {
//     const list = Array.isArray(communities) ? communities : [];
//     return list.find((c) => c._id === selectedCommunityId) || null;
//   }, [communities, selectedCommunityId]);

//   const selectedAssignment = useMemo(() => {
//     if (!selectedCommunityId) return null;
//     return assignments[selectedCommunityId] || null;
//   }, [assignments, selectedCommunityId]);

//   const populatedCommunities = useMemo(() => {
//     return (Array.isArray(communities) ? communities : [])
//       .filter((c) => Number(c?.stats?.estimatedPopulation || 0) > 0)
//       .sort((a, b) => a.name.localeCompare(b.name));
//   }, [communities]);

//   // ✅ Load GeoJSON
//   useEffect(() => {
//     fetch("/geo/calgary-communities.geojson")
//       .then((r) => r.json())
//       .then(setGeojson)
//       .catch((err) => console.error("Failed to load GeoJSON:", err));
//   }, []);

//   // ✅ Load DB data
//   useEffect(() => {
//     async function load() {
//       const token = localStorage.getItem("adminToken");
//       if (!token) throw new Error("Missing admin token");

//       const cRes = await fetch(`${BACKEND_URL}/admin/communities`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const cJson = await cRes.json().catch(() => ({}));
//       if (!cRes.ok)
//         throw new Error(cJson?.error || "Failed to load communities");
//       setCommunities(Array.isArray(cJson) ? cJson : cJson.communities || []);

//       const aRes = await fetch(`${BACKEND_URL}/admin/community-assignments`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const aJson = await aRes.json().catch(() => ({}));
//       if (!aRes.ok)
//         throw new Error(aJson?.error || "Failed to load assignments");

//       const aArray = Array.isArray(aJson) ? aJson : aJson.assignments;
//       const map = {};
//       for (const a of Array.isArray(aArray) ? aArray : [])
//         map[a.communityId] = a;
//       setAssignments(map);
//     }

//     if (BACKEND_URL) load().catch(console.error);
//   }, [BACKEND_URL]);

//   // ✅ Initialize draft when community/week changes
//   useEffect(() => {
//     if (!selectedCommunityId) {
//       setDraft(null);
//       setIsDirty(false);
//       return;
//     }

//     const a = assignments[selectedCommunityId] || {};
//     const report = a?.weeklyReports?.[selectedWeek] || {
//       netGrowthPeople: 0,
//       retentionPercent: 0,
//       guestReturnees: 0,
//       reportingStatus: "none",
//     };

//     setDraft({
//       pcfLeaderName: a.pcfLeaderName || "",
//       cellLeaderName: a.cellLeaderName || "",
//       housesCovered: a.housesCovered || 0,
//       targetTotalPeople: a.targetTotalPeople ?? TARGET_TOTAL,

//       weekReachedValue: Number(a?.weekReached?.[selectedWeek] || 0),

//       weeklyReport: { ...report },
//     });

//     setIsDirty(false);
//   }, [selectedCommunityId, selectedWeek, assignments]);

//   // ✅ score based on draft (live)
//   const score = totalScore(draft?.weeklyReport);
//   const status = statusFromScore(score);

//   // Map style
//   const geoJsonStyle = (feature) => {
//     const geoId = getFeatureGeoId(feature);
//     const key = norm(geoId);

//     const community = communityByGeoId[key];
//     const population = Number(community?.stats?.estimatedPopulation || 0);
//     const noResidents = population === 0;

//     const assignment = community ? assignments[community._id] : null;
//     const totalReached = assignment ? sumWeeks(assignment.weekReached) : 0;
//     const percent = TARGET_TOTAL ? (totalReached / TARGET_TOTAL) * 100 : 0;

//     const isHovered = hoveredKey && key === hoveredKey;

//     return {
//       weight: isHovered ? 3 : 2,
//       color: "#111827",
//       fillOpacity: noResidents ? 0.55 : 0.85,
//       fillColor: noResidents ? NO_RESIDENTS_FILL : getMapFillColor(percent),
//     };
//   };

//   const onEachFeature = (feature, layer) => {
//     const geoId = getFeatureGeoId(feature);
//     const key = norm(geoId);

//     layer.on({
//       mouseover: () => setHoveredKey(key),
//       mouseout: () => setHoveredKey(null),
//       click: () => {
//         const community = communityByGeoId[key];
//         if (community) setSelectedCommunityId(community._id);
//       },
//     });

//     const community = communityByGeoId[key];
//     if (community) {
//       const pop = community.stats?.estimatedPopulation ?? "-";
//       const popLabel = Number(pop) === 0 ? "No residents (census)" : pop;

//       layer.bindTooltip(
//         `
//         <div style="font-size:12px">
//           <div style="font-weight:700">${community.name}</div>
//           <div>Population: ${popLabel}</div>
//         </div>
//         `,
//         { sticky: true }
//       );
//     }
//   };

//   async function saveDraft() {
//     if (!selectedCommunityId || !draft) return;

//     const token = localStorage.getItem("adminToken");
//     setIsSaving(true);

//     const patch = {
//       pcfLeaderName: draft.pcfLeaderName,
//       cellLeaderName: draft.cellLeaderName,
//       housesCovered: clampInt(draft.housesCovered, 0, 1_000_000),
//       targetTotalPeople: clampInt(draft.targetTotalPeople, 1, 1_000_000),

//       weeklyReports: {
//         ...(selectedAssignment?.weeklyReports || {}),
//         [selectedWeek]: {
//           netGrowthPeople: clampInt(draft.weeklyReport.netGrowthPeople, 0, 999),
//           retentionPercent: clampInt(
//             draft.weeklyReport.retentionPercent,
//             0,
//             100
//           ),
//           guestReturnees: clampInt(draft.weeklyReport.guestReturnees, 0, 999),
//           reportingStatus: draft.weeklyReport.reportingStatus || "none",
//         },
//       },

//       weekReached: {
//         ...(selectedAssignment?.weekReached || {}),
//         [selectedWeek]: clampInt(draft.weekReachedValue, 0, 1000),
//       },
//     };

//     try {
//       const res = await fetch(
//         `${BACKEND_URL}/admin/community-assignments/${selectedCommunityId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(patch),
//         }
//       );

//       const data = await res.json().catch(() => ({}));
//       if (!res.ok) throw new Error(data?.error || "Save failed");

//       setAssignments((prev) => ({ ...prev, [selectedCommunityId]: data }));
//       setIsDirty(false);
//     } catch (err) {
//       alert(err.message || "Failed to save");
//     } finally {
//       setIsSaving(false);
//     }
//   }

//   return (
//     <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_420px] mb-24">
//       {/* LEFT: MAP + TABLE */}
// <div className="flex flex-col h-[calc(100vh-64px-80px)] overflow-hidden">
//   {/* MAP */}
//   <div className="flex-1 min-h-[320px]">
//     <MapContainer
//       center={[51.0447, -114.0719]}
//       zoom={11}
//       className="h-full w-full"
//     >
//       {geojson && (
//         <GeoJSON
//           data={geojson}
//           style={geoJsonStyle}
//           onEachFeature={onEachFeature}
//         />
//       )}
//     </MapContainer>
//   </div>

//   {/* TABLE */}
//   <div className="border-t bg-white overflow-auto max-h-[40vh]">
//     <CommunityTable
//       communities={populatedCommunities}
//       assignments={assignments}
//       selectedWeek={selectedWeek}
//       onSelectCommunity={(id) => setSelectedCommunityId(id)}
//     />
//   </div>
// </div>

//       </div>

//       {/* SIDEBAR */}
//       <div className="border-l bg-white p-4 overflow-auto space-y-4">
//         {/* Week + Community */}
//         <div className="rounded border p-3 space-y-3">
//           <label className="block text-sm">
//             Week
//             <select
//               className="mt-1 w-full border rounded p-2"
//               value={selectedWeek}
//               onChange={(e) => setSelectedWeek(e.target.value)}
//             >
//               {Array.from({ length: 12 }).map((_, i) => (
//                 <option key={i + 1} value={String(i + 1)}>
//                   Week {i + 1}
//                 </option>
//               ))}
//             </select>
//           </label>

//           <label className="block text-sm">
//             Community
//             <select
//               className="mt-1 w-full border rounded p-2"
//               value={selectedCommunityId || ""}
//               onChange={(e) => setSelectedCommunityId(e.target.value || null)}
//             >
//               <option value="">Select a community…</option>
//               {populatedCommunities.map((c) => (
//                 <option key={c._id} value={c._id}>
//                   {c.name} ({c.stats?.estimatedPopulation ?? 0})
//                 </option>
//               ))}
//             </select>
//           </label>
//         </div>

//         {/* Save row */}
//         <div className="flex items-center gap-2">
//           <button
//             onClick={saveDraft}
//             disabled={!isDirty || isSaving || !selectedCommunityId}
//             className={`px-4 py-2 rounded font-semibold ${
//               !isDirty || isSaving || !selectedCommunityId
//                 ? "bg-gray-200 text-gray-500"
//                 : "bg-indigo-600 text-white hover:bg-indigo-700"
//             }`}
//           >
//             {isSaving ? "Saving..." : "Save"}
//           </button>

//           {isDirty && !isSaving && (
//             <span className="text-sm text-orange-600">Unsaved changes</span>
//           )}
//         </div>

//         {!selectedCommunity ? (
//           <div className="text-gray-600">
//             Select a community from the dropdown (or click one on the map).
//           </div>
//         ) : (
//           <>
//             <div>
//               <h2 className="text-xl font-bold">{selectedCommunity.name}</h2>
//             </div>

//             <div className="rounded border p-3">
//               <h3 className="font-semibold mb-2">Community Stats</h3>
//               <div className="text-sm grid grid-cols-2 gap-2">
//                 <div>Estimated Population</div>
//                 <div className="font-medium">
//                   {selectedCommunity.stats?.estimatedPopulation ?? "-"}
//                 </div>
//               </div>
//             </div>

//             {/* Leader details */}
//             <div className="rounded border p-3 space-y-3">
//               <h3 className="font-semibold">Cell Leader Details</h3>

//               <label className="block text-sm">
//                 PCF Leader Name
//                 <input
//                   className="mt-1 w-full border rounded p-2"
//                   value={draft?.pcfLeaderName ?? ""}
//                   onChange={(e) => {
//                     setDraft((d) => ({ ...d, pcfLeaderName: e.target.value }));
//                     setIsDirty(true);
//                   }}
//                 />
//               </label>

//               <label className="block text-sm">
//                 Cell Leader Name
//                 <input
//                   className="mt-1 w-full border rounded p-2"
//                   value={draft?.cellLeaderName ?? ""}
//                   onChange={(e) => {
//                     setDraft((d) => ({ ...d, cellLeaderName: e.target.value }));
//                     setIsDirty(true);
//                   }}
//                 />
//               </label>

//               <label className="block text-sm">
//                 Houses Covered
//                 <input
//                   type="number"
//                   className="mt-1 w-full border rounded p-2"
//                   value={draft?.housesCovered ?? 0}
//                   onChange={(e) => {
//                     const val = clampInt(e.target.value, 0, 1_000_000);
//                     setDraft((d) => ({ ...d, housesCovered: val }));
//                     setIsDirty(true);
//                   }}
//                 />
//               </label>

//               <label className="block text-sm">
//                 Target Total People (default 24)
//                 <input
//                   type="number"
//                   className="mt-1 w-full border rounded p-2"
//                   value={draft?.targetTotalPeople ?? TARGET_TOTAL}
//                   onChange={(e) => {
//                     const val = clampInt(e.target.value, 1, 1_000_000);
//                     setDraft((d) => ({ ...d, targetTotalPeople: val }));
//                     setIsDirty(true);
//                   }}
//                 />
//               </label>
//             </div>

//             {/* Scoring board */}
//             <div className="rounded border p-3 space-y-3">
//               <div className="flex items-center gap-2">
//                 <h3 className="font-semibold">Scoring Board</h3>
//                 <div
//                   className={`ml-auto px-3 py-1 rounded font-semibold ${status.colorClass}`}
//                 >
//                   {score} pts — {status.label}
//                 </div>
//               </div>

//               <label className="block text-sm">
//                 Net Growth (new people)
//                 <input
//                   type="number"
//                   className="mt-1 w-full border rounded p-2"
//                   value={draft?.weeklyReport?.netGrowthPeople ?? 0}
//                   onChange={(e) => {
//                     const val = clampInt(e.target.value, 0, 999);
//                     setDraft((d) => ({
//                       ...d,
//                       weeklyReport: { ...d.weeklyReport, netGrowthPeople: val },
//                     }));
//                     setIsDirty(true);
//                   }}
//                 />
//               </label>

//               <label className="block text-sm">
//                 Retention (%)
//                 <input
//                   type="number"
//                   className="mt-1 w-full border rounded p-2"
//                   value={draft?.weeklyReport?.retentionPercent ?? 0}
//                   onChange={(e) => {
//                     const val = clampInt(e.target.value, 0, 100);
//                     setDraft((d) => ({
//                       ...d,
//                       weeklyReport: {
//                         ...d.weeklyReport,
//                         retentionPercent: val,
//                       },
//                     }));
//                     setIsDirty(true);
//                   }}
//                 />
//               </label>

//               <label className="block text-sm">
//                 Guest Conversion (returnees)
//                 <input
//                   type="number"
//                   className="mt-1 w-full border rounded p-2"
//                   value={draft?.weeklyReport?.guestReturnees ?? 0}
//                   onChange={(e) => {
//                     const val = clampInt(e.target.value, 0, 999);
//                     setDraft((d) => ({
//                       ...d,
//                       weeklyReport: { ...d.weeklyReport, guestReturnees: val },
//                     }));
//                     setIsDirty(true);
//                   }}
//                 />
//               </label>

//               <label className="block text-sm">
//                 Reporting
//                 <select
//                   className="mt-1 w-full border rounded p-2"
//                   value={draft?.weeklyReport?.reportingStatus ?? "none"}
//                   onChange={(e) => {
//                     setDraft((d) => ({
//                       ...d,
//                       weeklyReport: {
//                         ...d.weeklyReport,
//                         reportingStatus: e.target.value,
//                       },
//                     }));
//                     setIsDirty(true);
//                   }}
//                 >
//                   <option value="on-time">On time & accurate</option>
//                   <option value="late">Late or incomplete</option>
//                   <option value="none">No report</option>
//                 </select>
//               </label>
//             </div>

//             {/* Weekly reached (optional) */}
//             <div className="rounded border p-3 space-y-3">
//               <h3 className="font-semibold">Weekly People Reached</h3>

//               <div
//                 className={`inline-block px-3 py-2 rounded text-sm font-semibold ${getWeekCellClass(
//                   draft?.weekReachedValue ?? 0
//                 )}`}
//               >
//                 Week {selectedWeek}: {draft?.weekReachedValue ?? 0}
//               </div>

//               <label className="block text-sm">
//                 Total people reached in Week {selectedWeek} (target is 2)
//                 <input
//                   type="number"
//                   className="mt-1 w-full border rounded p-2"
//                   value={draft?.weekReachedValue ?? 0}
//                   onChange={(e) => {
//                     const val = clampInt(e.target.value, 0, 1000);
//                     setDraft((d) => ({ ...d, weekReachedValue: val }));
//                     setIsDirty(true);
//                   }}
//                 />
//               </label>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useEffect, useMemo, useState } from "react";
// import { MapContainer, GeoJSON } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// // --- constants ---
// const TARGET_TOTAL = 24;
// const NO_RESIDENTS_FILL = "#9ca3af";

// // --- scoring helpers ---
// function netGrowthPoints(netGrowthPeople) {
//   const n = Number(netGrowthPeople || 0);
//   if (n >= 5) return 40;
//   if (n >= 3) return 30;
//   if (n >= 2) return 20;
//   return 0;
// }

// function retentionPoints(retentionPercent) {
//   const p = Number(retentionPercent || 0);
//   if (p >= 80) return 25;
//   if (p >= 70) return 20;
//   if (p >= 60) return 15;
//   if (p >= 50) return 10;
//   return 0;
// }

// function guestConversionPoints(guestReturnees) {
//   const n = Number(guestReturnees || 0);
//   if (n >= 3) return 20;
//   if (n >= 1) return 10;
//   return 0;
// }

// function reportingPoints(reportingStatus) {
//   if (reportingStatus === "on-time") return 15;
//   if (reportingStatus === "late") return 10;
//   return 0;
// }

// function totalScore(report) {
//   const r = report || {};
//   return (
//     netGrowthPoints(r.netGrowthPeople) +
//     retentionPoints(r.retentionPercent) +
//     guestConversionPoints(r.guestReturnees) +
//     reportingPoints(r.reportingStatus)
//   );
// }

// function statusFromScore(score) {
//   if (score >= 85)
//     return { label: "Excellent", colorClass: "bg-green-600 text-white" };
//   if (score >= 65)
//     return { label: "Recovering", colorClass: "bg-yellow-400 text-black" };
//   return { label: "PFCC intervention", colorClass: "bg-red-600 text-white" };
// }

// // --- misc helpers ---
// function norm(s) {
//   return String(s || "")
//     .trim()
//     .toUpperCase();
// }

// function sumWeeks(weekReached) {
//   if (!weekReached) return 0;
//   let total = 0;
//   for (let i = 1; i <= 12; i++) total += Number(weekReached[String(i)] || 0);
//   return total;
// }

// // ✅ color for weekly reached cell (your rule)
// function getWeekCellClass(v) {
//   const n = Number(v || 0);
//   if (n >= 2) return "bg-green-500 text-white";
//   if (n === 1) return "bg-yellow-400 text-black";
//   return "bg-red-500 text-white";
// }

// function getMapFillColor(percent) {
//   if (percent >= 80) return "#16a34a";
//   if (percent >= 60) return "#facc15";
//   if (percent >= 50) return "#3b82f6";
//   return "#ef4444";
// }

// function clampInt(v, min, max) {
//   const n = Number(v);
//   if (Number.isNaN(n)) return min;
//   return Math.max(min, Math.min(max, Math.trunc(n)));
// }

// function getFeatureGeoId(feature) {
//   return (
//     feature?.properties?.COMMUNITY_NAME ||
//     feature?.properties?.COMM_NAME ||
//     feature?.properties?.name ||
//     feature?.id ||
//     ""
//   );
// }

// export default function AdminCommunityMap() {
//   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//   const [geojson, setGeojson] = useState(null);
//   const [communities, setCommunities] = useState([]);
//   const [assignments, setAssignments] = useState({});

//   const [hoveredKey, setHoveredKey] = useState(null);
//   const [selectedCommunityId, setSelectedCommunityId] = useState(null);
//   const [selectedWeek, setSelectedWeek] = useState("1");

//   // ✅ draft state (saved only when button pressed)
//   const [draft, setDraft] = useState(null);
//   const [isDirty, setIsDirty] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);

//   const communityByGeoId = useMemo(() => {
//     const map = {};
//     for (const c of Array.isArray(communities) ? communities : []) {
//       map[norm(c.geoId)] = c;
//     }
//     return map;
//   }, [communities]);

//   const populatedCommunities = useMemo(() => {
//     return (Array.isArray(communities) ? communities : [])
//       .filter((c) => Number(c?.stats?.estimatedPopulation || 0) > 0)
//       .sort((a, b) => a.name.localeCompare(b.name));
//   }, [communities]);

//   const selectedCommunity = useMemo(() => {
//     const list = Array.isArray(communities) ? communities : [];
//     return list.find((c) => c._id === selectedCommunityId) || null;
//   }, [communities, selectedCommunityId]);

//   const selectedAssignment = useMemo(() => {
//     if (!selectedCommunityId) return null;
//     return assignments[selectedCommunityId] || null;
//   }, [assignments, selectedCommunityId]);

//   // ✅ Load GeoJSON
//   useEffect(() => {
//     fetch("/geo/calgary-communities.geojson")
//       .then((r) => r.json())
//       .then(setGeojson)
//       .catch((err) => console.error("Failed to load GeoJSON:", err));
//   }, []);

//   // ✅ Load DB data
//   useEffect(() => {
//     async function load() {
//       const token = localStorage.getItem("adminToken");
//       if (!token) throw new Error("Missing admin token");

//       const cRes = await fetch(`${BACKEND_URL}/admin/communities`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const cJson = await cRes.json().catch(() => ({}));
//       if (!cRes.ok)
//         throw new Error(cJson?.error || "Failed to load communities");
//       const cArr = Array.isArray(cJson) ? cJson : cJson.communities || [];
//       setCommunities(cArr);

//       const aRes = await fetch(`${BACKEND_URL}/admin/community-assignments`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const aJson = await aRes.json().catch(() => ({}));
//       if (!aRes.ok)
//         throw new Error(aJson?.error || "Failed to load assignments");

//       const aArr = Array.isArray(aJson) ? aJson : aJson.assignments || [];
//       const map = {};
//       for (const a of Array.isArray(aArr) ? aArr : []) map[a.communityId] = a;
//       setAssignments(map);
//     }

//     if (BACKEND_URL) load().catch(console.error);
//   }, [BACKEND_URL]);

//   // ✅ Initialize draft when selection changes
//   useEffect(() => {
//     if (!selectedCommunityId) {
//       setDraft(null);
//       setIsDirty(false);
//       return;
//     }

//     const a = assignments[selectedCommunityId] || {};
//     const report = a?.weeklyReports?.[selectedWeek] || {
//       netGrowthPeople: 0,
//       retentionPercent: 0,
//       guestReturnees: 0,
//       reportingStatus: "none",
//     };

//     setDraft({
//       pcfLeaderName: a.pcfLeaderName || "",
//       cellLeaderName: a.cellLeaderName || "",
//       // you said “remove houses/apartments”, but you still use housesCovered in workflow
//       housesCovered: a.housesCovered || 0,
//       targetTotalPeople: a.targetTotalPeople ?? TARGET_TOTAL,
//       weekReachedValue: Number(a?.weekReached?.[selectedWeek] || 0),
//       weeklyReport: { ...report },
//     });

//     setIsDirty(false);
//   }, [selectedCommunityId, selectedWeek, assignments]);

//   // ✅ status uses draft (live)
//   const score = totalScore(draft?.weeklyReport);
//   const status = statusFromScore(score);

//   const geoJsonStyle = (feature) => {
//     const geoId = getFeatureGeoId(feature);
//     const key = norm(geoId);

//     const community = communityByGeoId[key];
//     const population = Number(community?.stats?.estimatedPopulation || 0);
//     const noResidents = population === 0;

//     const assignment = community ? assignments[community._id] : null;
//     const totalReached = assignment ? sumWeeks(assignment.weekReached) : 0;
//     const percent = TARGET_TOTAL ? (totalReached / TARGET_TOTAL) * 100 : 0;

//     const isHovered = hoveredKey && key === hoveredKey;

//     return {
//       weight: isHovered ? 3 : 2,
//       color: "#111827",
//       fillOpacity: noResidents ? 0.55 : 0.85,
//       fillColor: noResidents ? NO_RESIDENTS_FILL : getMapFillColor(percent),
//     };
//   };

//   const onEachFeature = (feature, layer) => {
//     const geoId = getFeatureGeoId(feature);
//     const key = norm(geoId);

//     layer.on({
//       mouseover: () => setHoveredKey(key),
//       mouseout: () => setHoveredKey(null),
//       click: () => {
//         const community = communityByGeoId[key];
//         if (community) setSelectedCommunityId(community._id);
//       },
//     });

//     const community = communityByGeoId[key];
//     if (community) {
//       const pop = community.stats?.estimatedPopulation ?? "-";
//       const popLabel = Number(pop) === 0 ? "No residents (census)" : pop;

//       layer.bindTooltip(
//         `
//           <div style="font-size:12px">
//             <div style="font-weight:700">${community.name}</div>
//             <div>Population: ${popLabel}</div>
//           </div>
//         `,
//         { sticky: true }
//       );
//     }
//   };

//   async function saveDraft() {
//     if (!selectedCommunityId || !draft) return;

//     const token = localStorage.getItem("adminToken");
//     setIsSaving(true);

//     const patch = {
//       pcfLeaderName: draft.pcfLeaderName,
//       cellLeaderName: draft.cellLeaderName,
//       housesCovered: clampInt(draft.housesCovered, 0, 1_000_000),
//       targetTotalPeople: clampInt(draft.targetTotalPeople, 1, 1_000_000),

//       weeklyReports: {
//         ...(selectedAssignment?.weeklyReports || {}),
//         [selectedWeek]: {
//           netGrowthPeople: clampInt(draft.weeklyReport.netGrowthPeople, 0, 999),
//           retentionPercent: clampInt(
//             draft.weeklyReport.retentionPercent,
//             0,
//             100
//           ),
//           guestReturnees: clampInt(draft.weeklyReport.guestReturnees, 0, 999),
//           reportingStatus: draft.weeklyReport.reportingStatus || "none",
//         },
//       },

//       weekReached: {
//         ...(selectedAssignment?.weekReached || {}),
//         [selectedWeek]: clampInt(draft.weekReachedValue, 0, 1000),
//       },
//     };

//     try {
//       const res = await fetch(
//         `${BACKEND_URL}/admin/community-assignments/${selectedCommunityId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(patch),
//         }
//       );

//       const data = await res.json().catch(() => ({}));
//       if (!res.ok) throw new Error(data?.error || "Save failed");

//       setAssignments((prev) => ({ ...prev, [selectedCommunityId]: data }));
//       setIsDirty(false);
//     } catch (err) {
//       alert(err.message || "Failed to save");
//     } finally {
//       setIsSaving(false);
//     }
//   }

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] h-[calc(100vh-64px-80px)] mb-24">
//       {/* LEFT: MAP + TABLE */}
//       <div className="flex flex-col h-full overflow-hidden">
//         {/* MAP */}
//         <div className="h-[55%] min-h-[320px]">
//           <MapContainer
//             center={[51.0447, -114.0719]}
//             zoom={11}
//             className="h-full w-full"
//           >
//             {geojson && (
//               <GeoJSON
//                 data={geojson}
//                 style={geoJsonStyle}
//                 onEachFeature={onEachFeature}
//               />
//             )}
//           </MapContainer>
//         </div>

//         {/* TABLE */}
//         <div className="flex-1 border-t bg-white overflow-auto">
//           <CommunityTable
//             communities={populatedCommunities}
//             assignments={assignments}
//             selectedWeek={selectedWeek}
//             onSelectCommunity={(id) => setSelectedCommunityId(id)}
//           />
//         </div>
//       </div>

//       {/* RIGHT: SIDEBAR */}
//       <div className="border-l bg-white p-4 overflow-auto space-y-4 h-full">
//         {/* Week + Community */}
//         <div className="rounded border p-3 space-y-3">
//           <label className="block text-sm">
//             Week
//             <select
//               className="mt-1 w-full border rounded p-2"
//               value={selectedWeek}
//               onChange={(e) => setSelectedWeek(e.target.value)}
//             >
//               {Array.from({ length: 12 }).map((_, i) => (
//                 <option key={i + 1} value={String(i + 1)}>
//                   Week {i + 1}
//                 </option>
//               ))}
//             </select>
//           </label>

//           <label className="block text-sm">
//             Community
//             <select
//               className="mt-1 w-full border rounded p-2"
//               value={selectedCommunityId || ""}
//               onChange={(e) => setSelectedCommunityId(e.target.value || null)}
//             >
//               <option value="">Select a community…</option>
//               {populatedCommunities.map((c) => (
//                 <option key={c._id} value={c._id}>
//                   {c.name} ({c.stats?.estimatedPopulation ?? 0})
//                 </option>
//               ))}
//             </select>
//           </label>
//         </div>

//         {/* Save */}
//         <div className="flex items-center gap-2">
//           <button
//             onClick={saveDraft}
//             disabled={!isDirty || isSaving || !selectedCommunityId}
//             className={`px-4 py-2 rounded font-semibold ${
//               !isDirty || isSaving || !selectedCommunityId
//                 ? "bg-gray-200 text-gray-500"
//                 : "bg-indigo-600 text-white hover:bg-indigo-700"
//             }`}
//           >
//             {isSaving ? "Saving..." : "Save"}
//           </button>

//           {isDirty && !isSaving && (
//             <span className="text-sm text-orange-600">Unsaved changes</span>
//           )}
//         </div>

//         {!selectedCommunity ? (
//           <div className="text-gray-600">
//             Select a community from the dropdown (or click one on the map).
//           </div>
//         ) : (
//           <>
//             <div>
//               <h2 className="text-xl font-bold">{selectedCommunity.name}</h2>
//             </div>

//             <div className="rounded border p-3">
//               <h3 className="font-semibold mb-2">Community Stats</h3>
//               <div className="text-sm grid grid-cols-2 gap-2">
//                 <div>Estimated Population</div>
//                 <div className="font-medium">
//                   {selectedCommunity.stats?.estimatedPopulation ?? "-"}
//                 </div>
//               </div>
//             </div>

//             {/* Leader details */}
//             <div className="rounded border p-3 space-y-3">
//               <h3 className="font-semibold">Cell Leader Details</h3>

//               <label className="block text-sm">
//                 PCF Leader Name
//                 <input
//                   className="mt-1 w-full border rounded p-2"
//                   value={draft?.pcfLeaderName ?? ""}
//                   onChange={(e) => {
//                     setDraft((d) => ({ ...d, pcfLeaderName: e.target.value }));
//                     setIsDirty(true);
//                   }}
//                 />
//               </label>

//               <label className="block text-sm">
//                 Cell Leader Name
//                 <input
//                   className="mt-1 w-full border rounded p-2"
//                   value={draft?.cellLeaderName ?? ""}
//                   onChange={(e) => {
//                     setDraft((d) => ({ ...d, cellLeaderName: e.target.value }));
//                     setIsDirty(true);
//                   }}
//                 />
//               </label>
//             </div>

//             {/* Scoring */}
//             <div className="rounded border p-3 space-y-3">
//               <div className="flex items-center gap-2">
//                 <h3 className="font-semibold">Scoring Board</h3>
//                 <div
//                   className={`ml-auto px-3 py-1 rounded font-semibold ${status.colorClass}`}
//                 >
//                   {score} pts — {status.label}
//                 </div>
//               </div>

//               <label className="block text-sm">
//                 Net Growth (new people)
//                 <input
//                   type="number"
//                   className="mt-1 w-full border rounded p-2"
//                   value={draft?.weeklyReport?.netGrowthPeople ?? 0}
//                   onChange={(e) => {
//                     const val = clampInt(e.target.value, 0, 999);
//                     setDraft((d) => ({
//                       ...d,
//                       weeklyReport: { ...d.weeklyReport, netGrowthPeople: val },
//                     }));
//                     setIsDirty(true);
//                   }}
//                 />
//               </label>

//               <label className="block text-sm">
//                 Retention (%)
//                 <input
//                   type="number"
//                   className="mt-1 w-full border rounded p-2"
//                   value={draft?.weeklyReport?.retentionPercent ?? 0}
//                   onChange={(e) => {
//                     const val = clampInt(e.target.value, 0, 100);
//                     setDraft((d) => ({
//                       ...d,
//                       weeklyReport: {
//                         ...d.weeklyReport,
//                         retentionPercent: val,
//                       },
//                     }));
//                     setIsDirty(true);
//                   }}
//                 />
//               </label>

//               <label className="block text-sm">
//                 Guest Conversion (returnees)
//                 <input
//                   type="number"
//                   className="mt-1 w-full border rounded p-2"
//                   value={draft?.weeklyReport?.guestReturnees ?? 0}
//                   onChange={(e) => {
//                     const val = clampInt(e.target.value, 0, 999);
//                     setDraft((d) => ({
//                       ...d,
//                       weeklyReport: { ...d.weeklyReport, guestReturnees: val },
//                     }));
//                     setIsDirty(true);
//                   }}
//                 />
//               </label>

//               <label className="block text-sm">
//                 Reporting
//                 <select
//                   className="mt-1 w-full border rounded p-2"
//                   value={draft?.weeklyReport?.reportingStatus ?? "none"}
//                   onChange={(e) => {
//                     setDraft((d) => ({
//                       ...d,
//                       weeklyReport: {
//                         ...d.weeklyReport,
//                         reportingStatus: e.target.value,
//                       },
//                     }));
//                     setIsDirty(true);
//                   }}
//                 >
//                   <option value="on-time">On time & accurate</option>
//                   <option value="late">Late or incomplete</option>
//                   <option value="none">No report</option>
//                 </select>
//               </label>
//             </div>

//             {/* Weekly reached */}
//             <div className="rounded border p-3 space-y-3">
//               <h3 className="font-semibold">Weekly People Reached</h3>

//               {/* ✅ this is the color control you asked about */}
//               <div
//                 className={`inline-block px-3 py-2 rounded text-sm font-semibold ${getWeekCellClass(
//                   draft?.weekReachedValue ?? 0
//                 )}`}
//               >
//                 Week {selectedWeek}: {draft?.weekReachedValue ?? 0}
//               </div>

//               <label className="block text-sm">
//                 Total people reached in Week {selectedWeek} (target is 2)
//                 <input
//                   type="number"
//                   className="mt-1 w-full border rounded p-2"
//                   value={draft?.weekReachedValue ?? 0}
//                   onChange={(e) => {
//                     const val = clampInt(e.target.value, 0, 1000);
//                     setDraft((d) => ({ ...d, weekReachedValue: val }));
//                     setIsDirty(true);
//                   }}
//                 />
//               </label>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ---------------- TABLE COMPONENT ---------------- */

// function statusBadge(score) {
//   if (score >= 85) return { text: "Excellent", cls: "bg-green-600 text-white" };
//   if (score >= 65)
//     return { text: "Recovering", cls: "bg-yellow-400 text-black" };
//   return { text: "PFCC intervention", cls: "bg-red-600 text-white" };
// }

// function CommunityTable({
//   communities,
//   assignments,
//   selectedWeek,
//   onSelectCommunity,
// }) {
//   const rows = useMemo(() => {
//     return (communities || []).map((c) => {
//       const a = assignments?.[c._id] || {};

//       const report = a?.weeklyReports?.[selectedWeek] || {
//         netGrowthPeople: 0,
//         retentionPercent: 0,
//         guestReturnees: 0,
//         reportingStatus: "none",
//       };

//       const score = totalScore(report);
//       const badge = statusBadge(score);

//       const reached = Number(a?.weekReached?.[selectedWeek] || 0);

//       return {
//         id: c._id,
//         name: c.name,
//         population: Number(c?.stats?.estimatedPopulation || 0),
//         pcfLeaderName: a.pcfLeaderName || "",
//         cellLeaderName: a.cellLeaderName || "",
//         reached,
//         report,
//         score,
//         badge,
//       };
//     });
//   }, [communities, assignments, selectedWeek]);

//   return (
//     <div className="p-3">
//       <div className="flex items-center justify-between mb-2">
//         <h3 className="font-semibold">Saved Values (Week {selectedWeek})</h3>
//         <div className="text-xs text-gray-500">Click a row to edit</div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-[980px] w-full text-sm border">
//           <thead className="bg-gray-50">
//             <tr className="text-left">
//               <th className="p-2 border">Community</th>
//               <th className="p-2 border">Population</th>
//               <th className="p-2 border">PCF Leader</th>
//               <th className="p-2 border">Cell Leader</th>
//               <th className="p-2 border">Reached (W{selectedWeek})</th>
//               <th className="p-2 border">Net Growth</th>
//               <th className="p-2 border">Retention %</th>
//               <th className="p-2 border">Returnees</th>
//               <th className="p-2 border">Reporting</th>
//               <th className="p-2 border">Score</th>
//               <th className="p-2 border">Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {rows.map((r) => (
//               <tr
//                 key={r.id}
//                 className="hover:bg-gray-50 cursor-pointer"
//                 onClick={() => onSelectCommunity(r.id)}
//               >
//                 <td className="p-2 border font-medium">{r.name}</td>
//                 <td className="p-2 border">{r.population}</td>
//                 <td className="p-2 border">{r.pcfLeaderName || "-"}</td>
//                 <td className="p-2 border">{r.cellLeaderName || "-"}</td>

//                 <td className="p-2 border">
//                   <span
//                     className={`px-2 py-1 rounded ${getWeekCellClass(
//                       r.reached
//                     )}`}
//                   >
//                     {r.reached}
//                   </span>
//                 </td>

//                 <td className="p-2 border">{r.report.netGrowthPeople}</td>
//                 <td className="p-2 border">{r.report.retentionPercent}</td>
//                 <td className="p-2 border">{r.report.guestReturnees}</td>
//                 <td className="p-2 border capitalize">
//                   {r.report.reportingStatus}
//                 </td>
//                 <td className="p-2 border font-semibold">{r.score}</td>

//                 <td className="p-2 border">
//                   <span
//                     className={`px-2 py-1 rounded font-semibold ${r.badge.cls}`}
//                   >
//                     {r.badge.text}
//                   </span>
//                 </td>
//               </tr>
//             ))}

//             {!rows.length && (
//               <tr>
//                 <td className="p-3 text-gray-500" colSpan={11}>
//                   No communities found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// --- constants ---
const TARGET_TOTAL = 24;
const NO_RESIDENTS_FILL = "#9ca3af"; // parks/industrial (population = 0)

// --- scoring helpers ---
function netGrowthPoints(netGrowthPeople) {
  const n = Number(netGrowthPeople || 0);
  if (n >= 5) return 40;
  if (n >= 3) return 30;
  if (n >= 2) return 20;
  return 0;
}

function retentionPoints(retentionPercent) {
  const p = Number(retentionPercent || 0);
  if (p >= 80) return 25;
  if (p >= 70) return 20;
  if (p >= 60) return 15;
  if (p >= 50) return 10;
  return 0;
}

function guestConversionPoints(guestReturnees) {
  const n = Number(guestReturnees || 0);
  if (n >= 3) return 20;
  if (n >= 1) return 10;
  return 0;
}

function reportingPoints(reportingStatus) {
  if (reportingStatus === "on-time") return 15;
  if (reportingStatus === "late") return 10;
  return 0;
}

function totalScore(report) {
  const r = report || {};
  return (
    netGrowthPoints(r.netGrowthPeople) +
    retentionPoints(r.retentionPercent) +
    guestConversionPoints(r.guestReturnees) +
    reportingPoints(r.reportingStatus)
  );
}

function statusFromScore(score) {
  if (score >= 85)
    return { label: "Excellent", colorClass: "bg-green-600 text-white" };
  if (score >= 65)
    return { label: "Recovering", colorClass: "bg-yellow-400 text-black" };
  return { label: "PFCC intervention", colorClass: "bg-red-600 text-white" };
}

function getStatusFillColor(label) {
  if (label === "Excellent") return "#16a34a"; // green
  if (label === "Recovering") return "#facc15"; // yellow
  if (label === "PFCC intervention") return "#dc2626"; // red
  return "#e5e7eb"; // no report yet (light gray)
}

// --- misc helpers ---
function norm(s) {
  return String(s || "")
    .trim()
    .toUpperCase();
}

// ✅ color for weekly reached cell (your rule)
function getWeekCellClass(v) {
  const n = Number(v || 0);
  if (n >= 2) return "bg-green-500 text-white";
  if (n === 1) return "bg-yellow-400 text-black";
  return "bg-red-500 text-white";
}

function clampInt(v, min, max) {
  const n = Number(v);
  if (Number.isNaN(n)) return min;
  return Math.max(min, Math.min(max, Math.trunc(n)));
}

function getFeatureGeoId(feature) {
  return (
    feature?.properties?.COMMUNITY_NAME ||
    feature?.properties?.COMM_NAME ||
    feature?.properties?.name ||
    feature?.id ||
    ""
  );
}

function handleLogout() {
  localStorage.removeItem("adminToken");
  window.location.href = "/admin/login";
}

export default function AdminCommunityMap() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [geojson, setGeojson] = useState(null);
  const [communities, setCommunities] = useState([]);
  const [assignments, setAssignments] = useState({});

  const [hoveredKey, setHoveredKey] = useState(null);
  const [selectedCommunityId, setSelectedCommunityId] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState("1");

  // ✅ draft state (saved only when button pressed)
  const [draft, setDraft] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const communityByGeoId = useMemo(() => {
    const map = {};
    for (const c of Array.isArray(communities) ? communities : []) {
      map[norm(c.geoId)] = c;
    }
    return map;
  }, [communities]);

  const populatedCommunities = useMemo(() => {
    return (Array.isArray(communities) ? communities : [])
      .filter((c) => Number(c?.stats?.estimatedPopulation || 0) > 0)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [communities]);

  const selectedCommunity = useMemo(() => {
    const list = Array.isArray(communities) ? communities : [];
    return list.find((c) => c._id === selectedCommunityId) || null;
  }, [communities, selectedCommunityId]);

  const selectedAssignment = useMemo(() => {
    if (!selectedCommunityId) return null;
    return assignments[selectedCommunityId] || null;
  }, [assignments, selectedCommunityId]);

  // ✅ Load GeoJSON
  useEffect(() => {
    fetch("/geo/calgary-communities.geojson")
      .then((r) => r.json())
      .then(setGeojson)
      .catch((err) => console.error("Failed to load GeoJSON:", err));
  }, []);

  // ✅ Load DB data
  useEffect(() => {
    async function load() {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("Missing admin token");

      const cRes = await fetch(`${BACKEND_URL}/admin/communities`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const cJson = await cRes.json().catch(() => ({}));
      if (!cRes.ok)
        throw new Error(cJson?.error || "Failed to load communities");
      const cArr = Array.isArray(cJson) ? cJson : cJson.communities || [];
      setCommunities(cArr);

      const aRes = await fetch(`${BACKEND_URL}/admin/community-assignments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const aJson = await aRes.json().catch(() => ({}));
      if (!aRes.ok)
        throw new Error(aJson?.error || "Failed to load assignments");

      const aArr = Array.isArray(aJson) ? aJson : aJson.assignments || [];
      const map = {};
      for (const a of Array.isArray(aArr) ? aArr : []) map[a.communityId] = a;
      setAssignments(map);
    }

    if (BACKEND_URL) load().catch(console.error);
  }, [BACKEND_URL]);

  // ✅ Initialize draft when selection changes
  useEffect(() => {
    if (!selectedCommunityId) {
      setDraft(null);
      setIsDirty(false);
      return;
    }

    const a = assignments[selectedCommunityId] || {};
    const report = a?.weeklyReports?.[selectedWeek] || {
      netGrowthPeople: 0,
      retentionPercent: 0,
      guestReturnees: 0,
      reportingStatus: "none",
    };

    setDraft({
      pcfLeaderName: a.pcfLeaderName || "",
      cellLeaderName: a.cellLeaderName || "",
      targetTotalPeople: a.targetTotalPeople ?? TARGET_TOTAL,

      // week reached
      weekReachedValue: Number(a?.weekReached?.[selectedWeek] || 0),

      // per-week report
      weeklyReport: { ...report },
    });

    setIsDirty(false);
  }, [selectedCommunityId, selectedWeek, assignments]);

  // ✅ status uses draft (live)
  const score = totalScore(draft?.weeklyReport);
  const status = statusFromScore(score);

  // ✅ MAP STYLE: status-based (not progress %)
  const geoJsonStyle = (feature) => {
    const geoId = getFeatureGeoId(feature);
    const key = norm(geoId);

    const community = communityByGeoId[key];
    const population = Number(community?.stats?.estimatedPopulation || 0);
    const noResidents = population === 0;

    const isHovered = hoveredKey && key === hoveredKey;

    let fillColor = NO_RESIDENTS_FILL;
    let fillOpacity = noResidents ? 0.55 : 0.85;

    if (!noResidents && community) {
      const assignment = assignments?.[community._id] || null;
      const report = assignment?.weeklyReports?.[selectedWeek] || null;

      if (report) {
        const s = totalScore(report);
        const st = statusFromScore(s);
        fillColor = getStatusFillColor(st.label);
      } else {
        // populated but not reported yet
        fillColor = "#e5e7eb";
      }
    }

    return {
      weight: isHovered ? 3 : 2,
      color: "#111827",
      fillOpacity,
      fillColor,
    };
  };

  const onEachFeature = (feature, layer) => {
    const geoId = getFeatureGeoId(feature);
    const key = norm(geoId);

    layer.on({
      mouseover: () => setHoveredKey(key),
      mouseout: () => setHoveredKey(null),
      click: () => {
        const community = communityByGeoId[key];
        if (community) setSelectedCommunityId(community._id);
      },
    });

    const community = communityByGeoId[key];
    if (community) {
      const pop = community.stats?.estimatedPopulation ?? "-";
      const popLabel = Number(pop) === 0 ? "No residents (census)" : pop;

      const assignment = assignments?.[community._id];
      const report = assignment?.weeklyReports?.[selectedWeek] || null;

      let statusLine = "No report";
      if (Number(community.stats?.estimatedPopulation || 0) === 0) {
        statusLine = "No residents";
      } else if (report) {
        const s = totalScore(report);
        const st = statusFromScore(s);
        statusLine = `${st.label} (${s} pts)`;
      }

      layer.bindTooltip(
        `
          <div style="font-size:12px">
            <div style="font-weight:700">${community.name}</div>
            <div>Population: ${popLabel}</div>
            <div>Status (Week ${selectedWeek}): <b>${statusLine}</b></div>
          </div>
        `,
        { sticky: true }
      );
    }
  };

  async function saveDraft() {
    if (!selectedCommunityId || !draft) return;

    const token = localStorage.getItem("adminToken");
    setIsSaving(true);

    const patch = {
      pcfLeaderName: draft.pcfLeaderName,
      cellLeaderName: draft.cellLeaderName,
      targetTotalPeople: clampInt(draft.targetTotalPeople, 1, 1_000_000),

      weeklyReports: {
        ...(selectedAssignment?.weeklyReports || {}),
        [selectedWeek]: {
          netGrowthPeople: clampInt(draft.weeklyReport.netGrowthPeople, 0, 999),
          retentionPercent: clampInt(
            draft.weeklyReport.retentionPercent,
            0,
            100
          ),
          guestReturnees: clampInt(draft.weeklyReport.guestReturnees, 0, 999),
          reportingStatus: draft.weeklyReport.reportingStatus || "none",
        },
      },

      weekReached: {
        ...(selectedAssignment?.weekReached || {}),
        [selectedWeek]: clampInt(draft.weekReachedValue, 0, 1000),
      },
    };

    try {
      const res = await fetch(
        `${BACKEND_URL}/admin/community-assignments/${selectedCommunityId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(patch),
        }
      );

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Save failed");

      setAssignments((prev) => ({ ...prev, [selectedCommunityId]: data }));
      setIsDirty(false);
    } catch (err) {
      alert(err.message || "Failed to save");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 p-4 flex flex-col">
      {/* Top bar */}
      <div className="flex justify-end mb-3 shrink-0">
        <button
          onClick={handleLogout}
          className="text-sm font-semibold px-4 py-2 rounded-lg
               bg-red-50 text-red-600
               hover:bg-red-100
               border border-red-200
               transition"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] h-[calc(100vh-64px-16px)] mb-4">
        {/* LEFT: MAP + TABLE */}
        <div className="flex flex-col h-full overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
          {/* MAP */}
          <div className="relative h-[55%] min-h-[320px]">
            <MapContainer
              center={[51.0447, -114.0719]}
              zoom={11}
              className="h-full w-full"
            >
              {geojson && (
                <GeoJSON
                  data={geojson}
                  style={geoJsonStyle}
                  onEachFeature={onEachFeature}
                />
              )}
            </MapContainer>

            {/* Map Legend */}
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur rounded-xl shadow-lg ring-1 ring-black/5 px-3 py-2 text-xs">
              <div className="font-semibold text-gray-800 mb-2">
                Legend (Week {selectedWeek})
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded bg-[#16a34a]" />
                <span>Excellent</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-block w-3 h-3 rounded bg-[#facc15]" />
                <span>Recovering</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-block w-3 h-3 rounded bg-[#dc2626]" />
                <span>PFCC intervention</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-block w-3 h-3 rounded bg-[#e5e7eb]" />
                <span>No report</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-block w-3 h-3 rounded bg-[#9ca3af]" />
                <span>No residents</span>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="flex-1 border-t bg-white overflow-auto">
            <CommunityTable
              communities={populatedCommunities}
              assignments={assignments}
              selectedWeek={selectedWeek}
              onSelectCommunity={(id) => setSelectedCommunityId(id)}
            />
          </div>
        </div>

        {/* RIGHT: SIDEBAR */}
        <aside className="h-full overflow-auto rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-4 space-y-4">
          {/* Sidebar top bar */}
          <div className="sticky top-0 z-20 -mx-4 -mt-4 px-4 pt-4 pb-3 bg-white/95 backdrop-blur border-b border-gray-200 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-gray-900">
                Admin Panel
              </div>
              <div className="text-xs text-gray-500">Week {selectedWeek}</div>
            </div>

            <button
              onClick={handleLogout}
              className="text-xs sm:text-sm font-semibold px-3 py-2 rounded-lg
                 bg-red-50 text-red-600 hover:bg-red-100
                 border border-red-200 transition"
            >
              Logout
            </button>
          </div>
          {/* Week + Community */}
          <div className="rounded-xl border border-gray-200 p-4 space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Week
              <select
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <option key={i + 1} value={String(i + 1)}>
                    Week {i + 1}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-medium text-gray-700">
              Community
              <select
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={selectedCommunityId || ""}
                onChange={(e) => setSelectedCommunityId(e.target.value || null)}
              >
                <option value="">Select a community…</option>
                {populatedCommunities.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name} ({c.stats?.estimatedPopulation ?? 0})
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Save */}
          <div className="flex items-center gap-3">
            <button
              onClick={saveDraft}
              disabled={!isDirty || isSaving || !selectedCommunityId}
              className={`px-4 py-2 rounded-lg font-semibold shadow-sm transition
              ${
                !isDirty || isSaving || !selectedCommunityId
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>

            {isDirty && !isSaving && (
              <span className="text-sm text-orange-600">Unsaved changes</span>
            )}
          </div>

          {!selectedCommunity ? (
            <div className="rounded-xl border border-dashed border-gray-300 p-4 text-gray-600 text-sm">
              Select a community from the dropdown (or click one on the map).
            </div>
          ) : (
            <>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedCommunity.name}
                </h2>
                <p className="text-sm text-gray-500">
                  Week {selectedWeek} overview
                </p>
              </div>

              {/* Community Stats */}
              <div className="rounded-xl border border-gray-200 p-4">
                <h3 className="font-semibold mb-2 text-gray-900">
                  Community Stats
                </h3>
                <div className="text-sm grid grid-cols-2 gap-2 text-gray-700">
                  <div>Estimated Population</div>
                  <div className="font-medium">
                    {selectedCommunity.stats?.estimatedPopulation ?? "-"}
                  </div>
                </div>
              </div>

              {/* Leader details */}
              <div className="rounded-xl border border-gray-200 p-4 space-y-3">
                <h3 className="font-semibold text-gray-900">
                  Cell Leader Details
                </h3>

                <label className="block text-sm font-medium text-gray-700">
                  PCF Leader Name
                  <input
                    className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={draft?.pcfLeaderName ?? ""}
                    onChange={(e) => {
                      setDraft((d) => ({
                        ...d,
                        pcfLeaderName: e.target.value,
                      }));
                      setIsDirty(true);
                    }}
                  />
                </label>

                <label className="block text-sm font-medium text-gray-700">
                  Cell Leader Name
                  <input
                    className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={draft?.cellLeaderName ?? ""}
                    onChange={(e) => {
                      setDraft((d) => ({
                        ...d,
                        cellLeaderName: e.target.value,
                      }));
                      setIsDirty(true);
                    }}
                  />
                </label>
              </div>

              {/* Scoring */}
              <div className="rounded-xl border border-gray-200 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">Scoring Board</h3>
                  <div
                    className={`ml-auto px-3 py-1 rounded-lg text-sm font-semibold ${status.colorClass}`}
                  >
                    {score} pts — {status.label}
                  </div>
                </div>

                {/* keep your same inputs below, just swap classes */}
                {/* (you can keep your existing blocks and only update input/select className to match above) */}
              </div>

              {/* Weekly reached */}
              <div className="rounded-xl border border-gray-200 p-4 space-y-3">
                <h3 className="font-semibold text-gray-900">
                  Weekly People Reached
                </h3>

                <div
                  className={`inline-block px-3 py-2 rounded-lg text-sm font-semibold ${getWeekCellClass(
                    draft?.weekReachedValue ?? 0
                  )}`}
                >
                  Week {selectedWeek}: {draft?.weekReachedValue ?? 0}
                </div>

                <label className="block text-sm font-medium text-gray-700">
                  Total people reached in Week {selectedWeek} (target is 2)
                  <input
                    type="number"
                    className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={draft?.weekReachedValue ?? 0}
                    onChange={(e) => {
                      const val = clampInt(e.target.value, 0, 1000);
                      setDraft((d) => ({ ...d, weekReachedValue: val }));
                      setIsDirty(true);
                    }}
                  />
                </label>

                <p className="text-xs text-gray-500">
                  Color rule: 2+ = green, 1 = yellow, 0 = red.
                </p>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

/* ---------------- TABLE COMPONENT ---------------- */

function statusBadge(score) {
  if (score >= 85) return { text: "Excellent", cls: "bg-green-600 text-white" };
  if (score >= 65)
    return { text: "Recovering", cls: "bg-yellow-400 text-black" };
  return { text: "PFCC intervention", cls: "bg-red-600 text-white" };
}

function CommunityTable({
  communities,
  assignments,
  selectedWeek,
  onSelectCommunity,
}) {
  const rows = useMemo(() => {
    return (communities || []).map((c) => {
      const a = assignments?.[c._id] || {};

      const report = a?.weeklyReports?.[selectedWeek] || null;

      const score = report ? totalScore(report) : 0;
      const badge = report
        ? statusBadge(score)
        : { text: "No report", cls: "bg-gray-200 text-gray-700" };

      const reached = Number(a?.weekReached?.[selectedWeek] || 0);

      return {
        id: c._id,
        name: c.name,
        population: Number(c?.stats?.estimatedPopulation || 0),
        pcfLeaderName: a.pcfLeaderName || "",
        cellLeaderName: a.cellLeaderName || "",
        reached,
        report: report || {
          netGrowthPeople: 0,
          retentionPercent: 0,
          guestReturnees: 0,
          reportingStatus: "none",
        },
        score,
        badge,
      };
    });
  }, [communities, assignments, selectedWeek]);

  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Saved Values (Week {selectedWeek})</h3>
        <div className="text-xs text-gray-500">Click a row to edit</div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[980px] w-full text-sm border">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="p-2 border">Community</th>
              <th className="p-2 border">Population</th>
              <th className="p-2 border">PCF Leader</th>
              <th className="p-2 border">Cell Leader</th>
              <th className="p-2 border">Reached (W{selectedWeek})</th>
              <th className="p-2 border">Net Growth</th>
              <th className="p-2 border">Retention %</th>
              <th className="p-2 border">Returnees</th>
              <th className="p-2 border">Reporting</th>
              <th className="p-2 border">Score</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onSelectCommunity(r.id)}
              >
                <td className="p-2 border font-medium">{r.name}</td>
                <td className="p-2 border">{r.population}</td>
                <td className="p-2 border">{r.pcfLeaderName || "-"}</td>
                <td className="p-2 border">{r.cellLeaderName || "-"}</td>

                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded ${getWeekCellClass(
                      r.reached
                    )}`}
                  >
                    {r.reached}
                  </span>
                </td>

                <td className="p-2 border">{r.report.netGrowthPeople}</td>
                <td className="p-2 border">{r.report.retentionPercent}</td>
                <td className="p-2 border">{r.report.guestReturnees}</td>
                <td className="p-2 border capitalize">
                  {r.report.reportingStatus}
                </td>
                <td className="p-2 border font-semibold">{r.score}</td>

                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded font-semibold ${r.badge.cls}`}
                  >
                    {r.badge.text}
                  </span>
                </td>
              </tr>
            ))}

            {!rows.length && (
              <tr>
                <td className="p-3 text-gray-500" colSpan={11}>
                  No communities found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
