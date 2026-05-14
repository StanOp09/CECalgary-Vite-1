export default function GivingHero() {
  return (
    <div className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-800 px-4 pt-20 pb-16 text-center relative overflow-hidden">
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />

      <div className="relative max-w-2xl mx-auto">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-300 mb-3">
          Christ Embassy Calgary
        </p>
        <h1 className="font-raleway text-3xl sm:text-4xl font-bold text-white mb-5">
          Give Online
        </h1>

        <blockquote>
          <p className="text-indigo-100 italic text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            "For I can testify that they gave not only what they could afford, but far more.
            And they did it of their own free will."
          </p>
          <footer className="mt-2 text-amber-300 font-bold text-sm">
            2 Corinthians 8:3 (NLT)
          </footer>
        </blockquote>

        {/* Trust badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {[
            { label: "Secure Payments", color: "bg-white/10 text-white/80" },
            { label: "One-Time or Recurring", color: "bg-white/10 text-white/80" },
            { label: "Manage Anytime", color: "bg-white/10 text-white/80" },
          ].map((b) => (
            <span
              key={b.label}
              className={`${b.color} border border-white/20 text-xs font-semibold px-4 py-1.5 rounded-full`}
            >
              {b.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
