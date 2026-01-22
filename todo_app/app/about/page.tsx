import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Card */}
      <div className="max-w-6xl mt-8 bg-white rounded-2xl shadow p-6">
        {/* Header */}
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          👋 About Todo
        </h2>
                               
        <hr className="mb-6" />

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
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
              Your simple and intuitive task management solution! Our goal is to
              help you stay organized and boost your productivity with ease.
            </p>

            {/* Features */}
            <h4 className="font-semibold flex items-center gap-2 mb-2">
              🚀 Features and benefits
            </h4>

            <ul className="text-sm space-y-1 mb-4 list-none">
              <li>▶ Easily add, manage and track tasks.</li>
              <li>▶ Organise your tasks with priorities and due dates.</li>
              <li>▶ View your productivity stats & streaks.</li>
              <li>▶ Seamless sync across all your device.</li>
            </ul>

            {/* Privacy */}
            <h4 className="font-semibold flex items-center gap-2 mb-2">
              🔒 Privacy First
            </h4>

            <p className="text-sm">
              Your data is yours and yours alone. We’re committed to keeping it
              safe and secure. We never collect or share your personal
              information.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-400 mt-10">
          Contact : support@gmail.com <br />
          © 2025 Todo App. All rights reserved
        </div>
      </div>
    </main>
  );
}
