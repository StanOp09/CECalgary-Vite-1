import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function Carousel({ images = [], interval = 5000 }) {
  const safeImages = useMemo(
    () => (Array.isArray(images) ? images : []),
    [images]
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  // auto-advance
  useEffect(() => {
    if (!safeImages.length) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % safeImages.length);
    }, interval);

    return () => clearInterval(timer);
  }, [safeImages.length, interval]);

  // clamp index if images change
  useEffect(() => {
    if (!safeImages.length) return;
    if (currentIndex > safeImages.length - 1) setCurrentIndex(0);
  }, [safeImages.length, currentIndex]);

  const goPrev = () => {
    if (!safeImages.length) return;
    setCurrentIndex((i) => (i - 1 + safeImages.length) % safeImages.length);
  };

  const goNext = () => {
    if (!safeImages.length) return;
    setCurrentIndex((i) => (i + 1) % safeImages.length);
  };

  if (!safeImages.length) {
    return (
      <div className="relative w-full h-[70vh] bg-gray-200 flex items-center justify-center">
        <p className="text-gray-600">No images provided</p>
      </div>
    );
  }

  return (
    <section className="relative w-full h-[92vh] min-h-[620px] overflow-hidden">
      {/* Slides */}
      {safeImages.map((img, index) => (
        <div
          key={img + index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={img}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Premium overlay (dark + warm) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_60%)]" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold
                          bg-amber-400/20 text-amber-200 border border-amber-300/30 backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-amber-300 animate-pulse" />
            Welcome • Worship • Word • Fellowship
          </div>

          <h1 className="mt-5 text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent">
              Christ Embassy Calgary
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-white/90 max-w-3xl mx-auto">
            Join us in worship, community, and service. Experience the Word and
            the power of the Holy Spirit.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/live-service"
              className="inline-flex items-center justify-center rounded-xl px-7 py-3 font-semibold
                         bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-lg shadow-black/20"
            >
              Watch Live
            </Link>

            <Link
              to="/giving"
              className="inline-flex items-center justify-center rounded-xl px-7 py-3 font-semibold
                         bg-white/10 text-white hover:bg-white/15 transition border border-white/25 backdrop-blur"
            >
              Give
            </Link>
          </div>

          <div className="mt-10 text-white/70 text-sm">
            2925 10 Ave NE, Calgary • Sundays 10:00 AM
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex
                   h-11 w-11 items-center justify-center rounded-full
                   bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur transition"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={goNext}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex
                   h-11 w-11 items-center justify-center rounded-full
                   bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur transition"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {safeImages.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setCurrentIndex(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === currentIndex
                ? "w-8 bg-amber-300"
                : "w-2.5 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
