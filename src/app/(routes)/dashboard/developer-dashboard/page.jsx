"use client";
import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  FaTasks,
  FaUsers,
  FaProjectDiagram,
  FaBell,
  FaBars,
  FaUserPlus,
  FaTimes,
} from "react-icons/fa";
import { PiKanban } from "react-icons/pi";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import KanbanBoard from "./kanban/KanbanBoard";
import DashboardMockup from "./DashboardMockup/page";
import MyProjects from "../developer-dashboard/myProjects/page";
import Image from "next/image";
import InviteForm from "@/app/api/users/invite/InviteForm";
import TeamMemberPage from "../developer-dashboard/team-member/page";

export default function DeveloperDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { data: session } = useSession();
  const [remoteUser, setRemoteUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);
  const router = useRouter();

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(e.target) && isMobile && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef, isMobile, isSidebarOpen]);

  // Load user data
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

  const [activeSection, setActiveSection] = useState("overview");

  const navigationItems = [
    { id: "overview", label: "Overview", icon: FaProjectDiagram, color: "text-blue-500" },
    { id: "myProjects", label: "My Projects", icon: FaProjectDiagram, color: "text-indigo-500" },
    { id: "teamMember", label: "Team Members", icon: FaUsers, color: "text-green-500" },
    { id: "invite", label: "Invite Teammate", icon: FaUserPlus, color: "text-purple-500" },
    { id: "board", label: "Kanban Board", icon: PiKanban, color: "text-pink-500" },
  ];

  const handleNavigation = (sectionId) => {
    setActiveSection(sectionId);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen mt-20 bg-gradient-to-br from-blue-50   to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          w-80 lg:w-72 xl:w-80
          bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl
          shadow-2xl lg:shadow-lg border-r border-gray-200 dark:border-gray-700
          transition-transform duration-300 ease-in-out flex flex-col
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <PiKanban className="text-white text-xl" />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DevSpace
            </h2>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FaTimes className="text-gray-600 dark:text-gray-400 text-lg" />
          </button>
        </div>

        {/* User Profile */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full border-2 border-blue-200 dark:border-blue-800 overflow-hidden">
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
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                {remoteUser?.name || session?.user?.name || "Guest"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {session?.user?.email || "Developer"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`
                  w-full flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-200
                  ${activeSection === item.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                  }
                `}
              >
                <Icon className={`text-lg ${activeSection === item.id ? "text-white" : item.color}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => router.push("/dashboard/developer-dashboard/settings")}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-colors"
          >
            <MdOutlineSettingsSuggest className="text-lg text-gray-500" />
            <span>Settings</span>
          </button>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 font-medium transition-colors"
          >
            <TbLogout2 className="text-lg text-red-500" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen w-full">
        {/* Top Header - FIXED: Always show hamburger on mobile */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Hamburger Button - ALWAYS VISIBLE ON MOBILE */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden"
              >
                <FaBars className="text-gray-700 dark:text-gray-300 text-lg" />
              </button>
              
              {/* Page Title */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center lg:hidden">
                  <PiKanban className="text-white text-sm" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {navigationItems.find(item => item.id === activeSection)?.label || "Dashboard"}
                </h1>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6">
          {/* Welcome Banner */}
          {activeSection === "overview" && (
            <>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 sm:p-8 mb-6 sm:mb-8 text-white">
                <h2 className="text-xl sm:text-2xl font-bold mb-2">
                  Welcome back, {session?.user?.name || "Developer"}! 👋
                </h2>
                <p className="text-blue-100 opacity-90 text-sm sm:text-base">
                  Here's what's happening with your projects today.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Projects</h3>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-2">3</p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <FaProjectDiagram className="text-blue-600 dark:text-blue-400 text-lg sm:text-xl" />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Tasks</h3>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-2">7</p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                      <FaTasks className="text-purple-600 dark:text-purple-400 text-lg sm:text-xl" />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 border-l-4 border-green-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Team Members</h3>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-2">12</p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                      <FaUsers className="text-green-600 dark:text-green-400 text-lg sm:text-xl" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Dynamic Sections */}
          <div className="space-y-6 sm:space-y-8">
            {activeSection === "board" && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <KanbanBoard />
              </div>
            )}

            {activeSection === "invite" && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <InviteForm />
              </div>
            )}

            {activeSection === "myProjects" && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <MyProjects />
              </div>
            )}

            {activeSection === "teamMember" && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <TeamMemberPage />
              </div>
            )}

            {/* Default Dashboard Content */}
            {activeSection === "overview" && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <DashboardMockup />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}