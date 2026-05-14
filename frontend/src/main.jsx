import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Giving from "./pages/GivingNew.jsx";
import MainLayout from "./layouts/MainLayout.jsx";

import Success from "./pages/Success.jsx";
import Cancel from "./pages/Cancel.jsx";
import RegistrationPage from "./pages/Registration.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute.jsx";
import GivingDashboard from "./pages/admin/GivingDashboard.jsx";
import HomePage from "./pages/Home.jsx";
import LiveServicePage from "./pages/LiveService.jsx";
import SermonsPage from "./pages/Sermons.jsx";
import ContactPage from "./pages/Contact.jsx";
import AdminCommunityMap from "./pages/admin/AdminCommunityMap.jsx";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/live-service",
        element: <LiveServicePage />,
      },
      {
        path: "/sermons",
        element: <SermonsPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/giving",
        element: <Giving />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/cancel",
        element: <Cancel />,
      },
      {
        path: "/register",
        element: <RegistrationPage />,
      },

      {
        path: "/admin/login",
        element: <AdminLogin />,
      },
      {
        path: "/admin",
        element: (
          <AdminProtectedRoute allowedRole="registration-admin">
            <AdminDashboard />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "/admin/giving-dashboard",
        element: (
          <AdminProtectedRoute allowedRole="giving-admin">
            <GivingDashboard />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "/admin/community-map",
        element: (
          <AdminProtectedRoute allowedRole="outreach-admin">
            <AdminCommunityMap />
          </AdminProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
