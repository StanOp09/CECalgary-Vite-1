import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminRedirectPath } from "../../utils/adminAuth";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const redirect = getAdminRedirectPath();
    if (redirect) {
      navigate(redirect);
    }
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("adminToken", data.token);
      const decoded = jwtDecode(data.token);
      localStorage.setItem("adminRole", decoded.role);

      if (decoded.role === "registration-admin") {
        navigate("/admin");
      } else if (decoded.role === "giving-admin") {
        navigate("/admin/giving-dashboard");
      } else if (decoded.role === "outreach-admin") {
        navigate("/admin/community-map");
      } else {
        throw new Error("Unknown admin role");
      }
    } catch (err) {
      alert(err.message || "Invalid login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center font-sans">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
          Admin Login
        </h2>

        <input
          type="email"
          className="w-full border border-gray-300 p-3 mb-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border border-gray-300 p-3 mb-6 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 transition transform hover:scale-105 shadow-lg"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
