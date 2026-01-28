"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";

export default function Navbar({ onSidebarToggle }: { onSidebarToggle?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-white shadow-sm px-4 sm:px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-xl font-bold text-blue-600">☑ Todo</h1>

      {/* Hamburger for mobile */}
      <button
        className="md:hidden text-gray-600 hover:text-blue-600 p-2 rounded-md"
        onClick={onSidebarToggle}
      >
        <FiMenu size={24} />
      </button>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6">
        <NavLink href="/" label="Home" active={pathname === "/"} />
        <NavLink href="/about" label="About" active={pathname === "/about"} />
      </div>
    </nav>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`font-medium ${active ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
    >
      {label}
    </Link>
  );
}
