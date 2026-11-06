// Polls YouTube on a fixed interval — regardless of visitor count — and caches
// the result in memory, so quota usage stays flat instead of scaling with page views.
//
// Uses the channel's uploads playlist + videos.list (1 quota unit each, 2 per poll)
// rather than search.list (100 units per call). At one poll per minute that's
// ~2,900 units/day, well under the default 10,000/day quota. search.list at the
// same cadence burned through the quota in a few hours, after which every check
// failed and the site showed "offline" for the rest of the day.

const POLL_INTERVAL_MS = 60 * 1000; // 1 minute
const RECENT_UPLOADS = 5;

let cache = { liveVideoId: null, checkedAt: null };

export function getLiveStatus() {
  return cache;
}

async function ytGet(endpoint, params) {
  const qs = new URLSearchParams({ ...params, key: process.env.YOUTUBE_API_KEY });
  const res = await fetch(`https://www.googleapis.com/youtube/v3/${endpoint}?${qs}`);
  const data = await res.json();
  if (!res.ok || data?.error) {
    throw new Error(data?.error?.message || `HTTP ${res.status}`);
  }
  return data;
}

async function checkYoutubeLive() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    console.error("[youtube-live] YOUTUBE_API_KEY or YOUTUBE_CHANNEL_ID not set");
    cache = { liveVideoId: null, checkedAt: new Date().toISOString() };
    return;
  }

  try {
    // Every channel's uploads playlist ID is its channel ID with "UC" → "UU".
    // Public live broadcasts appear here as soon as they start.
    const uploadsPlaylistId = `UU${channelId.slice(2)}`;
    const playlist = await ytGet("playlistItems", {
      part: "contentDetails",
      playlistId: uploadsPlaylistId,
      maxResults: String(RECENT_UPLOADS),
    });

    const ids = (playlist.items || [])
      .map((item) => item?.contentDetails?.videoId)
      .filter(Boolean);

    let liveVideoId = null;
    if (ids.length) {
      const videos = await ytGet("videos", { part: "snippet", id: ids.join(",") });
      const live = (videos.items || []).find(
        (v) => v?.snippet?.liveBroadcastContent === "live",
      );
      liveVideoId = live?.id || null;
    }

    cache = { liveVideoId, checkedAt: new Date().toISOString() };
  } catch (err) {
    console.error("[youtube-live] Check failed:", err.message);
    cache = { liveVideoId: null, checkedAt: new Date().toISOString() };
  }
}

export function startYoutubeLiveStatusJob() {
  checkYoutubeLive();
  setInterval(checkYoutubeLive, POLL_INTERVAL_MS);
}
