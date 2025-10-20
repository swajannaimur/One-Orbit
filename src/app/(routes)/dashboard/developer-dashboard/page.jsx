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
import { PiKanban } from "react-icons/pi";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";

import KanbanBoard from "./kanban/KanbanBoard";
import InviteForm from "@/components/forms/InviteForm";

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
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 ">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } backdrop-blur-xl bg-white/70 shadow-lg border-r border-white/40 transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/40">
          <h2
            className={`${
              isSidebarOpen ? "block" : "hidden"
            } text-xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 bg-clip-text text-transparent`}
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
            href="/developerDashboard/myprojects"
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-indigo-100 hover:to-blue-100 text-gray-800 font-medium transition"
          >
            <FaProjectDiagram className="text-indigo-500" />
            {isSidebarOpen && <span>My Projects</span>}
          </Link>

          {/* <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-yellow-50 hover:to-yellow-100 text-gray-800 font-medium transition"
          >
            <FaTasks className="text-yellow-500" />
            {isSidebarOpen && <span>My Tasks</span>}
          </a> */}

          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-100 text-gray-800 font-medium transition"
          >
            <FaUsers className="text-green-500" />
            {isSidebarOpen && <span>Team Members</span>}
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-100 text-gray-800 font-medium transition"
          >
            <PiKanban className="text-purple-500" />
            {isSidebarOpen && <span>Board</span>}
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-yellow-50 hover:to-yellow-100 text-gray-800 font-medium transition"
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
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-100 text-gray-800 font-medium transition"
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
          <h1 className="text-2xl font-bold bg-gradient-to-br from-amber-500 to-orange-600 bg-clip-text text-transparent">
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
                  className="w-9 h-9 rounded-full border border-indigo-200 shadow-sm"
                />
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
            <div className="bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl shadow p-5 hover:shadow-lg transition transform hover:-translate-y-1">
              <h3 className="font-semibold text-gray-700 mb-2">
                Active Projects
              </h3>
              <p className="text-3xl font-bold text-gray-900">3</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50 to-amber-100 rounded-xl shadow p-5 hover:shadow-lg transition transform hover:-translate-y-1">
              <h3 className="font-semibold text-gray-700 mb-2">
                Pending Tasks
              </h3>
              <p className="text-3xl font-bold text-gray-900">7</p>
            </div>
            <div className="bg-gradient-to-r from-red-50 to-rose-100 rounded-xl shadow p-5 hover:shadow-lg transition transform hover:-translate-y-1">
              <h3 className="font-semibold text-gray-700 mb-2">
                Completed Tasks
              </h3>
              <p className="text-3xl font-bold text-gray-900">15</p>
            </div>
          </div>

          {/* Kanban Board Section */}
          <div className="mt-10 bg-white/80 backdrop-blur-md rounded-xl shadow-lg ">
            <KanbanBoard />
          </div>

          {/* Invite Section */}
          <div className="mt-10 bg-white/80 backdrop-blur-md rounded-xl shadow-lg">
            <InviteForm />
          </div>
        </main>
      </div>
    </div>
  );
}

// "use client";
// import { useState, useRef, useEffect } from "react";
// import { useSession, signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   FaTasks,
//   FaUsers,
//   FaProjectDiagram,
//   FaBell,
//   FaBars,
// } from "react-icons/fa";

// import KanbanBoard from "./kanban/KanbanBoard";
// import InviteForm from "@/app/api/users/invite/InviteForm";

// export default function DeveloperDashboard() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const { data: session } = useSession();
//   const [remoteUser, setRemoteUser] = useState(null);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const router = useRouter();

//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setIsDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [dropdownRef]);

//   useEffect(() => {
//     let mounted = true;
//     async function load() {
//       try {
//         const res = await fetch("/api/users/me");
//         if (!res.ok) return;
//         const data = await res.json();
//         if (!mounted) return;
//         setRemoteUser(data.user || null);
//       } catch (err) {}
//     }
//     load();
//     return () => (mounted = false);
//   }, []);

//   return (
//     <div className="flex h-screen bg-gray-50 mt-20 max-w-11/12 mx-auto">
//       {/* Sidebar */}
//       <div
//         className={`${
//           isSidebarOpen ? "w-64" : "w-16"
//         } bg-white shadow-md transition-all duration-300 flex flex-col`}
//       >
//         <div className="flex items-center justify-between px-4 py-4 border-b">
//           <h2
//             className={`${
//               isSidebarOpen ? "block" : "hidden"
//             } text-xl font-semibold text-gray-800`}
//           >
//             Developer Panel
//           </h2>
//           <button
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             className="text-gray-600"
//           >
//             <FaBars />
//           </button>
//         </div>

//         <nav className="flex-1 px-2 py-4 space-y-2">
//           <Link
//             href="/developerDashboard/myprojects"
//             className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
//           >
//             <FaProjectDiagram className="text-blue-500" />
//             {isSidebarOpen && <span className="font-medium">My Projects</span>}
//           </Link>
//           <a
//             href="#"
//             className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
//           >
//             <FaTasks className="text-yellow-500" />
//             {isSidebarOpen && <span className="font-medium">My Tasks</span>}
//           </a>
//           <a
//             href="#"
//             className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
//           >
//             <FaUsers className="text-green-500" />
//             {isSidebarOpen && <span className="font-medium">Team Members</span>}
//           </a>
//           <a
//             href="#"
//             className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
//           >
//             <FaUsers className="text-green-500" />
//             {isSidebarOpen && <span className="font-medium">Board</span>}
//           </a>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col bg-gray-50">
//         {/* Top Navbar */}
//         <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-800">
//             Developer Dashboard
//           </h1>
//           <div className="flex items-center gap-4">
//             <button className="text-gray-600 hover:text-gray-800">
//               <FaBell size={20} />
//             </button>

//             {/* Profile dropdown */}
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setIsDropdownOpen((s) => !s)}
//                 className="flex items-center gap-2 focus:outline-none"
//                 aria-haspopup="true"
//                 aria-expanded={isDropdownOpen}
//               >
//                 <div className="text-sm text-gray-700">
//                   {(remoteUser?.name || session?.user?.name)?.split(" ")[0] ??
//                     "Guest"}
//                 </div>
//                 <img
//                   src={
//                     remoteUser?.image ||
//                     session?.user?.image ||
//                     "https://i.pravatar.cc/40"
//                   }
//                   alt="Profile"
//                   className="w-9 h-9 rounded-full"
//                 />
//               </button>

//               {isDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg py-1 z-50">
//                   <button
//                     onClick={() => {
//                       setIsDropdownOpen(false);
//                       router.push("/dashboard/developer-dashboard/profile");
//                     }}
//                     className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
//                   >
//                     Profile
//                   </button>
//                   <button
//                     onClick={() => {
//                       setIsDropdownOpen(false);
//                       router.push("/dashboard/developer-dashboard/settings");
//                     }}
//                     className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
//                   >
//                     Settings
//                   </button>
//                   <div className="border-t my-1" />
//                   <button
//                     onClick={() => signOut({ callbackUrl: "/" })}
//                     className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-md"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </header>

//         {/* Dashboard Content */}
//         <main className="p-6 overflow-y-auto">
//           <div className="bg-white rounded-xl shadow p-6 mb-6 border-l-4 border-blue-600">
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">
//               Welcome, {session?.user?.name || "Developer"}!
//             </h2>
//             <p className="text-gray-600">
//               Here’s a quick overview of your dashboard and activities.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             <div className="bg-white rounded-xl shadow p-5 border-l-4 border-green-500">
//               <h3 className="font-semibold text-gray-700 mb-2">
//                 Active Projects
//               </h3>
//               <p className="text-2xl font-bold text-gray-900">3</p>
//             </div>
//             <div className="bg-white rounded-xl shadow p-5 border-l-4 border-yellow-500">
//               <h3 className="font-semibold text-gray-700 mb-2">
//                 Pending Tasks
//               </h3>
//               <p className="text-2xl font-bold text-gray-900">7</p>
//             </div>
//             <div className="bg-white rounded-xl shadow p-5 border-l-4 border-red-500">
//               <h3 className="font-semibold text-gray-700 mb-2">
//                 Completed Tasks
//               </h3>
//               <p className="text-2xl font-bold text-gray-900">15</p>
//             </div>
//           </div>
//           <div className="mt-8">
//             <KanbanBoard />
//           </div>

//           <div className="mt-8">
//             <InviteForm />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
