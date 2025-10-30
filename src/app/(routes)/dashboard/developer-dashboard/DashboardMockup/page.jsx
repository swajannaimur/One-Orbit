"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const chartData = [
  { name: "Project A", progress: 80 },
  { name: "Project B", progress: 50 },
  { name: "Project C", progress: 30 },
  { name: "Project D", progress: 70 },
];

const pieData = [
  { name: "Frontend", value: 40 },
  { name: "Backend", value: 30 },
  { name: "Database", value: 20 },
  { name: "DevOps", value: 10 },
];

const COLORS = ["#4F46E5", "#6366F1", "#818CF8", "#A5B4FC"];

const projects = [
  {
    name: "Project A",
    client: "Client X",
    deadline: "2025-11-10",
    status: "In Progress",
  },
  {
    name: "Project B",
    client: "Client Y",
    deadline: "2025-10-30",
    status: "Completed",
  },
  {
    name: "Project C",
    client: "Client Z",
    deadline: "2025-11-15",
    status: "Pending",
  },
];

const activities = [
  { activity: "Updated Project A", time: "2 hours ago" },
  { activity: "Placed a bid on Project C", time: "1 day ago" },
  { activity: "Completed Task 5", time: "3 days ago" },
];

export default function DashboardMockup() {
  return (
    <div className="p-6 space-y-10 bg-linear-to-br from-indigo-50 to-purple-50 min-h-screen dark-bg">
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Progress Card */}
        <div className=" dark-bg p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Project Progress
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis
                dataKey="name"
                stroke="#4B5563"  
                className="dark:stroke-white"
              />
              <YAxis
                stroke="#4B5563"
                className="dark:stroke-gray-200"
              />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", borderRadius: "6px" }}
                wrapperStyle={{ color: "#000" }}
              />
              <Bar dataKey="progress" fill="#4F46E5" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Skill Distribution Card */}
        <div className=" dark-bg p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Skill Distribution
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", borderRadius: "6px" }}
                wrapperStyle={{ color: "#000" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>


      {/* Projects Table */}
      <div className=" dark-bg p-6 rounded-2xl shadow hover:shadow-lg transition">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          My Projects
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className=" dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Project Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Deadline
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className=" dark-bg divide-y divide-gray-200 dark:divide-gray-700">
              {projects.map((p, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                    {p.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                    {p.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                    {p.deadline}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs ${p.status === "Completed"
                        ? "bg-green-500"
                        : p.status === "In Progress"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                        }`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Feed */}
      <div className=" dark-bg p-6 rounded-2xl shadow hover:shadow-lg transition">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Recent Activity
        </h2>
        <ul className="space-y-3">
          {activities.map((act, idx) => (
            <li
              key={idx}
              className="flex justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            >
              <span className="text-gray-700 dark:text-gray-200">{act.activity}</span>
              <span className="text-gray-400 dark:text-gray-300 text-sm">{act.time}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
