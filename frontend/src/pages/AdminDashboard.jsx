import { useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [recent, setRecent] = useState([]);
  const [downloading, setDownloading] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!BACKEND_URL) return;

    // Dashboard stats + chart
    fetch(`${BACKEND_URL}/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(setData)
      .catch(() => {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
      });

    // Recent registrations table
    fetch(`${BACKEND_URL}/admin/registrations?limit=20`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((payload) => setRecent(payload.registrations || []))
      .catch(() => {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
      });
  }, [BACKEND_URL]);

  const chartData = useMemo(() => {
    if (!data) return null;
    return {
      labels: data.chartData.map((d) => d._id),
      datasets: [
        {
          label: "Attendees per Day",
          data: data.chartData.map((d) => d.attendees),
          backgroundColor: "#2563eb", // blue-600
          hoverBackgroundColor: "#1d4ed8", // blue-700
          borderRadius: 8,
          barThickness: 20,
        },
      ],
    };
  }, [data]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // cleaner look
      },
      title: {
        display: true,
        text: "Attendance Trend",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // ❌ remove vertical lines
          drawBorder: false,
        },
        ticks: {
          color: "#64748b", // slate-500
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false, // ❌ remove horizontal lines
          drawBorder: false,
        },
        ticks: {
          color: "#64748b",
          precision: 0,
        },
      },
    },
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/admin/login";
  };

  const downloadCSV = async () => {
    if (!BACKEND_URL) return;
    setDownloading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/admin/registrations.csv`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to download");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "registrations.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("CSV download failed.");
    } finally {
      setDownloading(false);
    }
  };

  if (!BACKEND_URL) return <p>BACKEND URL not set</p>;
  if (!data) return <p>Loading dashboard...</p>;

  return (
    <div className="min-h-screen mb-24">
      <div className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Registration Admin
            </h1>
            <p className="text-sm text-slate-500">
              Overview of registrations and attendance
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5">
            <p className="text-sm font-medium text-slate-500">
              Total Registrations
            </p>
            <p className="mt-2 text-4xl font-extrabold text-slate-900">
              {data.totalRegistrations}
            </p>
          </div>

          <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5">
            <p className="text-sm font-medium text-slate-500">
              Total Attendees
            </p>
            <p className="mt-2 text-4xl font-extrabold text-slate-900">
              {data.totalAttendees}
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="mt-6 rounded-2xl bg-white shadow-sm border border-slate-100 p-5">
          <div className="h-[340px]">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Recent Registrations + CSV button */}
        <div className="mt-6 rounded-2xl bg-white shadow-sm border border-slate-100 p-5">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recent Registrations
              </h2>
              <p className="text-sm text-slate-500">
                Full name, email, phone, attendees
              </p>
            </div>

            <button
              onClick={downloadCSV}
              disabled={downloading}
              className="rounded-xl bg-blue-600 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-60"
            >
              {downloading ? "Downloading..." : "Download CSV"}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b">
                  <th className="py-2 pr-4">Full Name</th>
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2 pr-4">Phone</th>
                  <th className="py-2 pr-4">Attendees</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((r) => (
                  <tr key={r._id} className="border-b last:border-b-0">
                    <td className="py-2 pr-4 font-medium text-slate-900">
                      {r.fullName}
                    </td>
                    <td className="py-2 pr-4">{r.email}</td>
                    <td className="py-2 pr-4">{r.phone}</td>
                    <td className="py-2 pr-4">{r.attendees}</td>
                  </tr>
                ))}

                {recent.length === 0 && (
                  <tr>
                    <td className="py-6 text-slate-500" colSpan={4}>
                      No registrations yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
