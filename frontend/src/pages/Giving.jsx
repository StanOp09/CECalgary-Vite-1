// import { useState } from "react";
// import { Heart, HandCoins, Sprout, Users, Gift } from "lucide-react";

// export default function Giving() {
//   const [amount, setAmount] = useState("");
//   const [category, setCategory] = useState("tithe");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [frequency, setFrequency] = useState("one_time");

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
//           category,
//           email,
//           frequency,
//         }),
//       });

//       const data = await res.json();

//       // Redirect to Stripe Checkout
//       window.location.href = data.url;
//     } catch (err) {
//       console.error("Checkout error:", err);
//       alert("Failed to create checkout session");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleManageGiving = async () => {
//     const donorEmail = prompt("Enter your email to manage your giving");

//     if (!donorEmail || !donorEmail.includes("@"))
//       return alert("Enter a valid email");

//     try {
//       const res = await fetch("http://localhost:3000/create-portal-session", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: donorEmail }),
//       });

//       const data = await res.json();
//       window.location.href = data.url; // redirect to Stripe portal
//     } catch (err) {
//       console.error("Portal error:", err);
//       alert("Failed to open management portal");
//     }
//   };

//   const givingCategories = [
//     {
//       id: "tithe",
//       title: "Tithe",
//       description: "Honor God with your tithe",
//       icon: HandCoins,
//     },
//     {
//       id: "offering",
//       title: "Offering",
//       description: "Give freely as led",
//       icon: Gift,
//     },
//     {
//       id: "seed",
//       title: "Seed Offering",
//       description: "Sow into good ground",
//       icon: Sprout,
//     },
//     {
//       id: "partnership",
//       title: "Partnership",
//       description: "Partner with the ministry",
//       icon: Users,
//     },
//     {
//       id: "general",
//       title: "General Giving",
//       description: "Support church needs",
//       icon: Heart,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
//         <h1 className="text-2xl font-bold text-center mb-6">Giving</h1>

//         {/* Giving Categories */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
//           {givingCategories.map((item) => {
//             const Icon = item.icon;

//             return (
//               <button
//                 key={item.id}
//                 type="button"
//                 onClick={() => setCategory(item.id)}
//                 className={`rounded-xl border p-6 text-center transition shadow-sm
//                   ${
//                     category === item.id
//                       ? "border-blue-600 bg-blue-50 shadow-md"
//                       : "border-gray-200 hover:border-blue-400 hover:shadow-md"
//                   }
//                 `}
//               >
//                 <div className="flex justify-center mb-4">
//                   <Icon className="h-10 w-10 text-blue-600" />
//                 </div>

//                 <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
//                 <p className="text-sm text-gray-600">{item.description}</p>
//               </button>
//             );
//           })}
//         </div>

//         {/* Email */}
//         <input
//           type="email"
//           placeholder="Email address"
//           className="w-full border p-3 rounded mb-4"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <div className="flex gap-3 mb-6">
//           <button
//             type="button"
//             onClick={() => setFrequency("one_time")}
//             className={`flex-1 py-3 rounded-lg border
//       ${frequency === "one_time" ? "bg-blue-600 text-white" : "bg-white"}
//     `}
//           >
//             One-Time
//           </button>

//           <button
//             type="button"
//             onClick={() => setFrequency("monthly")}
//             className={`flex-1 py-3 rounded-lg border
//       ${frequency === "monthly" ? "bg-blue-600 text-white" : "bg-white"}
//     `}
//           >
//             Monthly
//           </button>
//         </div>

//         {/* Amount */}
//         <input
//           type="number"
//           placeholder="Amount (CAD)"
//           className="w-full border p-3 rounded mb-6"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//         />

//         {/* Submit */}
//         <button
//           onClick={handleGive}
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
//         >
//           {loading ? "Processing..." : "Give Now"}
//         </button>

//         <button
//           onClick={handleManageGiving}
//           className="w-full bg-gray-700 text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition mt-4"
//         >
//           Manage My Giving
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
import { Heart, HandCoins, Sprout, Users, Gift } from "lucide-react";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function Giving() {
  const givingCategories = [
    {
      id: "tithe",
      title: "Tithe",
      description: "Honor God with your tithe",
      icon: HandCoins,
    },
    {
      id: "offering",
      title: "Offering",
      description: "Give freely as led",
      icon: Gift,
    },
    {
      id: "seed",
      title: "Seed Offering",
      description: "Sow into good ground",
      icon: Sprout,
    },
    {
      id: "partnership",
      title: "Partnership",
      description: "Partner with the ministry",
      icon: Users,
    },
    {
      id: "general",
      title: "General Giving",
      description: "Support church needs",
      icon: Heart,
    },
  ];

  // Track individual card state
  const [cardState, setCardState] = useState(
    givingCategories.reduce((acc, cat) => {
      acc[cat.id] = {
        email: "",
        amount: "",
        frequency: "one-time",
        loading: false,
      };
      return acc;
    }, {})
  );

  const handleInputChange = (id, field, value) => {
    setCardState((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleGive = async (id) => {
    const { email, amount, frequency } = cardState[id];
    if (!amount || amount <= 0) return alert("Enter a valid amount");
    if (!email || !email.includes("@")) return alert("Enter a valid email");

    setCardState((prev) => ({ ...prev, [id]: { ...prev[id], loading: true } }));
    try {
      const res = await fetch("http://localhost:3000/create-checkout-session", {
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
      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to create checkout session");
    } finally {
      setCardState((prev) => ({
        ...prev,
        [id]: { ...prev[id], loading: false },
      }));
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-6xl">
        {givingCategories.map((cat) => {
          const Icon = cat.icon;
          const { email, amount, frequency, loading } = cardState[cat.id];

          return (
            <div
              key={cat.id}
              className="bg-white p-6 rounded-xl shadow-lg flex flex-col"
            >
              <div className="flex justify-center mb-4">
                <Icon className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center">
                {cat.title}
              </h3>
              <p className="text-sm text-gray-600 text-center mb-4">
                {cat.description}
              </p>

              {/* Frequency Toggle */}
              <div className="flex flex-col items-center mb-4">
                <label className="inline-flex relative items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={frequency === "monthly"}
                    onChange={() =>
                      handleInputChange(
                        cat.id,
                        "frequency",
                        frequency === "one-time" ? "monthly" : "one-time"
                      )
                    }
                  />
                  <div className="w-14 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
                <span className="mt-1 text-sm text-gray-700 font-medium">
                  {frequency === "one-time" ? "One-Time" : "Monthly"}
                </span>
              </div>

              {/* Email Input */}
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border p-3 rounded mb-4"
                value={email}
                onChange={(e) =>
                  handleInputChange(cat.id, "email", e.target.value)
                }
              />

              {/* Amount Input */}
              <input
                type="number"
                placeholder="Enter amount (CAD)"
                className="w-full border p-3 rounded mb-4"
                value={amount}
                onChange={(e) =>
                  handleInputChange(cat.id, "amount", e.target.value)
                }
              />

              {/* Give Button */}
              <button
                onClick={() => handleGive(cat.id)}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Processing..." : "Give Now"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
