import clientPromise from "@/lib/mongodb";
import Link from "next/link";
import React from "react";

const page = async () => {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  const collection = db.collection("users-data");

  // Fetch all users with role 'developer'
  const users = await collection
    .find({ role: "developer" }, { projection: { password: 0 } })
    .toArray();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Developers</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {users.map((u) => (
          <div
            key={u._id.toString()}
            className="bg-white rounded-lg shadow p-4"
          >
            <div className="flex items-center space-x-4">
              <img
                src={u.image || ""}
                alt={u.name || "Profile"}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-medium">{u.name || "No name"}</h3>
                <h3 className="text-sm text-gray-500 ">{u.email || ""}</h3>
                <p className="text-sm text-gray-500">{u.role || "Developer"}</p>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Link
                className="btn btn-sm btn-primary"
                href={`/AllDevelopers/${u._id.toString()}`}
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
