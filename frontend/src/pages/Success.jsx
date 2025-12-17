export default function Success() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-green-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-green-700">Thank You!</h1>
        <p className="mb-6">
          Your giving has been successfully processed. We appreciate your
          support.
        </p>
        <a
          href="/giving"
          className="inline-block bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition"
        >
          Return to Giving Page
        </a>
      </div>
    </div>
  );
}
