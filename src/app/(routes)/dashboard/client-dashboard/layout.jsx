"use client"
import Link from 'next/link'
import React from 'react'
import {
    FaHome,
    FaUser,
    FaCog,
    FaChartBar,
} from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa";
import { FiCreditCard, FiInbox } from 'react-icons/fi';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {

    const pathname = usePathname();

    const links = [
        { href: "/dashboard/client-dashboard", label: "Home", icon: <FaHome /> },
        { href: "/dashboard/client-dashboard/reports", label: "Reports", icon: <FaChartBar /> },
        { href: "/dashboard/client-dashboard/myProjects", label: "My Projects", icon: <FaFolderOpen /> },
        { href: "/dashboard/client-dashboard/payment", label: "Payment", icon: <FiCreditCard /> },
        { href: "/dashboard/client-dashboard/profile", label: "Profile", icon: <FaUser /> },
        { href: "/dashboard/client-dashboard/settings", label: "Settings", icon: <FaCog /> },
    ];


    return (
        <div className="flex min-h-screen mt-20">

            {/* Sidebar */}
            <div className="w-64 dark:text-gray-300 bg-linear-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 overflow-hidden shadow-lg p-5">
                <Link href="/" className="text-2xl font-bold bg-linear-to-br from-blue-500 to-purple-600 bg-clip-text text-transparent mb-8">OneOrbit</Link>

                {/* dashboard links */}
                <ul className="space-y-4 mt-4">
                    {
                        links.map((link) => {
                            const isActive = pathname === link.href;

                            return (
                                <li key={link.href}>
                                    <Link href={link.href} className={`flex items-center gap-3 p-2 rounded-md transition ${isActive ? "bg-blue-100 text-blue-600" : "hover:bg-blue-100 hover:text-blue-600"}`}>{link.icon} {link.label}</Link>
                                </li>
                            )
                        })
                    }
                </ul>

            </div>

            {/* Main Content */}
            <div className="flex-1">{children}</div>
        </div>
    );
}
