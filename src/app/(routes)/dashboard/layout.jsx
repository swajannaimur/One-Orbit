import Link from 'next/link'
import React from 'react'
import { FaHome, FaUser, FaCog, FaChartBar } from 'react-icons/fa'

export default function DashboardLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg p-5">
                <Link href="/" className="text-2xl font-bold text-blue-600 mb-8">OneOrbit</Link>

                <ul className="space-y-4 mt-4">
                    <li>
                        <Link
                            href="/dashboard/"
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-100 hover:text-blue-600 transition"
                        >
                            <FaHome /> Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard/profile"
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-100 hover:text-blue-600 transition"
                        >
                            <FaUser /> Profile
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard/settings"
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-100 hover:text-blue-600 transition"
                        >
                            <FaCog /> Settings
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard/reports"
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-100 hover:text-blue-600 transition"
                        >
                            <FaChartBar /> Reports
                        </Link>
                    </li>
                </ul>
            </div>  

            {/* Main Content */}
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}
