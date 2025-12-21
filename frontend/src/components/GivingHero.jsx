export default function GivingHero() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 max-w-6xl mx-auto mt-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
          Give Online
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto">
          Your generosity helps us serve our community, support ministry
          programs, and share hope. Choose a category below or explore other
          ways to give.
        </p>
      </div>

      {/* Trust badges */}
      {/* <div className="flex flex-wrap justify-center gap-4 mb-12">
        <span className="bg-blue-50 px-6 py-2 rounded-lg text-sm font-medium text-blue-700">
          Secure Payments
        </span>
        <span className="bg-green-50 px-6 py-2 rounded-lg text-sm font-medium text-green-700">
          One-Time or Monthly
        </span>
        <span className="bg-purple-50 px-6 py-2 rounded-lg text-sm font-medium text-purple-700">
          Manage Giving Anytime
        </span>
      </div> */}
    </div>
  );
}
