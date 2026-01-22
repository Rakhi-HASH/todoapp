"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Clock } from "lucide-react";
import { FiTrash2 } from "react-icons/fi";
import { useState, useEffect } from "react";
import * as api from "../services/api";

interface Task {
  _id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

type FilterType = "all" | "today" | "tomorrow" | "earlier";

export default function Pending() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) api.setAuthToken(token);
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await api.getTasks();
      setTasks(data.filter((t: Task) => !t.completed)); // only pending tasks
    } catch (err: any) {
      alert(err.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      const updated = await api.updateTask(task._id, { completed: !task.completed });
      setTasks(tasks.filter(t => t._id !== updated._id)); // remove from pending
    } catch (err: any) {
      alert(err.message || "Failed to update task");
    }
  };

  const handleDeleteTask = async (task: Task) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.deleteTask(task._id);
      setTasks(tasks.filter(t => t._id !== task._id));
    } catch (err: any) {
      alert(err.message || "Failed to delete task");
    }
  };


  // 🔴 Clear all pending tasks
  const clearAllPending = async () => {
    if (!confirm("Delete ALL pending tasks?")) return;

    try {
      for (const task of tasks) {
        await api.deleteTask(task._id);
      }
      setTasks([]);
    } catch {
      alert("Failed to clear pending tasks");
    }
  };

  // 🔴 Clear overdue tasks
  const clearOverdueTasks = async () => {
    if (!confirm("Delete ALL overdue tasks?")) return;

    try {
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);

      const overdue = tasks.filter(t => {
        if (!t.dueDate) return false;
        const d = new Date(t.dueDate);
        d.setHours(0, 0, 0, 0);
        return d < todayDate;
      });

      for (const task of overdue) {
        await api.deleteTask(task._id);
      }

      setTasks(tasks.filter(t => !overdue.some(o => o._id === t._id)));
    } catch {
      alert("Failed to clear overdue tasks");
    }
  };

  // 🔴 Export pending tasks as CSV
  const exportPendingTasks = () => {
    if (tasks.length === 0) {
      alert("No pending tasks to export");
      return;
    }

    const csv = [
      ["Title", "Due Date"],
      ...tasks.map(t => [
        `"${t.title}"`,
        t.dueDate
          ? new Date(t.dueDate).toLocaleDateString("en-IN")
          : "No Date",
      ]),
    ]
      .map(row => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "pending-tasks.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  // 🔴 Reminder (simple UX for now)
  const handleReminder = () => {
    alert("⏰ Reminder feature coming soon!");
  };


  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  // Filter tasks based on due date and selected filter
  const filteredTasks = tasks.filter(task => {
    if (!task.dueDate) return filter === "all" || filter === "earlier";
    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);

    if (filter === "today") return due.getTime() === today.getTime();
    if (filter === "tomorrow") return due.getTime() === tomorrow.getTime();
    if (filter === "earlier") return due < today || !task.dueDate;
    return true;
  });

  function formatDueText(dateStr?: string) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const todayStr = today.toDateString();
    const tomorrowStr = tomorrow.toDateString();

    if (date.toDateString() === todayStr) return "🔥 Today";
    if (date.toDateString() === tomorrowStr) return "Tomorrow";
    if (date < today) return "⚠️ " + date.toLocaleDateString();
    return date.toLocaleDateString();
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow p-6">
            {/* Header */}
            <div className="flex items-center gap-2 mb-1">
              <Clock className="text-gray-700" size={20} />
              <h1 className="text-lg font-semibold">Pending</h1>
            </div>
            <p className="text-gray-500 mb-4">
              You have <span className="font-medium">{tasks.length}</span> pending tasks
            </p>

            {/* Filters */}
            <div className="flex gap-2 mb-6">
              {(["all", "today", "tomorrow", "earlier"] as FilterType[]).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`
        px-3 py-1 rounded text-sm border
        transition-all duration-200
        transform
        ${filter === f
                      ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105"
                      : "bg-gray-200 text-gray-700 border-gray-200 hover:bg-gray-300 hover:scale-105"
                    }
      `}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>


            {/* Tasks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4 text-justify ">
                {loading ? (
                  <p>Loading...</p>
                ) : filteredTasks.length === 0 ? (
                  <p className="text-gray-500 text-center ">No tasks found.</p>
                ) : (
                  filteredTasks.map(task => (
                    <TaskItem
                      key={task._id}
                      title={task.title}
                      dueText={formatDueText(task.dueDate)}
                      onToggle={() => handleToggleComplete(task)}
                      onDelete={() => handleDeleteTask(task)}
                    />
                  ))
                )}
              </div>

              {/* Right Side */}
              <div className="space-y-4">
                {/* Productivity Tip */}
                <div className="bg-gray-50 p-4 rounded shadow-sm 
                  transition-transform duration-300 hover:scale-105 hover:shadow-md">
                  <h3 className="font-semibold mb-2 text-gray-800">Productivity Tip ⚡</h3>
                  <p className="text-sm text-gray-600">
                    Break Tasks into smaller steps to make them easier to tackle
                    and less overwhelming.
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    ⭐ Use 3.3.3 rule of productivity
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-50 p-4 rounded shadow-sm 
                  transition-transform duration-300 hover:scale-105 hover:shadow-md">
                  <h3 className="font-semibold mb-3 text-gray-800">Quick Actions</h3>

                  <ul className="text-sm text-gray-600 space-y-2">
                    <li
                      onClick={clearAllPending}
                      className="cursor-pointer transition-colors duration-200 hover:text-red-500 hover:underline"
                    >
                      • Clear All pending tasks
                    </li>

                    <li
                      onClick={clearOverdueTasks}
                      className="cursor-pointer transition-colors duration-200 hover:text-red-500 hover:underline"
                    >
                      • Clear All overdue tasks
                    </li>

                    <li
                      onClick={exportPendingTasks}
                      className="cursor-pointer transition-colors duration-200 hover:text-blue-600 hover:underline"
                    >
                      • Export pending tasks
                    </li>
                  </ul>

                  <p className="mt-2 text-sm text-blue-600 italic transition-transform duration-300 hover:scale-105">
                    🏆 Success is the sum of small efforts repeated day in and day out.
                  </p>
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
  dueText?: string;
  onToggle?: () => void;
  onDelete?: () => void;
};

function TaskItem({ title, dueText, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className="flex justify-between items-center bg-gray-50 p-3 rounded mb-2">
      <div className="flex items-center gap-2">
        <input type="checkbox" className="accent-blue-600" onChange={onToggle} />
        <span className="text-sm">{title}</span>
      </div>

      <div className="flex items-center gap-3">
        {dueText && (
          <span className={`text-xs ${dueText.includes("Overdue") || dueText.includes("⚠️") ? "text-red-500" : "text-gray-400"}`}>
            {dueText}
          </span>
        )}

      </div>
    </div>
  );
}
