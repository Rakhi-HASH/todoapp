
"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Clock, AlertCircle } from "lucide-react";

export default function Pending() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow p-6">
            {/* Header */}
            <div className="flex items-center gap-2 mb-1">
              <Clock className="text-gray-700" size={20} />
              <h1 className="text-lg font-semibold">Pending</h1>
            </div>
            <p className="text-gray-500 mb-4">
              You have <span className="font-medium">5</span> Tasks pending
            </p>

            {/* Filters */}
            <div className="flex gap-2 mb-6">
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                All
              </button>
              <button className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300">
                Today
              </button>
              <button className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300">
                This Week
              </button>
              <select className="px-3 py-1 bg-gray-200 rounded text-sm focus:outline-none">
                <option>This Month📅</option>
              </select>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tasks Section */}
              <div className="md:col-span-2 space-y-4">
                {/* Today */}
                <div>
                  <h2 className="text-sm font-semibold mb-2">Today</h2>
                  <TaskItem title="Client Presentation" time="6:00 PM"  />
                </div>

                {/* Earlier */}
                <div>
                  <h2 className="text-sm font-semibold mb-2">Earlier</h2>
                  <TaskItem title="Article Review" time="Tomorrow 9:30AM"  />
                  <TaskItem title="Read Book: The Diary of Young Girl" overdue />
                  <TaskItem title="Plan Vacation" time="Today 7:00 PM" />
                  <TaskItem title="Review Project Plan" overdue />
                </div>
              </div>

              {/* Right Side */}
              <div className="space-y-4">
                {/* Productivity Tip */}
                <div className="bg-gray-50 p-4 rounded shadow-sm">
                  <h3 className="font-semibold mb-2">Productivity Tip ⚡</h3>
                  <p className="text-sm text-gray-600">
                    Break Tasks into smaller steps to make them easier to tackle
                    and less overwhelming.
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    ⭐ Use 3.3.3 rule of productivity
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-50 p-4 rounded shadow-sm">
                  <h3 className="font-semibold mb-3">Quick Actions</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Clear All pending tasks</li>
                    <li>• Clear All overdue tasks</li>
                    <li>• Export pending tasks</li>
                  </ul>

                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Get a Reminder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}



type TaskItemProps = {
  title: string;
  time?: string;
  overdue?: boolean; 
};

function TaskItem({ title, time, overdue = false }: TaskItemProps) {
  return (
    <div className="flex justify-between items-center bg-gray-50 p-3 rounded mb-2">
      <div className="flex items-center gap-2">
        <input type="checkbox" className="accent-blue-600" />
        <span className="text-sm">{title}</span>
      </div>

      {overdue ? (
        <span className="text-xs text-red-500 font-medium">Overdue</span>
      ) : (
        <span className="text-xs text-gray-400">{time}</span>
      )}
    </div>
  );
}
