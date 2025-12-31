import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import LiveServiceBar from "../components/LiveServiceBar";

export default function HomePage() {
  const heroImages = [
    "/carousel1.jpg",
    "/carousel2.jpg",
    "/carousel3.jpg",
    "/carousel4.jpg",
  ];

  return (
    <div className="mb-12 font-sans text-gray-800">
      {/* Live Service Indicator */}
      <LiveServiceBar />
      {/* Hero Section */}
      <Carousel images={heroImages} interval={5000} />

      {/* Vision, Mission, Purpose Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto text-center">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Vision */}
          <div className="p-6 rounded shadow-lg transition bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-white">
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p>
              To take the divine presence of God to the people of the world and
              to demonstrate the character of the Holy Spirit.
            </p>
          </div>

          {/* Mission */}
          <div className="p-6 rounded shadow-lg transition bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-white">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p>
              To raise generations of men and women who will come into their
              inheritance to fulfill God&apos;s dream.
            </p>
          </div>

          {/* Purpose */}
          <div className="p-6 rounded shadow-lg transition bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-white">
            <h2 className="text-2xl font-semibold mb-4">Our Purpose</h2>
            <p>To bring them into their inheritance.</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Services</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="p-6 rounded shadow-lg transition bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-white hover:scale-105 hover:brightness-110">
              <h3 className="font-semibold text-xl mb-2">Sunday Service</h3>
              <p>Sundays at 10:00 AM</p>
            </div>
            <div className="p-6 rounded shadow-lg transition bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-white hover:scale-105 hover:brightness-110">
              <h3 className="font-semibold text-xl mb-2">Midweek Service</h3>
              <p>Wednesdays at 7:00 PM</p>
            </div>
            <div className="p-6 rounded shadow-lg transition bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-white hover:scale-105 hover:brightness-110">
              <h3 className="font-semibold text-xl mb-2">Communion Service</h3>
              <p>First Sunday of the Month at 8:00 AM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sermons Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4 text-gray-900">
            Recent Sermons
          </h2>
          <p className="text-gray-600 mb-12">
            Be blessed by our latest messages and teachings
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Card */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Absolute Success: Part 4
              </h3>
              <p className="text-gray-500 text-sm mb-4">September 14, 2025</p>

              <Link
                to="/sermons"
                className="inline-block mt-auto px-4 py-2 rounded-full 
                     bg-indigo-600 text-white text-sm font-medium
                     hover:bg-indigo-700 transition"
              >
                Watch Sermon →
              </Link>
            </div>

            {/* Card */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Absolute Success: Part 3
              </h3>
              <p className="text-gray-500 text-sm mb-4">June 26, 2025</p>

              <Link
                to="/sermons"
                className="inline-block px-4 py-2 rounded-full 
                     bg-indigo-600 text-white text-sm font-medium
                     hover:bg-indigo-700 transition"
              >
                Watch Sermon →
              </Link>
            </div>

            {/* Card */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Absolute Success: Part 2
              </h3>
              <p className="text-gray-500 text-sm mb-4">June 19, 2025</p>

              <Link
                to="/sermons"
                className="inline-block px-4 py-2 rounded-full 
                     bg-indigo-600 text-white text-sm font-medium
                     hover:bg-indigo-700 transition"
              >
                Watch Sermon →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Giving Section */}
      <section className="bg-indigo-600 text-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Support Christ Embassy Calgary Church
        </h2>
        <p className="mb-6">
          Your generous giving helps us continue our mission and reach our
          community.
        </p>
        <Link
          to="/giving"
          className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded hover:bg-gray-100"
        >
          Give Now
        </Link>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <p className="mb-4">2925 10 Ave NE, Calgary, AB T2A 5L4</p>
        <p className="mb-4">Phone: +1 (825) 733-5884</p>
        <p>Email: cecalgarychurch@gmail.com</p>
        <div className="mt-6">
          <Link
            to="/contact"
            className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700"
          >
            Send a Message
          </Link>
        </div>
      </section>
    </div>
  );
}
