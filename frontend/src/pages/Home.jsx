import { Link } from "react-router-dom";
import Carousel from "../components/media/Carousel";
import LiveServiceBar from "../components/layout/LiveServiceBar";

const heroImages = [
  "/carousel8.jpg",
  "/carousel5.jpeg",
  "/carousel3.jpg",
  "/carousel7.jpg",
];

const photoStrip = [
  "/images/Choir_HD.jpg",
  "/images/Healingstreams_HD.jpg",
  "/images/Pastor_HD.jpg",
  "/images/PastorMa_HD.jpg",
  "/images/Reverend_HD.jpg",
  "/images/diversity1_HD.jpg",
  "/images/diversity_HD.jpg",
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
    image: "/images/daytime.jpg",
  },
  {
    title: "Midweek Service",
    time: "Wednesdays",
    detail: "7:00 PM",
    image: "/images/nighttime.jpg",
  },
  {
    title: "Communion Service",
    time: "First Sunday",
    detail: "8:00 AM",
    image: "/images/communion.jpg",
  },
];

const sermons = [
  {
    title: "Made on Purpose: Introduction",
    date: "February 6, 2026",
    series: "Made On Purpose",
    image: "/images/sermon.jpg",
  },
  {
    title: "Compound Effect of the Word",
    date: "January 30, 2026",
    series: "Compound Effect",
    image: "/images/sermon.jpg",
  },
  {
    title: "Absolute Success: Part 4",
    date: "September 14, 2025",
    series: "Absolute Success",
    image: "/images/sermon.jpg",
  },
];

const contactDetails = [
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
];

const pillPrimary =
  "inline-flex items-center gap-2 rounded-full px-6 py-3 bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-indigo-700 transition shadow-sm";
const pillOutline =
  "inline-flex items-center gap-2 rounded-full px-6 py-3 border border-gray-300 text-gray-800 text-xs font-bold uppercase tracking-widest hover:border-gray-900 hover:text-gray-900 transition";
const pillPrimaryOnDark =
  "inline-flex items-center gap-2 rounded-full px-6 py-3 bg-white text-gray-900 text-xs font-bold uppercase tracking-widest hover:bg-amber-50 transition shadow-sm";
const pillOutlineOnDark =
  "inline-flex items-center gap-2 rounded-full px-6 py-3 border border-white/30 text-white text-xs font-bold uppercase tracking-widest hover:border-white hover:bg-white/10 transition";

function Arrow({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="font-sans text-gray-900 bg-[#F6F4E8] pt-16">
      <LiveServiceBar />
      <Carousel images={heroImages} interval={5000} />

      {/* Welcome */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-600 mb-4">
              Welcome to Christ Embassy Calgary
            </p>
            <h1 className="font-raleway text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              A church home where faith grows, community deepens, and lives are transformed.
            </h1>
            <p className="mt-5 text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl">
              Join us in worship, the Word, and fellowship — wherever you are on your journey with God.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/live-service" className={pillPrimary}>
                Watch Live
              </Link>
              <Link to="/contact" className={pillOutline}>
                Plan a Visit
              </Link>
            </div>
          </div>

        </div>

        {/* Photo strip — full-bleed, auto-scrolling */}
        <div className="mt-14 relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden">
          <div className="flex w-max animate-marquee">
            {[...photoStrip, ...photoStrip].map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="w-56 sm:w-64 md:w-72 aspect-[3/4] shrink-0 mx-2 overflow-hidden bg-gray-100"
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision · Mission · Purpose */}
      <section className="py-20 px-4 bg-[#F6F4E8]">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-600 mb-4">
              Our Foundation
            </p>
            <h2 className="font-raleway text-3xl sm:text-4xl font-bold text-gray-900">
              Vision · Mission · Purpose
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-3 md:gap-12">
            {foundation.map((item) => (
              <div key={item.title} className="border-t-2 border-amber-400 pt-6">
                <div className="text-amber-600 mb-4">{item.icon}</div>
                <h3 className="font-raleway text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Schedule */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-2">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-600 mb-4">
              Weekly Schedule
            </p>
            <h2 className="font-raleway text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Join us in worship, the Word, and fellowship throughout the week.
            </h2>
            <Link to="/live-service" className={`${pillPrimary} mt-8`}>
              Watch Live
            </Link>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-4">
            {services.map((s) => (
              <Link
                to="/live-service"
                key={s.title}
                className="group relative h-28 rounded-2xl overflow-hidden flex items-center justify-between gap-6 px-6"
              >
                <img
                  src={s.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />

                <div className="relative">
                  <p className="font-raleway font-bold text-white text-lg">{s.title}</p>
                  <p className="text-sm text-white/70">{s.time}</p>
                </div>
                <div className="relative flex items-center gap-4">
                  <span className="font-raleway text-2xl sm:text-3xl font-bold text-white">{s.detail}</span>
                  <Arrow className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Sermons */}
      <section className="py-20 px-4 bg-[#F6F4E8]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-600 mb-4">
                Messages
              </p>
              <h2 className="font-raleway text-3xl sm:text-4xl font-bold text-gray-900">
                Recent Sermons
              </h2>
            </div>
            <Link to="/sermons" className={pillOutline}>
              View All Sermons
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sermons.map((sermon) => (
              <Link
                key={sermon.title}
                to="/sermons"
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-900 shadow-sm hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src={sermon.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/15 border border-white/30 backdrop-blur flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-amber-300 mb-2">
                    {sermon.series}
                  </span>
                  <h3 className="font-raleway text-lg font-bold text-white leading-snug">
                    {sermon.title}
                  </h3>
                  <p className="mt-2 text-xs text-white/60">{sermon.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Partner / Giving */}
      <section className="bg-gray-950 text-white">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 items-center">
          <div className="px-4 py-20 lg:pr-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-400 mb-4">
              Partner With Us
            </p>
            <h2 className="font-raleway text-3xl sm:text-4xl font-bold leading-tight">
              Partner With Christ Embassy Calgary
            </h2>

            <blockquote className="mt-6">
              <p className="text-white/70 italic text-sm sm:text-base leading-relaxed">
                "And God is able to make all grace abound to you, so that having all sufficiency in all things at all times, you may abound in every good work."
              </p>
              <footer className="mt-2 text-amber-400 font-bold text-sm">
                2 Corinthians 9:8 (ESV)
              </footer>
            </blockquote>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/giving" className={pillPrimaryOnDark}>
                Give Now
              </Link>
              <Link to="/contact" className={pillOutlineOnDark}>
                Need Help?
              </Link>
            </div>
          </div>

          <div className="h-72 lg:h-full">
            <img src="/carousel4.jpg" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-4 bg-[#F6F4E8]">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-600 mb-4">
              Reach Us
            </p>
            <h2 className="font-raleway text-3xl sm:text-4xl font-bold text-gray-900 mb-5">
              Contact Us
            </h2>
            <p className="text-gray-600 max-w-md leading-relaxed">
              Have a question, need prayer, or want to learn more about Christ Embassy Calgary?
              We'd love to hear from you.
            </p>
            <Link to="/contact" className={`${pillPrimary} mt-8`}>
              Send a Message
            </Link>
          </div>

          <div className="bg-white border border-gray-200 p-8 space-y-5">
            {contactDetails.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="shrink-0 mt-0.5 w-9 h-9 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                  {item.icon}
                </div>
                <p className="text-gray-700 text-sm sm:text-base pt-1.5">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-16" />
    </div>
  );
}
