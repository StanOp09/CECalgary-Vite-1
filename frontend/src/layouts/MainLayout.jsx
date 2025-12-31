import { Outlet } from "react-router-dom";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="px-4 relative">
      <NavBar />
      <Footer />
      <Outlet />
    </div>
  );
};

export default MainLayout;
