export default function ContactPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-gray-100 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-10 sm:p-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center text-indigo-700">
          Contact Us
        </h1>

        <p className="text-center text-gray-600 mb-10 text-base sm:text-lg">
          We’d love to hear from you. Fill out the form below and we’ll get back
          to you as soon as possible.
        </p>

        <form
          action="https://formspree.io/f/mzdbnzqo"
          method="POST"
          className="grid grid-cols-1 gap-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none"
            required
          />

          <button
            type="submit"
            className="mt-2 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
