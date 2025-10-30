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

import DashboardMockup from "./DashboardMockup/page";
import MyProjects from "../developer-dashboard/myProjects/page";
import Image from "next/image";
import InviteForm from "@/app/api/users/invite/InviteForm";

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
<<<<<<< HEAD
    <div className="flex min-h-screen bg-linear-to-br from-indigo-50 via-blue-50 to-purple-100 py-20 ">
=======
    <div className="flex min-h-screen dark-bg bg-linear-to-br from-indigo-50 to-purple-100 dark-bg mt-20">
>>>>>>> 6d63ca2a8b4189103f6b7b711d3da40c75f69fb1
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "w-64" : "w-16"
          } backdrop-blur-xl  dark-bg shadow-lg border-r border-white/40 dark:border-gray-700 transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/40 dark:border-gray-700">
          <h2
            className={`${
              isSidebarOpen ? "block" : "hidden"
            } text-xl font-bold bg-linear-to-br from-blue-500 to-purple-600 bg-clip-text text-transparent`}
          >
            Developer Dashboard
          </h2>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            <FaBars />
          </button>
        </div>

<<<<<<< HEAD
        <nav className="flex-1 px-2 py-4 space-y-2">
          {/* <Link
            onClick={() => setActiveSection("myProjects")}
=======
        <nav className="flex-1 px-5 py-4 space-y-2 text-gray-800 dark:text-gray-200">
          <Link
>>>>>>> 6d63ca2a8b4189103f6b7b711d3da40c75f69fb1
            href="/dashboard/developer-dashboard/myProjects"
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-linear-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 hover:from-indigo-100 hover:to-blue-100 dark:hover:from-gray-700 dark:hover:to-gray-700 font-medium transition"
          >
            <FaProjectDiagram className="text-indigo-500" />
            {isSidebarOpen && <span>My Projects</span>}
          </Link> */}

          <button
            onClick={() => setActiveSection("myProjects")}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-linear-to-r hover:from-purple-50 hover:to-pink-100 text-gray-800 font-medium transition"
          >
            <FaProjectDiagram className="text-indigo-500" />
            {isSidebarOpen && <span>My Projects</span>}
          </button>

          <Link
            href="/dashboard/developer-dashboard/team-member"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-linear-to-r hover:from-green-50 hover:to-emerald-100 dark:hover:from-gray-700 dark:hover:to-gray-700 font-medium transition"
          >
            <FaUsers className="text-green-500" />
            {/* {isSidebarOpen && <span>Team Members</span>} */}
            <button
              onClick={() => {
                setIsDropdownOpen(true);
                router.push("/dashboard/developer-dashboard/team-member");
              }}
            >
              Team Member
            </button>
          </Link>



          {/* Invite a Teammate */}
          <button
            onClick={() => setActiveSection("invite")}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-linear-to-r hover:from-indigo-50 hover:to-pink-100 dark:hover:from-gray-700 dark:hover:to-gray-700 font-medium transition"
          >
            <FaUserPlus className="text-indigo-600" />
            {isSidebarOpen && <span>Invite a Teammate</span>}
          </button>

          {/* Kanban Board */}
          <button
            onClick={() => setActiveSection("board")}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-linear-to-r hover:from-purple-50 hover:to-pink-100 dark:hover:from-gray-700 dark:hover:to-gray-700 font-medium transition"
          >
            <PiKanban className="text-purple-500" />
            {isSidebarOpen && <span>Board</span>}
          </button>

          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-linear-to-r hover:from-yellow-50 hover:to-yellow-100 dark:hover:from-gray-700 dark:hover:to-gray-700 font-medium transition"
          >
            <MdOutlineSettingsSuggest className="text-yellow-500" />
            <button
              onClick={() => router.push("/dashboard/developer-dashboard/settings")}
              className="text-gray-800 dark:text-gray-200"
            >
              {isSidebarOpen && <span>Settings</span>}
            </button>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-linear-to-r hover:from-purple-50 hover:to-pink-100 dark:hover:from-gray-700 dark:hover:to-gray-700 font-medium transition"
          >
            <TbLogout2 className="text-red-500" />
<<<<<<< HEAD
            <button onClick={() => signOut({ callbackUrl: "/" })}>
              {isSidebarOpen && <span>Logout</span>}
=======
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-gray-800 dark:text-gray-200"
            >
              Logout
>>>>>>> 6d63ca2a8b4189103f6b7b711d3da40c75f69fb1
            </button>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex-1 flex flex-col pb-5 dark-bg">
        {/* Top Navbar */}
        <header className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/60 shadow-md border-b border-white/40 dark:border-gray-700 px-6 py-4 flex justify-between items-center sticky top-0 z-30">
          <h1 className="text-2xl font-bold bg-linear-to-br from-amber-500 to-orange-600 bg-clip-text text-transparent">
            Overview
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen((s) => !s)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {(remoteUser?.name || session?.user?.name)?.split(" ")[0] ??
                    "Guest"}
                </div>
                <div className="relative w-9 h-9 rounded-full border border-indigo-200 dark:border-gray-600 shadow-sm overflow-hidden">
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
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          <div className="bg-white/80 dark:bg-gray-900/70 backdrop-blur-md rounded-xl shadow-lg p-6 mb-6 border-l-4 border-indigo-500 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
              Welcome, {session?.user?.name || "Developer"} 👋
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Here’s a quick overview of your dashboard and current activities.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-linear-to-r from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-800 rounded-xl shadow p-5 hover:shadow-lg transition transform hover:-translate-y-1">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Active Projects
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                3
              </p>
            </div>
            <div className="bg-linear-to-r from-yellow-50 to-amber-100 dark:from-gray-800 dark:to-gray-800 rounded-xl shadow p-5 hover:shadow-lg transition transform hover:-translate-y-1">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Pending Tasks
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                7
              </p>
            </div>
            <div className="bg-linear-to-r from-red-50 to-rose-100 dark:from-gray-800 dark:to-gray-800 rounded-xl shadow p-5 hover:shadow-lg transition transform hover:-translate-y-1">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Completed Tasks
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                15
              </p>
            </div>
          </div>

          {activeSection === "board" && (
            <div className="mt-10 bg-white/80 dark:bg-gray-900/70 backdrop-blur-md rounded-xl shadow-lg">
              <KanbanBoard />
            </div>
          )}

          {activeSection === "invite" && (
            <div className="mt-10 bg-white/80 dark:bg-gray-900/70 backdrop-blur-md rounded-xl shadow-lg">
              <InviteForm />
            </div>
          )}
          {activeSection === "myProjects" && (
            <div className="mt-10 bg-white/80 backdrop-blur-md rounded-xl shadow-lg">
              <MyProjects />
            </div>
          )}

          <div className="mt-10 bg-white/80 dark:bg-gray-900/70 backdrop-blur-md rounded-xl shadow-lg">
            <DashboardMockup />
          </div>
        </main>
      </div>
    </div>
  );
}
