"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function DevelopersSettings() {
  const { data: session } = useSession();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>

      <div className="bg-white shadow rounded-md p-6 max-w-2xl">
        <p className="text-sm text-gray-600">
          Manage your account settings and preferences.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <h4 className="font-medium">Account</h4>
            <p className="text-sm text-gray-500">{session?.user?.email}</p>
          </div>

          <div>
            <h4 className="font-medium">Preferences</h4>
            <p className="text-sm text-gray-500">Theme, notifications, etc.</p>
          </div>

          <div className="pt-2">
            <Link
              href="/developerDashboard/profile"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
