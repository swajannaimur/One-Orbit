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
  const [remoteUser, setRemoteUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch("/api/users/me");
        if (!res.ok) return;
        const data = await res.json();
        if (!mounted) return;
        setRemoteUser(data.user || null);
      } catch (err) {}
    }
    load();
    return () => (mounted = false);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 mt-20 max-w-11/12 mx-auto">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "w-64" : "w-16"
          } bg-white shadow-md transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2
            className={`${
              isSidebarOpen ? "block" : "hidden"
            } text-xl font-semibold text-gray-800`}
          >
            Developer Panel
          </h2>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-600"
          >
            <FaBars />
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-2">
          <Link
            href="/developerDashboard/myprojects"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <FaProjectDiagram className="text-blue-500" />
            {isSidebarOpen && <span className="font-medium">My Projects</span>}
          </Link>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <FaTasks className="text-yellow-500" />
            {isSidebarOpen && <span className="font-medium">My Tasks</span>}
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <FaUsers className="text-green-500" />
            {isSidebarOpen && <span className="font-medium">Team Members</span>}
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Top Navbar */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
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
                <div className="text-sm text-gray-700">
                  {(remoteUser?.name || session?.user?.name)?.split(" ")[0] ??
                    "Guest"}
                </div>
                <img
                  src={
                    remoteUser?.image ||
                    session?.user?.image ||
                    "https://i.pravatar.cc/40"
                  }
                  alt="Profile"
                  className="w-9 h-9 rounded-full"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg py-1 z-50">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      router.push("/dashboard/developer-dashboard/profile");
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      router.push("/dashboard/developer-dashboard/settings");
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Settings
                  </button>
                  <div className="border-t my-1" />
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-md"
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
          <div className="bg-white rounded-xl shadow p-6 mb-6 border-l-4 border-blue-600">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Welcome, {session?.user?.name || "Developer"}!
            </h2>
            <p className="text-gray-600">
              Here’s a quick overview of your dashboard and activities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow p-5 border-l-4 border-green-500">
              <h3 className="font-semibold text-gray-700 mb-2">
                Active Projects
              </h3>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <div className="bg-white rounded-xl shadow p-5 border-l-4 border-yellow-500">
              <h3 className="font-semibold text-gray-700 mb-2">
                Pending Tasks
              </h3>
              <p className="text-2xl font-bold text-gray-900">7</p>
            </div>
            <div className="bg-white rounded-xl shadow p-5 border-l-4 border-red-500">
              <h3 className="font-semibold text-gray-700 mb-2">
                Completed Tasks
              </h3>
              <p className="text-2xl font-bold text-gray-900">15</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
