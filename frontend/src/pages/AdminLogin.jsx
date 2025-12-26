// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AdminLogin({ onLogin }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//   const handleLogin = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${BACKEND_URL}/admin/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.error || "Login failed");
//       }

//       localStorage.setItem("adminToken", data.token);
//       onLogin();
//     } catch (err) {
//       alert(err, "Invalid login");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-sm mx-auto mt-36 bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Admin Login</h2>

//       <input
//         className="w-full border p-2 mb-3"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         className="w-full border p-2 mb-4"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button
//         onClick={handleLogin}
//         disabled={loading}
//         className="w-full bg-blue-600 text-white py-2 rounded"
//       >
//         {loading ? "Logging in..." : "Login"}
//       </button>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // ✅ ADD THIS

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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

      // ✅ Save token
      localStorage.setItem("adminToken", data.token);

      // ✅ Redirect to dashboard
      navigate("/admin");
    } catch (err) {
      alert(err, "Invalid login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-36 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>

      <input
        className="w-full border p-2 mb-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full border p-2 mb-4"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}
