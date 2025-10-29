import clientPromise from "@/lib/mongodb";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiMail, FiArrowRight } from "react-icons/fi";
import { HiOutlineComputerDesktop } from "react-icons/hi2";

const AllDevelopersPage = async () => {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  const collection = db.collection("users-data");

  const users = await collection
    .find({ role: "developer" }, { projection: { password: 0 } })
    .toArray();

  return (
    <div className="min-h-screen p-6 mt-20 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800 mb-6">
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Our Developer Community
          </span>
        </div>

        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
          <span className="bg-linear-to-r from-gray-900 to-blue-900 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">
            Bringing Ideas to Life
          </span>
          <br />
          <span className="text-3xl bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Meet Our Developers
          </span>
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore our network of skilled developers — view their profiles,
          portfolios, and professional stories that shape the future of
          technology.
        </p>
      </div>

      {users.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No developers found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {users.map((u) => (
            <div
              key={u._id.toString()}
              className="group bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:scale-105 overflow-hidden"
            >
              {/* Top Image */}
              <div className="relative w-28 h-28 mx-auto mt-6 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-md">
                <Image
                  src={u.image || `https://i.pravatar.cc/300?u=${u._id}`}
                  alt={u.name || "Profile"}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 pt-4">
                {/* Name and Role */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
                  {u.name || "No Name"}
                </h3>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <HiOutlineComputerDesktop className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                    {u.role || "Developer"}
                  </span>
                </div>

                {/* Contact Info */}
                <div className="flex items-center gap-3 mb-6 justify-center">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                    <FiMail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Email
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {u.email || "N/A"}
                    </div>
                  </div>
                </div>

                {/* View Details Button */}
                {/* View Details Button */}
                <div className="flex justify-center">
                  <Link
                    href={`/AllDevelopers/${u._id.toString()}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all duration-300 group"
                  >
                    View Details
                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDevelopersPage;
