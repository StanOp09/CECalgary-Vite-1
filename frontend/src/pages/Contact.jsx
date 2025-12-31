export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center mb-20 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-12">
        <h1 className="text-4xl font-bold mb-4 text-center text-indigo-700">
          Contact Us
        </h1>
        <p className="text-center text-gray-700 mb-10 text-lg">
          We'd love to hear from you! Fill out the form below and we'll get back
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
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none"
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
