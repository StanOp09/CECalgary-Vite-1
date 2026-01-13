import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <header className="sticky top-0 z-50">
        <NavBar />
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
