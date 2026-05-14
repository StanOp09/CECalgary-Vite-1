import { Heart, HandCoins, Sprout, Users, Gift, Globe } from "lucide-react";
import ManageGiving from "../components/giving/ManageGiving";
import GivingCard from "../components/giving/GivingCard";
import GivingHero from "../components/giving/GivingHero";
import OtherGivingMethod from "../components/giving/OtherGivingMethod";

const givingCategories = [
  {
    id: "tithe",
    title: "Tithe",
    description: "Honor God with your Tithe",
    icon: HandCoins,
    bgColor: "bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400",
  },
  {
    id: "offering",
    title: "Offering",
    description: "Honor God with your Offering",
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
    bgColor: "bg-gradient-to-br from-purple-600 via-violet-500 to-fuchsia-400",
  },
  {
    id: "general",
    title: "General Giving",
    description: "1 Corinthians 16:2",
    icon: Heart,
    bgColor: "bg-gradient-to-br from-amber-500 via-yellow-400 to-orange-300",
  },
  {
    id: "international",
    title: "International Giving",
    description: "Give from anywhere in the world",
    icon: Globe,
    bgColor: "bg-gradient-to-br from-teal-600 via-cyan-500 to-sky-400",
  },
];

export default function Giving() {
  return (
    <section className="w-full min-h-screen bg-[#F6F4E8] font-sans">
      {/* Hero */}
      <GivingHero />

      {/* Manage Giving */}
      <div className="mx-auto max-w-6xl px-4 -mt-8">
        <div className="rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-6 sm:p-8">
          <ManageGiving />
        </div>
      </div>

      {/* Ways to Give */}
      <div className="max-w-6xl mx-auto px-4 pt-14 pb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-600 mb-2">
            Online Giving
          </p>
          <h2 className="font-raleway text-3xl sm:text-4xl font-bold text-gray-900">
            Ways to Give
          </h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Choose a category below. You can give one-time or set up recurring giving.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {givingCategories.map((cat) => (
            <GivingCard
              key={cat.id}
              id={cat.id}
              title={cat.title}
              description={cat.description}
              Icon={cat.icon}
              bgColor={cat.bgColor}
              showCategorySelect={cat.id === "international"}
            />
          ))}
        </div>
      </div>

      <OtherGivingMethod />
    </section>
  );
}
