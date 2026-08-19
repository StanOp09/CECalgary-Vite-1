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
  // Hidden for now — re-enable by uncommenting.
  // { value: "tithe", label: "Tithe" },
  { value: "offering", label: "Offering" },
  { value: "seed", label: "Seed Offering" },
  { value: "partnership", label: "Partnership" },
  { value: "general", label: "General Giving" },
];

const ACCENTS = {
  indigo: {
    bar: "bg-indigo-500",
    iconBg: "bg-indigo-50",
    iconText: "text-indigo-600",
    btn: "bg-indigo-600 hover:bg-indigo-700",
    ring: "focus:ring-indigo-500",
    active: "bg-indigo-600 text-white shadow-sm",
  },
  rose: {
    bar: "bg-rose-500",
    iconBg: "bg-rose-50",
    iconText: "text-rose-600",
    btn: "bg-rose-600 hover:bg-rose-700",
    ring: "focus:ring-rose-500",
    active: "bg-rose-600 text-white shadow-sm",
  },
  emerald: {
    bar: "bg-emerald-500",
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-600",
    btn: "bg-emerald-600 hover:bg-emerald-700",
    ring: "focus:ring-emerald-500",
    active: "bg-emerald-600 text-white shadow-sm",
  },
  violet: {
    bar: "bg-violet-500",
    iconBg: "bg-violet-50",
    iconText: "text-violet-600",
    btn: "bg-violet-600 hover:bg-violet-700",
    ring: "focus:ring-violet-500",
    active: "bg-violet-600 text-white shadow-sm",
  },
  amber: {
    bar: "bg-amber-500",
    iconBg: "bg-amber-50",
    iconText: "text-amber-600",
    btn: "bg-amber-600 hover:bg-amber-700",
    ring: "focus:ring-amber-500",
    active: "bg-amber-600 text-white shadow-sm",
  },
  cyan: {
    bar: "bg-cyan-500",
    iconBg: "bg-cyan-50",
    iconText: "text-cyan-600",
    btn: "bg-cyan-600 hover:bg-cyan-700",
    ring: "focus:ring-cyan-500",
    active: "bg-cyan-600 text-white shadow-sm",
  },
};

export default function GivingCard({
  id,
  title,
  description,
  Icon,
  accent = "indigo",
  showCategorySelect = false,
}) {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [currency, setCurrency] = useState("CAD");
  const [scheduledDate, setScheduledDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("offering");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const c = ACCENTS[accent] || ACCENTS.indigo;
  const inputCls =
    `w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm ` +
    `focus:outline-none focus:ring-2 ${c.ring} focus:border-transparent focus:bg-white transition`;

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
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
      <div className={`h-1 ${c.bar}`} />

      {/* Card header */}
      <div className="px-6 pt-6 pb-2">
        <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${c.iconBg} ${c.iconText} mb-3`}>
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-raleway text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-0.5">{description}</p>
      </div>

      <div className="flex-1 px-6 pt-4 pb-6 space-y-3">
        {/* Frequency */}
        <div className="grid grid-cols-2 gap-1.5 bg-gray-100 rounded-xl p-1.5">
          {frequencyOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setFrequency(opt.value)}
              className={`py-1.5 rounded-lg text-xs font-bold transition ${
                frequency === opt.value
                  ? c.active
                  : "text-gray-500 hover:text-gray-700"
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
            className={inputCls}
          >
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}

        {/* Scheduled date */}
        <div>
          <label className="block text-xs text-gray-500 mb-1 pl-1">
            {frequency === "one-time" ? "Scheduled Date (optional)" : "Start Date (optional)"}
          </label>
          <input
            type="date"
            value={scheduledDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setScheduledDate(e.target.value)}
            className={inputCls}
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
            className={`px-2 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 ${c.ring} transition min-w-[80px]`}
          >
            <optgroup label="Popular">
              {POPULAR.map((cur) => (
                <option key={cur.code} value={cur.code}>
                  {cur.code}
                </option>
              ))}
            </optgroup>
            <optgroup label="More">
              {ALL.slice(POPULAR.length).map((cur) => (
                <option key={cur.code} value={cur.code}>
                  {cur.code}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Inline error */}
        {error && (
          <p className="text-xs text-red-700 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="button"
          onClick={handleGive}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-bold text-sm text-white ${c.btn}
                     disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm flex items-center justify-center gap-2`}
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
