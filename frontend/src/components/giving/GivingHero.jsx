export default function GivingHero() {
  return (
    <div>
      {/* Photo */}
      <div className="relative w-full h-[70vh] min-h-[480px] overflow-hidden">
        <img
          src="/images/support.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black" />
      </div>

      {/* Black band */}
      <div className="bg-black px-4 py-14">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-400 mb-4">
              Christ Embassy Calgary
            </p>
            <h1 className="font-raleway text-4xl sm:text-5xl font-bold text-white leading-tight">
              Giving is our <span className="italic font-normal text-amber-300">act of worship.</span>
            </h1>

            <blockquote className="mt-5">
              <p className="text-white/70 italic text-sm sm:text-base leading-relaxed max-w-xl">
                "For I can testify that they gave not only what they could afford, but far more.
                And they did it of their own free will."
              </p>
              <footer className="mt-2 text-amber-300 font-bold text-sm">
                2 Corinthians 8:3 (NLT)
              </footer>
            </blockquote>
          </div>

          <a
            href="#ways-to-give"
            className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-amber-50 transition shadow-sm shrink-0 self-start lg:self-end"
          >
            Give Now
          </a>
        </div>

        {/* Trust badges */}
        <div className="max-w-[1400px] mx-auto mt-8 flex flex-wrap gap-3">
          {["Secure Payments", "One-Time or Recurring", "Manage Anytime"].map((label) => (
            <span
              key={label}
              className="text-xs font-semibold text-white/70 bg-white/5 border border-white/15 px-4 py-1.5 rounded-full"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
