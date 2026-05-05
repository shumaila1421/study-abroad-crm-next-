// client/app/dashboard/admin/page.tsx

"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/dashboard.api";
import Link from "next/link";
import {
  GraduationCap,
  FileText,
  Plane,
  Handshake,
  TrendingUp,
  Clock,
} from "lucide-react";

interface Stats {
  totalStudents: number;
  activeApplications: number;
  approvedVisas: number;
  totalAgents: number;
}

const statCards = (stats: Stats) => [
  {
    title: "Total Students",
    value: stats.totalStudents,
    icon: GraduationCap,
    lightColor: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    title: "Active Applications",
    value: stats.activeApplications,
    icon: FileText,
    lightColor: "bg-orange-50",
    textColor: "text-orange-600",
  },
  {
    title: "Approved Visas",
    value: stats.approvedVisas,
    icon: Plane,
    lightColor: "bg-green-50",
    textColor: "text-green-600",
  },
  {
    title: "Total Agents",
    value: stats.totalAgents,
    icon: Handshake,
    lightColor: "bg-purple-50",
    textColor: "text-purple-600",
  },
];

const quickActions = [
  {
    label: "Add Student",
    href: "/dashboard/admin/students",
    icon: GraduationCap,
    color: "text-blue-600 bg-blue-50",
  },
  {
    label: "New Application",
    href: "/dashboard/admin/applications",
    icon: FileText,
    color: "text-orange-600 bg-orange-50",
  },
  {
    label: "Track Visa",
    href: "/dashboard/admin/visa",
    icon: Plane,
    color: "text-green-600 bg-green-50",
  },
  {
    label: "Manage Agents",
    href: "/dashboard/admin/agents",
    icon: Handshake,
    color: "text-purple-600 bg-purple-50",
  },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalStudents: 0,
    activeApplications: 0,
    approvedVisas: 0,
    totalAgents: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data);
      } catch (error) {
        console.error("Stats fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400 flex items-center gap-2">
          <Clock size={20} className="animate-spin" />
          <span>Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <TrendingUp size={16} />
          <span>Live Data</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards(stats).map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div
                className={`w-12 h-12 ${card.lightColor} rounded-xl flex items-center justify-center mb-4`}
              >
                <Icon size={22} className={card.textColor} />
              </div>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              <p className="text-gray-500 text-sm mt-1">{card.title}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition text-center"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color}`}
                >
                  <Icon size={18} />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {action.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
