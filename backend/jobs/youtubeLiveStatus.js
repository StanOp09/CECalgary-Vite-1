// Polls YouTube's Search API on a fixed interval — regardless of visitor count —
// and caches the result in memory. This keeps quota usage flat and predictable
// instead of scaling with concurrent page views (search.list costs 100 units/call,
// and the default daily quota is only 10,000 units).

const POLL_INTERVAL_MS = 2 * 60 * 1000; // 2 minutes

let cache = { liveVideoId: null, checkedAt: null };

export function getLiveStatus() {
  return cache;
}

async function checkYoutubeLive() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    cache = { liveVideoId: null, checkedAt: new Date().toISOString() };
    return;
  }

  try {
    const url =
      `https://www.googleapis.com/youtube/v3/search?` +
      `part=snippet&channelId=${channelId}&eventType=live&type=video&maxResults=1&key=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok || data?.error) {
      console.error("[youtube-live] API error:", data?.error?.message || res.status);
      cache = { liveVideoId: null, checkedAt: new Date().toISOString() };
      return;
    }

    const items = Array.isArray(data?.items) ? data.items : [];
    const videoId = items[0]?.id?.videoId || null;

    cache = { liveVideoId: videoId, checkedAt: new Date().toISOString() };
  } catch (err) {
    console.error("[youtube-live] Check failed:", err.message);
    cache = { liveVideoId: null, checkedAt: new Date().toISOString() };
  }
}

export function startYoutubeLiveStatusJob() {
  checkYoutubeLive();
  setInterval(checkYoutubeLive, POLL_INTERVAL_MS);
}
