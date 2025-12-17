import { useState, useEffect } from "react";

export default function ManageGivingCard({ prefillEmail = "" }) {
  const [email, setEmail] = useState(prefillEmail);
  const [loading, setLoading] = useState(false);

  const handleManageGiving = async () => {
    if (!email || !email.includes("@")) return alert("Enter a valid email");

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/create-portal-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      // Open in the same page or a new page depending on preference
      window.location.href = data.url;
    } catch (err) {
      console.error("Portal error:", err);
      alert("Failed to open Manage Giving portal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Giving</h2>

      {/* Email Input */}
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full border p-3 rounded mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Button */}
      <button
        onClick={handleManageGiving}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Loading..." : "Manage Giving"}
      </button>
    </div>
  );
}
