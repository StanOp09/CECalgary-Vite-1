// import { Outlet } from "react-router-dom";
// import ImageCard from "../components/ImageCard";
// import CenteredImageCard from "../components/CenteredImageCard";

// export default function MinimalLayout() {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
//       <ImageCard
//         imageSrc="/new-year-bg.jpg"
//         title="NEW YEAR'S EVE"
//         // description="This is a description."
//       />
//       <CenteredImageCard imageSrc="/new-year-card.jpeg" />
//       <Outlet />
//     </div>
//   );
// }

// import { Outlet } from "react-router-dom";
// import ImageCard from "../components/ImageCard";
// import CenteredImageCard from "../components/CenteredImageCard";

// export default function MinimalLayout() {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-start bg-black px-4 pt-8">
//       {/* Top full-width image card with countdown */}
//       <ImageCard imageSrc="/new-year-bg.jpg" title="NEW YEAR'S EVE" />

//       {/* Centered image card */}
//       <CenteredImageCard imageSrc="/new-year-card.jpeg" />

//       {/* Stylish text */}
//       <div className="text-center mt-8 max-w-3xl">
//         <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
//           Save Your Spot for an Unforgettable Event!
//         </h2>
//         <p className="text-lg sm:text-xl text-gray-300">
//           Join us on December 31st for an evening full of celebration, worship,
//           and insight into the Glorious Year 2026. Reserve your seat now to be
//           part of the festivities.
//         </p>
//       </div>

//       {/* Registration button / form */}
//       <div className="w-full flex justify-center">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ImageCard from "../components/ImageCard";
import CenteredImageCard from "../components/CenteredImageCard";

export default function MinimalLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-black px-4 pt-6 sm:pt-8 relative">
      {/* 🔒 Admin-only button */}
      <button
        onClick={() => navigate("/admin/login")}
        className="fixed top-4 right-4 
    z-50
    text-xs sm:text-sm 
    text-gray-300 hover:text-white 
    border border-gray-500 
    px-3 py-1
    mr-8 -mt-3
    rounded-md 
    transition
    bg-black/40 backdrop-blur"
      >
        Admin Only
      </button>
      {/* Full-width image card with countdown */}
      <ImageCard imageSrc="/new-year-bg.jpg" title="NEW YEAR'S EVE" />

      {/* Centered image card */}
      <CenteredImageCard imageSrc="/new-year-card1.png" />

      {/* Stylish text */}
      <div className="text-center mt-6 sm:mt-8 max-w-3xl px-2 sm:px-0">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
          Save Your Spot for an Unforgettable Event!
        </h2>
        <p className="text-sm sm:text-lg md:text-xl text-gray-300">
          Join us on December 31st for an evening full of celebration, worship,
          and insight into the Glorious Year 2026. Reserve your seat now to be
          part of the festivities.
        </p>
      </div>

      {/* Registration button / form */}
      <div className="w-full flex justify-center mt-6 sm:mt-8">
        <Outlet />
      </div>
    </div>
  );
}
