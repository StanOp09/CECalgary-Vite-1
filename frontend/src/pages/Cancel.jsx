import { XCircle } from "lucide-react";

export default function Cancel() {
  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-rose-50 via-white to-gray-100 flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 sm:p-10 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-rose-100 text-rose-600 rounded-full p-4">
            <XCircle className="h-10 w-10" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Giving Not Completed
        </h1>

        <p className="text-gray-600 mb-8">
          Your donation wasn’t completed. No worries — you can try again anytime
          when you’re ready.
        </p>

        <a
          href="/giving"
          className="inline-flex items-center justify-center w-full bg-gradient-to-r from-rose-500 to-red-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
        >
          Return to Giving Page
        </a>
      </div>
    </section>
  );
}
