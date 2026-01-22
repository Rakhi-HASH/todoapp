"use client";

import { useState, useEffect } from "react";
import * as api from "../app/services/api";


import { FiTrash2 } from "react-icons/fi";

interface Task {
  _id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

type FilterType = "all" | "active" | "completed";
type UpcomingFilterType = "all" | "today" | "tomorrow";

export default function TaskSection() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState<FilterType>("all");

  // ✅ Upcoming filter state
  const [upcomingFilter, setUpcomingFilter] = useState<UpcomingFilterType>("all");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) api.setAuthToken(token);
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return alert("You are not logged in!");
      api.setAuthToken(token);

      const data = await api.getTasks();
      setTasks(data);
    } catch (err: any) {
      alert(err.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async () => {
    if (!newTitle.trim()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return alert("You are not logged in!");
      api.setAuthToken(token);

      const added = await api.addTask(newTitle, dueDate, false);

      setTasks([...tasks, added]);
      setNewTitle("");
      setDueDate("");
    } catch (err: any) {
      alert(err.message || "Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("You are not logged in!");
      api.setAuthToken(token);

      const updated = await api.updateTask(task._id, {
        completed: !task.completed,
      });

      setTasks(tasks.map(t => (t._id === updated._id ? updated : t)));
    } catch (err: any) {
      alert(err.message || "Failed to update task");
    }
  };

  const handleDeleteTask = async (task: Task) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("You are not logged in!");
      api.setAuthToken(token);

      await api.deleteTask(task._id);
      setTasks(tasks.filter(t => t._id !== task._id));
    } catch (err: any) {
      alert(err.message || "Failed to delete task");
    }
  };

  // ✅ Task filters
  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  // ✅ Upcoming tasks sorted
  const upcomingTasks = tasks
    .filter(task => {
      if (!task.dueDate) return false;
      if (task.completed) return false;

      const due = new Date(task.dueDate);
      due.setHours(0, 0, 0, 0);

      // Upcoming filter
      if (upcomingFilter === "today") return due.getTime() === today.getTime();
      if (upcomingFilter === "tomorrow") return due.getTime() === tomorrow.getTime();

      return due >= today; // all upcoming
    })
    .sort(
      (a, b) =>
        new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime()
    );

  function formatUpcomingDate(dateStr: string) {
    const date = new Date(dateStr);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";

    return date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const tasksLeft = tasks.filter(t => !t.completed).length;
  const tasksCompleted = tasks.filter(t => t.completed).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left: Task List */}
      <div className="bg-white p-6 rounded-xl shadow-sm 
  transition-all duration-300 ease-out
  hover:shadow-xl hover:-translate-y-1
  animate-fadeIn"
      >
        <h3 className="font-semibold text-lg mb-1 transition-colors duration-300 hover:text-blue-600">
          Hello! 👋
        </h3>

        <p className="text-gray-500 mb-4 animate-slideUp">
          Here’s what’s on your agenda
        </p>

        {/* Add Task */}
        <div className="flex flex-wrap sm:flex-nowrap items-center mb-4 gap-2">
          <input
            type="text"
            placeholder="Add a new Task"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-lg
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-blue-500
        focus:scale-[1.01]
        hover:border-blue-400"
          />

          <div className="relative group">
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <button
              type="button"
              className="p-2 border border-gray-300 rounded-lg text-gray-500
          transition-all duration-300
          hover:text-blue-500 hover:border-blue-500
          hover:scale-110 hover:shadow-md"
              title="Pick due date"
            >
              📅
            </button>
          </div>

          <button
            onClick={handleAddTask}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg whitespace-nowrap
        transition-all duration-300
        hover:bg-blue-600 hover:scale-105 hover:shadow-lg
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>

        {/* Task filters */}
        <div className="flex gap-2 mb-8">
          {(["all", "active", "completed"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-sm border
          transition-all duration-300 ease-out
          hover:scale-105
          ${filter === f
                  ? "bg-blue-500 text-white border-blue-500 shadow-md"
                  : "text-gray-500 border-gray-300 hover:bg-gray-100"
                }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Task List */}
        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">
            Loading...
          </p>
        ) : filteredTasks.length === 0 ? (
          <p className="text-gray-500 text-center mb-8 animate-fadeIn">
            No tasks found.
          </p>
        ) : (
          <div className="space-y-2 animate-slideUp">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onToggle={() => handleToggleComplete(task)}
                onDelete={() => handleDeleteTask(task)}
              />
            ))}
          </div>
        )}

        <p className="text-xs text-gray-500 mt-3 transition-opacity duration-300 hover:opacity-80">
          {tasksLeft} tasks left • {tasksCompleted} completed
        </p>
      </div>


      {/* Right: Upcoming */}
      <div
        className="bg-white p-5 rounded-xl shadow-sm
    transition-all duration-300 ease-out
    hover:shadow-xl hover:-translate-y-1
    animate-fadeIn"
      >
        <h3 className="font-semibold text-lg mb-2 transition-colors duration-300 hover:text-blue-600">
          Upcoming
        </h3>

        {/* Upcoming filter buttons */}
        <div className="flex gap-2 mb-3">
          {(["all", "today", "tomorrow"] as UpcomingFilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setUpcomingFilter(f)}
              className={`px-3 py-1 rounded-full text-sm border
          transition-all duration-300 ease-out
          hover:scale-105
          ${upcomingFilter === f
                  ? "bg-blue-500 text-white border-blue-500 shadow-md"
                  : "text-gray-500 border-gray-300 hover:bg-gray-100"
                }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {upcomingTasks.length === 0 ? (
          <p className="text-sm text-gray-500 text-center animate-fadeIn">
            No upcoming tasks
          </p>
        ) : (
          <div
            className="p-3 space-y-3 rounded-xl
        bg-white/60 backdrop-blur
        shadow-sm
        transition-all duration-300
        hover:shadow-md
        animate-slideUp"
          >
            {upcomingTasks.map((task) => (
              <div
                key={task._id}
                className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md rounded-lg"
              >
                <UpcomingItem
                  title={task.title}
                  time={formatUpcomingDate(task.dueDate!)}
                />
              </div>
            ))}
          </div>
        )}
      </div>


      
    </div>
  );
}

/* Task Item */
function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: Task;
  onToggle?: () => void;
  onDelete?: () => void;
}) {
  let dueText = "";

  if (task.dueDate) {
    const dueDateObj = new Date(task.dueDate);
    const today = new Date();

    dueText = `Due: ${dueDateObj.toLocaleDateString()}`;

    if (!task.completed && dueDateObj < today) dueText = `⚠️ ${dueText}`;
    if (dueDateObj.toDateString() === today.toDateString())
      dueText = `🔥 ${dueText}`;
  }

  return (
    <div className="flex justify-between items-center py-2 border-b">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          className="accent-green-700 cursor-pointer"
        />
        <span
          className={`text-sm ${task.completed ? "line-through text-gray-400" : "text-black"
            }`}
        >
          {task.title}
        </span>
      </label>

      <div className="flex items-center gap-3">
        {dueText && (
          <span className="text-xs text-red-500 whitespace-nowrap">
            {dueText}
          </span>
        )}
        <button onClick={onDelete} title="Delete">
          <FiTrash2 size={16} />
        </button>
      </div>
    </div>
  );
}

/* Upcoming Item */
function UpcomingItem({ title, time }: { title: string; time: string }) {
  return (
    <div className="flex justify-between py-2 border-b">
      <span>{title}</span>
      <span className="text-xs text-gray-500">{time}</span>
    </div>
  );
}
