// NoSpecialEvents.jsx
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

const pillPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-indigo-700 transition shadow-sm";
const pillOutline =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 border border-gray-300 text-gray-800 text-xs font-bold uppercase tracking-widest hover:border-gray-900 hover:text-gray-900 transition";

const serviceTimes = [
  { name: "Sunday Service", time: "10:00 AM" },
  { name: "Midweek Service", time: "Wednesday · 7:00 PM" },
  { name: "Prayer Meeting", time: "Weekdays · 6:00 AM, 12 Noon, 6:00 PM" },
];

export default function NoSpecialEvents() {
  const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-900 bg-[#F6F4E8] pt-16 min-h-screen">
      <section className="py-20 px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-600 mb-4">
              Special Program
            </p>
            <h1 className="font-raleway text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              No Special Events Right Now
            </h1>
            <p className="mt-5 text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl">
              Please check back soon for upcoming programs and announcements.
            </p>
          </div>

          <div className="mt-16 grid lg:grid-cols-2 gap-12">
            {/* Weekly Services */}
            <div className="border-t-2 border-amber-400 pt-6">
              <h2 className="font-raleway text-lg font-bold text-gray-900 mb-1">
                Weekly Services
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Join us for our regular weekly services and fellowship.
              </p>

              <div>
                {serviceTimes.map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0"
                  >
                    <span className="text-sm text-gray-700">{s.name}</span>
                    <span className="text-sm font-semibold text-amber-700">{s.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stay Connected */}
            <div className="border-t-2 border-indigo-400 pt-6">
              <h2 className="font-raleway text-lg font-bold text-gray-900 mb-1">
                Stay Connected
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Watch live services, revisit sermons, or contact us for updates.
              </p>

              <div className="flex flex-wrap gap-3">
                <button onClick={() => navigate("/live-service")} className={pillPrimary}>
                  Watch Live
                </button>
                <button onClick={() => navigate("/sermons")} className={pillOutline}>
                  View Sermons
                </button>
                <button onClick={() => navigate("/contact")} className={pillOutline}>
                  Contact Us
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button onClick={() => navigate(-1)} className={pillOutline}>
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Go Back
                </button>
                <button onClick={() => navigate("/")} className={pillOutline}>
                  <Home className="h-3.5 w-3.5" />
                  Home
                </button>
              </div>
            </div>
          </div>

          {/* Notify banner */}
          <div className="mt-16 bg-white border border-gray-200 p-8 max-w-2xl">
            <h3 className="font-raleway text-sm font-bold text-gray-900 mb-2">
              Want to be notified when the next program is announced?
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Follow our updates on social media or use the Contact page to reach the church office.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
