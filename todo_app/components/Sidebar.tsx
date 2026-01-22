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

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  // Load user (client only)
  const loadUser = () => {
    if (typeof window === "undefined") return;

    try {
      const userData = localStorage.getItem("user");
      userData ? setUser(JSON.parse(userData)) : setUser(null);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <aside
      className="
        w-64 mt-4 bg-white p-5 flex flex-col justify-between rounded-xl
        animate-[slideIn_0.4s_ease-out]
        shadow-sm
      "
    >
      {/* Top */}
      <div>
        {/* Profile */}
        <div className="flex flex-col items-center gap-2 mt-6 mb-6 text-center group">
          <Image
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0QDQ0ODQ0SDQ8QDxAQDg4WEhAYDw8PFRIYFhURFRUYHSggGBomGxMVITEhKSorLi8wFyAzODMsNyguLiwBCgoKDg0OGxAQGy8mHSUvKzArNy4rLS4wLS4tLS0rLS0tLy4tLTUtLS0rLS0tLS0tKysvLS0tKystLS0rLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAEBAAMBAQEBAAAAAAAAAAAAAgEFBgcEAwj/xAA8EAACAQICBQgHBwQDAAAAAAAAAQIDBAYRBSExUXESEyJBYYGRoSMyQlJyscEHM4KSosLwFGJj0SQ0c//EABsBAQEAAwEBAQAAAAAAAAAAAAABAgQFBgMH/8QAMxEBAAECAwMLBAIDAQEAAAAAAAECAwQFESExQRITIjJRYXGRobHRgcHh8AYjFELxYlL/2gAMAwEAAhEDEQA/APcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQ6TxTb0m40/TzW59BPtl192Zu2cDcr21bIcPGZ7h7EzTR0qu7d5/GrnbrFF5N9GapLdFL5vNm/RgbVO+NXnb+fYy5PRnkx3R951a+ekbiXrV6j/HL/Z9os243Ux5OdVjcTVvuVecswv662Vqi/HL/Ym1RPCPJjGMxFO65V5y++1xHeQy9Jzi3SSfnt8z4V4O1Vw08G9Zz3G2p62sd8a/n1dBo7FNGeUa0eZl722HjtRpXcDXTtp2vQYP+R2LsxTejkz274/H7tb+Mk0mmmnrTWxo0ZjTe9FTVFUaxOxkKAAAAAAAAAAAAAAAAAAAAAARXrQhCU5yUYxWcpPYkWmmap0jewuXKbdM1VTpEOA0/iOpcN06TdOhsy9qp2y7Ow7mGwdNrpVbavZ4jM84rxMzRb2Ues+Pw0aZuOIpMiKTIxZTIikyIpMiNpofTNW3klny6TfSpv5x3M1r+Hpux3uplubXcHVpvo4x8dk+7u7O6hVpxqU3yovxT3Pczj10TRVyan6BhsRbxFuLludYl+xg+4AAAAAAAAAAAAAAAAAAAADz/F+m3WquhTl6Km8pf5Jra+C6vHcdzA4bm6eXVvn0h4vOsxm9c5miejG/vn4j8udTN9wFJkRSZEUmRFJkYspkRSZEUmRG10BpV29XpN81LVUW7+5dqNbE2Ocp2b+Dq5RmU4O70upO/wCfp7O/TTSa1p6096OI/RYmJjWGQoAAAAAAAAAAAAAAAAAANRirSP8AT2k5ReU5+jp702tb7km/A2sHZ527ETujbLm5riv8fDTVG+dkfX8PMEz0bwKkyMVJkRSZEUmRFJkRSZGLKZEUmRFJkR3GEb7nKDpyfSpZJfA/V+TXcjj421ya+VHF7v8Aj2M57D81Vvo9uHx5N6ab0AAAAAAAAAAAAAAAAAAAOD+0O6zrUaPVCDm+Mnl8o+Z2sro0oqq7Z9nk/wCQ3dblFvsjXz/45RM6jzjKZEUmRipMiKTIikyIpMiKTIxZTIikyI3mEbjk3cY9VSMovjlyl8vM08bRra17Hb/j17m8ZFPCqJj7/Z3ZxnvwAAAAAAAAAAAAAAAAAAeY42qZ6QrL3Y00vyJ/U9Fl8aWI+vu8PnVWuMqjs09tfu0iZuuSpMiMpkRSZGKkyIpMiKTIikyIpMjFlMiPv0JPK7t3/lgvF5fU+OIjW1V4N3LauTi7U/8AqPWdHpR59+mAAAAAAAAAAAAAAAAAAA8zx1T5OkJv34U5fp5P7T0WXTrYjumXis8o5OLme2In7fZoEzdcdSYRSZEZTIikyMVJkRSZEUmRFJkRSZGLY6Ahyry3X+RS/L0voa+JnS1V4N/KrfLxluO/Xy2/Z6ScB+kgAAAAAAAAAAAAAAAAAA4f7R7T/r10t9KT/VH9x2cqudaj6/vo81/ILPUux4fePu4pM67zCkyIpMIpMiMpkRSZGKkyIpMiKTIikyI6PBFtyriVTqpw/VLUvJSNDMK9LcU9r0H8cscvETc4Ux6z+NXcnGe2AAAAAAAAAAAAAAAAAAB8Om9Hq5tqtF6nJdB+7Na4vxPth702rkVtbF4eMRZqtzx3ePB5DVpyhKUJrkyi3GUXtUk8mj1UTFUaxufn9dE0VTTVvhhMMFJkRSYRSZEZTIikyMVJkRSZEUiI9Jw1o7+ntoxksqk+nU3pvZHuWXmefxd7nLmsbo3P0LKcH/i4eKautO2fj6NqazpgAAAAAAAAAAAAAAAAAAAcbjjDznnd0I5zS9NBbZRXtrtS29nA62XYuKf6q93D4efzjLpuf32428Y7e9wSZ23lFJkRSZEUmEUmRGUyIpMjFSZEdXhDQbnKNzWj0IvOlF+3L3uC+ZzMdieTHN07+L0eSZXNdUYi7HRjq989vhHu7c472AAAAAAAAAAAAAAAAAAAAAABx2JcHqo5VrNKM3m50dkZvfF+y+zZwOthMx5PQu7u15/Mcmi5M3LOyeMdvh2OFrUZ05OFSDhNbYtNNdx2qaoqjWmdYeXuW6rdXJqjSUph81JkRSYRSZEXCLbSim23kklm29yRjMxG2SKZqnSI2uvw/hKTcat2uTHbGj1v49y7DlYnHxHRt+fw9Jl2RTMxcxG7s+fh2kUkkksktSXUkcjXV6qIiI0hkKAAAAAAAAAAAAAAAAAADEpJJtvJLW29iQiNUmdNsuc0pjSyo5xhJ3E11Qy5CfbN6vDM6FnLb1zbOyO/4czEZvh7WyJ5U93z/wBc1eY8u5/dQp0VwcpLveryOjbyq1T1pmfT983Hu57fq6kRHr++TOh8b3NOTV1/yIN63lFVI/Dlknw8xfyy3VH9eyfRMLnd2ir+7pR6w62FXRukYJdCs8vVfRrQ4e0u7UcqacRhZ4x7O5FWEx9OmyfePu1F7gKm23Qryh/bNKS8Vl9Tat5rVHXp18HPvfx+idturTx2tXPA96tk6Ml8UvrE2YzOzPCf36tCrIMTwmnzn4IYJvXtlSjxnL6RE5nZ7/L8sYyDEzxp85+Gzs8CrU69xnvjCOX6n/o1680/+KfNuWv47G+5X5R95+G7p2+j7CPK6FJ5etJ51ZcOt8Eac138TOm2fZ1KbWDwFPK2U987Zn7+TndMYyqT6NonSjn940uXLgtiX81G/Yy6mnbc2uJjc+rq6OH2R2zv/D57TGV3HLnFCsuvOOUvGOryM68utTu1hr2c/wATR19KvT2+G/0fjC2qZKqnQlveuH5l9UjRu5fcp207XZw2fYe5sudGfOPP5h0NKpGUVKElKL1qSaafBo0ZiYnSXaorprjlUzrCiMgAAAAAAAAAAAAAADSYhxLb2ccpPnKzWcaKevscn7KNzC4K5iJ1jZT2/u9o4zH28NG3bV2fu55rprEN1dt87PKnnqoxzVNcV7T7Weiw+DtWI6Mbe3i8tisdexE9KdnZG5rEzYaKkwikyIqMmmmnk1rT60zGY1SJmNsNzZYnv6WSjcSkt08pectfmalzA2K99Plsb9rNMVb2RXrHftbOnju8XrU6MvwzX7jWnKrXCZ/fo26c/wARG+mn1+Vzx3dvZSorum/3EjK7XGZ9Pgq/kGI4U0+vy+G6xVf1M1z/ADafVBKPnt8z7UYGxT/rr4tO7m+LubOVp4bPy1M6kpNylJyk9rbbb4tm1EREaQ5tVU1TrVOsiYYMpkRSZGL7tG6Ur28uVRm4+9DbCXFfXafG7YouxpVDawuNvYarW3V9OE/R3WgsSUrjKE/RVvcz6M/hf0+ZxcRg6rW2NsPYZfnFrFdCro19nb4fDeGm7AAAAAAAAAAAAAHJYyxarVOhbtSuGulLU40U+t75bl3vc+pgMvm906+r7/hycxzGLEci31vb8vMqtaU5SnOTnKTzlJttt72z0kUxTGkbnla6pqnlVTrLCYYspkRSZGKkwikyIpMiKTMUZTIxUmRFJkRSYRSZEZTIikyMVxeWtaiTBu2w7XC+JeW40LmXS2U6r9rdGXb29fHbx8ZguT07e7jD1mUZzy5izfnbwnt7p7+yePjv6w5j0wAAAAAAAAAAc9jLESsqGUMncVc1Sj7q66jW5eb7zfwGDnEV7erG/wCGhj8ZGHo2dad3y8hnUlKTlJuUpNuUm8229bbe89XEREaQ8hVMzOs7xMMVJkRSZEZTIikyMVJhFJkRSZEUmYoymRipMiKTIikwikyIymRFJkYqTIjv8I6c56HM1XnVgtUntqQXXxX86zh43Dc3PLp3T6Pa5LmX+RRzVyenHrHzHHz7XRmg7wAAAAAAAB+VzXhTpzqVHyYQi5Se6KWbMqKJrqimnfLGqqKaZqndDw/TulZ3dzUrz1cp5Qj7lNerH+dbZ7PDYemxbiiPr4vGYq/N+5Nc/TwfCmfdrKTIikyIpMiKTIjKZEUmRipMIpMiKTIikzFGUyMVJkRSZEUmEUmRGUyIpMjF+9pczpVIVabylBpp/TgYV0RXTNM7pfSzdqs3IuUb4eqaOvI16NOtDZNZ5bn1x7nmeau25t1zTPB+j4XEU4i1Tdp3T+6PpPm+4AAAAAADh/tS0q6dvStYPKVZ8qp/5Qepd8svys7WTYflXJuzw3eM/hyM3v8AJtxbjj7PMUz0jzakyMWUyIpMiKTIikyIpMiMpkRSZGKkwikyIpMiKTMUZTIxUmRFJkRSYRSZEZTIikyMXX4Cv8pVLaT1SXOU/iWqS8Mn3M5WZWtkXI8Jem/juK0qqsTx2x93anIesAAAAAAAeK47v+e0lcNPONJqjHsUNUv1co9jltrm8NT2zt8/xo8pmN3nMRPds8vy0KZvNBSZEUmRiymRFJkRSZEUmRFJkRlMiKTIxUmEUmRFJkRSZijKZGKkyIpMiKTCKTIjKZEfboi75m4o1dijNOXwvVLybPjft8u3NLYwd7mL9Fzsn04+j1k8w/SAAAAAAJqTUYyk9iTb4IsRrOiTOkav55r1nOc6kts5Sm+Mnm/me+ppimmKY4PFVzyqpmeKUysFJkRSZEUmRiymRFJkRSZEUmRFJkRlMiKTIxUmEUmRFJkRSZijKZGKkyIpMiKTCKTIjKZEet6Jrcu2t5vbKlBvjyVmeXvU8m5VHfL9IwlznLFFU8Yj2fWfJsAAAAA+PTMsrS6e6hVfhBn2w8a3aY7493zuzpbq8Jfz6me8eMlSZEUmRFJkRSZEUmRiymRFJkRSZEUmRFJkRlMiKTIxUmEUmRFJkRSZijKZGKkyIpMiKTCKTIj1HCss7C2+Brwk0eaxkf31Pf5VOuDt+H3bY1nQAAAAB+VzRVSnUpy2ThKD4SWT+ZlRVNNUVRwSqNYmH893trOhWqUaqynTm4SXantXY9vee9t3KblEV07peOuW5oqmmd8PyTMnyUmEUmRFJkRSZEUmRiymRFJkRSZEUmRFJkRlMiKTIxUmEUmRFJkRSZijKZGKkyIpMiLgm2klm28kltb3Ik7N5ETM6Q9c0PaOjbUKT2wglL4tr82zy1+5zlyqrtfomEs8zYotzwh9h8myAAAAABy2MMHUr70tOSo3KWSnl0KiWyM0vn8zp4DMqsN0attPt4fDRxeBpv7Y2Vfu95XpnQN3ZyyuaLgs8o1FrpS4SWru2np8Pi7V+Nbc/Tj5PP38Lcsz0oa5M+7WUmEUmRFJkRSZEUmRiymRFJkRSZEUmRFJkRlMiKTIxUmEUmRFJkRSZijKZGL7NH2FevLkUKcqj68tkeL2I+V27RbjWudH2sYa7fq5NunV3mG8KRt5KtXaqVV6sV6lN79e19vV5nExePm7HIo2R7vU5dk9OHnnLm2rh2R+XTnOdwAAAAAAAAirTjKLjOKnFrKUWk4tbmntLFU0zrG9JiJjSXIaa+zuyrZyt27Sb91cqk38D2dzR1sPnF63sr6Uevn8udfyy1c207J9HEaWwPpG3zapf1EF7dLpPLth63kzs2M0w93ZrpPf87nJvZbft7YjWO5zsotNxknFp5NNZNPc0dCJiY1hoTTMbJZTDFSZEUmRFJkYspkRSZEUmRFJkRSZEZTIikyMVJhFJkTRutG4Zvq+TjRdOL9up0Y+D1vuRpXsbZt751nu2t+xleJvbqdI79jrdF4GoQylczdeXuLONNfV+XA5d7NK6tlEae7t4bIrVG27PKnyh1NvQhTioU4RpxWyMUkl3I5tVVVU61TrLtUUU0U8mmNI7n6GLMAAAAAAAAAAAAD47/RVrcLK4oU6u5yinJcHtR9rV+7a6lUw+dyzbudeIlzN/wDZxYTzdGVS3fUlLlQ8Ja/M6NrOb9PWiJ9Pb4aFzKbNXV1hoLz7NLuP3NxSqr+5ShL6rzN63ndqevTMevw0a8nuR1aon0+WnucG6Up552sppdcJQln3J5+Rt0Zlhqv9/PWGpXluIp/18mtq6Lu4eva1ofFSqL5o2Kb9qrdVE/WGtVh7sb6Z8pfM01tTXE+m98JpmN7KY0TRSZGOio69mskmky+ujo+5n6lvVn8NOb+SPlVet076oj6wzjD3at1Mz9JbK2wrpGplybScfi5MMu6TTNevH4enfXH02+zYoy3FV7qJ+uz3be0+z+8l97VpUlxlKXgkl5mpXm9qOrEz6Nu3kd6etVEereWWALWOTrValZ9aWUIPuWb8zSuZtdnqxEev75N61kdmnrzM+kfv1dDYaHtaGXM0IQfvZZz/ADPWaFzEXbnXqmXTs4WzZ6lMR7+b7j4tgAAAAAAAAAAAAAAAAAAAAAAmUE9qT7ixMwmkPzla0ntpQf4YmXLq7ZSaKZ4CtKS2UoL8MRzlXbJyKex+kYRWxJdyMZmZXSFEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/2Q=="
            alt="User"
            width={80}
            height={80}
            className="
              rounded-full
              transition-all duration-300
              group-hover:scale-105
              group-hover:shadow-lg
            "
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
          <Link href="/">
            <MenuItem
              icon={<Home size={18} />}
              label="Dashboard"
              active={pathname === "/"}
            />
          </Link>

          <Link href="/completed">
            <MenuItem
              icon={<CheckCircle size={18} />}
              label="Completed"
              active={pathname === "/completed"}
            />
          </Link>

          <Link href="/pending">
            <MenuItem
              icon={<Clock size={18} />}
              label="Pending"
              active={pathname === "/pending"}
            />
          </Link>

          <Link href="/settings">
            <MenuItem
              icon={<Settings size={18} />}
              label="Settings"
              active={pathname === "/settings"}
            />
          </Link>
        </nav>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="
          flex items-center gap-2 text-red-500
          transition-all duration-300
          hover:text-red-600 hover:translate-x-1
          active:scale-95
        "
      >
        <LogOut
          size={18}
          className="transition-transform duration-300 hover:-rotate-5 ml-5"
        />
        Sign Out
      </button>
    </aside>
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
        group relative flex items-center gap-3 p-2 pl-4 rounded-lg cursor-pointer
        transition-all duration-300 ease-out
        hover:translate-x-1
        ${
          active
            ? "bg-blue-100 text-blue-600 font-medium shadow-sm"
            : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
        }
      `}
    >
      {/* Active bar */}
      <span
        className={`
          absolute left-0 top-1/2 -translate-y-1/2
          h-6 w-1 rounded-full transition-all duration-300
          ${active ? "bg-blue-600 opacity-100" : "opacity-0 group-hover:opacity-40"}
        `}
      />

      {/* Icon */}
      <span
        className="
          transition-transform duration-300
          group-hover:scale-110 group-hover:-rotate-6
        "
      >
        {icon}
      </span>

      {/* Label */}
      <span>{label}</span>

      {/* Hover glow */}
      <span
        className="
          absolute inset-0 rounded-lg
          bg-blue-200/10 opacity-0
          group-hover:opacity-100
          transition-opacity duration-300
          -z-10
        "
      />
    </div>
  );
}
