import { Link } from "react-router-dom";
import { Heart, HandCoins, Sprout, Users, Gift, Globe } from "lucide-react";
import ManageGiving from "../components/giving/ManageGiving";
import GivingCard from "../components/giving/GivingCard";
import GivingHero from "../components/giving/GivingHero";
import OtherGivingMethod from "../components/giving/OtherGivingMethod";

const givingCategories = [
  // Hidden for now — re-enable by uncommenting.
  // {
  //   id: "tithe",
  //   title: "Tithe",
  //   description: "Honor God with your Tithe",
  //   icon: HandCoins,
  //   accent: "indigo",
  // },
  {
    id: "offering",
    title: "Offering",
    description: "Honor God with your Offering",
    icon: Gift,
    accent: "rose",
  },
  {
    id: "seed",
    title: "Seed Offering",
    description: "Sow into good ground",
    icon: Sprout,
    accent: "emerald",
  },
  {
    id: "partnership",
    title: "Partnership",
    description: "Partner with the ministry",
    icon: Users,
    accent: "violet",
  },
  {
    id: "general",
    title: "General Giving",
    description: "1 Corinthians 16:2",
    icon: Heart,
    accent: "amber",
  },
  {
    id: "international",
    title: "International Giving",
    description: "Give from anywhere in the world",
    icon: Globe,
    accent: "cyan",
  },
];

export default function Giving() {
  return (
    <section className="w-full min-h-screen bg-[#F6F4E8] font-sans">
      {/* Hero */}
      <GivingHero />

      {/* Manage Giving */}
      <div className="mx-auto max-w-[1400px] px-4 -mt-8">
        <div className="rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-6 sm:p-8">
          <ManageGiving />
        </div>
      </div>

      {/* Ways to Give */}
      <div id="ways-to-give" className="max-w-[1400px] mx-auto px-4 pt-14 pb-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-600 mb-2">
              Online Giving
            </p>
            <h2 className="font-raleway text-3xl sm:text-4xl font-bold text-gray-900">
              Ways to <span className="italic font-normal text-indigo-600">Give</span>
            </h2>
          </div>
          <p className="text-gray-500 text-sm sm:text-base max-w-md">
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
              accent={cat.accent}
              showCategorySelect={cat.id === "international"}
            />
          ))}
        </div>
      </div>

      <OtherGivingMethod />

      {/* Invite band */}
      <section className="bg-indigo-700 text-white">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 items-center">
          <div className="px-4 py-20 lg:pr-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-300 mb-4">
              Join Us This Sunday
            </p>
            <h2 className="font-raleway text-3xl sm:text-4xl font-bold leading-tight">
              You're always <span className="italic font-normal">welcome</span> here.
            </h2>
            <p className="mt-5 text-indigo-100 text-sm sm:text-base leading-relaxed max-w-md">
              Whether you're exploring your faith, looking for a new church home, or have
              been a believer for years, there's a place for you at Christ Embassy Calgary.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 bg-white text-indigo-700 text-xs font-bold uppercase tracking-widest hover:bg-amber-50 transition shadow-sm"
            >
              Plan Your Visit
            </Link>
          </div>

          <div className="h-72 lg:h-full">
            <img
              src="/images/diversity_HD.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </section>
  );
}
