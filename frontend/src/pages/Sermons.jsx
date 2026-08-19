const episodes = [
  {
    url: "https://open.spotify.com/embed/episode/5K9EWavoZmjmVEQq9Rs7U4",
    title: "Made on Purpose: Introduction",
    date: "February 6, 2026",
    series: "Made On Purpose",
  },
  {
    url: "https://open.spotify.com/embed/episode/0NcQPwP9I04nvbqDZvlfXp",
    title: "Compound Effect of the Word",
    date: "January 30, 2026",
    series: "Compound Effect",
  },
  {
    url: "https://open.spotify.com/embed/episode/5sUpYo4Xf2yCbiHon7HpVn",
    title: "Absolute Success: Part 4",
    date: "September 14, 2025",
    series: "Absolute Success",
  },
  {
    url: "https://open.spotify.com/embed/episode/4U6pBJFh25WD09pZKzYn7M",
    title: "Absolute Success: Part 3",
    date: "September 7, 2025",
    series: "Absolute Success",
  },
  {
    url: "https://open.spotify.com/embed/episode/6FF7owzpv1BiMvypeM3Nl8",
    title: "Absolute Success: Part 2",
    date: "August 31, 2025",
    series: "Absolute Success",
  },
  {
    url: "https://open.spotify.com/embed/episode/1GVyp0WpKooplWP26jTUTi",
    title: "Absolute Success: Part 1",
    date: "August 24, 2025",
    series: "Absolute Success",
  },
];

function SpotifyIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function Arrow({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

export default function SermonsPage() {
  return (
    <div className="font-sans text-gray-900 bg-[#F6F4E8] pt-16">
      {/* Hero */}
      <section className="relative w-full h-[60vh] min-h-[440px] overflow-hidden">
        <img
          src="/images/podcast_HD.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/80" />

        <div className="relative h-full flex items-end">
          <div className="max-w-[1400px] mx-auto px-4 pb-14 w-full">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-300 mb-4">
              Christ Embassy Calgary
            </p>
            <h1 className="font-raleway text-4xl sm:text-5xl font-bold text-white max-w-2xl leading-tight">
              Recent Sermons
            </h1>
            <p className="mt-4 text-white/80 text-base sm:text-lg max-w-xl leading-relaxed">
              Listen to our latest messages and be strengthened in faith, wisdom, and purpose.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white/80 text-xs font-semibold backdrop-blur">
              <SpotifyIcon className="w-4 h-4 text-green-400" />
              Audio messages on Spotify
            </div>
          </div>
        </div>
      </section>

      {/* Episodes */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-600 mb-4">
              Messages
            </p>
            <h2 className="font-raleway text-3xl sm:text-4xl font-bold text-gray-900">
              All Episodes
            </h2>
          </div>

          <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {episodes.map((ep) => (
              <div key={ep.url}>
                <div className="h-[152px] bg-[#121212]">
                  <iframe
                    src={ep.url}
                    width="100%"
                    height="152"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    style={{ border: "none" }}
                    title={ep.title}
                  />
                </div>

                <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                  {ep.date}
                  <span className="mx-1.5 text-gray-300">|</span>
                  {ep.series}
                </p>

                <h3 className="mt-1.5 font-raleway text-lg font-bold text-gray-900 leading-snug">
                  {ep.title}
                </h3>

                <a
                  href={ep.url.replace("open.spotify.com/embed/", "open.spotify.com/")}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition"
                >
                  Listen
                  <Arrow />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
