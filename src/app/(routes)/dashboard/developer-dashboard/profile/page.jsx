"use client";
import React from "react";
import { useSession } from "next-auth/react";

export default function DeveloperProfilePage() {
  const { data: session } = useSession();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <div className="bg-white shadow rounded-md p-6 max-w-2xl">
        <div className="flex items-center gap-4">
          <img
            src={session?.user?.image || "https://i.pravatar.cc/80"}
            alt={session?.user?.name || "Profile"}
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h3 className="text-lg font-medium">
              {session?.user?.name || "Guest Developer"}
            </h3>
            <p className="text-sm text-gray-500">{session?.user?.email}</p>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold">About</h4>
          <p className="text-sm text-gray-600 mt-2">
            This is a simple profile view. Use Settings to update your
            information.
          </p>
        </div>
      </div>
    </div>
  );
}
