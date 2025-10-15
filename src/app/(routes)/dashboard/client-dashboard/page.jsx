import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'
import { FaHome, FaBell, FaQuestionCircle, FaCalendarAlt, FaLifeRing, FaClipboardList } from 'react-icons/fa';

export default async function DashboardHome() {
    const session = await getServerSession();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen px-4">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <FaHome className="text-3xl text-blue-600 " />
                <h1 className="text-2xl font-bold text-gray-800 ">Dashboard Home</h1>
            </div>

            {/* Welcome Card */}
            <div className="bg-white  shadow-md rounded-xl p-6 mb-6 border-l-4 border-blue-600">
                <h2 className="text-lg font-semibold text-gray-700  mb-2">
                    Welcome, {session.user?.name || "Client"}!
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                    Here’s a quick overview of your dashboard and activities.
                </p>
            </div>

          

            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <div className="bg-white rounded-xl shadow p-5 border-l-4 border-green-500">
                    <h3 className="font-semibold text-gray-700  mb-2">Total Posts</h3>
                    <p className="text-2xl font-bold">128</p>
                </div>
                <div className="bg-white rounded-xl shadow p-5 border-l-4 border-yellow-500">
                    <h3 className="font-semibold text-gray-700  mb-2">Pending Posts</h3>
                    <p className="text-2xl font-bold">24</p>
                </div>
                <div className="bg-white rounded-xl shadow p-5 border-l-4 border-red-500">
                    <h3 className="font-semibold text-gray-700  mb-2">Messages</h3>
                    <p className="text-2xl font-bold">8</p>
                </div>
            </div>

            {/* Notifications Section */}
            <div className="mt-10 bg-white rounded-xl shadow p-6">
                <div className="flex items-center gap-2 mb-4">
                    <FaBell className="text-xl text-blue-500" />
                    <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
                </div>
                <ul className="space-y-2 text-gray-700">
                    <li>✅ Your account was successfully verified.</li>
                    <li>📝 3 new comments on your post.</li>
                    <li>⚡ System maintenance scheduled for 15 October.</li>
                </ul>
            </div>

            {/* Upcoming Events */}
            <div className="mt-10 bg-white  rounded-xl shadow p-6">
                <div className="flex items-center gap-2 mb-4">
                    <FaCalendarAlt className="text-xl text-green-500" />
                    <h2 className="text-xl font-bold text-gray-800">Upcoming Events</h2>
                </div>
                <ul className="space-y-2 text-gray-700 ">
                    <li>📅 15 Oct - Live Q&A Session</li>
                    <li>📅 18 Oct - Dashboard Design Workshop</li>
                    <li>📅 22 Oct - Content Strategy Webinar</li>
                </ul>
            </div>

            {/* Announcements */}
            <div className="mt-10 bg-white  rounded-xl shadow p-6 border-l-4 border-blue-500">
                <h2 className="text-xl font-bold text-gray-800  mb-3">Announcements</h2>
                <p className="text-gray-600 ">
                    🎉 A new version of the dashboard is coming soon with exciting features like analytics, report generation, and more.
                </p>
            </div>

            {/* Help Center */}
            <div className="mt-10 bg-white  rounded-xl shadow p-6">
                <div className="flex items-center gap-2 mb-4">
                    <FaLifeRing className="text-xl text-red-500" />
                    <h2 className="text-xl font-bold text-gray-800 ">Help & Support</h2>
                </div>
                <p className="text-gray-600  mb-4">
                    Need assistance? Visit our Help Center or contact our support team for quick help.
                </p>
                <div className="flex gap-3">
                    <button className="btn btn-outline btn-primary">Help Center</button>
                    <button className="btn btn-primary">Contact Support</button>
                </div>
            </div>

            

            {/* Recent Activity */}
            <div className="mt-10 bg-white  rounded-xl shadow p-6">
                <div className="flex items-center gap-2 mb-4">
                    <FaClipboardList className="text-xl text-indigo-500" />
                    <h2 className="text-xl font-bold text-gray-800 ">Recent Activities</h2>
                </div>
                <ul className="space-y-2 text-gray-700 ">
                    <li>📌 You created a new post “How to build a Next.js app”</li>
                    <li>📌 Profile updated successfully.</li>
                    <li>📌 You subscribed to “Premium Plan”.</li>
                </ul>
            </div>
        </div>
    )
}
