import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

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
        const url =
          `https://www.googleapis.com/youtube/v3/search?` +
          `part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&maxResults=1&key=${API_KEY}` +
          `&t=${Date.now()}`;

        const res = await fetch(url, { cache: "no-store" });

        if (!res.ok) {
          if (!cancelled) setLiveVideoId(null);
          return;
        }

        const data = await res.json();

        if (data?.error) {
          if (!cancelled) setLiveVideoId(null);
          return;
        }

        const items = Array.isArray(data?.items) ? data.items : [];
        const videoId = items[0]?.id?.videoId || null;

        console.log(
          "YT live items:",
          data?.items?.length,
          "videoId:",
          videoId,
          "error:",
          data?.error,
        );

        if (!cancelled) setLiveVideoId(videoId);
      } catch {
        if (!cancelled) setLiveVideoId(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    checkLive();
    const interval = setInterval(checkLive, 120000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [API_KEY, CHANNEL_ID]);

  // ---- Attach HLS stream when NOT YouTube ----
  useEffect(() => {
    setHlsError(false);

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

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const onVideoError = () => setHlsError(true);
    video.addEventListener("error", onVideoError);

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_URL;
    } else {
      import("hls.js").then(({ default: Hls }) => {
        if (!Hls.isSupported()) { setHlsError(true); return; }
        const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
        hlsRef.current = hls;
        hls.loadSource(HLS_URL);
        hls.attachMedia(video);
        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data?.fatal) setHlsError(true);
        });
      }).catch(() => setHlsError(true));
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
    return `https://www.youtube.com/embed/${liveVideoId}?autoplay=1&mute=0&playsinline=1&modestbranding=1&rel=0`;
  }, [liveVideoId]);

  return (
    <div className="min-h-screen bg-gray-950 font-sans pt-16">
      <div className="max-w-[1300px] mx-auto px-4 py-10">
        {/* Page header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-400 mb-1">
              Christ Embassy Calgary
            </p>
            <h1 className="font-raleway text-3xl sm:text-4xl font-bold text-white">
              Live Service
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {loading && (
              <span className="flex items-center gap-2 text-xs text-white/50 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <svg
                  className="w-3 h-3 animate-spin text-white/50"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Checking…
              </span>
            )}

            {!loading && isOurChannelLive && (
              <span className="inline-flex items-center gap-2 text-xs font-bold text-white bg-red-600 px-3 py-1.5 rounded-full shadow-lg shadow-red-600/30">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                LIVE NOW
              </span>
            )}

            {!loading && !isOurChannelLive && (
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-white/60 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                Offline
              </span>
            )}
          </div>
        </div>

        {/* Player */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-black">
          {isOurChannelLive ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={youtubeSrc}
              title="YouTube Live Service"
              style={{ border: "none" }}
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

          {/* Initial loading overlay */}
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
              <svg
                className="w-10 h-10 animate-spin text-amber-400 mb-3"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <p className="text-white/70 text-sm">Checking live status…</p>
            </div>
          )}

          {/* HLS error state */}
          {!loading && !isOurChannelLive && hlsError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <svg
                  className="w-7 h-7 text-white/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <p className="text-white font-semibold text-lg font-raleway">
                Stream unavailable
              </p>
              <p className="text-white/60 text-sm mt-2 text-center max-w-xs">
                The stream is currently offline. Please refresh the page or
                check back during service hours.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                Refresh
              </button>
            </div>
          )}

          {/* Not live — no error — HLS playing; subtle top gradient */}
          {!loading && (
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
          )}
        </div>

        {/* Service schedule strip */}
        {!loading && !isOurChannelLive && (
          <div className="mt-4 flex flex-wrap items-center gap-3 px-1">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">
              Next services
            </p>
            {[
              { label: "Sunday Service", time: "10:00 AM" },
              { label: "Midweek Service", time: "Wed 7:00 PM" },
              { label: "Communion", time: "1st Sunday 8:00 AM" },
            ].map((s) => (
              <span
                key={s.label}
                className="inline-flex items-center gap-1.5 text-xs text-white/60 bg-white/5 border border-white/10 rounded-full px-3 py-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
                <span className="font-medium text-white/70">{s.label}</span>
                <span className="text-white/40">· {s.time}</span>
              </span>
            ))}
          </div>
        )}

        {/* Below-player CTAs */}
        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 pt-8 border-t border-white/10">
          {/* Give */}
          <div className="border-t-2 border-amber-400 pt-6 flex flex-col">
            <h2 className="text-white font-raleway font-bold text-lg">
              Partner with the Ministry
            </h2>
            <p className="text-white/55 text-sm mt-2 leading-relaxed flex-1">
              Give your tithe, offerings, or partnership seed securely online.
            </p>
            <Link
              to="/giving"
              className="mt-6 inline-flex items-center gap-2 self-start rounded-full px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-widest transition shadow-sm"
            >
              Give Now
            </Link>
          </div>

          {/* Need Help */}
          <div className="border-t-2 border-indigo-400 pt-6 flex flex-col">
            <h2 className="text-white font-raleway font-bold text-lg">
              Need Help?
            </h2>
            <p className="text-white/55 text-sm mt-2 leading-relaxed flex-1">
              Have questions or want to connect with us? We're happy to help.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 self-start rounded-full px-6 py-3 border border-white/30 hover:border-white text-white text-xs font-bold uppercase tracking-widest transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
