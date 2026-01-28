"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import TaskSection from "@/components/TaskSection";

export default function HomePage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar with mobile toggle */}
      <Navbar onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1  ">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col p-4 sm:p-6 md:p-6 lg:p-8 md:pl-64">
          <Hero />
          <TaskSection />
        </div>
      </div>
    </main>
  );
}
