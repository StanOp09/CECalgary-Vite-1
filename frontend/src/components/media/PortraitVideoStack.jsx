import { useRef, useState } from "react";

const portraitPromos = [
  {
    title: "Come Expectant",
    headline: "This is more than a service",
    text: [
      "Faith will be stirred through worship and the Word.",
      "God’s power is real and active today.",
      "Come believing and ready to receive.",
    ],
    verse: "Hebrews 11:6 — He is a rewarder of those who diligently seek Him.",
    videoSrc: "/sis-betty-vid.mp4",
    poster: "/portrait-poster-1.jpg",
  },
  {
    title: "One Invitation Can Change Everything",
    headline: "Bring someone with you",
    text: [
      "Invite the sick, the weary, and the searching.",
      "Miracles often begin with an invitation.",
      "Your obedience could unlock someone’s testimony.",
    ],
    verse: "Mark 16:17 — These signs shall follow them that believe.",
    videoSrc: "/sis-rita.mp4",
    poster: "/portrait-poster-2.jpg",
  },
];

export function PortraitVideoStack() {
  const videoRefs = useRef([]);
  const [mutedState, setMutedState] = useState(
    () => portraitPromos.map(() => true) // all start muted (required for autoplay)
  );

  const toggleSound = async (idx) => {
    const v = videoRefs.current[idx];
    if (!v) return;

    const nextMuted = !mutedState[idx];

    // Update element
    v.muted = nextMuted;
    if (!nextMuted) v.volume = 0.9;

    // Update state
    setMutedState((prev) => prev.map((m, i) => (i === idx ? nextMuted : m)));

    // iOS/Safari: ensure playback continues after user gesture
    try {
      await v.play();
    } catch (e) {
      console.warn("play() blocked:", e);
    }
  };

  return (
    <div className="mt-14 space-y-16">
      {portraitPromos.map((item, idx) => {
        const reverse = idx % 2 === 1;
        const isMuted = mutedState[idx];

        return (
          <section key={idx} className="relative">
            {/* divider */}
            {idx !== 0 && (
              <div className="mx-auto mb-14 h-px w-3/4 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            )}

            <div className="grid gap-8 items-center lg:grid-cols-12">
              {/* VIDEO */}
              <div
                className={`lg:col-span-5 flex justify-center ${
                  reverse ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <div className="relative w-[220px] sm:w-[260px] aspect-[9/16] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl bg-black">
                  <video
                    ref={(el) => (videoRefs.current[idx] = el)}
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={item.poster}
                  >
                    <source src={item.videoSrc} type="video/mp4" />
                  </video>

                  {/* REAL sound toggle (not just a label) */}
                  <button
                    type="button"
                    onClick={() => toggleSound(idx)}
                    className="absolute bottom-2 right-2 rounded-full bg-black/60 hover:bg-black/70
                               px-2.5 py-1 text-[10px] text-white border border-white/10
                               backdrop-blur transition"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? "Tap for sound" : "Mute"}
                  </button>
                </div>
              </div>

              {/* TEXT */}
              <div
                className={`lg:col-span-7 ${
                  reverse ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur">
                  <div className="text-sm font-semibold text-indigo-300">
                    {item.title}
                  </div>

                  <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold leading-tight">
                    {item.headline}
                  </h3>

                  <ul className="mt-4 space-y-3 text-white/75">
                    {item.text.map((line, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/60" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm italic text-white/70">{item.verse}</p>
                  </div>

                  <p className="mt-5 text-sm text-white/70">
                    Register above and come expectant.
                  </p>
                </div>
              </div>
            </div>

            {/* glow */}
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-fuchsia-500/5 to-emerald-500/10 blur-2xl" />
          </section>
        );
      })}
    </div>
  );
}
