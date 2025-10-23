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
  FaUserPlus,
} from "react-icons/fa";
import { PiKanban } from "react-icons/pi";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";

import KanbanBoard from "./kanban/KanbanBoard";
import InviteForm from "@/components/forms/InviteForm";
import Image from "next/image";

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
      } catch (err) { }
    }
    load();
    return () => (mounted = false);
  }, []);

  const [activeSection, setActiveSection] = useState(null);

  return (
    <div className="flex min-h-screen bg-linear-to-br from-indigo-50 via-blue-50 to-purple-100 ">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "w-64" : "w-16"
          } backdrop-blur-xl bg-white/70 shadow-lg border-r border-white/40 transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/40">
          <h2
            className={`${isSidebarOpen ? "block" : "hidden"
              } text-xl font-bold bg-linear-to-br from-blue-500 to-purple-600 bg-clip-text text-transparent`}
          >
            Developer Dashboard
          </h2>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-600 hover:text-indigo-600 transition"
          >
            <FaBars />
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-2">
          <Link
            href="/dashboard/developer-dashboard/myProjects"
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-linear-to-r from-blue-50 to-indigo-50 hover:from-indigo-100 hover:to-blue-100 text-gray-800 font-medium transition"
          >
            <FaProjectDiagram className="text-indigo-500" />
            {isSidebarOpen && <span>My Projects</span>}
          </Link>

          {/* <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-linear-to-r hover:from-yellow-50 hover:to-yellow-100 text-gray-800 font-medium transition"
          >
            <FaTasks className="text-yellow-500" />
            {isSidebarOpen && <span>My Tasks</span>}
          </a> */}

          <Link
            href="/dashboard/developer-dashboard/teamMembers"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-linear-to-r hover:from-green-50 hover:to-emerald-100 text-gray-800 font-medium transition"
          >
            <FaUsers className="text-green-500" />
            {isSidebarOpen && <span>Team Members</span>}
          </Link>

          {/* <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-linear-to-r hover:from-indigo-50 hover:to-pink-100 text-gray-800 font-medium transition"
          >
            <FaUserPlus className="text-indigo-600" />
            {isSidebarOpen && <span>Invite a Teammate</span>}
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-linear-to-r hover:from-purple-50 hover:to-pink-100 text-gray-800 font-medium transition"
          >
            <PiKanban className="text-purple-500" />
            {isSidebarOpen && <span>Board</span>}
          </a> */}

          {/* Invite a Teammate */}
          <button
            onClick={() => setActiveSection("invite")}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-linear-to-r hover:from-indigo-50 hover:to-pink-100 text-gray-800 font-medium transition"
          >
            <FaUserPlus className="text-indigo-600" />
            {isSidebarOpen && <span>Invite a Teammate</span>}
          </button>

          {/* Kanban Board */}
          <button
            onClick={() => setActiveSection("board")}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-linear-to-r hover:from-purple-50 hover:to-pink-100 text-gray-800 font-medium transition"
          >
            <PiKanban className="text-purple-500" />
            {isSidebarOpen && <span>Board</span>}
          </button>

          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-linear-to-r hover:from-yellow-50 hover:to-yellow-100 text-gray-800 font-medium transition"
          >
            <MdOutlineSettingsSuggest className="text-yellow-500" />
            <button
              onClick={() => {
                // setIsDropdownOpen(false);
                router.push("/dashboard/developer-dashboard/settings");
              }}
            >
              Settings
            </button>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-linear-to-r hover:from-purple-50 hover:to-pink-100 text-gray-800 font-medium transition"
          >
            <TbLogout2 className="text-red-500" />
            <button onClick={() => signOut({ callbackUrl: "/" })}>
              Logout
            </button>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex-1 flex flex-col pb-5 ">
        {/* Top Navbar */}
        <header className="backdrop-blur-xl bg-white/70 shadow-md border-b border-white/40 px-6 py-4 flex justify-between items-center sticky top-0 z-30">
          <h1 className="text-2xl font-bold bg-linear-to-br from-amber-500 to-orange-600 bg-clip-text text-transparent">
            Overview
          </h1>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-indigo-600 transition">
              <FaBell size={20} />
            </button>

            {/* Profile dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen((s) => !s)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <div className="text-sm font-medium text-gray-700">
                  {(remoteUser?.name || session?.user?.name)?.split(" ")[0] ?? "Guest"}
                </div>
                <div className="relative w-9 h-9 rounded-full border border-indigo-200 shadow-sm overflow-hidden">
                  <Image
                    src={
                      remoteUser?.image ||
                      session?.user?.image ||
                      "https://i.pravatar.cc/40"
                    }
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
              </button>

              {/* ************ */}
              {isDropdownOpen && (
                <div>
                  {/* <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      router.push("/dashboard/developer-dashboard/profile");
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 transition"
                  >
                    Profile
                  </button> */}
                  {/* <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      router.push("/dashboard/developer-dashboard/settings");
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 transition"
                  >
                    Settings
                  </button>
                  <div className="border-t my-1" />
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
                  >
                    Logout
                  </button> */}
                </div>
              )}
              {/* ************ */}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 mb-6 border-l-4 border-indigo-500 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              Welcome, {session?.user?.name || "Developer"} 👋
            </h2>
            <p className="text-gray-600">
              Here’s a quick overview of your dashboard and current activities.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-linear-to-r from-green-50 to-emerald-100 rounded-xl shadow p-5 hover:shadow-lg transition transform hover:-translate-y-1">
              <h3 className="font-semibold text-gray-700 mb-2">
                Active Projects
              </h3>
              <p className="text-3xl font-bold text-gray-900">3</p>
            </div>
            <div className="bg-linear-to-r from-yellow-50 to-amber-100 rounded-xl shadow p-5 hover:shadow-lg transition transform hover:-translate-y-1">
              <h3 className="font-semibold text-gray-700 mb-2">
                Pending Tasks
              </h3>
              <p className="text-3xl font-bold text-gray-900">7</p>
            </div>
            <div className="bg-linear-to-r from-red-50 to-rose-100 rounded-xl shadow p-5 hover:shadow-lg transition transform hover:-translate-y-1">
              <h3 className="font-semibold text-gray-700 mb-2">
                Completed Tasks
              </h3>
              <p className="text-3xl font-bold text-gray-900">15</p>
            </div>
          </div>

          {activeSection === "board" && (
            <div className="mt-10 bg-white/80 backdrop-blur-md rounded-xl shadow-lg">
              <KanbanBoard />
            </div>
          )}

          {activeSection === "invite" && (
            <div className="mt-10 bg-white/80 backdrop-blur-md rounded-xl shadow-lg">
              <InviteForm />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
