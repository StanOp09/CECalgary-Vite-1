// export default function LiveServicePage() {
//   return (
//     <div className="max-w-6xl mx-auto p-6 font-sans text-gray-800">
//       {/* Page Title */}
//       <h1 className="text-4xl font-bold mb-8 text-center">Live Service</h1>

//       {/* Live Video Embed */}
//       <div className="relative pb-[56.25%] mb-8">
//         {/* 16:9 aspect ratio */}
//         <iframe
//           className="absolute top-0 left-0 w-full h-full rounded shadow-lg"
//           src="https://www.youtube.com/embed/bRiYOaUVxuc?autoplay=1"
//           title="Live Church Service"
//           frameBorder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//         ></iframe>
//       </div>

//       {/* Description */}
//       <div className="text-center mb-12">
//         <p className="text-lg text-gray-700 mb-4">
//           Join us live every Sunday and Wednesday for worship, prayer, and the
//           preaching of God’s Word. Experience fellowship and spiritual growth
//           right from the comfort of your home.
//         </p>
//         <p className="text-gray-700">
//           Don’t forget to like, subscribe, and turn on notifications to stay
//           updated on all our services and events.
//         </p>
//       </div>

//       {/* Call to Action */}
//       <div className="text-center">
//         <a
//           href="/contact"
//           className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700"
//         >
//           Get in Touch
//         </a>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import Footer from "../components/Footer";

export default function LiveService() {
  const [isLive, setIsLive] = useState(false);
  const [liveVideoId, setLiveVideoId] = useState(null);

  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

  useEffect(() => {
    if (!API_KEY || !CHANNEL_ID) return;

    const checkLive = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`
        );
        const data = await res.json();

        if (data.items?.length > 0) {
          setIsLive(true);
          setLiveVideoId(data.items[0].id.videoId);
        } else {
          setIsLive(false);
          setLiveVideoId(null);
        }
      } catch (err) {
        console.error("YouTube API error:", err);
        setIsLive(false);
      }
    };

    checkLive();
  }, [API_KEY, CHANNEL_ID]);

  // 🔹 Determine next service day
  const getNextServiceDay = () => {
    const today = new Date().getDay();

    if (today > 0 && today <= 3) {
      return "Wednesday";
    }

    // if (today === 3) {
    //   return "Wednesday";
    // }

    return "Sunday";
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center mb-10 pt-2">
        Live Service
      </h1>

      {/* Live Stream OR Next Service Card */}
      <div className="mb-12">
        {isLive && liveVideoId ? (
          <div className="aspect-video w-full rounded overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${liveVideoId}?autoplay=1`}
              title="Live Service"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white text-center p-10 rounded shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">
              No Live Service Right Now
            </h2>
            <p className="text-lg">
              Next Live Service is on{" "}
              <span className="font-bold">{getNextServiceDay()}</span>
            </p>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="text-center mb-12">
        <p className="text-lg text-gray-700 mb-4">
          Join us live every Sunday and Wednesday for worship, prayer, and the
          preaching of God’s Word. Experience fellowship and spiritual growth
          right from the comfort of your home.
        </p>
        <p className="text-gray-700">
          Don’t forget to like, subscribe, and turn on notifications to stay
          updated on all our services and events.
        </p>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <a
          href="/contact"
          className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700"
        >
          Get in Touch
        </a>
      </div>
      <Footer />
    </div>
  );
}
