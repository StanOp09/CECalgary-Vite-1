import { useEffect, useState } from "react";
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

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(`${BACKEND_URL}/admin/dashboard`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <p>Loading dashboard...</p>;

  const chartData = {
    labels: data.chartData.map((d) => d._id),
    datasets: [
      {
        label: "Attendees per Day",
        data: data.chartData.map((d) => d.attendees),
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-16">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold">Registrations</h2>
          <p className="text-2xl">{data.totalRegistrations}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold">Total Attendees</h2>
          <p className="text-2xl">{data.totalAttendees}</p>
        </div>
      </div>

      <div className="bg-white shadow rounded p-4">
        <Bar data={chartData} />
      </div>
    </div>
  );
}
