"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../services/api";
import { FiCheckCircle, FiUser, FiMail } from "react-icons/fi";
import Navbar from "@/components/Navbar";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await registerUser(name, email); // no password now
      alert("Registration successful!");
      router.push("/login");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-blue-50 to-white animate-gradient-x px-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-12">
        {/* ToDo App Icon & Title */}
        <div className="flex flex-col items-center mb-6">
          <FiCheckCircle className="text-blue-600 text-6xl mb-3 " />
          <h1 className="text-4xl font-extrabold text-gray-900">ToDo App</h1>
          <p className="text-gray-500 mt-1 text-center">
            Sign up to start organizing your tasks!
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-red-600 text-sm text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-400 text-gray-900"
              required
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-400 text-gray-900"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 font-semibold shadow-lg hover:scale-105 hover:from-blue-700 hover:to-blue-600 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-600 font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>

      {/* Gradient Animation */}
      <style jsx>{`
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 10s ease infinite;
        }
      `}</style>
    </div>
    </>
  );
}
