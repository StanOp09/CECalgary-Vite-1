import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LiveServiceBar() {
  const [liveVideoId, setLiveVideoId] = useState(null);
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!BACKEND_URL) {
      setLiveVideoId(null);
      return;
    }

    let cancelled = false;

    const checkLive = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/live-status`, { cache: "no-store" });
        const data = await res.json();
        if (!cancelled) setLiveVideoId(data?.liveVideoId || null);
      } catch {
        if (!cancelled) setLiveVideoId(null);
      }
    };

    checkLive();
    const interval = setInterval(checkLive, 30000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [BACKEND_URL]);

  const isOurChannelLive = Boolean(liveVideoId);

  return (
    <button
      type="button"
      onClick={() => navigate("/live-service")}
      className={[
        "fixed left-0 w-full z-40",
        "top-16", // ✅ sits right under your navbar (navbar height = h-16)
        "px-3 sm:px-4",
        "cursor-pointer",
      ].join(" ")}
      title={isOurChannelLive ? "We are live on YouTube" : "Live stream"}
    >
      <div
        className={[
          "mx-auto max-w-6xl",
          "rounded-2xl",
          "border backdrop-blur",
          "shadow-sm",
          "px-4 py-2",
          "flex items-center justify-center gap-3",
          "text-sm sm:text-base font-semibold",
          isOurChannelLive
            ? "bg-gradient-to-r from-red-600/90 via-rose-600/90 to-red-600/90 border-white/15 text-white"
            : "bg-white/70 border-gray-200 text-gray-900",
        ].join(" ")}
      >
        {/* Left indicator */}
        <span
          className={[
            "inline-flex items-center justify-center",
            "h-2.5 w-2.5 rounded-full",
            isOurChannelLive ? "bg-amber-300 animate-pulse" : "bg-indigo-500",
          ].join(" ")}
        />

        {/* Message */}
        <span className="truncate">
          {isOurChannelLive
            ? "We are LIVE now — Click to watch"
            : "Live Service — Click to watch"}
        </span>

        {/* Right badge */}
        <span
          className={[
            "ml-2 hidden sm:inline-flex items-center",
            "rounded-full px-3 py-1 text-xs font-bold",
            isOurChannelLive
              ? "bg-white/15 text-white border border-white/20"
              : "bg-indigo-600 text-white",
          ].join(" ")}
        >
          {isOurChannelLive ? "LIVE" : "WATCH"}
        </span>
      </div>
    </button>
  );
}
