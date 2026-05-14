import { useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function GivingDashboard() {

  const [data, setData] = useState(null);
  const [recentDonations, setRecentDonations] = useState([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState("all");
  const [refreshTick, setRefreshTick] = useState(0);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // ✅ Effect 1: fetch dashboard data
  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) return;

    const qs = new URLSearchParams({ category, search, currency });

    fetch(`${BACKEND_URL}/admin/giving-dashboard?${qs.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((payload) => setData(payload))
      .catch(console.error);
  }, [category, search, currency, BACKEND_URL, refreshTick]);

  // ✅ Effect 2: SSE
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;

    const eventSource = new EventSource(
      `${BACKEND_URL}/admin/recent-donations/stream?token=${token}`,
    );

    eventSource.onerror = (err) => {
      console.error("SSE error / disconnected:", err);
    };
    eventSource.addEventListener("open", () => {
      console.log("SSE connected");
    });
    eventSource.addEventListener("ping", () => {
      // optional: console.log("ping");
    });

    eventSource.onmessage = (e) => {
      let incoming = [];
      try {
        const parsed = JSON.parse(e.data);
        incoming = Array.isArray(parsed) ? parsed : [parsed];
      } catch {}

      setRecentDonations((prev) => {
        const prevArr = Array.isArray(prev) ? prev : [];
        const merged = [...incoming, ...prevArr];
        const unique = Array.from(
          new Map(merged.map((d) => [d._id, d])).values(),
        );

        setRefreshTick((x) => x + 1);

        return unique
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 50);
      });
    };

    return () => eventSource.close();
  }, [BACKEND_URL]);

  // ✅ Memo 1: pick chart currency (SAFE when data is null)
  const chartCurrency = useMemo(() => {
    if (currency !== "all") return currency;

    const opts = Array.isArray(data?.currencyOptions)
      ? data.currencyOptions
      : [];
    return opts[0] || "CAD";
  }, [currency, data?.currencyOptions]);

  // ✅ Memo 2: get monthly series (SAFE when data is null)
  const monthlySeries = useMemo(() => {
    const series = data?.monthlyTotalsByCurrency?.[chartCurrency] || [];
    return Array.isArray(series) ? series : [];
  }, [data?.monthlyTotalsByCurrency, chartCurrency]);

  // ✅ NOW you can return early (after hooks)
  if (!data) {
    return (
      <p className="mt-40 text-center text-gray-600 text-lg">
        Loading dashboard…
      </p>
    );
  }

  const chartData = {
    labels: monthlySeries.map((m) => m.month),
    datasets: [
      {
        label: `Monthly Donations (${chartCurrency})`,
        data: monthlySeries.map((m) => m.total),
        backgroundColor: "#4f46e5",
        borderRadius: 8,
      },
    ],
  };

  const maxVal =
    monthlySeries.length > 0
      ? Math.max(...monthlySeries.map((m) => Number(m.total || 0)))
      : 0;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: maxVal ? maxVal * 1.2 : undefined,
        ticks: {
          stepSize: maxVal ? Math.ceil(maxVal / 5) : undefined,
          callback: (value) => `${chartCurrency} ${value}`,
        },
      },
      x: {
        ticks: { color: "#4b5563", font: { weight: "bold" } },
      },
    },
  };

  // ✅ totalsByCurrency is like: { CAD: {total,count}, USD: {total,count} }
  const totalsEntries = Object.entries(data.totalsByCurrency || {});

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 my-16 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-4xl font-bold text-gray-800">Giving Dashboard</h1>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/admin/login";
          }}
          className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* ✅ Totals by currency card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-center mb-3">
            Total Donations (by currency)
          </h2>

          {totalsEntries.length === 0 ? (
            <p className="text-center text-white/90">No donations yet</p>
          ) : (
            <div className="space-y-2">
              {totalsEntries.map(([cur, obj]) => (
                <div
                  key={cur}
                  className="flex items-center justify-between bg-white/10 rounded-lg px-3 py-2"
                >
                  <span className="font-semibold">{cur}</span>
                  <span className="font-bold">
                    {Number(obj?.total || 0).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-emerald-400 to-green-500 text-white rounded-xl shadow-lg p-6 flex flex-col justify-center items-center">
          <h2 className="text-lg font-semibold">Active Subscriptions</h2>
          <p className="text-2xl font-bold mt-2">
            {data.activeSubscriptionsCount}
          </p>
        </div>

        <div className="bg-gradient-to-r from-pink-400 to-rose-500 text-white rounded-xl shadow-lg p-6 flex flex-col justify-center items-center">
          <h2 className="text-lg font-semibold">Total Donors</h2>
          <p className="text-2xl font-bold mt-2">{data.totalDonors}</p>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl shadow-lg p-6 flex flex-col justify-center items-center">
          <h2 className="text-lg font-semibold">Recurring Donors</h2>
          <p className="text-2xl font-bold mt-2">{data.recurringDonors}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        {/* Category filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-4 py-2 w-full sm:w-auto"
        >
          <option value="all">All Categories</option>
          <option value="tithe">Tithe</option>
          <option value="partnership">Partnership</option>
          <option value="seed offering">Seed Offering</option>
          <option value="offering">Offering</option>
          <option value="general giving">General Giving</option>
        </select>

        {/* ✅ Currency filter */}
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="border rounded px-4 py-2 w-full sm:w-auto"
        >
          <option value="all">All Currencies</option>
          {(data.currencyOptions || []).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Donor filter */}
        <input
          type="text"
          placeholder="Search by email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-4 py-2 w-full sm:w-64"
        />
      </div>

      {/* Monthly Donations Chart */}
      <div className="bg-white shadow rounded-xl p-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Monthly Donations — {chartCurrency}
          </h2>

          <span className="text-sm text-gray-500">
            Showing{" "}
            {currency === "all"
              ? `first currency (${chartCurrency})`
              : "selected currency"}
          </span>
        </div>

        <div style={{ height: "350px" }}>
          <Bar data={chartData} options={chartOptions} height={300} />
        </div>
      </div>

      {/* Recent Donations */}
      <div className="bg-white shadow rounded-xl p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Recent Donations
        </h2>

        <table className="min-w-full text-left divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-gray-600">Email</th>
              <th className="px-4 py-2 text-gray-600">Category</th>
              <th className="px-4 py-2 text-gray-600">Amount</th>
              <th className="px-4 py-2 text-gray-600">Currency</th>
              <th className="px-4 py-2 text-gray-600">Frequency</th>
              <th className="px-4 py-2 text-gray-600">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {(Array.isArray(recentDonations) ? recentDonations : []).map(
              (d) => (
                <tr key={d._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2">{d.email}</td>
                  <td className="px-4 py-2">{d.category}</td>
                  <td className="px-4 py-2">
                    {Number(d.amount || 0).toFixed(2)}
                  </td>
                  <td className="px-4 py-2">{d.currency || "—"}</td>
                  <td className="px-4 py-2">{d.frequency}</td>
                  <td className="px-4 py-2">
                    {new Date(d.createdAt).toLocaleString()}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
