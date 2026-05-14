import { useCallback, useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import {
  getAdminDashboard,
  getRegistrations,
  downloadRegistrationsCsv,
} from "../../services/api";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PAGE = 50;

export default function AdminDashboard() {
  const token = localStorage.getItem("adminToken");

  const [stats, setStats] = useState(null);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebounced] = useState("");
  const [tableLoading, setTableLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");

  // ── auth redirect ──────────────────────────────────────────────────────────
  const handleUnauth = useCallback(() => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  }, []);

  // ── load stats ─────────────────────────────────────────────────────────────
  const loadStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const res = await getAdminDashboard(token);
      if (res.status === 401 || res.status === 403) return handleUnauth();
      if (!res.ok) throw new Error("Failed to load stats");
      setStats(await res.json());
    } catch {
      setError("Could not load dashboard stats.");
    } finally {
      setStatsLoading(false);
    }
  }, [token]);

  // ── load registrations ─────────────────────────────────────────────────────
  const loadRows = useCallback(
    async (searchTerm, skip, append = false) => {
      setTableLoading(true);
      try {
        const res = await getRegistrations(token, {
          limit: PAGE,
          skip,
          search: searchTerm,
        });
        if (res.status === 401 || res.status === 403) return handleUnauth();
        if (!res.ok) throw new Error();
        const { registrations, total: t } = await res.json();
        setTotal(t);
        setRows((prev) =>
          append ? [...prev, ...registrations] : registrations,
        );
      } catch {
        setError("Could not load registrations.");
      } finally {
        setTableLoading(false);
      }
    },
    [token],
  );

  // ── debounce search ────────────────────────────────────────────────────────
  useEffect(() => {
    const id = setTimeout(() => setDebounced(search), 350);
    return () => clearTimeout(id);
  }, [search]);

  // ── initial load ───────────────────────────────────────────────────────────
  useEffect(() => {
    window.scrollTo(0, 0);
    loadStats();
    loadRows("", 0);
  }, []);

  // ── re-fetch on search change ──────────────────────────────────────────────
  useEffect(() => {
    loadRows(debouncedSearch, 0);
  }, [debouncedSearch]);

  // ── chart data ─────────────────────────────────────────────────────────────
  const chartData = useMemo(() => {
    if (!stats?.chartData?.length) return null;
    return {
      labels: stats.chartData.map((d) => d._id),
      datasets: [
        {
          label: "Attendees",
          data: stats.chartData.map((d) => d.attendees),
          backgroundColor: "#6d28d9",
          hoverBackgroundColor: "#7c3aed",
          borderRadius: 6,
          barThickness: 18,
        },
        {
          label: "Registrations",
          data: stats.chartData.map((d) => d.registrations),
          backgroundColor: "#f59e0b",
          hoverBackgroundColor: "#d97706",
          borderRadius: 6,
          barThickness: 18,
        },
      ],
    };
  }, [stats]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top", labels: { boxWidth: 12, font: { size: 12 } } },
      tooltip: { enabled: true },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#94a3b8" } },
      y: {
        beginAtZero: true,
        grid: { display: false },
        ticks: { color: "#94a3b8", precision: 0 },
      },
    },
  };

  // ── actions ────────────────────────────────────────────────────────────────
  const logout = () => {
    localStorage.clear();
    window.location.href = "/admin/login";
  };

  const refresh = () => {
    loadStats();
    loadRows(debouncedSearch, 0);
  };

  const loadMore = () => loadRows(debouncedSearch, rows.length, true);

  const downloadCSV = async () => {
    setDownloading(true);
    try {
      const res = await downloadRegistrationsCsv(token);
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = Object.assign(document.createElement("a"), {
        href: url,
        download: "registrations.csv",
      });
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      alert("CSV download failed.");
    } finally {
      setDownloading(false);
    }
  };

  // ── derived ────────────────────────────────────────────────────────────────
  const avgPartySize =
    stats && stats.totalRegistrations > 0
      ? (stats.totalAttendees / stats.totalRegistrations).toFixed(1)
      : "—";

  const hasMore = rows.length < total;

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 font-sans mt-16">
      {/* Header */}
      <div className="sticky top-16 z-20 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
              Registration Dashboard
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">
              Miracle Service · May 31, 2026
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={refresh}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition flex items-center gap-1.5"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh
            </button>
            <button
              onClick={logout}
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-100 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 font-medium">
            {error}
          </div>
        )}

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Registrations",
              value: statsLoading ? "—" : (stats?.totalRegistrations ?? 0),
              // icon: "🧾",
              color: "text-violet-700",
              bg: "bg-violet-50",
            },
            {
              label: "Total Attendees",
              value: statsLoading ? "—" : (stats?.totalAttendees ?? 0),
              // icon: "👥",
              color: "text-blue-700",
              bg: "bg-blue-50",
            },
            {
              label: "Registered Today",
              value: statsLoading ? "—" : (stats?.todayCount ?? 0),
              // icon: "📅",
              color: "text-emerald-700",
              bg: "bg-emerald-50",
            },
            {
              label: "Avg Party Size",
              value: statsLoading ? "—" : avgPartySize,
              // icon: "📊",
              color: "text-amber-700",
              bg: "bg-amber-50",
            },
          ].map(({ label, value, icon, color, bg }) => (
            <div
              key={label}
              className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {label}
                </p>
                <span className={`text-xl rounded-lg px-1.5 py-0.5 ${bg}`}>
                  {icon}
                </span>
              </div>
              <p className={`text-3xl sm:text-4xl font-extrabold ${color}`}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* ── Chart ── */}
        {chartData ? (
          <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5">
            <h2 className="text-sm font-bold text-slate-700 mb-4">
              Registrations & Attendees by Day
            </h2>
            <div className="h-64">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        ) : (
          !statsLoading && (
            <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-8 text-center text-slate-400 text-sm">
              No registration data yet — chart will appear once people register.
            </div>
          )
        )}

        {/* ── Registrations table ── */}
        <div className="rounded-2xl bg-white shadow-sm border border-slate-100">
          {/* Table header */}
          <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                All Registrations
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {tableLoading ? "Loading…" : `${total} total`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search name, email, phone…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-400 w-48 sm:w-64"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                )}
              </div>
              {/* CSV */}
              <button
                onClick={downloadCSV}
                disabled={downloading}
                className="rounded-lg bg-violet-600 text-white px-3 py-1.5 text-sm font-semibold hover:bg-violet-700 transition disabled:opacity-60 whitespace-nowrap"
              >
                {downloading ? "…" : "↓ CSV"}
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-slate-100">
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    #
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Name
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Email
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Phone
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide text-center">
                    Attendees
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide text-center">
                    Ride
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Registered
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {rows.map((r, i) => (
                  <tr
                    key={r._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-5 py-3 text-slate-400 text-xs tabular-nums">
                      {i + 1}
                    </td>
                    <td className="px-5 py-3 font-semibold text-slate-900 whitespace-nowrap">
                      {r.fullName}
                    </td>
                    <td className="px-5 py-3 text-slate-600">{r.email}</td>
                    <td className="px-5 py-3 text-slate-600 whitespace-nowrap">
                      {r.phone}
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-violet-100 text-violet-700 font-bold text-xs">
                        {r.attendees}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-center">
                      {r.needsRide ? (
                        <span className="inline-flex items-center justify-center rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 text-xs font-semibold">
                          Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center rounded-full bg-slate-50 text-slate-400 border border-slate-200 px-2.5 py-0.5 text-xs font-semibold">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-slate-400 text-xs whitespace-nowrap">
                      {r.createdAt
                        ? new Date(r.createdAt).toLocaleString("en-CA", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "—"}
                    </td>
                  </tr>
                ))}

                {!tableLoading && rows.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-10 text-center text-slate-400"
                    >
                      {search
                        ? `No results for "${search}"`
                        : "No registrations yet."}
                    </td>
                  </tr>
                )}

                {tableLoading && rows.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-10 text-center text-slate-400"
                    >
                      Loading…
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Load more */}
          {hasMore && (
            <div className="px-5 py-4 border-t border-slate-100 text-center">
              <button
                onClick={loadMore}
                disabled={tableLoading}
                className="text-sm font-semibold text-violet-600 hover:text-violet-800 disabled:opacity-50 transition"
              >
                {tableLoading
                  ? "Loading…"
                  : `Load more (${total - rows.length} remaining)`}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
