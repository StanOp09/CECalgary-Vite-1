import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Giving from "./pages/GivingNew.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import MinimalLayout from "./layouts/MinimalLayout.jsx";

import Success from "./pages/Success.jsx";
import Cancel from "./pages/Cancel.jsx";
import Home from "./pages/Home.jsx";
import RegistrationPage from "./pages/Registration.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminProtectedRoute from "./components/AdminProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Giving />,
      },
      // {
      //   path: "/ministries",
      //   element: <Ministries />,
      // },
      // {
      //   path: "/events",
      //   element: <Events />,
      // },
      // {
      //   path: "/contact",
      //   element: <Contact />,
      // },
      // {
      //   path: "/about",
      //   element: <About />,
      // },
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
        path: "/admin/login",
        element: <AdminLogin />,
      },
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
      // {
      //   path: "/about/beliefs",
      //   element: <Beliefs />,
      // },
      // {
      //   path: "/blog",
      //   element: <Blog1 />,
      // },
      // {
      //   path: "/blog/:slug",
      //   element: <SingleBlog />,
      // },
      // {
      //   path: "/write",
      //   element: <Write />,
      // },
      // {
      //   path: "/login",
      //   element: <Login />,
      // },
      // {
      //   path: "/register",
      //   element: <Register />,
      // },
    ],
  },
  {
    element: <MinimalLayout />, // minimal layout
    children: [{ path: "/register", element: <RegistrationPage /> }],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>
);
