"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState, useEffect, useMemo } from "react";
import { Trash2, Download } from "lucide-react";
import * as api from "../services/api";

interface Task {
  _id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

type FilterType = "All" | "Today" | "This Week" | "This Month";

export default function Completed() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<FilterType>("All");

  // ================= FETCH =================
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) api.setAuthToken(token);
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await api.getTasks();
      setTasks(data);
    } catch (err: any) {
      alert(err.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const clearAll = async () => {
    if (!confirm("Delete all completed tasks?")) return;
    try {
      const completed = tasks.filter(t => t.completed);
      for (const t of completed) await api.deleteTask(t._id);
      setTasks(tasks.filter(t => !t.completed));
    } catch {
      alert("Failed to clear tasks");
    }
  };

  // ================= FILTER =================
  const completedTasks = useMemo(
    () => tasks.filter(t => t.completed),
    [tasks]
  );

  const filteredTasks = useMemo(() => {
    const now = new Date();
    return completedTasks.filter(task => {
      if (!task.dueDate) return true;
      const d = new Date(task.dueDate);
      const diff =
        (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);

      if (filter === "Today") return diff >= 0 && diff < 1;
      if (filter === "This Week") return diff >= 0 && diff < 7;
      if (filter === "This Month")
        return d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear();

      return true;
    });
  }, [completedTasks, filter]);

  // ================= GROUP =================
  const grouped = useMemo(() => {
    const g: Record<string, Task[]> = {
      Today: [],
      Yesterday: [],
      Earlier: [],
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    filteredTasks.forEach(task => {
      if (!task.dueDate) return g.Earlier.push(task);

      const d = new Date(task.dueDate);
      d.setHours(0, 0, 0, 0);
      const diff = (today.getTime() - d.getTime()) / 86400000;

      if (diff === 0) g.Today.push(task);
      else if (diff === 1) g.Yesterday.push(task);
      else g.Earlier.push(task);
    });

    return g;
  }, [filteredTasks]);

  // ================= BEST DAY =================
  const bestDay = useMemo(() => {
    const map: Record<string, number> = {};
    completedTasks.forEach(t => {
      if (!t.dueDate) return;
      const day = new Date(t.dueDate).toLocaleDateString("en-US", {
        weekday: "long",
      });
      map[day] = (map[day] || 0) + 1;
    });
    const best = Object.entries(map).sort((a, b) => b[1] - a[1])[0];
    return best ? `${best[0]} (${best[1]} tasks)` : "—";
  }, [completedTasks]);

  // ================= STREAK =================
  const currentStreak = useMemo(() => {
    const dates = completedTasks
      .map(t => t.dueDate && new Date(t.dueDate).toDateString())
      .filter(Boolean) as string[];

    const unique = [...new Set(dates)]
      .map(d => new Date(d))
      .sort((a, b) => b.getTime() - a.getTime());

    let streak = 0;
    let day = new Date();

    for (const d of unique) {
      const diff =
        (day.setHours(0, 0, 0, 0) - d.setHours(0, 0, 0, 0)) / 86400000;
      if (diff === streak) streak++;
      else break;
    }
    return streak;
  }, [completedTasks]);

  // ================= ACHIEVEMENTS =================
  const achievements = {
    first: completedTasks.length >= 1,
    streak7: currentStreak >= 7,
    done25: completedTasks.length >= 25,
    done100: completedTasks.length >= 100,
    streak50:currentStreak >=50
  };

  // ================= UI =================
  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow p-6">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-lg font-semibold flex gap-2">
                ✅ Completed Tasks
              </h1>
              <button
                onClick={clearAll}
                className="
    group flex items-center gap-1
    bg-red-400 text-gray-700
    px-3 py-1 rounded-md
    transition-all duration-300 ease-out
    hover:bg-red-500 hover:text-white
    hover:shadow-md hover:scale-105
    active:scale-95
  "
              >
                <Trash2
                  size={16}
                  className="
      transition-transform duration-300
      group-hover:rotate-12 group-hover:scale-110
    "
                />
                Clear All
              </button>

            </div>

            <p className="text-gray-500 mb-4">
              You've completed {filteredTasks.length} tasks 🎉
            </p>

            {/* FILTERS */}
            <div className="flex gap-2 mb-6 animate-fadeIn">
              {["All", "Today", "This Week", "This Month"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as FilterType)}
                  className={`px-3 py-1 rounded-md text-sm font-medium
        transition-all duration-300 ease-out
        hover:scale-105 active:scale-95
        ${filter === f
                      ? "bg-blue-500 text-white shadow-md -translate-y-0.5"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>


            <div className="grid md:grid-cols-2 gap-6">
              {/* TASKS */}
              <div>
                {["Today", "Yesterday", "Earlier"].map(group => (
                  <div key={group} className="mb-4">
                    <h2 className="font-semibold mb-2">{group}</h2>
                    {grouped[group].length === 0 && (
                      <p className="text-gray-400 text-sm">No tasks</p>
                    )}
                    {grouped[group].map(task => (
                      <div
                        key={task._id}
                        className="flex justify-between bg-gray-50 p-3 rounded mb-2"
                      >
                        <span>{task.title}</span>
                        <span className="text-gray-400 text-sm">
                          {task.dueDate
                            ? new Date(task.dueDate).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                            : "No Date"}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* PROGRESS */}
              <div className="space-y-6 animate-fadeIn">
                {/* Progress Card */}
                <div
                  className="
      bg-gray-50 p-4 rounded-xl
      transition-all duration-300
      hover:shadow-md hover:-translate-y-1
    "
                >
                  <h2 className="font-semibold mb-3">Your Progress</h2>

                  <ul className="space-y-2 text-gray-600">
                    {[
                      { label: "Completed Today", value: grouped.Today.length, icon: "✅" },
                      { label: "This Week", value: completedTasks.length, icon: "📅" },
                      { label: "Best Day", value: bestDay, icon: "🏆" },
                      { label: "Current Streak", value: `${currentStreak} days`, icon: "🔥" },
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="
            flex justify-between items-center
            px-2 py-1 rounded-md
            transition-all duration-200
            hover:bg-white hover:shadow-sm
          "
                      >
                        <span>{item.icon} {item.label}</span>
                        <span className="font-medium">{item.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Achievements Card */}
                <div
                  className="
      bg-gray-50 p-4 rounded-xl
      transition-all duration-300
      hover:shadow-md hover:-translate-y-1
    "
                >
                  <h2 className="font-semibold mb-3">Achievements</h2>

                  <ul className="space-y-2">
                    {[
                      { label: "🥇 First Task", unlocked: achievements.first },
                      { label: "🔥 7-day Streak", unlocked: achievements.streak7 },
                      { label: "✅ 25 Tasks", unlocked: achievements.done25 },
                      { label: "🔒 100 Tasks", unlocked: achievements.done100 },
                      { label: "🔥 50-day Streak", unlocked: achievements.streak50 },
                    ].map((item, i) => (
                      <li
                        key={i}
                        className={`
            px-2 py-1 rounded-md
            transition-all duration-300
            ${item.unlocked
                            ? "text-black font-medium animate-pop hover:bg-green-50"
                            : "text-gray-400"
                          }
          `}
                      >
                        {item.label}
                      </li>
                    ))}
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
