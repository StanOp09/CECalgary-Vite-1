export default function Cancel() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-red-50 p-6">
      <h1 className="text-3xl font-bold text-red-700 mb-4">
        Payment Cancelled
      </h1>
      <p className="text-lg text-red-800 mb-6 text-center">
        You did not complete your donation. You can try again anytime.
      </p>
      <a
        href="/giving"
        className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
      >
        Back to Giving Page
      </a>
    </div>
  );
}
