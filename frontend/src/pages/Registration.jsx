// import { useState } from "react";

// export default function ProgramRegistration() {
//   // Use your Render backend URL here
//   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//   if (!BACKEND_URL) {
//     console.error("VITE_BACKEND_URL is not defined");
//   }

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     attendees: 1,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${BACKEND_URL}/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       alert(data.message);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to submit registration");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-400 flex items-center justify-center px-4 mt-16">
//       <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8">
//         <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
//           Register for Our Program
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="fullName"
//             placeholder="Full Name"
//             value={formData.fullName}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <input
//             type="tel"
//             name="phone"
//             placeholder="Phone Number"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700">
//               Number of Attendees
//             </label>
//             <input
//               type="number"
//               name="attendees"
//               min="1"
//               value={formData.attendees}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//             <span className="text-sm text-gray-500 mt-1">
//               Enter the total number of people you are registering, including
//               yourself.
//             </span>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
//           >
//             Register Now
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import ImageCard from "../components/ImageCard";

// export default function ProgramRegistration() {
//   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//   if (!BACKEND_URL) {
//     console.error("VITE_BACKEND_URL is not defined");
//   }

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     attendees: 1,
//   });

//   const [showForm, setShowForm] = useState(false); // ✅ toggle state

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${BACKEND_URL}/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       alert(data.message);
//       setShowForm(false); // optional: hide form after submission
//     } catch (err) {
//       console.error(err);
//       alert("Failed to submit registration");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center px-4 ">
//       {/* 🔹 Button to show form */}
//       {!showForm && (
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-yellow-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-600 transition -mt-[600px]"
//         >
//           Save Your Seat
//         </button>
//       )}

//       {/* 🔹 Form appears when showForm is true */}
//       {showForm && (
//         <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8 mt-6">
//           <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
//             Register for Our Program
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="fullName"
//               placeholder="Full Name"
//               value={formData.fullName}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email Address"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//             <div className="flex flex-col">
//               <label className="mb-1 font-medium text-gray-700">
//                 Number of Attendees
//               </label>
//               <input
//                 type="number"
//                 name="attendees"
//                 min="1"
//                 value={formData.attendees}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <span className="text-sm text-gray-500 mt-1">
//                 Enter the total number of people you are registering, including
//                 yourself.
//               </span>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BACKEND_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      alert(data.message);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Failed to submit registration");
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-yellow-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-600 transition mb-10 sm:mt-8"
        >
          Save Your Seat
        </button>
      )}

      {showForm && (
        <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-6 sm:p-8 mt-6 sm:mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-700 mb-6">
            Register for Our Program
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              required
            />
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700 text-sm sm:text-base">
                Number of Attendees
              </label>
              <input
                type="number"
                name="attendees"
                min="1"
                value={formData.attendees}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                required
              />
              <span className="text-xs sm:text-sm text-gray-500 mt-1">
                Enter the total number of people you are registering, including
                yourself.
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-sm sm:text-base"
            >
              Register Now
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
