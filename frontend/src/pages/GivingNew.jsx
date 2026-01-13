import { Heart, HandCoins, Sprout, Users, Gift } from "lucide-react";
import ManageGiving from "./ManageGiving";
import GivingCard from "../components/GivingCard";
import GivingHero from "../components/GivingHero";

export default function Giving() {
  const givingCategories = [
    {
      id: "tithe",
      title: "Tithe",
      description: "Honor God with your tithe",
      icon: HandCoins,
      bgColor: "bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400",
    },
    {
      id: "offering",
      title: "Offering",
      description: "Give freely as led",
      icon: Gift,
      bgColor: "bg-gradient-to-br from-pink-500 via-rose-400 to-red-400",
    },
    {
      id: "seed",
      title: "Seed Offering",
      description: "Sow into good ground",
      icon: Sprout,
      bgColor: "bg-gradient-to-br from-green-500 via-lime-400 to-emerald-300",
    },
    {
      id: "partnership",
      title: "Partnership",
      description: "Partner with the ministry",
      icon: Users,
      bgColor:
        "bg-gradient-to-br from-purple-600 via-violet-500 to-fuchsia-400",
    },
    {
      id: "general",
      title: "General Giving",
      description: "Support church needs",
      icon: Heart,
      bgColor: "bg-gradient-to-br from-amber-500 via-yellow-400 to-orange-300",
    },
  ];

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-indigo-50 via-white to-gray-100">
      {/* Hero */}
      <GivingHero />

      {/* Manage Giving */}
      <div className="flex justify-center px-4 -mt-12">
        <div className="w-full max-w-4xl rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl ring-1 ring-black/5 p-6 sm:p-8">
          <ManageGiving />
        </div>
      </div>

      {/* Giving Cards */}
      <div className="max-w-6xl mx-auto px-4 pt-14 pb-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Ways to Give
          </h2>
          <p className="text-gray-600 mt-2">
            Choose a category below. You can give one-time or set up monthly
            giving.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {givingCategories.map((cat) => (
            <GivingCard
              key={cat.id}
              id={cat.id}
              title={cat.title}
              description={cat.description}
              Icon={cat.icon}
              bgColor={`${cat.bgColor} transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
