import { Link } from "react-router-dom";
import Carousel from "../components/media/Carousel";
import LiveServiceBar from "../components/layout/LiveServiceBar";

const heroImages = [
  "/carousel8.jpg",
  "/carousel5.jpeg",
  "/carousel3.jpg",
  "/carousel7.jpg",
];

const foundation = [
  {
    title: "Our Vision",
    text: "To take the divine presence of God to the people of the world and to demonstrate the character of the Holy Spirit.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M1.5 12s4-7.5 10.5-7.5S22.5 12 22.5 12s-4 7.5-10.5 7.5S1.5 12 1.5 12z" />
        <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Our Mission",
    text: "To raise generations of men and women who will come into their inheritance to fulfill God's dream.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l1.664 9.169A2 2 0 006.64 14H12m0 0v6m0-6h5.36a2 2 0 001.976-1.831L21 6H6" />
      </svg>
    ),
  },
  {
    title: "Our Purpose",
    text: "To bring them into their inheritance — walking fully in God's plan and calling for their lives.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
];

const services = [
  {
    title: "Sunday Service",
    time: "Sundays",
    detail: "10:00 AM",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="4" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
    color: "from-amber-400 to-yellow-500",
    bg: "bg-amber-50",
    text: "text-amber-700",
  },
  {
    title: "Midweek Service",
    time: "Wednesdays",
    detail: "7:00 PM",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    ),
    color: "from-indigo-500 to-indigo-600",
    bg: "bg-indigo-50",
    text: "text-indigo-700",
  },
  {
    title: "Communion Service",
    time: "First Sunday",
    detail: "8:00 AM",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    color: "from-rose-400 to-rose-500",
    bg: "bg-rose-50",
    text: "text-rose-700",
  },
];

const sermons = [
  { title: "Made on Purpose: Introduction", date: "February 6, 2026" },
  { title: "Compound Effect of the Word", date: "January 30, 2026" },
  { title: "Absolute Success: Part 4", date: "September 14, 2025" },
];

export default function HomePage() {
  return (
    <div className="font-sans text-gray-900 bg-[#F6F4E8] pt-16">
      <LiveServiceBar />
      <Carousel images={heroImages} interval={5000} />

      {/* Vision · Mission · Purpose */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-600">
              Our Foundation
            </p>
            <h2 className="mt-2 font-raleway text-3xl sm:text-4xl font-bold text-gray-900">
              Vision · Mission · Purpose
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
              What drives us, shapes us, and keeps us focused on God's dream.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {foundation.map((item) => (
              <div
                key={item.title}
                className="group relative rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500" />
                <div className="p-7">
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-amber-50 text-amber-600 mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-raleway text-lg font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-3 text-gray-600 text-sm leading-relaxed">{item.text}</p>
                  <p className="mt-5 text-xs font-semibold tracking-widest text-gray-300 uppercase">
                    Christ Embassy Calgary
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-600">
              Weekly Schedule
            </p>
            <h2 className="mt-2 font-raleway text-3xl sm:text-4xl font-bold text-gray-900">
              Our Services
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
              Join us in worship, the Word, and fellowship throughout the week.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden"
              >
                <div className={`h-1.5 bg-gradient-to-r ${s.color}`} />
                <div className="p-7">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${s.bg} ${s.text} mb-4`}>
                    {s.icon}
                  </div>
                  <h3 className="font-raleway text-lg font-bold text-gray-900">{s.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{s.time}</p>
                  <p className={`mt-1 text-2xl font-extrabold ${s.text}`}>{s.detail}</p>
                  <Link
                    to="/live-service"
                    className={`mt-5 inline-flex items-center gap-1 text-sm font-semibold ${s.text} hover:underline`}
                  >
                    Watch live
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Sermons */}
      <section className="py-20 px-4 bg-[#F6F4E8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-600">
              Messages
            </p>
            <h2 className="mt-2 font-raleway text-3xl sm:text-4xl font-bold text-gray-900">
              Recent Sermons
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
              Be blessed by our latest messages and teachings.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sermons.map((sermon) => (
              <Link
                key={sermon.title}
                to="/sermons"
                className="group rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden block"
              >
                {/* Thumbnail-style top */}
                <div className="relative h-28 bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/15 border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div className="absolute top-3 right-3 text-[10px] font-bold tracking-widest uppercase text-white/60">
                    Sermon
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-xs text-gray-400 mb-1">{sermon.date}</p>
                  <h3 className="font-raleway text-base font-bold text-gray-900 leading-snug group-hover:text-indigo-700 transition-colors">
                    {sermon.title}
                  </h3>
                  <p className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600">
                    Watch now
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/sermons"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold border border-gray-300 text-gray-700 hover:border-indigo-400 hover:text-indigo-700 transition"
            >
              View all sermons
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Partner / Giving */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-800 text-white shadow-2xl">
            {/* Decorative circles */}
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/5" />

            <div className="relative px-8 py-14 sm:px-14 text-center">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-300 mb-3">
                Partner With Us
              </p>
              <h2 className="font-raleway text-3xl sm:text-4xl font-bold leading-tight">
                Partner With Christ Embassy Calgary
              </h2>

              <blockquote className="mt-6 max-w-2xl mx-auto">
                <p className="text-white/85 italic text-sm sm:text-base leading-relaxed">
                  "And God is able to make all grace abound to you, so that having all sufficiency in all things at all times, you may abound in every good work."
                </p>
                <footer className="mt-2 text-amber-300 font-bold text-sm">
                  2 Corinthians 9:8 (ESV)
                </footer>
              </blockquote>

              <div className="mt-8 flex justify-center gap-3 flex-wrap">
                <Link
                  to="/giving"
                  className="inline-flex items-center gap-2 rounded-xl px-7 py-3 font-semibold
                             bg-white text-indigo-700 hover:bg-amber-50 transition shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  Give Now
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl px-7 py-3 font-semibold
                             bg-white/10 hover:bg-white/20 border border-white/20 transition"
                >
                  Need Help?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-4 bg-[#F6F4E8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-600">
              Reach Us
            </p>
            <h2 className="mt-2 font-raleway text-3xl sm:text-4xl font-bold text-gray-900">
              Contact Us
            </h2>
          </div>

          <div className="mx-auto max-w-xl rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500" />
            <div className="p-8 space-y-5">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  ),
                  label: "2925 10 Ave NE, Calgary, AB T2A 5L4",
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  ),
                  label: "+1 (825) 733-5884",
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  ),
                  label: "cecalgarychurch@gmail.com",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="shrink-0 mt-0.5 w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base pt-1.5">{item.label}</p>
                </div>
              ))}

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold
                             bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                  Send a Message
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-16" />
    </div>
  );
}
