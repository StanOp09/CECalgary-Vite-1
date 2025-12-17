import { Outlet } from "react-router-dom";

import NavBar from "../components/NavBar";

const MainLayout = () => {
  return (
    <div className="px-4 relative">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
