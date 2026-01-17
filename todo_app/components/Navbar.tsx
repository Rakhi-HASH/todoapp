"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-white shadow-sm px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-xl font-bold text-blue-600">☑ Todo</h1>

      {/* Links */}
      <div className="flex gap-6">
        <NavLink href="/" label="Home" active={pathname === "/"} />
        <NavLink href="/about" label="About" active={pathname === "/about"} />
      </div>
    </nav>
  );
}

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`font-medium ${
        active ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
      }`}
    >
      {label}
    </Link>
  );
}
