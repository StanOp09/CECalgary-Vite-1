// NoSpecialEvents.jsx
import { useNavigate } from "react-router-dom";
import { CalendarX2, ArrowLeft, Home } from "lucide-react";

export default function NoSpecialEvents() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-indigo-50 via-white to-gray-100 font-sans">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:py-20">
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl ring-1 ring-black/5 p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center">
              <CalendarX2 className="h-6 w-6 text-indigo-700" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                No Special Events Right Now
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Please check back soon for upcoming programs and announcements.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h2 className="text-base font-semibold text-gray-900">
                Weekly Services
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Join us for our regular weekly services and fellowship.
              </p>

              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-medium">Sunday Service</span>
                  <span className="text-gray-600">10:00 AM</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="font-medium">Midweek Service</span>
                  <span className="text-gray-600">Wednesday • 7:00 PM</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="font-medium">Prayer Meeting</span>
                  <span className="text-gray-600">
                    Weekdays • 6:00 AM, 12 Noon, 6:00 PM
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                Update these times to match your church schedule.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h2 className="text-base font-semibold text-gray-900">
                Stay Connected
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Watch live services, revisit sermons, or contact us for updates.
              </p>

              <div className="mt-5 grid gap-3">
                <button
                  onClick={() => navigate("/live-service")}
                  className="w-full rounded-xl bg-gray-900 text-white py-3 text-sm font-semibold hover:bg-gray-800 transition"
                >
                  Watch Live
                </button>

                <button
                  onClick={() => navigate("/sermons")}
                  className="w-full rounded-xl bg-white border border-gray-200 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition"
                >
                  View Sermons
                </button>

                <button
                  onClick={() => navigate("/contact")}
                  className="w-full rounded-xl bg-white border border-gray-200 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition"
                >
                  Contact Us
                </button>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 text-white py-3 text-sm font-semibold hover:bg-indigo-700 transition"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Go Back
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600/10 text-indigo-800 py-3 text-sm font-semibold hover:bg-indigo-600/15 transition"
                >
                  <Home className="h-4 w-4" />
                  Home
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-indigo-50 border border-indigo-100 p-5">
            <h3 className="text-sm font-semibold text-indigo-900">
              Want to be notified when the next program is announced?
            </h3>
            <p className="text-sm text-indigo-800/80 mt-1">
              Follow our updates on social media or use the Contact page to
              reach the church office.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
