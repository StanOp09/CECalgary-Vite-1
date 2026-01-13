import { useEffect, useState } from "react";

const ImageCard = ({ imageSrc, title, description }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(
      new Date().getFullYear(), // year
      0, // January (0-based)
      25, // 25th
      10, // 10 AM
      0, // minutes
      0 // seconds
    ).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const CountdownBox = ({ label, value }) => (
    <div className="min-w-[64px] sm:min-w-[80px] text-center rounded-xl bg-white/10 backdrop-blur-md ring-1 ring-white/15 px-3 py-2 shadow-lg">
      <div className="text-2xl sm:text-3xl font-extrabold leading-none">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-[10px] sm:text-xs uppercase tracking-widest text-white/80 mt-1">
        {label}
      </div>
    </div>
  );

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl shadow-2xl"
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      <div className="relative px-5 sm:px-10 py-10 sm:py-14">
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8 text-white">
          {/* Title block */}
          <div className="text-center lg:text-left max-w-2xl">
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-white/75">
              Special Program
            </p>

            <h1 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight">
              {title}
            </h1>

            {description && (
              <p className="mt-3 text-sm sm:text-lg text-white/80 leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Countdown */}
          <div className="flex flex-wrap justify-center lg:justify-end gap-3 sm:gap-4">
            <div aria-label="days remaining">
              <CountdownBox label="Days" value={timeLeft.days} />
            </div>
            <div aria-label="hours remaining">
              <CountdownBox label="Hours" value={timeLeft.hours} />
            </div>
            <div aria-label="minutes remaining">
              <CountdownBox label="Minutes" value={timeLeft.minutes} />
            </div>
            <div aria-label="seconds remaining">
              <CountdownBox label="Seconds" value={timeLeft.seconds} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
