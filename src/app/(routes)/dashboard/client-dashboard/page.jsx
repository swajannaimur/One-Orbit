import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'
import { FaHome } from 'react-icons/fa';

export default async function DashboardHome() {
    const session = await getServerSession();
    // console.log(session);

    if(!session) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen  mt-14 p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <FaHome className="text-3xl text-blue-600 dark:text-gray-200" />
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Dashboard Home</h1>
            </div>

            {/* Welcome Card */}
            <div className="bg-white shadow-md rounded-xl p-6 mb-6 border-l-4 border-blue-600">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    Welcome, {session.user?.name || "Client"}!
                </h2>
                <p className="text-gray-500">
                    Here’s a quick overview of your dashboard and activities.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
                <button className="btn btn-primary">
                    Primary Action
                </button>
                <button className="btn btn-outline btn-blue">
                    Secondary Action
                </button>
            </div>

            {/* Example Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <div className="bg-white rounded-xl shadow p-5 border-l-4 border-green-500">
                    <h3 className="font-semibold text-gray-700 mb-2">Total Posts</h3>
                    <p className="text-2xl font-bold text-gray-900">128</p>
                </div>
                <div className="bg-white rounded-xl shadow p-5 border-l-4 border-yellow-500">
                    <h3 className="font-semibold text-gray-700 mb-2">Pending Posts</h3>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                </div>
                <div className="bg-white rounded-xl shadow p-5 border-l-4 border-red-500">
                    <h3 className="font-semibold text-gray-700 mb-2">Messages</h3>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
            </div>
        </div>
    )
}
