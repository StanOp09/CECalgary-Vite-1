import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube } from "lucide-react";

const exploreLinks = [
  { label: "Home", to: "/" },
  { label: "Live Service", to: "/live-service" },
  { label: "Sermons", to: "/sermons" },
  { label: "Giving", to: "/giving" },
  { label: "Special Program", to: "/register" },
];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/christembassycalgary/", Icon: Facebook },
  { label: "Instagram", href: "https://www.instagram.com/cecalgary/?hl=en", Icon: Instagram },
  { label: "YouTube", href: "https://www.youtube.com/c/christembassycalgary", Icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-[1400px] mx-auto px-4 py-16 grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr]">
        {/* Brand + address */}
        <div>
          <Link to="/" className="inline-flex items-center gap-3">
            <img src="/logo.png" alt="Christ Embassy Calgary" className="h-10 w-10 object-contain" />
            <div className="leading-snug">
              <div className="font-raleway text-base font-bold tracking-widest uppercase bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 bg-clip-text text-transparent">
                Christ Embassy
              </div>
              <div className="font-raleway text-xs font-semibold tracking-[0.25em] uppercase text-white/40">
                Calgary
              </div>
            </div>
          </Link>

          <div className="mt-8">
            <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-1">
              Sunday Services
            </p>
            <p className="text-sm text-white/70">2925 10 Ave NE, Calgary, AB T2A 5L4</p>
            <p className="text-sm text-white/70">10:00 AM</p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-5">
            Explore
          </p>
          <ul className="space-y-3">
            {exploreLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm text-white/70 hover:text-white transition">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-5">
            Connect
          </p>
          <ul className="space-y-3">
            <li>
              <Link to="/contact" className="text-sm text-white/70 hover:text-white transition">
                Contact Us
              </Link>
            </li>
            <li>
              <a
                href="tel:+18257335884"
                className="text-sm text-white/70 hover:text-white transition"
              >
                +1 (825) 733-5884
              </a>
            </li>
            <li>
              <a
                href="mailto:cecalgarychurch@gmail.com"
                className="text-sm text-white/70 hover:text-white transition break-all"
              >
                cecalgarychurch@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 py-6 text-center">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Christ Embassy Calgary. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
