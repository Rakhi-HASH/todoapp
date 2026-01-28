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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const [user, setUser] = useState<UserState>({
    name: "",
    email: "",
    password: "",
  });

  const [newPassword, setNewPassword] = useState("");

  //  Load user
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

  //  CHANGE ACCOUNT (SAVE)
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

  //  DELETE ACCOUNT
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
    <main className="min-h-screen bg-gray-100 flex flex-col">
          {/* Navbar with toggle */}
          <Navbar onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
    
          <div className="flex flex-1">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    
            {/* Mobile overlay */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black/40 z-40 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
          
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8 flex justify-center items-start mt-10">
          {/* Profile Card */}
          <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
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

