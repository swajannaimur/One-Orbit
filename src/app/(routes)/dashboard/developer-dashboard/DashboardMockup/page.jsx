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
    <div className="p-6 space-y-10 bg-linear-to-br from-indigo-50 via-blue-50 to-purple-50 min-h-screen">
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Project Progress
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="progress" fill="#4F46E5" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
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
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          My Projects
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Project Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Deadline
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((p, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {p.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {p.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {p.deadline}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs ${
                        p.status === "Completed"
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
      <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Recent Activity
        </h2>
        <ul className="space-y-3">
          {activities.map((act, idx) => (
            <li
              key={idx}
              className="flex justify-between bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition"
            >
              <span className="text-gray-700">{act.activity}</span>
              <span className="text-gray-400 text-sm">{act.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
