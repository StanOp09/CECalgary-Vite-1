import { useEffect, useMemo, useRef, useState } from "react";
import Hls from "hls.js";

export default function LiveService() {
  const [liveVideoId, setLiveVideoId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hlsError, setHlsError] = useState(false);

  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

  const HLS_URL =
    "https://cdn3.wowza.com/5/VktqVXd0Tms3eG16/LoveworldCAN/ngrp:L.stream_all/playlist.m3u8";

  const isOurChannelLive = Boolean(liveVideoId);

  // ---- Check YouTube Live (poll) ----
  useEffect(() => {
    if (!API_KEY || !CHANNEL_ID) {
      setLiveVideoId(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const checkLive = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&maxResults=1&key=${API_KEY}`
        );
        const data = await res.json();
        const videoId = data?.items?.[0]?.id?.videoId || null;

        if (!cancelled) setLiveVideoId(videoId);
      } catch {
        if (!cancelled) setLiveVideoId(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    checkLive();
    const interval = setInterval(checkLive, 60000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [API_KEY, CHANNEL_ID]);

  // ---- Attach HLS stream when NOT YouTube ----
  useEffect(() => {
    setHlsError(false);

    // If YouTube is live, ensure any HLS is torn down
    if (isOurChannelLive) {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      const v = videoRef.current;
      if (v) v.src = "";
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    // Clean previous instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const onVideoError = () => setHlsError(true);
    video.addEventListener("error", onVideoError);

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari / iOS native HLS
      video.src = HLS_URL;
    } else if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });

      hlsRef.current = hls;

      hls.loadSource(HLS_URL);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, (_, data) => {
        // Any fatal error → show fallback UI
        if (data?.fatal) setHlsError(true);
      });
    } else {
      // Browser doesn't support HLS
      setHlsError(true);
    }

    return () => {
      video.removeEventListener("error", onVideoError);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [isOurChannelLive]);

  const youtubeSrc = useMemo(() => {
    if (!liveVideoId) return "";
    // modestbranding + playsinline for cleaner embed
    return `https://www.youtube.com/embed/${liveVideoId}?autoplay=1&mute=0&playsinline=1&modestbranding=1&rel=0`;
  }, [liveVideoId]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl">
        {/* Title row */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-white text-lg sm:text-xl font-semibold">
            Live Service
          </h1>

          {isOurChannelLive && (
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-red-600 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              LIVE
            </span>
          )}
        </div>

        {/* Player frame */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-black">
          {/* subtle overlay to make UI readable */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/0 to-black/50" />

          {isOurChannelLive ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={youtubeSrc}
              title="YouTube Live Service"
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              controls
              playsInline
            />
          )}

          {loading && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white bg-black/60 px-3 py-1 rounded-full backdrop-blur">
              Checking live status…
            </div>
          )}

          {!loading && !isOurChannelLive && hlsError && (
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="max-w-md text-center bg-black/70 backdrop-blur px-5 py-4 rounded-xl ring-1 ring-white/10">
                <p className="text-white font-semibold">Stream unavailable</p>
                <p className="text-white/80 text-sm mt-1">
                  If this keeps happening, refresh the page or try again in a
                  minute.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer hint */}
        {/* <p className="text-white/60 text-xs mt-3">
          If our YouTube channel is live, it will play here automatically.
          Otherwise the backup stream loads.
        </p> */}
      </div>
    </div>
  );
}
