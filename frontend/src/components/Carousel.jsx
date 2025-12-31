import { useState, useEffect } from "react";

export default function Carousel({ images, interval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={img}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      {/* Optional: Add overlay content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Welcome to Christ Embassy
        </h1>
        <p className="text-lg sm:text-xl mb-6">
          Join us in worship, community, and service.
        </p>
        {/* <a
          href="/givings"
          className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded hover:bg-gray-100"
        >
          Give Now
        </a> */}
      </div>
    </div>
  );
}
