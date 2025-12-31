import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LiveServiceBar() {
  const [isLive, setIsLive] = useState(false);

  const navigate = useNavigate();

  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

  useEffect(() => {
    if (!API_KEY || !CHANNEL_ID) {
      console.error("YouTube env variables missing");
      return;
    }

    const checkLive = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`
        );
        const data = await res.json();

        setIsLive(Boolean(data.items?.length));
      } catch (err) {
        console.error("YouTube API error:", err);
        setIsLive(false);
      }
    };

    checkLive();
    const interval = setInterval(checkLive, 30000); // check every 30s
    return () => clearInterval(interval);
  }, [API_KEY, CHANNEL_ID]);

  return (
    <div
      onClick={() => isLive && navigate("/liveservice")}
      className={`w-full text-center py-2 font-semibold mt-16 ${
        isLive ? "bg-red-600 text-white" : "bg-gray-300 text-gray-800"
      } fixed top-0 left-0 z-40`}
    >
      {isLive
        ? "🔴 Live Service Now! Click to Watch!"
        : "No live service currently"}
    </div>
  );
}
