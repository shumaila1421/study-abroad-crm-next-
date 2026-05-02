"use client";

import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";

const pageTitles: { [key: string]: string } = {
  "/dashboard/admin": "Dashboard",
  "/dashboard/admin/students": "Students",
  "/dashboard/admin/applications": "Applications",
  "/dashboard/admin/visa": "Visa Tracking",
  "/dashboard/admin/agents": "Agents",
  "/dashboard/admin/countries": "Countries",
  "/dashboard/admin/programs": "Programs",
};

export default function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const pageTitle = pageTitles[pathname] || "Dashboard";

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Page Title */}
      <h2 className="text-lg font-semibold text-gray-800">{pageTitle}</h2>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="text-gray-400 hover:text-gray-600 transition">
          <Bell size={20} />
        </button>

        {/* Role Badge */}
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium capitalize">
          {user?.role}
        </span>

        {/* User */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-medium text-gray-700">
            {user?.name}
          </span>
        </div>
      </div>
    </div>
  );
}
