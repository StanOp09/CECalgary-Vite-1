// import { useState } from "react";

// export default function GivingCard({ id, title, description, Icon, bgColor }) {
//   const [email, setEmail] = useState("");
//   const [amount, setAmount] = useState("");
//   const [frequency, setFrequency] = useState("one-time");
//   const [loading, setLoading] = useState(false);

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
//       const res = await fetch("http://localhost:3000/create-checkout-session", {
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

//       window.location.href = data.url;
//     } catch (err) {
//       console.error(err);
//       alert("Failed to start checkout");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const handleGive = () => {
//   //   const baseUrl =
//   //     "https://tithe.ly/give_new/www/#/tithely/give-one-time/123456";

//   //   const params = new URLSearchParams({
//   //     amount: amount || "",
//   //     recurring: frequency === "monthly" ? "monthly" : "",
//   //     fund: id, // optional if you map fund IDs
//   //   });

//   //   window.location.href = `${baseUrl}?${params.toString()}`;
//   // };

//   return (
//     <div
//       className={`
//     ${bgColor}
//     p-6 rounded-xl shadow-lg flex flex-col
//     transition-all duration-300 ease-out
//     hover:-translate-y-1
//     hover:shadow-xl
//   `}
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

//       {/* Toggle */}
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
//         absolute left-0.5 top-0.5
//         w-5 h-5 bg-white rounded-full shadow-md
//         transition-transform
//         peer-checked:translate-x-8
//       "
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

//       {/* Button */}
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

import { useState } from "react";

export default function GivingCard({ id, title, description, Icon, bgColor }) {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("one-time");
  const [loading, setLoading] = useState(false);

  // Use your Render backend URL here
  const BACKEND_URL = "https://church-giving-app-2.onrender.com";

  const handleGive = async () => {
    if (!amount || amount <= 0) {
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
          amount: Number(amount),
          category: id,
          frequency,
          email,
        }),
      });

      const data = await res.json();

      if (!data.url) {
        throw new Error("No checkout URL returned");
      }

      // Redirect to Stripe Checkout
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
        <Icon className="h-10 w-10 text-blue-600" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-2 text-center text-white">
        {title}
      </h3>
      <p className="text-sm text-blue-50 text-center mb-4">{description}</p>

      {/* Frequency Toggle */}
      <div className="flex flex-col items-center mb-4">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={frequency === "monthly"}
            onChange={() =>
              setFrequency(frequency === "one-time" ? "monthly" : "one-time")
            }
          />
          {/* Track */}
          <div className="w-14 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition-colors" />
          {/* Knob */}
          <span
            className="
              absolute left-0.5 top-0.5
              w-5 h-5 bg-white rounded-full shadow-md
              transition-transform
              peer-checked:translate-x-8
            "
          />
        </label>
        <span className="mt-1 text-sm font-medium text-gray-700">
          {frequency === "one-time" ? "One-Time" : "Monthly"}
        </span>
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
