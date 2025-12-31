// import { Link } from "react-router-dom";
// const NavBar = () => {
//   return (
//     <div className="w-full fixed top-0 bg-white items-center h-auto z-50">
//       <div className="flex items-center justify-between">
//         <div
//           className=" w-24 h-24 ml-3 mr-2 rounded-full object-cover
//           lg:w-36 lg:h-32 lg:ml-12"
//         >
//           {/* Logo */}
//           <Link
//             to="/"
//             className="text-2xl font-[Josefin_Sans] flex items-center justify-center"
//           >
//             <img src="logo.png" alt="logoIcon" />
//             {/* MOBILE */}
//             {/* DESKTOP */}
//             <span className="hidden ml-2 md:flex">Christ Embassy Calgary</span>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NavBar;

import { useState } from "react";
import { Link } from "react-router-dom";
import { getAdminRedirectPath } from "../utils/adminAuth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const adminPath = getAdminRedirectPath();

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Live Service", path: "/live-service" },
    { name: "Sermons", path: "/sermons" },
    { name: "Contact", path: "/contact" },
    { name: "Givings", path: "/giving" },
    { name: "Special", path: "/register" },
  ];

  return (
    <nav className="bg-white shadow fixed w-full left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 cursor-pointer">
            <img src="/logo.png" alt="Logo" className="w-20 h-20" />
            <div className="flex flex-col justify-center">
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                Christ Embassy
              </span>
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                Calgary
              </span>
            </div>
          </Link>

          {/* Centered Links */}
          <div className="hidden md:flex space-x-6 justify-center flex-1">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-indigo-600 font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Admin Button */}
          <div className="hidden md:flex flex-shrink-0">
            <Link
              to={adminPath || "/admin/login"}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              AdminOnly
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              {isOpen ? (
                <span className="text-2xl">&#10005;</span>
              ) : (
                <span className="text-2xl">&#9776;</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-indigo-100"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin/login"
              className="block px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={() => setIsOpen(false)}
            >
              AdminOnly
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
