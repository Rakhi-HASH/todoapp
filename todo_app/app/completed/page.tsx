// pages/completed.js

"use client"
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { Trash2, Download } from "lucide-react"; // Icons

export default function Completed() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Office", time: "Today, 10:00 AM" },
    { id: 2, title: "Office Meeting", time: "Today, 1:00 AM" },
    { id: 3, title: "Designing", time: "Yesterday, 9:00 AM" },
    { id: 4, title: "Shopping", time: "Yesterday, 4:00 PM" },
    { id: 5, title: "Start Making To-do List", time: "13 Jan, 10:00 AM" },
  ]);

  const clearAll = () => setTasks([]);

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="text-green-600 text-xl">✅</span>
                <h1 className="text-lg font-semibold">Completed Tasks</h1>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                >
                  <Trash2 size={16} /> Clear All
                </button>
                <button className="flex items-center gap-1 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
                  <Download size={16} /> Export
                </button>
              </div>
            </div>

            <p className="text-gray-500 mb-4">You've completed {tasks.length} tasks 🎉</p>

            {/* Filters */}
            <div className="flex gap-2 mb-6">
              {["All", "Today", "This Week", "This Month","📅"].map((filter) => (
                <button
                  key={filter}
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Task List */}
              <div>
                {/* Grouped Tasks */}
                <div className="mb-4">
                  <h2 className="font-semibold mb-2">Today</h2>
                  {tasks
                    .filter((task) => task.time.includes("Today"))
                    .map((task) => (
                      <div
                        key={task.id}
                        className="flex justify-between items-center bg-gray-50 p-3 rounded mb-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-green-600">✅</span>
                          <span>{task.title}</span>
                        </div>
                        <span className="text-gray-400">{task.time.split(",")[1]} </span>
                      </div>
                    ))}
                </div>

                <div className="mb-4">
                  <h2 className="font-semibold mb-2">Yesterday</h2>
                  {tasks
                    .filter((task) => task.time.includes("Yesterday"))
                    .map((task) => (
                      <div
                        key={task.id}
                        className="flex justify-between items-center bg-gray-50 p-3 rounded mb-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-green-600">✅</span>
                          <span>{task.title}</span>
                        </div>
                        <span className="text-gray-400">{task.time.split(",")[1]}</span>
                      </div>
                    ))}
                </div>

                <div className="mb-4">
                  <h2 className="font-semibold mb-2">Earlier</h2>
                  {tasks
                    .filter((task) => task.time.includes("Jan"))
                    .map((task) => (
                      <div
                        key={task.id}
                        className="flex justify-between items-center bg-gray-50 p-3 rounded mb-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-green-600">✅</span>
                          <span>{task.title}</span>
                        </div>
                        <span className="text-gray-400">{task.time.split(",")[1]}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Right: Progress & Achievements */}
              <div className="space-y-6">
                {/* Progress */}
                <div className="bg-gray-50 p-4 rounded shadow">
                  <h2 className="font-semibold mb-2">Your Progress</h2>
                  <ul className="space-y-1 text-gray-600">
                    <li>✅ Task completed Today: 2</li>
                    <li>📅 This Week: 12</li>
                    <li>🏆 Best Day: Monday (5 Task)</li>
                    <li>🔥 Current Streak: 4 days</li>
                  </ul>
                </div>

                {/* Achievements */}
                <div className="bg-gray-50 p-4 rounded shadow">
                  <h2 className="font-semibold mb-2">Your Achievements</h2>
                  <ul className="space-y-1 text-gray-600">
                    <li>🥇 First Task completed</li>
                    <li>🔥  7-days streak</li>
                    <li>✅ 25 tasks completed</li>
                    <li className="text-gray-400">🔒 100 Tasks</li>
                    <li className="text-gray-400">🔒 50 Days Streak</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
