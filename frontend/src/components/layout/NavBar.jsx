import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Live Service", path: "/live-service" },
    { name: "Sermons", path: "/sermons" },
    { name: "Contact", path: "/contact" },
    { name: "Giving", path: "/giving" },
    { name: "Special-Program", path: "/register" },
  ];

  const closeMenu = () => setIsOpen(false);

  const linkClass = ({ isActive }) =>
    [
      "relative px-3 py-2 text-sm font-semibold transition rounded-lg",
      "text-gray-700 hover:text-indigo-700",
      isActive && "text-indigo-700",
    ].join(" ");

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 ">
            <img
              src="/logo.png"
              alt="Christ Embassy Calgary"
              className="h-10 w-10 object-contain"
            />

            <div className="leading-snug">
              <div className="font-raleway text-base sm:text-lg font-bold tracking-widest uppercase bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 bg-clip-text text-transparent">
                Christ Embassy
              </div>
              <div className="font-raleway text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-gray-400">
                Calgary
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-2">
            {links.map((l) => (
              <NavLink key={l.name} to={l.path} className={linkClass}>
                {({ isActive }) => (
                  <>
                    <span>{l.name}</span>

                    {isActive && (
                      <span
                        className="absolute left-2 right-2 -bottom-1 h-[2px]
                       bg-gradient-to-r from-amber-400 to-amber-600
                       rounded-full"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Mobile button */}
          <button
            type="button"
            onClick={() => setIsOpen((s) => !s)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="md:hidden inline-flex items-center justify-center rounded-xl p-2
                       text-gray-700 hover:bg-gray-100 transition"
          >
            <span className="sr-only">Open menu</span>
            {isOpen ? (
              <span className="text-2xl leading-none">×</span>
            ) : (
              <span className="text-2xl leading-none">≡</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden border-t border-gray-100 bg-white transition-all duration-200 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-3 space-y-1">
          {links.map((l) => (
            <NavLink
              key={l.name}
              to={l.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                [
                  "block rounded-xl px-4 py-3 text-sm font-semibold transition",
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-50",
                ].join(" ")
              }
            >
              {l.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
