"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import {
    FaHome,
    FaUser,
    FaCog,
    FaChartBar,
    FaMoneyBillWave,
    FaFolderOpen,
    FaBars,
    FaTimes
} from "react-icons/fa";
import { FiCreditCard, FiInbox } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import { MdOutlineSettingsSuggest } from 'react-icons/md';
import { TbLogout2 } from 'react-icons/tb';
import { PiKanban } from 'react-icons/pi';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { data: session } = useSession();
    const [remoteUser, setRemoteUser] = useState(null);
    const pathname = usePathname();

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
            } catch (err) { }
        }
        load();
        return () => (mounted = false);
    }, []);

    // Close sidebar when route changes on mobile
    useEffect(() => {
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    }, [pathname, isMobile]);

    const links = [
        { href: "/dashboard/client-dashboard", label: "Home", icon: <FaHome /> },
        { href: "/dashboard/client-dashboard/myProjects", label: "My Projects", icon: <FaFolderOpen /> },
        { href: "/dashboard/client-dashboard/to-pay", label: "To Pay", icon: <FaMoneyBillWave /> },
    ];

    return (
        <div className="flex min-h-screen mt-20 bg-gradient-to-br from-blue-50   to-purple-50 dark:from-gray-900  dark:to-purple-900">
            {/* Mobile Overlay */}
            {isMobile && isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed lg:static inset-y-0 left-0 z-50
    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    w-80 lg:w-72 xl:w-80
    bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 
    dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20
    shadow-xl lg:shadow-lg
    transition-transform duration-300 ease-in-out
    flex flex-col mt-16 sm:mt-0
            `}>
                {/* Sidebar Header */}
                <div className="flex items-center gap-4 p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <PiKanban className="text-white text-xl" />
                    </div>

                    <h1 className="text-xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Client Dashboard
                    </h1>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="lg:hidden p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                    >
                        <FaTimes className="text-gray-600 dark:text-gray-400" />
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

                {/* Navigation Links */}
                <nav className="flex-1 px-5 py-8">
                    <ul className="space-y-3">
                        {links.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`
                                            flex items-center gap-4 p-4 rounded-xl font-medium transition-all duration-200
                                            ${isActive
                                                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                                                : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400"
                                            }
                                        `}
                                        onClick={() => isMobile && setIsSidebarOpen(false)}
                                    >
                                        <span className={`text-lg ${isActive ? 'text-white' : 'text-blue-500'}`}>
                                            {link.icon}
                                        </span>
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Footer Actions */}
                <div className="p-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-blue-100
hover:text-blue-600 dark:hover:bg-red-900/20 font-medium transition-colors"
                    >
                        <TbLogout2 className="text-lg text-red-500" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top Header */}
                <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {/* Hamburger Button - Always visible on mobile */}
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors lg:hidden"
                            >
                                <FaBars className="text-gray-700 dark:text-gray-300 text-lg" />
                            </button>

                            {/* Page Title */}
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center lg:hidden">
                                    <FaHome className="text-white text-sm" />
                                </div>
                                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    {links.find(link => link.href === pathname)?.label || "Dashboard"}
                                </h1>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 sm:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}