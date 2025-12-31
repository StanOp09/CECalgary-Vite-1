// import { useEffect, useState } from "react";

// const API_URL = import.meta.env.VITE_BACKEND_URL;

// export default function GivingDashboard() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const token = localStorage.getItem("adminToken");

//     if (!token) {
//       setError("Not authenticated");
//       setLoading(false);
//       return;
//     }

//     fetch(`${API_URL}/admin/giving-dashboard`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Unauthorized");
//         return res.json();
//       })
//       .then((json) => {
//         setData(json);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Failed to load dashboard");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading dashboard...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="p-6 mt-36">
//       <h1 className="text-2xl font-bold mb-6">Admin Giving Dashboard</h1>
//       <button
//         onClick={() => {
//           localStorage.clear();
//           window.location.href = "/admin/login";
//         }}
//         className="text-red-600 font-semibold"
//       >
//         Logout
//       </button>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Stat label="Total Donations" value={`$${data.totalDonations}`} />
//         <Stat
//           label="Active Subscriptions"
//           value={data.activeSubscriptionsCount}
//         />
//       </div>

//       <pre className="mt-6 bg-gray-100 p-4 rounded">
//         {JSON.stringify(data, null, 2)}
//       </pre>
//     </div>
//   );
// }

// function Stat({ label, value }) {
//   return (
//     <div className="bg-white shadow rounded p-4">
//       <p className="text-gray-500 text-sm">{label}</p>
//       <p className="text-xl font-bold">{value}</p>
//     </div>
//   );
// }

// **************VERSION 2*****************
// import { useEffect, useState } from "react";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   BarElement,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   BarElement,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend
// );

// export default function GivingDashboard() {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [recentDonations, setRecentDonations] = useState([]);

//   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//   useEffect(() => {
//     fetch(`${BACKEND_URL}/admin/giving-dashboard`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//       },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Unauthorized");
//         return res.json();
//       })
//       .then(setData)
//       .catch((err) => setError(err.message));
//   }, []);

//   if (error) return <p className="text-red-600">{error}</p>;
//   if (!data) return <p>Loading giving dashboard...</p>;

//   // -------- Charts --------

//   const monthlyChart = {
//     labels: data.monthlyTotals?.map((m) => m.month) || [],
//     datasets: [
//       {
//         label: "Monthly Giving (CAD)",
//         data: data.monthlyTotals?.map((m) => m.total) || [],
//       },
//     ],
//   };

//   const categoryChart = {
//     labels: data.categoryBreakdown?.map((c) => c.category) || [],
//     datasets: [
//       {
//         label: "Giving by Category",
//         data: data.categoryBreakdown?.map((c) => c.total) || [],
//       },
//     ],
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 mt-36">
//       <h1 className="text-3xl font-bold mb-6">Giving Dashboard</h1>
//       <button
//         onClick={() => {
//           localStorage.clear();
//           window.location.href = "/admin/login";
//         }}
//         className="text-red-600 font-semibold"
//       >
//         Logout
//       </button>
//       {/* Summary Cards */}
//       <div className="grid grid-cols-3 gap-4 mb-8">
//         <div className="bg-white shadow rounded p-4">
//           <h2 className="text-sm text-gray-500">Total Donations</h2>
//           <p className="text-2xl font-bold">
//             ${data.totalDonations.toFixed(2)}
//           </p>
//         </div>

//         <div className="bg-white shadow rounded p-4">
//           <h2 className="text-sm text-gray-500">Active Subscriptions</h2>
//           <p className="text-2xl font-bold">{data.activeSubscriptionsCount}</p>
//         </div>
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-2 gap-6">
//         <div className="bg-white shadow rounded p-4">
//           <h2 className="font-semibold mb-2">Monthly Giving</h2>
//           <Bar data={monthlyChart} />
//         </div>

//         <div className="bg-white shadow rounded p-4">
//           <h2 className="font-semibold mb-2">Giving by Category</h2>
//           <Pie data={categoryChart} />
//         </div>
//       </div>
//     </div>
//   );
// }

// **************VERSION 3*****************

// import { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// export default function GivingDashboard() {
//   const [data, setData] = useState(null);
//   const [recentDonations, setRecentDonations] = useState([]);

//   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
//   const token = localStorage.getItem("adminToken");

//   // Fetch giving dashboard stats
//   useEffect(() => {
//     fetch(`${BACKEND_URL}/admin/giving-dashboard`, {
//       headers: { Authorization: `Bearer ${token}` },
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then(setData)
//       .catch(console.error);
//   }, []);

//   // Real-time donations
//   // useEffect(() => {
//   //   const eventSource = new EventSource(
//   //     `${BACKEND_URL}/admin/recent-donations/stream`,
//   //     {
//   //       withCredentials: true,
//   //     }
//   //   );

//   //   eventSource.onmessage = (e) => {
//   //     const newDonations = JSON.parse(e.data);
//   //     setRecentDonations((prev) => {
//   //       const combined = [...newDonations, ...prev];
//   //       const unique = Array.from(
//   //         new Map(combined.map((d) => [d._id, d])).values()
//   //       );
//   //       return unique.sort(
//   //         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//   //       );
//   //     });
//   //   };

//   //   return () => eventSource.close();
//   // }, []);
//   useEffect(() => {
//     // const token = localStorage.getItem("adminToken");
//     if (!token) return;

//     const eventSource = new EventSource(
//       `${BACKEND_URL}/admin/recent-donations/stream?token=${token}`
//     );

//     eventSource.onmessage = (e) => {
//       const newDonations = JSON.parse(e.data);
//       setRecentDonations((prev) => {
//         const combined = [...newDonations, ...prev];
//         const unique = Array.from(
//           new Map(combined.map((d) => [d._id, d])).values()
//         );
//         return unique.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//       });
//     };

//     return () => eventSource.close();
//   }, []);

//   if (!data) return <p>Loading dashboard...</p>;

//   const chartData = {
//     labels: data.monthlyTotals.map((m) => m.month),
//     datasets: [
//       {
//         label: "Donations per Month (CAD)",
//         data: data.monthlyTotals.map((m) => m.total),
//         backgroundColor: "#4f46e5",
//       },
//     ],
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 mt-36">
//       <h1 className="text-3xl font-bold mb-6">Giving Dashboard</h1>
//       <button
//         onClick={() => {
//           localStorage.clear();
//           window.location.href = "/admin/login";
//         }}
//         className="text-red-600 font-semibold"
//       >
//         Logout
//       </button>
//       <div className="grid grid-cols-2 gap-4 mb-8">
//         <div className="bg-white shadow rounded p-4">
//           <h2 className="text-lg font-semibold">Total Donations</h2>
//           <p className="text-2xl">${data.totalDonations.toFixed(2)}</p>
//         </div>
//         <div className="bg-white shadow rounded p-4">
//           <h2 className="text-lg font-semibold">Active Subscriptions</h2>
//           <p className="text-2xl">{data.activeSubscriptionsCount}</p>
//         </div>
//       </div>

//       <div className="bg-white shadow rounded p-4 mb-8">
//         <h2 className="text-lg font-semibold mb-2">Monthly Donations</h2>
//         <Bar data={chartData} />
//       </div>

//       <div className="bg-white shadow rounded p-4">
//         <h2 className="text-lg font-semibold mb-2">Recent Donations</h2>
//         <table className="w-full text-left border">
//           <thead>
//             <tr>
//               <th className="border px-2 py-1">Email</th>
//               <th className="border px-2 py-1">Category</th>
//               <th className="border px-2 py-1">Amount</th>
//               <th className="border px-2 py-1">Frequency</th>
//               <th className="border px-2 py-1">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {recentDonations.map((d) => (
//               <tr key={d._id}>
//                 <td className="border px-2 py-1">{d.email}</td>
//                 <td className="border px-2 py-1">{d.category}</td>
//                 <td className="border px-2 py-1">${d.amount.toFixed(2)}</td>
//                 <td className="border px-2 py-1">{d.frequency}</td>
//                 <td className="border px-2 py-1">
//                   {new Date(d.createdAt).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// **************VERSION 4*****************
// import { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";

// export default function GivingDashboard() {
//   const [data, setData] = useState(null);
//   const [recentDonations, setRecentDonations] = useState([]);

//   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
//   const token = localStorage.getItem("adminToken");

//   useEffect(() => {
//     fetch(`${BACKEND_URL}/admin/giving-dashboard`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((r) => r.json())
//       .then(setData);
//   }, []);

//   useEffect(() => {
//     if (!token) return;

//     const es = new EventSource(
//       `${BACKEND_URL}/admin/recent-donations/stream?token=${token}`
//     );

//     es.onmessage = (e) => {
//       const incoming = JSON.parse(e.data);
//       setRecentDonations((prev) =>
//         [...incoming, ...prev]
//           .filter((v, i, a) => a.findIndex((x) => x._id === v._id) === i)
//           .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//       );
//     };

//     return () => es.close();
//   }, []);

//   if (!data) return <p>Loading...</p>;

//   return (
//     <div className="max-w-6xl mx-auto mt-36 p-6">
//       <h1 className="text-3xl font-bold mb-6">Giving Dashboard</h1>

//       <Bar
//         data={{
//           labels: data.monthlyTotals.map((m) => m.month),
//           datasets: [
//             {
//               label: "Monthly Donations (CAD)",
//               data: data.monthlyTotals.map((m) => m.total),
//             },
//           ],
//         }}
//       />

//       <table className="w-full mt-6 border">
//         <tbody>
//           {recentDonations.map((d) => (
//             <tr key={d._id}>
//               <td>{d.email}</td>
//               <td>${d.amount}</td>
//               <td>{d.category}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// **************VERSION 5*****************
// import { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// export default function GivingDashboard() {
//   const [data, setData] = useState(null);
//   const [recentDonations, setRecentDonations] = useState([]);

//   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
//   const token = localStorage.getItem("adminToken");

//   /* =============================
//      Fetch aggregated dashboard data
//      ============================= */
//   useEffect(() => {
//     fetch(`${BACKEND_URL}/admin/giving-dashboard`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Unauthorized");
//         return res.json();
//       })
//       .then(setData)
//       .catch(console.error);
//   }, []);

//   /* =============================
//      Live recent donations (SSE)
//      ============================= */
//   useEffect(() => {
//     const eventSource = new EventSource(
//       `${BACKEND_URL}/admin/recent-donations/stream`,
//       {
//         withCredentials: false, // token is in header on server auth
//       }
//     );

//     eventSource.onmessage = (e) => {
//       const incoming = JSON.parse(e.data);

//       setRecentDonations((prev) => {
//         const merged = [...incoming, ...prev];
//         const unique = Array.from(
//           new Map(merged.map((d) => [d._id, d])).values()
//         );

//         return unique
//           .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//           .slice(0, 50);
//       });
//     };

//     return () => eventSource.close();
//   }, []);

//   if (!data) return <p className="mt-40 text-center">Loading dashboard…</p>;

//   /* =============================
//      Chart config
//      ============================= */
//   const chartData = {
//     labels: data.monthlyTotals.map((m) => m.month),
//     datasets: [
//       {
//         label: "Monthly Donations ($)",
//         data: data.monthlyTotals.map((m) => m.total),
//         backgroundColor: "#4f46e5",
//       },
//     ],
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 pt-20">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Giving Dashboard</h1>

//         <button
//           onClick={() => {
//             localStorage.clear();
//             window.location.href = "/admin/login";
//           }}
//           className="text-red-600 font-semibold"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Summary cards */}
//       <div className="grid grid-cols-2 gap-4 mb-8">
//         <div className="bg-white shadow rounded p-4">
//           <h2 className="text-lg font-semibold">Total Donations</h2>
//           <p className="text-2xl">${data.totalDonations.toFixed(2)}</p>
//         </div>

//         <div className="bg-white shadow rounded p-4">
//           <h2 className="text-lg font-semibold">Active Subscriptions</h2>
//           <p className="text-2xl">{data.activeSubscriptionsCount}</p>
//         </div>
//       </div>

//       {/* Chart */}
//       <div className="bg-white shadow rounded p-4 mb-8">
//         <h2 className="text-lg font-semibold mb-2">Monthly Donations</h2>
//         <Bar data={chartData} />
//       </div>

//       {/* Recent donations */}
//       {/* <div className="bg-white shadow rounded p-4">
//         <h2 className="text-lg font-semibold mb-2">Recent Donations</h2>

//         <table className="w-full text-left border">
//           <thead>
//             <tr>
//               <th className="border px-2 py-1">Email</th>
//               <th className="border px-2 py-1">Category</th>
//               <th className="border px-2 py-1">Amount</th>
//               <th className="border px-2 py-1">Frequency</th>
//               <th className="border px-2 py-1">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {recentDonations.map((d) => (
//               <tr key={d._id}>
//                 <td className="border px-2 py-1">{d.email}</td>
//                 <td className="border px-2 py-1">{d.category}</td>
//                 <td className="border px-2 py-1">${d.amount.toFixed(2)}</td>
//                 <td className="border px-2 py-1">{d.frequency}</td>
//                 <td className="border px-2 py-1">
//                   {new Date(d.createdAt).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div> */}
//     </div>
//   );
// }

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

export default function GivingDashboard() {
  const [data, setData] = useState(null);
  const [recentDonations, setRecentDonations] = useState([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("adminToken");

  // Fetch dashboard data
  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    fetch(
      `${BACKEND_URL}/admin/giving-dashboard?category=${category}&search=${search}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(setData)
      .catch(console.error);
  }, [category, search]);

  // SSE for recent donations
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;

    const eventSource = new EventSource(
      `${BACKEND_URL}/admin/recent-donations/stream?token=${token}`
    );

    eventSource.onmessage = (e) => {
      const incoming = JSON.parse(e.data);
      setRecentDonations((prev) => {
        const merged = [...incoming, ...prev];
        const unique = Array.from(
          new Map(merged.map((d) => [d._id, d])).values()
        );
        return unique
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 50);
      });
    };

    return () => eventSource.close();
  }, []);

  if (!data)
    return (
      <p className="mt-40 text-center text-gray-600 text-lg">
        Loading dashboard…
      </p>
    );

  const chartData = {
    labels: data.monthlyTotals.map((m) => m.month),
    datasets: [
      {
        label: "Monthly Donations ($)",
        data: data.monthlyTotals.map((m) => m.total),
        backgroundColor: "#4f46e5",
        borderRadius: 8, // rounded bars
      },
    ],
  };

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
        // Only compute max if data exists
        max:
          data?.monthlyTotals?.length > 0
            ? Math.max(...data.monthlyTotals.map((m) => m.total)) * 1.2
            : undefined,
        ticks: {
          // Only compute stepSize if data exists
          stepSize:
            data?.monthlyTotals?.length > 0
              ? Math.ceil(
                  Math.max(...data.monthlyTotals.map((m) => m.total)) / 5
                )
              : undefined,
          callback: (value) => `$${value}`,
        },
      },
      x: {
        ticks: { color: "#4b5563", font: { weight: "bold" } },
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 mb-24">
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
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg p-6 flex flex-col justify-center items-center">
          <h2 className="text-lg font-semibold">Total Donations</h2>
          <p className="text-2xl font-bold mt-2">
            ${data.totalDonations.toFixed(2)}
          </p>
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
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        {/* Category filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-4 py-2"
        >
          <option value="all">All Categories</option>
          <option value="tithe">Tithe</option>
          <option value="partnership">Partnership</option>
          <option value="seed offering">Seed Offering</option>
          <option value="offering">Offering</option>
          <option value="general giving">General Giving</option>
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
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Monthly Donations
        </h2>

        <div style={{ height: "350px" }}>
          {" "}
          {/* fixed height */}
          <Bar data={chartData} options={chartOptions} height={300} />
        </div>
      </div>
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
              <th className="px-4 py-2 text-gray-600">Frequency</th>
              <th className="px-4 py-2 text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {recentDonations.map((d) => (
              <tr key={d._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2">{d.email}</td>
                <td className="px-4 py-2">{d.category}</td>
                <td className="px-4 py-2">${d.amount.toFixed(2)}</td>
                <td className="px-4 py-2">{d.frequency}</td>
                <td className="px-4 py-2">
                  {new Date(d.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
