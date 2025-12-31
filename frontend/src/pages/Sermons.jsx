export default function SermonsPage() {
  // Convert the URLs to embed URLs
  const episodes = [
    "https://open.spotify.com/embed/episode/5sUpYo4Xf2yCbiHon7HpVn",
    "https://open.spotify.com/embed/episode/4U6pBJFh25WD09pZKzYn7M",
    "https://open.spotify.com/embed/episode/6FF7owzpv1BiMvypeM3Nl8",
    "https://open.spotify.com/embed/episode/1GVyp0WpKooplWP26jTUTi",
    "https://open.spotify.com/embed/episode/0gJKgbwCstkIJEq6dK6clq",
    "https://open.spotify.com/embed/episode/66EYBlQVw0LCMmIr2zn7Ta",
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans text-gray-800 mb-16">
      <h1 className="text-4xl font-bold mb-4 text-center text-indigo-700">
        Recent Sermons
      </h1>

      <p className="text-center text-gray-700 mb-12 text-lg">
        Listen to our latest messages below. Stay inspired and grow in faith.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {episodes.map((url, index) => (
          <iframe
            key={index}
            src={url}
            width="100%"
            height="232"
            frameBorder="0"
            allow="encrypted-media"
            className="rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            title={`Sermon Episode ${index + 1}`}
          ></iframe>
        ))}
      </div>
    </div>
  );
}
