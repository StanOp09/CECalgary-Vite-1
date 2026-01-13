export default function SermonsPage() {
  const episodes = [
    "https://open.spotify.com/embed/episode/5sUpYo4Xf2yCbiHon7HpVn",
    "https://open.spotify.com/embed/episode/4U6pBJFh25WD09pZKzYn7M",
    "https://open.spotify.com/embed/episode/6FF7owzpv1BiMvypeM3Nl8",
    "https://open.spotify.com/embed/episode/1GVyp0WpKooplWP26jTUTi",
    "https://open.spotify.com/embed/episode/0gJKgbwCstkIJEq6dK6clq",
    "https://open.spotify.com/embed/episode/66EYBlQVw0LCMmIr2zn7Ta",
  ];

  return (
    <section className="relative bg-gradient-to-b from-indigo-50 via-white to-gray-100 py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700 mb-4">
            Recent Sermons
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Listen to our latest messages and be strengthened in faith, wisdom,
            and purpose.
          </p>
        </div>

        {/* Sermons Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {episodes.map((url, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <iframe
                src={url}
                width="100%"
                height="232"
                frameBorder="0"
                allow="encrypted-media"
                className="w-full"
                title={`Sermon Episode ${index + 1}`}
              />

              <div className="px-4 py-3 border-t border-gray-100 bg-white">
                <p className="text-sm font-semibold text-gray-800">
                  Sermon Episode {index + 1}
                </p>
                <p className="text-xs text-gray-500">Audio message • Spotify</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
