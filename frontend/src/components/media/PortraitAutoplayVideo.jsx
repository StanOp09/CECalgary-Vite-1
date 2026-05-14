import { useRef, useState } from "react";

function PortraitAutoplayVideo({ src, poster }) {
  const vidRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = async () => {
    const v = vidRef.current;
    if (!v) return;

    const nextMuted = !muted;
    v.muted = nextMuted;

    // if unmuting, set a reasonable volume
    if (!nextMuted) v.volume = 0.9;

    setMuted(nextMuted);

    // ensure it plays after gesture (important on iOS)
    try {
      await v.play();
    } catch (e) {
      console.warn("Play blocked:", e);
    }
  };

  return (
    <div className="relative w-[220px] sm:w-[260px] aspect-[9/16] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl bg-black">
      <video
        ref={vidRef}
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Unmute/Mute button */}
      <button
        type="button"
        onClick={toggleSound}
        className="absolute bottom-3 right-3 rounded-full bg-black/60 hover:bg-black/70
                   px-3 py-1.5 text-xs text-white border border-white/10 backdrop-blur"
      >
        {muted ? "Tap for sound" : "Mute"}
      </button>
    </div>
  );
}

export default PortraitAutoplayVideo;
