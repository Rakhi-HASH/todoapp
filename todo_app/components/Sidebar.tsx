"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Home, CheckCircle, Clock, LogOut, Settings } from "lucide-react";

interface User {
  name: string;
  email: string;
}

export default function Sidebar({
  isOpen = false,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const router = useRouter();

  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const userData = localStorage.getItem("user");
      userData ? setUser(JSON.parse(userData)) : setUser(null);
    } catch {
      setUser(null);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <>

      <aside
        className={`
          fixed md:static top-0 left-0 z-50 min-h-screen
 w-64 bg-white p-5 flex flex-col justify-between shadow-xl
          rounded-r-xl transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div>
          {/* Profile */}
          <div className="flex flex-col items-center gap-2 mt-6 mb-6 text-center group">
            <Image
              src="/images.jpeg"
              alt="User"
              width={80}
              height={80}
              className="rounded-full transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
            />
            <p className="font-semibold transition-colors duration-300 group-hover:text-blue-600">
              {user?.name || "Guest"}
            </p>
            <p className="text-xs text-gray-500">
              {user?.email || "guest@example.com"}
            </p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <Link href="/" onClick={onClose}>
              <MenuItem
                icon={<Home size={18} />}
                label="Dashboard"
                active={pathname === "/"}
              />
            </Link>

            

            <Link href="/completed" onClick={onClose}>
              <MenuItem
                icon={<CheckCircle size={18} />}
                label="Completed"
                active={pathname === "/completed"}
              />
            </Link>

            <Link href="/pending" onClick={onClose}>
              <MenuItem
                icon={<Clock size={18} />}
                label="Pending"
                active={pathname === "/pending"}
              />
            </Link>

            <Link href="/settings" onClick={onClose}>
              <MenuItem
                icon={<Settings size={18} />}
                label="Settings"
                active={pathname === "/settings"}
              />
            </Link>

            {/* 👉 About page added */}
            <Link href="/about" onClick={onClose} className="md:hidden">
              <MenuItem
                icon={<Home size={18} />}
                label="About"
                active={pathname === "/about"}
              />
            </Link>
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 transition-all duration-300 hover:text-red-600 hover:translate-x-1 active:scale-95 mt-4 md:mt-0"
        >
          <LogOut
            size={18}
            className="transition-transform duration-300 hover:-rotate-5"
          />
          Sign Out
        </button>
      </aside>
    </>
  );
}

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
        group relative flex items-center gap-3 p-2 pl-4 rounded-lg cursor-pointer transition-all duration-300 ease-out
        hover:translate-x-1
        ${active ? "bg-blue-100 text-blue-600 font-medium shadow-sm" : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"}
      `}
    >
      <span
        className={`
          absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full transition-all duration-300
          ${active ? "bg-blue-600 opacity-100" : "opacity-0 group-hover:opacity-40"}
        `}
      />
      <span className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
        {icon}
      </span>
      <span>{label}</span>
      <span className="absolute inset-0 rounded-lg bg-blue-200/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
    </div>
  );
}
