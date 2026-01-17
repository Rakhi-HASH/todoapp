"use client";

import { useState } from "react";

interface PriorityToggleProps {
  value?: "low" | "high";
  onChange?: (value: "low" | "high") => void;
}

export default function PriorityToggle({
  value = "low",
  onChange,
}: PriorityToggleProps) {
  const [enabled, setEnabled] = useState(value === "high");

  const toggleHandler = () => {
    const newValue = !enabled;
    setEnabled(newValue);
    onChange?.(newValue ? "high" : "low");
  };

  return (
    <div className="flex items-center gap-3">
      {/* <span className="text-sm text-gray-500">Low</span> */}

      <button
        type="button"
        onClick={toggleHandler}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300
        ${enabled ? "bg-blue-600" : "bg-gray-300"}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300
          ${enabled ? "translate-x-6" : "translate-x-1"}`}
        />
      </button>

      {/* <span className="text-sm text-gray-500">High</span> */}
    </div>
  );
}
