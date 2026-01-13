import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import LiveServiceBar from "../components/LiveServiceBar";

export default function HomePage() {
  const heroImages = [
    "/carousel1.jpg",
    "/carousel5.jpeg",
    "/carousel2.jpg",
    "/carousel6.jpg",
    "/carousel3.jpg",
    "/carousel7.jpg",
    "/carousel4.jpg",
  ];

  return (
    <div className="mb-12 font-sans text-gray-900 bg-[#F6F4E8] pt-16">
      {/* Live Service Indicator */}
      <LiveServiceBar />

      {/* Hero Section */}
      <Carousel images={heroImages} interval={5000} />

      {/* Vision, Mission, Purpose Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest text-indigo-700 uppercase">
            Our Foundation
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900">
            Vision • Mission • Purpose
          </h2>
          <p className="mt-3 text-gray-700 max-w-2xl mx-auto">
            What drives us, shapes us, and keeps us focused on God’s dream.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Our Vision",
                text: "To take the divine presence of God to the people of the world and to demonstrate the character of the Holy Spirit.",
              },
              {
                title: "Our Mission",
                text: "To raise generations of men and women who will come into their inheritance to fulfill God’s dream.",
              },
              {
                title: "Our Purpose",
                text: "To bring them into their inheritance.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-amber-100 bg-white/70 backdrop-blur shadow-sm hover:shadow-xl transition overflow-hidden"
              >
                <div className="h-1.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600" />
                <div className="p-7">
                  <h3 className="text-xl font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-gray-700 leading-relaxed">
                    {item.text}
                  </p>

                  <div className="mt-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                  <p className="mt-4 text-sm text-gray-500">
                    Christ Embassy Calgary
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-indigo-50/70 to-[#F6F4E8]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest text-indigo-700 uppercase">
            Weekly Schedule
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900">
            Our Services
          </h2>
          <p className="mt-3 text-gray-700 max-w-2xl mx-auto">
            Join us in worship, the Word, and fellowship throughout the week.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title: "Sunday Service", time: "Sundays at 10:00 AM" },
              { title: "Midweek Service", time: "Wednesdays at 7:00 PM" },
              { title: "Communion Service", time: "First Sunday at 8:00 AM" },
            ].map((s) => (
              <div
                key={s.title}
                className="rounded-2xl bg-white border border-indigo-100 shadow-sm hover:shadow-xl transition hover:-translate-y-1"
              >
                <div className="p-7">
                  <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-amber-100 text-amber-800">
                    Service
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-gray-900">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-gray-700">{s.time}</p>

                  <div className="mt-6 flex justify-center">
                    <Link
                      to="/live-service"
                      className="text-sm font-semibold text-indigo-700 hover:text-indigo-900"
                    >
                      View Live Service →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sermons Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest text-indigo-700 uppercase">
            Messages
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900">
            Recent Sermons
          </h2>
          <p className="mt-3 text-gray-700 mb-12 max-w-2xl mx-auto">
            Be blessed by our latest messages and teachings.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title: "Absolute Success: Part 4", date: "September 14, 2025" },
              { title: "Absolute Success: Part 3", date: "June 26, 2025" },
              { title: "Absolute Success: Part 2", date: "June 19, 2025" },
            ].map((sermon) => (
              <div
                key={sermon.title}
                className="group rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition hover:-translate-y-1 overflow-hidden"
              >
                <div className="h-1.5 bg-gradient-to-r from-indigo-600 to-amber-500" />
                <div className="p-7">
                  <h3 className="text-lg font-bold text-gray-900">
                    {sermon.title}
                  </h3>
                  <p className="mt-2 text-gray-600 text-sm">{sermon.date}</p>

                  <Link
                    to="/sermons"
                    className="mt-6 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold
                               bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-sm"
                  >
                    Watch Sermon →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Giving Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl p-10 sm:p-12 text-center text-white shadow-2xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-700">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,white,transparent_55%)]" />

            <h2 className="relative text-3xl sm:text-4xl font-extrabold">
              Support Christ Embassy Calgary Church
            </h2>
            <p className="relative mt-3 text-white/90 max-w-2xl mx-auto">
              Your generous giving helps us continue our mission and reach our
              community.
            </p>

            <div className="relative mt-8 flex justify-center gap-3 flex-wrap">
              <Link
                to="/giving"
                className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold
                           bg-white text-indigo-700 hover:bg-gray-100 transition"
              >
                Give Now
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold
                           bg-white/10 hover:bg-white/15 border border-white/20 transition"
              >
                Need Help?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#F6F4E8] to-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest text-indigo-700 uppercase">
            Reach Us
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900">
            Contact Us
          </h2>

          <div className="mt-8 mx-auto max-w-2xl rounded-2xl bg-white border border-amber-100 shadow-sm p-7">
            <p className="text-gray-900 font-semibold">
              2925 10 Ave NE, Calgary, AB T2A 5L4
            </p>
            <p className="mt-2 text-gray-700">Phone: +1 (825) 733-5884</p>
            <p className="mt-2 text-gray-700">
              Email: cecalgarychurch@gmail.com
            </p>

            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold
                           bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-sm"
              >
                Send a Message
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="h-12" />
    </div>
  );
}
