import { Outlet, useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Sparkles,
  HeartHandshake,
  Users,
  ArrowRight,
} from "lucide-react";
import ImageCard from "../components/media/ImageCard";
import CenteredImageCard from "../components/media/CenteredImageCard";
import CenteredVideoCard from "../components/media/CenteredVideoCard";
import { PortraitVideoStack } from "../components/media/PortraitVideoStack";

export default function MinimalLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans">
      {/* Color glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

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
      <div className="px-4 pt-6 sm:pt-10 pb-16 max-w-6xl mx-auto relative">
        {/* Hero */}
        <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
          <ImageCard imageSrc="/new-year-bg.jpg" title="MIRACLE SERVICE" />
        </div>

        {/* Quick info pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur">
            <Calendar className="h-4 w-4 text-indigo-300" />
            Sunday, Jan 25 • 10:00 AM
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur">
            <MapPin className="h-4 w-4 text-fuchsia-300" />
            Christ Embassy Calgary
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur">
            <Sparkles className="h-4 w-4 text-emerald-300" />
            Worship • Word • Miracles
          </span>
        </div>

        {/* Pre-video callout */}
        <div className="mt-8 sm:mt-10 text-center max-w-3xl mx-auto">
          <p className="text-white/75 text-sm sm:text-base leading-relaxed">
            Come with <span className="text-white font-semibold">faith</span>{" "}
            and <span className="text-white font-semibold">expectation</span>.
            This is not just another meeting — it’s a moment to encounter God’s
            transforming presence.
          </p>
        </div>
        {/* Color glows */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute top-40 -right-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        {/* Outlet (Registration) — MOVED HERE */}
        <div className="w-full flex justify-center mt-8 sm:mt-10">
          <div className="w-full max-w-3xl rounded-2xl bg-white/5 border border-white/10 p-5 sm:p-6 backdrop-blur">
            <div className="mb-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-semibold">Reserve Your Seat</div>
                  <div className="text-xs text-white/60">
                    Takes less than a minute
                  </div>
                </div>
                <div className="hidden sm:inline-flex items-center gap-2 text-xs text-white/70">
                  Proceed <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              {/* Transportation note */}
              <div className="mt-4 rounded-xl bg-black/50 border border-white/15 px-6 py-4 text-center">
                <div className="text-lg sm:text-xl font-extrabold text-white">
                  Need Transportation?
                </div>

                <div className="mt-1 text-2xl sm:text-3xl font-extrabold">
                  <a
                    href="tel:5872007291"
                    className="text-indigo-300 hover:text-indigo-200 transition"
                  >
                    Call (587) 200-7291
                  </a>
                </div>

                <div className="mt-1 text-xs sm:text-sm text-white/60">
                  Free transportation available for attendees
                </div>
              </div>
            </div>

            <Outlet />
          </div>
        </div>

        {/* Video */}
        <div className="mt-6 sm:mt-8 flex justify-center">
          <div className="w-full max-w-4xl rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
            <CenteredVideoCard
              videoSrc="/MIRACLE SERVICE PROMO 1.mp4"
              poster="/MiracleService.jpeg"
            />
          </div>
        </div>

        {/* Main text */}
        <div className="text-center mt-10 max-w-3xl mx-auto px-2 sm:px-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Save Your Spot for a Time of{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-emerald-300 bg-clip-text text-transparent">
              the Manifestation
            </span>{" "}
            of the Sons of God!
          </h2>

          <p className="text-sm sm:text-lg md:text-xl text-white/70 mt-5 leading-relaxed">
            Join us for a special Miracle Service filled with worship, prayer,
            and the Word. Bring the sick, the weary, and all who desire healing,
            hope, and restoration. Come ready — God’s power is real, and your
            testimony can be next.
          </p>

          {/* subtle divider */}
          <div className="mt-8 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>

        {/* “What to expect” mini-section */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Sparkles className="h-5 w-5 text-indigo-300" />
              What to Expect
            </div>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              Uplifting worship, practical Word, and a tangible atmosphere of
              faith.
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Users className="h-5 w-5 text-fuchsia-300" />
              Bring Someone
            </div>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              Invite a friend or family member. Someone’s miracle could be one
              invitation away.
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur">
            <div className="flex items-center gap-2 text-white font-semibold">
              <HeartHandshake className="h-5 w-5 text-emerald-300" />
              Come Expectant
            </div>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              Arrive early, come with faith, and be ready to receive.
            </p>
          </div>
        </div>

        {/* Video */}
        <div className="mt-6 sm:mt-8 flex justify-center">
          <div className="w-full max-w-4xl rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
            <CenteredVideoCard
              videoSrc="/EXPECTATIONS-MIRACLE-SERVICE.mp4"
              poster="/MiracleService.jpeg"
            />
          </div>
        </div>

        <PortraitVideoStack />

        {/* Image */}
        <div className="mt-10 flex justify-center">
          <div className="w-full max-w-4xl rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
            <CenteredImageCard imageSrc="/MiracleService.jpeg" />
          </div>
        </div>
        {/* Color glows */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute top-40 -right-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        {/* Pre-form encouragement */}
        <div className="mt-10 text-center max-w-2xl mx-auto">
          <p className="text-white/75">
            Seats help us plan well. Register now and invite someone to come
            with you.
          </p>
        </div>
      </div>

      {/* bottom glow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-indigo-500/15 to-transparent" />
    </div>
  );
}
