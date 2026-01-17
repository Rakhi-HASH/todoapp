"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, CheckCircle, Clock, Settings, LogOut } from "lucide-react";

export default function Sidebar() {
const router = useRouter();
  return (
    <aside className="w-64 bg-white p-5 flex flex-col justify-between">
      <div>
        {/* <h1 className="text-xl font-bold mb-6">☑ Todo</h1> */}

        {/* Profile */}
        <div className="flex flex-col items-center gap-2 mb-6 text-center">
          <Image
            src="data:image/jpeg;base64,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"
            alt="User"
            width={100}
            height={100}
            className="rounded-full"
          />

          <p className="font-semibold">Sarah Johnson</p>
          <p className="text-xs text-gray-500">sarah_johnson@gmail.com</p>
        </div>


        {/* Menu */}
        <nav className="space-y-3 text-gray-600">
          <Link href="./"><MenuItem icon={<Home size={18} />} label="Dashboard" /></Link>
          <Link href="./completed"><MenuItem icon={<CheckCircle size={18} />} label="Completed"  /></Link>
          <Link href="./pending"><MenuItem icon={<Clock size={18} />} label="Pending" /></Link>
          <Link href="./settings"><MenuItem icon={<Settings size={18} />} label="Settings" /></Link>
        </nav>
      </div>

      {/* Bottom */}
      <div className="space-y-3">
        {/* <span className="text-green-600 text-sm">● Free Plan</span> */}
        <button className="flex items-center gap-2 text-red-500">
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </aside>
  );
}

// function MenuItem({
//   icon,
//   label,
//   active = false,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   active?: boolean;
// }) {
//   return (
//     <div
//       className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${active ? "bg-blue-100 text-blue-600" : "hover:bg-blue-100"
//         }`}
//     >
//       {icon}
//       <span>{label}</span>
//     </div>
//   );
// }



function MenuItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`
        relative flex items-center gap-3 p-2 pl-4 rounded-lg cursor-pointer
        transition-all duration-200
        ${
          active
            ? "bg-blue-100 text-blue-600 font-medium"
            : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
        }
      `}
    >
      {/* Left indicator */}
      <span
        className={`
          absolute left-0 top-1/2 -translate-y-1/2
          h-6 w-1 rounded-full
          transition-opacity duration-200
          ${active ? "bg-blue-600 opacity-100" : "opacity-0"}
        `}
      />

      {icon}
      <span>{label}</span>
    </div>
  );
}



