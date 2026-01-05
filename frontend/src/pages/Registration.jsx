// // import { useState } from "react";

// // export default function ProgramRegistration() {
// //   // Use your Render backend URL here
// //   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// //   if (!BACKEND_URL) {
// //     console.error("VITE_BACKEND_URL is not defined");
// //   }

// //   const [formData, setFormData] = useState({
// //     fullName: "",
// //     email: "",
// //     phone: "",
// //     attendees: 1,
// //   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await fetch(`${BACKEND_URL}/register`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(formData),
// //       });
// //       const data = await res.json();
// //       alert(data.message);
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to submit registration");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-400 flex items-center justify-center px-4 mt-16">
// //       <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8">
// //         <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
// //           Register for Our Program
// //         </h2>

// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <input
// //             type="text"
// //             name="fullName"
// //             placeholder="Full Name"
// //             value={formData.fullName}
// //             onChange={handleChange}
// //             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             required
// //           />
// //           <input
// //             type="email"
// //             name="email"
// //             placeholder="Email Address"
// //             value={formData.email}
// //             onChange={handleChange}
// //             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             required
// //           />
// //           <input
// //             type="tel"
// //             name="phone"
// //             placeholder="Phone Number"
// //             value={formData.phone}
// //             onChange={handleChange}
// //             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             required
// //           />
// //           <div className="flex flex-col">
// //             <label className="mb-1 font-medium text-gray-700">
// //               Number of Attendees
// //             </label>
// //             <input
// //               type="number"
// //               name="attendees"
// //               min="1"
// //               value={formData.attendees}
// //               onChange={handleChange}
// //               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               required
// //             />
// //             <span className="text-sm text-gray-500 mt-1">
// //               Enter the total number of people you are registering, including
// //               yourself.
// //             </span>
// //           </div>

// //           <button
// //             type="submit"
// //             className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
// //           >
// //             Register Now
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // import { useState } from "react";
// // import ImageCard from "../components/ImageCard";

// // export default function ProgramRegistration() {
// //   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// //   if (!BACKEND_URL) {
// //     console.error("VITE_BACKEND_URL is not defined");
// //   }

// //   const [formData, setFormData] = useState({
// //     fullName: "",
// //     email: "",
// //     phone: "",
// //     attendees: 1,
// //   });

// //   const [showForm, setShowForm] = useState(false); // ✅ toggle state

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await fetch(`${BACKEND_URL}/register`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(formData),
// //       });
// //       const data = await res.json();
// //       alert(data.message);
// //       setShowForm(false); // optional: hide form after submission
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to submit registration");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex flex-col items-center justify-center px-4 ">
// //       {/* 🔹 Button to show form */}
// //       {!showForm && (
// //         <button
// //           onClick={() => setShowForm(true)}
// //           className="bg-yellow-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-600 transition -mt-[600px]"
// //         >
// //           Save Your Seat
// //         </button>
// //       )}

// //       {/* 🔹 Form appears when showForm is true */}
// //       {showForm && (
// //         <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8 mt-6">
// //           <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
// //             Register for Our Program
// //           </h2>

// //           <form onSubmit={handleSubmit} className="space-y-4">
// //             <input
// //               type="text"
// //               name="fullName"
// //               placeholder="Full Name"
// //               value={formData.fullName}
// //               onChange={handleChange}
// //               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               required
// //             />
// //             <input
// //               type="email"
// //               name="email"
// //               placeholder="Email Address"
// //               value={formData.email}
// //               onChange={handleChange}
// //               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               required
// //             />
// //             <input
// //               type="tel"
// //               name="phone"
// //               placeholder="Phone Number"
// //               value={formData.phone}
// //               onChange={handleChange}
// //               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               required
// //             />
// //             <div className="flex flex-col">
// //               <label className="mb-1 font-medium text-gray-700">
// //                 Number of Attendees
// //               </label>
// //               <input
// //                 type="number"
// //                 name="attendees"
// //                 min="1"
// //                 value={formData.attendees}
// //                 onChange={handleChange}
// //                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 required
// //               />
// //               <span className="text-sm text-gray-500 mt-1">
// //                 Enter the total number of people you are registering, including
// //                 yourself.
// //               </span>
// //             </div>

// //             <button
// //               type="submit"
// //               className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
// //             >
// //               Register Now
// //             </button>
// //           </form>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import { useState } from "react";

// export default function ProgramRegistration() {
//   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     attendees: 1,
//   });

//   const [showForm, setShowForm] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const res = await fetch(`${BACKEND_URL}/register`, {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(formData),
//   //     });
//   //     const data = await res.json();
//   //     alert(data.message);
//   //     setShowForm(false);
//   //   } catch (err) {
//   //     console.error(err);
//   //     alert("Failed to submit registration");
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`${BACKEND_URL}/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const text = await res.text(); // 👈 IMPORTANT

//       if (!res.ok) {
//         console.error("Server error:", text);
//         alert("Registration failed. Please try again in a few minutes.");
//         return;
//       }

//       const data = JSON.parse(text);
//       alert(data.message);
//       setShowForm(false);
//     } catch (err) {
//       console.error("Network error:", err);
//       alert("Registration failed. Please check your connection and try again.");
//     }
//   };

//   return (
//     <div className="w-full flex flex-col items-center">
//       {!showForm && (
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-yellow-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-600 transition mb-10 sm:mt-8"
//         >
//           Save Your Seat
//         </button>
//       )}

//       {showForm && (
//         <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-6 sm:p-8 mt-6 sm:mt-8">
//           <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-700 mb-6">
//             Register for Our Program
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="fullName"
//               placeholder="Full Name"
//               value={formData.fullName}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email Address"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
//               required
//             />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
//               required
//             />
//             <div className="flex flex-col">
//               <label className="mb-1 font-medium text-gray-700 text-sm sm:text-base">
//                 Number of Attendees
//               </label>
//               <input
//                 type="number"
//                 name="attendees"
//                 min="1"
//                 value={formData.attendees}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
//                 required
//               />
//               <span className="text-xs sm:text-sm text-gray-500 mt-1">
//                 Enter the total number of people you are registering, including
//                 yourself.
//               </span>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-sm sm:text-base"
//             >
//               Register Now
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from "react";

export default function ProgramRegistration() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    attendees: 1,
  });

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "attendees" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!BACKEND_URL) {
      alert("Backend URL is not set. Please contact the admin.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const text = await res.text();

      if (!res.ok) {
        console.error("Server error:", text);
        alert("Registration failed. Please try again in a few minutes.");
        return;
      }

      const data = JSON.parse(text);
      alert(data.message);

      setShowForm(false);
      setFormData({ fullName: "", email: "", phone: "", attendees: 1 });
    } catch (err) {
      console.error("Network error:", err);
      alert("Registration failed. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mb-12">
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="group relative inline-flex items-center justify-center rounded-xl px-7 py-3 font-semibold text-white
                     bg-yellow-500 hover:bg-yellow-600 transition shadow-lg shadow-yellow-500/20
                     focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black
                     mb-10 sm:mt-8"
        >
          <span className="mr-2">Save Your Seat</span>
          <span className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </button>
      )}

      {showForm && (
        <div className="relative w-full max-w-md">
          {/* subtle glow */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500/30 via-yellow-500/20 to-purple-500/30 blur-lg opacity-70" />

          <div className="relative bg-white/95 backdrop-blur shadow-2xl rounded-3xl border border-white/60 p-6 sm:p-8 mt-6 sm:mt-8">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition"
              aria-label="Close registration form"
            >
              ✕
            </button>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-blue-700 mb-2">
              Register for the Miracle Service
            </h2>
            <p className="text-center text-sm text-gray-600 mb-6">
              Please fill in your details to reserve your seat.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    👤
                  </span>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="First Last"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-10 p-3 border border-gray-200 rounded-xl bg-white
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    ✉️
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 p-3 border border-gray-200 rounded-xl bg-white
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    📞
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="(403) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 p-3 border border-gray-200 rounded-xl bg-white
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              {/* Attendees */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Attendees
                </label>
                <input
                  type="number"
                  name="attendees"
                  min="1"
                  value={formData.attendees}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-xl bg-white
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             text-sm sm:text-base"
                  required
                />
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Enter the total number of people you are registering,
                  including yourself.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl py-3 font-semibold text-white
                           bg-blue-600 hover:bg-blue-700 transition
                           shadow-lg shadow-blue-600/20
                           disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Register Now"}
              </button>

              <p className="text-[11px] sm:text-xs text-gray-500 text-center pt-1">
                By registering, you agree to be contacted about this event.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
