"use client";
import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaTasks,
  FaUsers,
  FaProjectDiagram,
  FaBell,
  FaBars,
} from "react-icons/fa";

export default function DeveloperDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-white shadow-md transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2
            className={`${
              isSidebarOpen ? "block" : "hidden"
            } text-xl font-bold`}
          >
            Dev Panel
          </h2>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-600"
          >
            <FaBars />
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-2">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-200"
          >
            <FaProjectDiagram />
            {isSidebarOpen && <span>My Projects</span>}
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-200"
          >
            <FaTasks />
            {isSidebarOpen && <span>My Tasks</span>}
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-200"
          >
            <FaUsers />
            {isSidebarOpen && <span>Team Members</span>}
          </a>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Developer Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-800">
              <FaBell size={20} />
            </button>

            {/* Profile dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen((s) => !s)}
                className="flex items-center gap-2 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                <div className="text-sm text-gray-700 dark:text-gray-200">
                  {session?.user?.name ? (
                    <span className="font-medium">
                      {session.user.name.split(" ")[0]}
                    </span>
                  ) : (
                    <span className="text-gray-500">Guest</span>
                  )}
                </div>
                <img
                  src={session?.user?.image || "https://i.pravatar.cc/40"}
                  alt={session?.user?.name || "Profile"}
                  className="w-9 h-9 rounded-full"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border rounded-md shadow-lg z-50 py-1">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      router.push("/developerDashboard/profile");
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      router.push("/developerDashboard/settings");
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Settings
                  </button>
                  <div className="border-t my-1" />
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">
            Welcome back,
            <span className="text-lg font-semibold mb-4">
              {session?.user?.name ?? "Developer"}
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-gray-600 font-semibold">Active Projects</h3>
              <p className="text-3xl font-bold mt-2 text-blue-500">3</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-gray-600 font-semibold">Pending Tasks</h3>
              <p className="text-3xl font-bold mt-2 text-yellow-500">7</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-gray-600 font-semibold">Completed Tasks</h3>
              <p className="text-3xl font-bold mt-2 text-green-500">15</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
