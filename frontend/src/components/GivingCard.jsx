// import { useState } from "react";

// export default function GivingCard({ id, title, description, Icon, bgColor }) {
//   const [email, setEmail] = useState("");
//   const [amount, setAmount] = useState("");
//   const [frequency, setFrequency] = useState("one-time");
//   const [loading, setLoading] = useState(false);

//   // Use your Render backend URL here
//   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//   if (!BACKEND_URL) {
//     console.error("VITE_BACKEND_URL is not defined");
//   }

//   const handleGive = async () => {
//     if (!amount || amount <= 0) {
//       alert("Enter a valid amount");
//       return;
//     }

//     if (!email || !email.includes("@")) {
//       alert("Enter a valid email");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch(`${BACKEND_URL}/create-checkout-session`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           amount: Number(amount),
//           category: id,
//           frequency,
//           email,
//         }),
//       });

//       const data = await res.json();

//       if (!data.url) {
//         throw new Error("No checkout URL returned");
//       }

//       // Redirect to Stripe Checkout
//       window.location.href = data.url;
//     } catch (err) {
//       console.error(err);
//       alert("Failed to start checkout");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className={`
//         ${bgColor}
//         p-6 rounded-xl shadow-lg flex flex-col
//         transition-all duration-300 ease-out
//         hover:-translate-y-1
//         hover:shadow-xl
//       `}
//     >
//       {/* Icon */}
//       <div className="flex justify-center mb-4">
//         <Icon className="h-10 w-10 text-blue-600" />
//       </div>

//       {/* Title */}
//       <h3 className="text-lg font-semibold mb-2 text-center text-white">
//         {title}
//       </h3>
//       <p className="text-sm text-blue-50 text-center mb-4">{description}</p>

//       {/* Frequency Toggle */}
//       <div className="flex flex-col items-center mb-4">
//         <label className="relative inline-flex items-center cursor-pointer">
//           <input
//             type="checkbox"
//             className="sr-only peer"
//             checked={frequency === "monthly"}
//             onChange={() =>
//               setFrequency(frequency === "one-time" ? "monthly" : "one-time")
//             }
//           />
//           {/* Track */}
//           <div className="w-14 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition-colors" />
//           {/* Knob */}
//           <span
//             className="
//               absolute left-0.5 top-0.5
//               w-5 h-5 bg-white rounded-full shadow-md
//               transition-transform
//               peer-checked:translate-x-8
//             "
//           />
//         </label>
//         <span className="mt-1 text-sm font-medium text-gray-700">
//           {frequency === "one-time" ? "One-Time" : "Monthly"}
//         </span>
//       </div>

//       {/* Email */}
//       <input
//         type="email"
//         placeholder="Enter your email"
//         className="w-full border p-3 rounded mb-3"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       {/* Amount */}
//       <input
//         type="number"
//         placeholder="Enter amount (CAD)"
//         className="w-full border p-3 rounded mb-4"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />

//       {/* Give Now Button */}
//       <button
//         onClick={handleGive}
//         disabled={loading}
//         className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
//       >
//         {loading ? "Processing..." : "Give Now"}
//       </button>
//     </div>
//   );
// }

// *********************VERSION 2**********************
import { useState } from "react";

export default function GivingCard({ id, title, description, Icon, bgColor }) {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("CAD");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  if (!BACKEND_URL) console.error("VITE_BACKEND_URL is not defined");

  const frequencyOptions = [
    { value: "monthly", label: "Monthly", char: "" },
    { value: "biweekly", label: "Biweekly", char: "" },
    { value: "weekly", label: "Weekly", char: "" },
    { value: "one-time", label: "One-Time", char: "" },
  ];

  const POPULAR = [
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "GBP", name: "British Pound" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "HKD", name: "Hong Kong Dollar" },
    { code: "NGN", name: "Nigerian Naira" },
    { code: "GHS", name: "Ghanaian Cedi" },
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
    // add more as you like
  ];

  const handleGive = async () => {
    const amt = Number(amount);

    if (!amt || amt <= 0) {
      alert("Enter a valid amount");
      return;
    }

    if (!email || !email.includes("@")) {
      alert("Enter a valid email");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amt,
          currency,
          category: id,
          frequency, // one-time | weekly | biweekly | monthly
          email,
        }),
      });

      const data = await res.json();

      if (!data.url) throw new Error("No checkout URL returned");

      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      alert("Failed to start checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`
        ${bgColor}
        p-6 rounded-xl shadow-lg flex flex-col
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:shadow-xl
      `}
    >
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <Icon className="h-10 w-10 text-white/90" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-2 text-center text-white">
        {title}
      </h3>
      <p className="text-sm text-white/90 text-center mb-4">{description}</p>

      {/* Frequency (Radio Buttons) */}
      <div className="bg-white/90 rounded-lg p-3 mb-4">
        <p className="text-xs font-semibold text-gray-700 mb-2 text-center">
          Frequency
        </p>

        <div className="grid grid-cols-2 gap-2">
          {frequencyOptions.map((opt) => (
            <label
              key={opt.value}
              className={`
                flex items-center gap-2 p-2 rounded-md cursor-pointer border
                ${
                  frequency === opt.value
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 bg-white"
                }
              `}
            >
              <input
                type="radio"
                name={`frequency-${id}`}
                className="accent-blue-600"
                value={opt.value}
                checked={frequency === opt.value}
                onChange={() => setFrequency(opt.value)}
              />
              <span className="text-sm">{opt.char}</span>
              <span className="text-sm font-medium text-gray-800">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Email */}
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full border p-3 rounded mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Amount */}
      <input
        type="number"
        placeholder="Enter amount (CAD)"
        className="w-full border p-3 rounded mb-4"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select
        className="w-full border p-3 rounded mb-4"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      >
        <optgroup label="Popular">
          {POPULAR.map((c) => (
            <option key={c.code} value={c.code}>
              {c.code} — {c.name}
            </option>
          ))}
        </optgroup>
        <optgroup label="All">
          {ALL.map((c) => (
            <option key={c.code} value={c.code}>
              {c.code} — {c.name}
            </option>
          ))}
        </optgroup>
      </select>

      {/* Give Now Button */}
      <button
        onClick={handleGive}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Processing..." : "Give Now"}
      </button>
    </div>
  );
}
