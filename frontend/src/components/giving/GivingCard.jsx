import { useState } from "react";

const POPULAR = [
  { code: "CAD", name: "Canadian Dollar" },
  { code: "USD", name: "US Dollar" },
  { code: "GBP", name: "British Pound" },
  { code: "EUR", name: "Euro" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "NGN", name: "Nigerian Naira" },
  { code: "GHS", name: "Ghanaian Cedi" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "HKD", name: "Hong Kong Dollar" },
];

const ALL = [
  ...POPULAR,
  { code: "INR", name: "Indian Rupee" },
  { code: "KES", name: "Kenyan Shilling" },
  { code: "ZAR", name: "South African Rand" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "SEK", name: "Swedish Krona" },
  { code: "NOK", name: "Norwegian Krone" },
  { code: "DKK", name: "Danish Krone" },
  { code: "PLN", name: "Polish Zloty" },
  { code: "MXN", name: "Mexican Peso" },
  { code: "BRL", name: "Brazilian Real" },
];

const frequencyOptions = [
  { value: "monthly", label: "Monthly" },
  { value: "biweekly", label: "Biweekly" },
  { value: "weekly", label: "Weekly" },
  { value: "one-time", label: "One-Time" },
];

const categoryOptions = [
  { value: "tithe", label: "Tithe" },
  { value: "offering", label: "Offering" },
  { value: "seed", label: "Seed Offering" },
  { value: "partnership", label: "Partnership" },
  { value: "general", label: "General Giving" },
];

const inputCls =
  "w-full px-3 py-2.5 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/60 text-sm " +
  "focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition";

export default function GivingCard({ id, title, description, Icon, bgColor, showCategorySelect = false }) {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [currency, setCurrency] = useState("CAD");
  const [scheduledDate, setScheduledDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("tithe");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const isScheduledOneTime =
    frequency === "one-time" && scheduledDate && new Date(scheduledDate) > new Date();

  const handleGive = async () => {
    setError("");
    const amt = Number(amount);

    if (!amt || amt <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
    if (!BACKEND_URL) {
      setError("Payment system misconfigured. Please contact the admin.");
      return;
    }

    setLoading(true);

    try {
      const category = showCategorySelect ? selectedCategory : id;
      const endpoint = isScheduledOneTime
        ? `${BACKEND_URL}/create-scheduled-checkout`
        : `${BACKEND_URL}/create-checkout-session`;

      const body = isScheduledOneTime
        ? { amount: amt, currency, category, email, scheduledDate }
        : { amount: amt, currency, category, frequency, email, scheduledDate: scheduledDate || null };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!data.url) throw new Error("No checkout URL returned");
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      setError("Failed to start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${bgColor} rounded-2xl shadow-lg flex flex-col hover:-translate-y-1 hover:shadow-2xl transition-all duration-300`}>
      {/* Card header */}
      <div className="px-6 pt-6 pb-4 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20 mb-3">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="font-raleway text-lg font-bold text-white">{title}</h3>
        <p className="text-sm text-white/80 mt-0.5">{description}</p>
      </div>

      <div className="flex-1 px-5 pb-6 space-y-3">
        {/* Frequency */}
        <div className="grid grid-cols-2 gap-1.5 bg-black/10 rounded-xl p-1.5">
          {frequencyOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setFrequency(opt.value)}
              className={`py-1.5 rounded-lg text-xs font-semibold transition ${
                frequency === opt.value
                  ? "bg-white text-gray-800 shadow"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Category selector (international card only) */}
        {showCategorySelect && (
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-white/30 bg-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition"
          >
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="text-gray-900 bg-white">
                {opt.label}
              </option>
            ))}
          </select>
        )}

        {/* Scheduled date */}
        <div>
          <label className="block text-xs text-white/70 mb-1 pl-1">
            {frequency === "one-time" ? "Scheduled Date (optional)" : "Start Date (optional)"}
          </label>
          <input
            type="date"
            value={scheduledDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setScheduledDate(e.target.value)}
            className={inputCls + " [color-scheme:dark]"}
          />
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
        />

        {/* Amount + Currency */}
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`${inputCls} flex-1`}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="px-2 py-2.5 rounded-xl border border-white/30 bg-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition min-w-[80px]"
          >
            <optgroup label="Popular">
              {POPULAR.map((c) => (
                <option key={c.code} value={c.code} className="text-gray-900 bg-white">
                  {c.code}
                </option>
              ))}
            </optgroup>
            <optgroup label="More">
              {ALL.slice(POPULAR.length).map((c) => (
                <option key={c.code} value={c.code} className="text-gray-900 bg-white">
                  {c.code}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Inline error */}
        {error && (
          <p className="text-xs text-white bg-black/20 rounded-lg px-3 py-2">{error}</p>
        )}

        {/* Submit */}
        <button
          type="button"
          onClick={handleGive}
          disabled={loading}
          className="w-full py-3 rounded-xl font-bold text-sm bg-white/20 hover:bg-white/30 text-white border border-white/30
                     disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Processing…
            </>
          ) : isScheduledOneTime ? (
            "Schedule Gift"
          ) : (
            "Give Now"
          )}
        </button>
      </div>
    </div>
  );
}
