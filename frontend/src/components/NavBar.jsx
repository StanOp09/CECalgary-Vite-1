import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="w-full fixed top-0 bg-white items-center h-auto z-50">
      <div className="flex items-center justify-between">
        <div
          className=" w-24 h-24 ml-3 mr-2 rounded-full object-cover
          lg:w-36 lg:h-32 lg:ml-12"
        >
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-[Josefin_Sans] flex items-center justify-center"
          >
            <img src="logo.png" alt="logoIcon" />
            {/* MOBILE */}
            {/* DESKTOP */}
            <span className="hidden ml-2 md:flex">Christ Embassy Calgary</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
