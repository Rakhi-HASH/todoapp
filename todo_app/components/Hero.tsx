"use client";

export default function Hero() {
  return (
    <div
      className="
        relative overflow-hidden
        bg-gradient-to-r from-blue-500 via-cyan-400 to-green-300
        rounded-2xl p-20 text-white mb-6
        transition-all duration-500 ease-out
        hover:scale-[1.02] hover:shadow-xl
        group
      "
    >
      {/* Animated gradient overlay */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-r from-white/10 to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
        "
      />

      {/* Content */}
      <div className="relative z-10">
        <h2
          className="
            text-3xl md:text-4xl font-bold
            transform transition-all duration-500
            group-hover:translate-x-1
          "
        >
          Organise your work
        </h2>

        <h2
          className="
            text-3xl md:text-4xl font-bold
            transform transition-all duration-500 delay-75
            group-hover:translate-x-1
          "
        >
          and life
        </h2>

        <p
          className="
            mt-3 max-w-md text-white/90
            transition-all duration-500
            group-hover:text-white
            group-hover:translate-y-1
          "
        >
          Become focused, organised and manage your tasks easily.
        </p>

        {/* CTA Button */}
        <button
          className="
            mt-6 inline-flex items-center gap-2
            bg-white text-blue-600 font-semibold
            px-6 py-2.5 rounded-full
            transition-all duration-300
            hover:bg-blue-50 hover:scale-105
            active:scale-95
          "
        >
          Get Started →
        </button>
      </div>
    </div>
  );
}
