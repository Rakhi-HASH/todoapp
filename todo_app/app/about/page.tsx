"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function AboutPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar with toggle */}
      <Navbar onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1">
     
        {/* Sidebar (mobile only) */}
        <div className="md:hidden">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Section */}
        <div className="flex-grow flex justify-center px-4 ">
          <div className="max-w-8xl w-full bg-white rounded-2xl shadow p-6 mt-6 md-10 ml-10 mr-10 flex flex-col">
            {/* Header */}
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
              👋 About Todo
            </h2>

            <hr className="mb-6" />

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center flex-grow">
              {/* Left Illustration */}
              <div className="flex justify-center">
                <Image
                  src="/illustration.jpg"
                  alt="Todo Illustration"
                  width={320}
                  height={320}
                />
              </div>

              
              {/* Right Text Content */}
              <div className="text-gray-700">
                <h3 className="font-semibold mb-2">
                  Welcome to <span className="font-bold">Todo</span>
                </h3>

                <p className="text-sm mb-4">
                  Todo is a simple and intuitive task management solution
                  designed to help you stay organized, focused, and productive
                  every day. Whether you are managing personal goals, work
                  tasks, or daily routines, Todo keeps everything in one
                  easy-to-use place.
                </p>

                <p className="text-sm mb-4">
                  Our app is built with modern technology to provide a smooth
                  experience across all devices. With real-time updates, smart
                  filtering, and progress tracking, you can always stay in
                  control of your tasks.
                </p>

                <h4 className="font-semibold mb-2">🚀 Features and Benefits</h4>

                <ul className="text-sm space-y-1 mb-4 list-none">
                  <li>▶ Easily add, edit, and delete tasks anytime.</li>
                  <li>▶ Organize tasks with priorities and due dates.</li>
                  <li>▶ Track completed and pending tasks separately.</li>
                  <li>▶ View productivity stats, streaks, and achievements.</li>
                  <li>▶ Clean and responsive design for mobile and desktop.</li>
                </ul>

                <h4 className="font-semibold mb-2">🎯 Our Mission</h4>

                <p className="text-sm mb-4">
                  Our mission is to simplify task management and help people
                  focus on what truly matters. We believe productivity should be
                  stress-free, motivating, and accessible to everyone.
                </p>

                <h4 className="font-semibold mb-2">🔒 Privacy First</h4>

                <p className="text-sm mb-4">
                  Your data is yours and yours alone. We do not sell, track, or
                  share your personal information. All your tasks remain secure
                  and private.
                </p>

                <h4 className="font-semibold mb-2">🌱 Constant Improvement</h4>

                <p className="text-sm">
                  We are continuously improving Todo by adding new features,
                  improving performance, and listening to user feedback to
                  create the best task management experience possible.
                </p>
              </div>
            </div>

            {/* Footer sticks to bottom */}
            <div className="pt-6 text-center text-xs text-gray-400">
              Contact : support@gmail.com <br />© 2025 Todo App. All rights
              reserved
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
