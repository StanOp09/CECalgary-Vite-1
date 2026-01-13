import { Outlet, useNavigate } from "react-router-dom";
import ImageCard from "../components/ImageCard";
import CenteredImageCard from "../components/CenteredImageCard";
import CenteredVideoCard from "../components/CenteredVideoCard";

export default function MinimalLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#050510] to-black text-white relative">
      {/* 🔒 Admin-only button */}
      <button
        onClick={() => navigate("/admin/login")}
        className="fixed top-4 right-4 z-50 text-xs sm:text-sm
                   text-white/80 hover:text-white
                   bg-white/5 hover:bg-white/10
                   border border-white/15
                   px-3 py-1.5 rounded-lg
                   backdrop-blur-md shadow-lg
                   transition"
      >
        Admin Only
      </button>

      {/* Content wrapper */}
      <div className="px-4 pt-6 sm:pt-10 pb-16 max-w-6xl mx-auto">
        {/* Hero */}
        <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
          <ImageCard imageSrc="/new-year-bg.jpg" title="MIRACLE SERVICE" />
        </div>

        {/* Video */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <div className="w-full max-w-4xl rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
            <CenteredVideoCard
              videoSrc="/MIRACLE SERVICE PROMO 1.mp4"
              poster="/MiracleService.jpeg"
            />
          </div>
        </div>

        {/* Text */}
        <div className="text-center mt-8 sm:mt-10 max-w-3xl mx-auto px-2 sm:px-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Save Your Spot for a Time of the Manifestation of the Sons of God!
          </h2>

          <p className="text-sm sm:text-lg md:text-xl text-white/70 mt-4 leading-relaxed">
            Join us on January 25th for a special Miracle Service filled with
            worship, prayer, and God’s transforming presence. We invite you to
            bring the sick, the weary, and all who desire healing, hope, and
            restoration. Save your seat and come with faith and expectation.
          </p>

          {/* subtle divider */}
          <div className="mt-8 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>

        {/* Image */}
        <div className="mt-10 flex justify-center">
          <div className="w-full max-w-4xl rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
            <CenteredImageCard imageSrc="/MiracleService.jpeg" />
          </div>
        </div>

        {/* Outlet (Registration) */}
        <div className="w-full flex justify-center mt-10">
          <div className="w-full max-w-3xl">
            <Outlet />
          </div>
        </div>
      </div>

      {/* bottom glow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-indigo-500/10 to-transparent" />
    </div>
  );
}
