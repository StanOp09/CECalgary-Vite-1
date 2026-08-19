import LocationMap from "../components/layout/LocationMap";

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm " +
  "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition";

const contactDetails = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: "Address",
    value: "2925 10 Ave NE, Calgary, AB T2A 5L4",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    label: "Phone",
    value: "+1 (825) 733-5884",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: "Email",
    value: "cecalgarychurch@gmail.com",
  },
];

const serviceTimes = [
  { name: "Sunday Service", time: "10:00 AM" },
  { name: "Midweek Service", time: "Wed · 7:00 PM" },
  { name: "Communion", time: "1st Sunday · 8:00 AM" },
];

export default function ContactPage() {
  return (
    <div className="font-sans text-gray-900 bg-[#F6F4E8] pt-16">
      {/* Header */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-600 mb-4">
              Get In Touch
            </p>
            <h1 className="font-raleway text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Contact Us
            </h1>
            <p className="mt-5 text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl">
              We'd love to hear from you. Fill out the form and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="aspect-[4/3] overflow-hidden">
            <img
              src="/images/diversity_HD.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Details + Form */}
      <section className="py-20 px-4 bg-[#F6F4E8]">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-5 gap-12 items-start">

          {/* Left — contact info */}
          <div className="lg:col-span-2 space-y-12">
            <div className="border-t-2 border-amber-400 pt-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
                Contact Details
              </h3>
              <div className="space-y-5">
                {contactDetails.map((d) => (
                  <div key={d.label} className="flex items-start gap-4">
                    <div className="shrink-0 mt-0.5 text-amber-600">{d.icon}</div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                        {d.label}
                      </p>
                      <p className="text-sm text-gray-800 font-medium">{d.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t-2 border-indigo-400 pt-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
                Service Times
              </h3>
              <div>
                {serviceTimes.map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0"
                  >
                    <span className="text-sm text-gray-700">{s.name}</span>
                    <span className="text-sm font-semibold text-indigo-700">{s.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3 bg-white p-7 sm:p-10">
            <h2 className="font-raleway text-2xl font-bold text-gray-900 mb-1">Send a Message</h2>
            <p className="text-sm text-gray-500 mb-8">All fields are required.</p>

            <form
              action="https://formspree.io/f/mzdbnzqo"
              method="POST"
              className="space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Your Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="name"
                      placeholder="First Last"
                      required
                      className={`${inputCls} pl-10`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      name="email"
                      placeholder="name@email.com"
                      required
                      className={`${inputCls} pl-10`}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Subject
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="subject"
                    placeholder="How can we help?"
                    required
                    className={`${inputCls} pl-10`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  placeholder="Write your message here…"
                  rows={5}
                  required
                  className={`${inputCls} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full py-4 text-xs font-bold uppercase tracking-widest text-white
                           bg-indigo-600 hover:bg-indigo-700 transition shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Map */}
      <section className="h-[420px] sm:h-[480px]">
        <LocationMap />
      </section>
    </div>
  );
}
