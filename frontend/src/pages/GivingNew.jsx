// import { useState } from "react";
import { Heart, HandCoins, Sprout, Users, Gift } from "lucide-react";
import ManageGiving from "./ManageGiving";
// import DonorDashboard from "./DonorDashboard";
import GivingCard from "../components/GivingCard";
import GivingHero from "../components/GivingHero";
import OtherGivingMethod from "../components/OtherGivingMethod";

export default function Giving() {
  const givingCategories = [
    {
      id: "tithe",
      title: "Tithe",
      description: "Honor God with your tithe",
      icon: HandCoins,
      bgColor: "bg-blue-500 hover:bg-blue-400",
    },
    {
      id: "offering",
      title: "Offering",
      description: "Give freely as led",
      icon: Gift,
      bgColor: "bg-blue-300 hover:bg-blue-400",
    },
    {
      id: "seed",
      title: "Seed Offering",
      description: "Sow into good ground",
      icon: Sprout,
      bgColor: "bg-blue-500 hover:bg-blue-400",
    },
    {
      id: "partnership",
      title: "Partnership",
      description: "Partner with the ministry",
      icon: Users,
      bgColor: "bg-blue-300 hover:bg-blue-400",
    },
    {
      id: "general",
      title: "General Giving",
      description: "Support church needs",
      icon: Heart,
      bgColor: "bg-blue-500 hover:bg-blue-400",
    },
  ];

  // const [cardState, setCardState] = useState(
  //   givingCategories.reduce((acc, cat) => {
  //     acc[cat.id] = {
  //       email: "",
  //       amount: "",
  //       frequency: "one-time",
  //       loading: false,
  //       managing: false,
  //     };
  //     return acc;
  //   }, {})
  // );

  // const handleInputChange = (id, field, value) => {
  //   setCardState((prev) => ({
  //     ...prev,
  //     [id]: { ...prev[id], [field]: value },
  //   }));
  // };

  // const handleGive = async (id) => {
  //   const { email, amount, frequency } = cardState[id];
  //   if (!amount || amount <= 0) return alert("Enter a valid amount");
  //   if (!email || !email.includes("@")) return alert("Enter a valid email");

  //   setCardState((prev) => ({ ...prev, [id]: { ...prev[id], loading: true } }));
  //   try {
  //     const res = await fetch("http://localhost:3000/create-checkout-session", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         amount: Number(amount),
  //         category: id,
  //         frequency,
  //         email,
  //       }),
  //     });
  //     const data = await res.json();
  //     window.location.href = data.url;
  //   } catch (err) {
  //     console.error("Checkout error:", err);
  //     alert("Failed to create checkout session");
  //   } finally {
  //     setCardState((prev) => ({
  //       ...prev,
  //       [id]: { ...prev[id], loading: false },
  //     }));
  //   }
  // };

  // const handleManageGiving = async (id) => {
  //   const { email } = cardState[id];
  //   if (!email || !email.includes("@"))
  //     return alert("Enter a valid email to manage giving");

  //   setCardState((prev) => ({
  //     ...prev,
  //     [id]: { ...prev[id], managing: true },
  //   }));
  //   try {
  //     const res = await fetch("http://localhost:3000/create-portal-session", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email }),
  //     });
  //     const data = await res.json();
  //     window.open(data.url, "_blank");
  //   } catch (err) {
  //     console.error("Portal error:", err);
  //     alert("Failed to open Manage Giving portal");
  //   } finally {
  //     setCardState((prev) => ({
  //       ...prev,
  //       [id]: { ...prev[id], managing: false },
  //     }));
  //   }
  // };

  // return (
  //   <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 p-4">
  //     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-6xl">
  //       {givingCategories.map((cat) => {
  //         const Icon = cat.icon;
  //         const { email, amount, frequency, loading, managing } =
  //           cardState[cat.id];

  //         return (
  //           <div
  //             key={cat.id}
  //             className="bg-white p-6 rounded-xl shadow-lg flex flex-col"
  //           >
  //             <div className="flex justify-center mb-4">
  //               <Icon className="h-10 w-10 text-blue-600" />
  //             </div>
  //             <h3 className="text-lg font-semibold mb-2 text-center">
  //               {cat.title}
  //             </h3>
  //             <p className="text-sm text-gray-600 text-center mb-4">
  //               {cat.description}
  //             </p>

  //             {/* Toggle */}
  //             <div className="flex flex-col items-center mb-4">
  //               <label className="relative inline-flex items-center cursor-pointer">
  //                 <input
  //                   type="checkbox"
  //                   className="sr-only peer"
  //                   checked={frequency === "monthly"}
  //                   onChange={() =>
  //                     handleInputChange(
  //                       cat.id,
  //                       "frequency",
  //                       frequency === "one-time" ? "monthly" : "one-time"
  //                     )
  //                   }
  //                 />
  //                 <div className="w-14 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 relative transition-all">
  //                   <span
  //                     className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform
  //       peer-checked:translate-x-8"
  //                   ></span>
  //                 </div>
  //               </label>
  //               <span className="mt-1 text-sm text-gray-700 font-medium">
  //                 {frequency === "one-time" ? "One-Time" : "Monthly"}
  //               </span>
  //             </div>

  //             {/* Email Input */}
  //             <input
  //               type="email"
  //               placeholder="Enter your email"
  //               className="w-full border p-3 rounded mb-4"
  //               value={email}
  //               onChange={(e) =>
  //                 handleInputChange(cat.id, "email", e.target.value)
  //               }
  //             />

  //             {/* Amount Input */}
  //             <input
  //               type="number"
  //               placeholder="Enter amount (CAD)"
  //               className="w-full border p-3 rounded mb-4"
  //               value={amount}
  //               onChange={(e) =>
  //                 handleInputChange(cat.id, "amount", e.target.value)
  //               }
  //             />
  //             {/* Give Button */}
  //             <button
  //               onClick={() => handleGive(cat.id)}
  //               disabled={loading}
  //               className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 mb-2"
  //             >
  //               {loading ? "Processing..." : "Give Now"}
  //             </button>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   </div>
  // );
  return (
    <div className="w-full mt-20 min-h-screen bg-yellow-50 p-4">
      <GivingHero />
      {/* Manage Giving (separate, donor-level) */}
      <div className="my-12 flex justify-center ">
        <ManageGiving />
      </div>
      {/* Giving Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {givingCategories.map((cat) => (
          <GivingCard
            key={cat.id}
            id={cat.id}
            title={cat.title}
            description={cat.description}
            Icon={cat.icon}
            bgColor={cat.bgColor}
          />
        ))}
      </div>
      {/* <OtherGivingMethod /> */}
    </div>
  );
}
