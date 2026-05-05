"use client";

import { useEffect, useState } from "react";
import { getDashboardStats, getChartData } from "@/services/dashboard.api";
import Link from "next/link";
import {
  GraduationCap,
  FileText,
  Plane,
  Handshake,
  TrendingUp,
  Clock,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
interface Stats {
  totalStudents: number;
  activeApplications: number;
  approvedVisas: number;
  totalAgents: number;
}

interface ChartData {
  applicationStatusData: { name: string; value: number }[];
  monthlyStudentsData: { month: string; students: number }[];
}

const PIE_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];
const statCards = (stats: Stats) => [
  {
    title: "Total Students",
    value: stats.totalStudent,
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

  const [chartData, setChartData] = useState<ChartData>({
    applicationStatusData: [],
    monthlyStudentsData: [],
  });

  const [loading, setLoading] = useState(true);
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, chartRes] = await Promise.all([
          getDashboardStats(),
          getChartData(),
        ]);
        setStats(statsRes.data);
        setChartData(chartRes.data);
      } catch (error) {
        console.error("Fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {greeting}, Admin
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Monthly Students
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData.monthlyStudentsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} />
              <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                }}
              />
              <Bar dataKey="students" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Application Status
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData.applicationStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.applicationStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
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
