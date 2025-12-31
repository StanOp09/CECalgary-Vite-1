export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 pb-20 font-sans text-gray-800">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8 text-center mt-16">
        About Christ Embassy Calgary Church
      </h1>

      {/* Brief History Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our History</h2>
        <p className="text-gray-700 mb-2">
          Our church was founded in 1985 with the vision of creating a welcoming
          community where people could grow spiritually and support one another.
          Over the years, we have expanded our ministries to include youth
          programs, community outreach, and weekly worship services that bring
          people together from all walks of life.
        </p>
        <p className="text-gray-700">
          From a small congregation of just 30 members, we have grown into a
          vibrant community of over 500 active participants. Our church has been
          a pillar in the local area, hosting events, workshops, and service
          projects to positively impact the lives of those around us.
        </p>
      </section>

      {/* Vision Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
        <p className="text-gray-700">
          To take the divine presence of God to the people of the world and to
          demonstrate the character of the Holy Spirit.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700">
          To raise generations of men and women who will come into their
          inheritance to fulfill God&apos;s dream.
        </p>
      </section>

      {/* Purpose Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Purpose</h2>
        <p className="text-gray-700">To bring them into their inheritance</p>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Join Us</h2>
        <p className="text-gray-700 mb-4">
          Come and experience our community, worship with us, and be part of
          something bigger. Everyone is welcome!
        </p>
        <a
          href="/contact"
          className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
}
