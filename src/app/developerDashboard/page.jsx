import React from "react";
import Link from "next/link";

const Sidebar = () => (
  <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 p-4 hidden md:block">
    <div className="mb-6">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
        Developer
      </h3>
    </div>
    <nav className="space-y-1">
      <Link
        href="/developerDashboard"
        className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Overview
      </Link>
      <Link
        href="/projects"
        className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Projects
      </Link>
      <Link
        href="/users"
        className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Users
      </Link>
      <Link
        href="/developerDashboard#invite"
        className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Invite
      </Link>
      <Link
        href="/developerDashboard#logs"
        className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Logs
      </Link>
    </nav>
  </aside>
);

export default function DeveloperDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">
        <Sidebar />

        <main className="flex-1">
          <header className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Developer Dashboard</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Overview and management tools
              </p>
            </div>
          </header>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
              <h2 className="font-semibold mb-4">Overview</h2>
              <div className="h-40 flex items-center justify-center text-gray-400">
                Charts / metrics
              </div>
            </div>

            <aside className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
              <h3 className="font-semibold mb-3">Quick Actions</h3>
              <div className="flex flex-col gap-2">
                <button className="px-3 py-2 bg-blue-600 text-white rounded">
                  Invite
                </button>
                <button className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded">
                  Manage Projects
                </button>
              </div>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}
