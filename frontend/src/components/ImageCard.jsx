// import React, { useState, useEffect } from "react";

// const ImageCard = ({ imageSrc, title, description }) => {
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });

//   useEffect(() => {
//     const targetDate = new Date(
//       `${new Date().getFullYear()}-12-31T23:59:59`
//     ).getTime();

//     const interval = setInterval(() => {
//       const now = new Date().getTime();
//       const distance = targetDate - now;

//       if (distance < 0) {
//         clearInterval(interval);
//         setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//         return;
//       }

//       const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
//       const minutes = Math.floor((distance / (1000 * 60)) % 60);
//       const seconds = Math.floor((distance / 1000) % 60);

//       setTimeLeft({ days, hours, minutes, seconds });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div
//       className="w-full h-64 rounded-lg shadow-lg overflow-hidden relative flex items-center px-8"
//       style={{
//         backgroundImage: `url(${imageSrc})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Overlay for text readability */}
//       <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>

//       {/* Content */}
//       <div className="relative flex w-full justify-between items-center text-white">
//         {/* Title on left/center */}
//         <div className="text-left text-3xl font-bold">
//           {title}
//           {description && (
//             <p className="text-lg font-normal mt-1">{description}</p>
//           )}
//         </div>

//         {/* Countdown on right with spacing */}
//         <div className="flex gap-8 text-3xl font-bold text-right">
//           <span>{timeLeft.days}D</span>
//           <span>{timeLeft.hours}H</span>
//           <span>{timeLeft.minutes}M</span>
//           <span>{timeLeft.seconds}S</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageCard;

import { useState, useEffect } from "react";

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

      if (distance < 0) {
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

  return (
    <div
      className="w-full rounded-lg shadow-lg overflow-hidden relative flex flex-col sm:flex-row items-center sm:items-center px-4 sm:px-8 py-6 sm:py-0"
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>

      <div className="relative flex flex-col sm:flex-row w-full justify-between items-center text-white">
        <div className="text-center sm:text-left text-2xl sm:text-3xl font-bold">
          {title}
          {description && (
            <p className="text-sm sm:text-lg font-normal mt-1">{description}</p>
          )}
        </div>

        <div className="flex gap-4 sm:gap-8 text-xl sm:text-3xl font-bold mt-4 sm:mt-0">
          <span>{timeLeft.days}D</span>
          <span>{timeLeft.hours}H</span>
          <span>{timeLeft.minutes}M</span>
          <span>{timeLeft.seconds}S</span>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
