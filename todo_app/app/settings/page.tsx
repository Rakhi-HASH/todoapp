"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

interface UserState {
  name: string;
  email: string;
  password?: string;
}

export default function settings() {
  const router = useRouter();

  const [user, setUser] = useState<UserState>({
    name: "",
    email: "",
    password: "",
  });

  const [newPassword, setNewPassword] = useState("");

  // 🔹 Load user
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser({
        name: parsed.name || "",
        email: parsed.email || "",
      });
    }
  }, []);

  // ✅ CHANGE ACCOUNT (SAVE)
  const handleSave = () => {
    if (!user.name || !user.email) {
      return alert("Name and email are required");
    }

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      return alert("User not found");
    }

    const parsed = JSON.parse(storedUser);

    const updatedUser = {
      ...parsed,
      name: user.name,
      email: user.email,
      ...(newPassword && { password: newPassword }),
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setNewPassword("");

    alert("✅ Account updated successfully");
  };

  // 🗑️ DELETE ACCOUNT
  const handleDeleteAccount = () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmDelete) return;

    // Clear everything
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("tasks");

    alert("❌ Account deleted");

    // Redirect to login
    router.push("/login");
  };

  return (
    <main className="h-screen w-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Below Navbar */}
      <div className="flex h-[calc(100vh-64px)] w-full">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8 flex justify-center items-start">
          {/* Profile Card */}
          <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                👤 Profile Settings
              </h1>

              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-5 py-2 rounded-lg 
             hover:bg-green-700 transform hover:scale-105 
             transition duration-300 ease-in-out shadow-sm hover:shadow-md"
              >
                Save Changes
              </button>

            </div>

            {/* Profile Section */}
            <div className="flex flex-col items-center mb-10">
              <div className="w-28 h-28 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl font-bold">
                {user.name ? user.name[0].toUpperCase() : "U"}
              </div>

              {/* <button className="mt-3 text-sm text-green-600 hover:underline">
                Change Photo (coming soon)
              </button> */}

              <button
                onClick={handleDeleteAccount}
                className="mt-2 text-sm text-red-500 hover:underline"
              >
                Delete Account
              </button>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500
                             bg-white dark:bg-gray-700 dark:text-white"
                  value={user.name}
                  onChange={(e) =>
                    setUser({ ...user, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500
                             bg-white dark:bg-gray-700 dark:text-white"
                  value={user.email}
                  onChange={(e) =>
                    setUser({ ...user, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Leave empty to keep old password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500
                             bg-white dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}




//   return (
//     <main className="min-h-screen bg-gray-100">
//       <div className="flex">
//         <Sidebar />

//         <div className="flex-1 p-6">
//           {/* Header */}
//           <div className="flex justify-between items-center mb-4">
//             <div className="flex items-center gap-2">
//               <span className="text-green-600 text-xl">⚙️</span>
//               <h1 className="text-lg font-semibold">Settings</h1>
//             </div>

//             <button
//               onClick={handleSave}
//               className="flex items-center gap-1 text-white bg-green-600 px-3 py-1 rounded hover:bg-green-700"
//             >
//               Save
//             </button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 ">
//             {/* Account */}
//             <div className="bg-white rounded-lg shadow-md p-6 max-w-full ">
//               <h1 className="text-lg font-semibold mb-5">Account</h1>

//               <div className="flex gap-6">
//                 {/* Profile */}
//                 <div className="flex flex-col items-center">
//                   <img
//                     src="data:image/jpeg;base64,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"
//                     alt="Profile"
//                     className="w-16 h-16 rounded-full bg-gray-100"
//                   />

//                   <button className="text-green-500 text-sm font-medium mt-2">
//                     Edit
//                   </button>

//                   <button className="mt-3 text-red-500 text-sm flex items-center gap-1">
//                     🗑️ Delete Account
//                   </button>
//                 </div>

//                 {/* Form */}
//                 <div className="flex-1 space-y-4">
//                   {/* Name */}
//                   <div>
//                     <label className="block text-xs font-medium text-gray-600 mb-1">
//                       Name
//                     </label>
//                     <input
//                       type="text"
//                       value={user.name}
//                       onChange={(e) =>
//                         setUser({ ...user, name: e.target.value })
//                       }
//                       className="w-full rounded border border-gray-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                     />
//                   </div>

//                   {/* Email */}
//                   <div>
//                     <label className="block text-xs font-medium text-gray-600 mb-1">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       value={user.email}
//                       onChange={(e) =>
//                         setUser({ ...user, email: e.target.value })
//                       }
//                       className="w-full rounded border border-gray-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                     />
//                   </div>

//                   {/* Password */}
//                   <div>
//                     <label className="block text-xs font-medium text-gray-600 mb-1">
//                       Password
//                     </label>
//                     <input
//                       type="password"
//                       value={user.password}
//                       onChange={(e) =>
//                         setUser({ ...user, password: e.target.value })
//                       }
//                       placeholder="Enter new password"
//                       className="w-full rounded border border-gray-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Task Preference */}
//             <div className="bg-white rounded-lg shadow p-6 space-y-4">
//               <h1 className="text-lg font-semibold">Task Preference</h1>

//               <div className="flex justify-between items-center bg-gray-100 rounded-lg px-4 py-2">
//                 <span>Default Priority</span>
//                 <select className="bg-gray-100 focus:outline-none">
//                   <option>low-high</option>
//                   <option>high-low</option>
//                 </select>
//               </div>

//               <div className="flex justify-between items-center bg-gray-100 rounded-lg px-4 py-2">
//                 <span>Week starts on</span>
//                 <select className="bg-gray-100 focus:outline-none">
//                   <option>monday</option>
//                   <option>sunday</option>
//                 </select>
//               </div>

//               <div className="flex justify-between items-center bg-gray-100 rounded-lg px-4 py-2">
//                 <span>Default Due Time</span>
//                 <select className="bg-gray-100 focus:outline-none">
//                   <option>none</option>
//                   <option>morning</option>
//                   <option>evening</option>
//                 </select>
//               </div>
//             </div>

//             {/* Notifications */}
//             <div className="bg-white rounded-lg shadow p-6 space-y-4">
//               <h1 className="text-lg font-semibold">Notifications</h1>

//               <div className="flex justify-between items-center bg-gray-100 rounded-lg px-4 py-2">
//                 <span>Reminder</span>
//                 <PriorityToggle />
//               </div>

//               <div className="flex justify-between items-center bg-gray-100 rounded-lg px-4 py-2">
//                 <span>Reminder Timing</span>
//                 <select className="bg-gray-100 focus:outline-none">
//                   <option>1 hr</option>
//                   <option>30 min</option>
//                   <option>15 min</option>
//                   <option>5 min</option>
//                 </select>
//               </div>

//               <div className="flex justify-between items-center bg-gray-100 rounded-lg px-4 py-2">
//                 <span>Email Notifications</span>
//                 <PriorityToggle />
//               </div>
//             </div>

//             {/* Appearance */}
//             <div className="bg-white rounded-lg shadow p-6 space-y-4">
//               <h1 className="text-lg font-semibold">Appearance</h1>

//               <div className="flex justify-between items-center bg-gray-100 rounded-lg px-4 py-2">
//                 <span>Theme</span>
//                 <select className="bg-gray-100 focus:outline-none">
//                   <option>light</option>
//                   <option>dark</option>
//                 </select>
//               </div>

//               <div className="flex justify-between items-center bg-gray-100 rounded-lg px-4 py-2">
//                 <span>Font Size</span>
//                 <select className="bg-gray-100 focus:outline-none">
//                   <option>small</option>
//                   <option>medium</option>
//                   <option>large</option>
//                 </select>
//               </div>

//               <div className="flex justify-between items-center bg-gray-100 rounded-lg px-4 py-2">
//                 <span>Language</span>
//                 <select className="bg-gray-100 focus:outline-none">
//                   <option>English</option>
//                   <option>Hindi</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

