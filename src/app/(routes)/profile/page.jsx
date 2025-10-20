"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  HiOutlineCog6Tooth,
  HiOutlineEnvelope,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { FiClock, FiBriefcase, FiActivity } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import Link from "next/link";

export default function DeveloperProfilePage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [remoteUser, setRemoteUser] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch("/api/users/me");
        if (!res.ok) return;
        const data = await res.json();
        if (!mounted) return;
        setRemoteUser(data.user || null);
      } catch (err) {
        console.error("Failed to fetch user for profile", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  const user = remoteUser ||
    session?.user || {
      name: "Guest Developer",
      email: "guest@example.com",
      image: "https://i.pravatar.cc/150",
      bio: null,
      about: null,
      skills: [],
      portfolio: null,
      resume: null,
      github: null,
      linkedin: null,
      facebook: null,
    };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 mt-20">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
          My Profile
        </h2>
        <Link href="/dashboard/developer-dashboard/settings">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200">
            <HiOutlineCog6Tooth className="w-5 h-5" />
            Settings
          </button>
        </Link>
      </div>

      {/* Profile Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side: Profile Info */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100">
          <img
            src={user.image}
            alt={user.name}
            className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow-md object-cover"
          />
          <h3 className="mt-5 text-2xl font-semibold text-gray-800">
            {user.name}
          </h3>
          <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
            <HiOutlineEnvelope className="w-4 h-4" /> {user.email}
          </p>

          {/* Skills / Tags */}
          {user.skills?.length > 0 && (
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {user.skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-indigo-50 text-indigo-600 text-xs font-medium px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Small Divider */}
          <div className="w-full border-t mt-6 mb-4 border-gray-100"></div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 text-gray-500">
            {user.github && (
              <a
                href={user.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600 transition"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            )}
            {user.linkedin && (
              <a
                href={user.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600 transition"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            )}
            {user.facebook && (
              <a
                href={user.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600 transition"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
            )}
          </div>

          {/* Portfolio & Resume Links */}
          <div className="mt-4 flex flex-col gap-2">
            {user.portfolio && (
              <a
                href={user.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-100 transition text-center"
              >
                View Portfolio
              </a>
            )}
            {user.resume && (
              <a
                href={user.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition text-center"
              >
                Download Resume
              </a>
            )}
          </div>
        </div>

        {/* Right Side: About, Bio, Stats, and Activity */}
        <div className="md:col-span-2 flex flex-col gap-8">
          {/* About */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h4 className="text-lg font-semibold flex items-center gap-2 text-gray-800 mb-3">
              <HiOutlineUserCircle className="w-5 h-5 text-indigo-500" />
              About
            </h4>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {user.about || "No details added yet."}
            </p>
          </div>

          {/* Bio */}
          {user.bio && (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h4 className="text-lg font-semibold flex items-center gap-2 text-gray-800 mb-3">
                <FiActivity className="w-5 h-5 text-indigo-500" />
                Bio
              </h4>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {user.bio}
              </p>
            </div>
          )}

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
              <FiActivity className="w-5 h-5 text-indigo-500" />
              Quick Overview
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="p-5 bg-gray-50 rounded-xl hover:bg-indigo-50 transition">
                <FiBriefcase className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                <p className="text-xl font-semibold text-gray-800">12</p>
                <p className="text-sm text-gray-500">Active Projects</p>
              </div>
              <div className="p-5 bg-gray-50 rounded-xl hover:bg-indigo-50 transition">
                <FiClock className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                <p className="text-xl font-semibold text-gray-800">34</p>
                <p className="text-sm text-gray-500">Tasks Completed</p>
              </div>
              <div className="p-5 bg-gray-50 rounded-xl hover:bg-indigo-50 transition">
                <HiOutlineEnvelope className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-xl font-semibold text-gray-800">5</p>
                <p className="text-sm text-gray-500">Unread Messages</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
              <FiActivity className="w-5 h-5 text-indigo-500" />
              Recent Activity
            </h4>
            <ul className="space-y-4 text-gray-700 text-sm md:text-base">
              <li className="border-l-4 border-indigo-500 pl-4 hover:bg-indigo-50 rounded transition">
                Updated project status to{" "}
                <span className="font-semibold">“In Progress”</span>.
              </li>
              <li className="border-l-4 border-green-500 pl-4 hover:bg-green-50 rounded transition">
                Completed{" "}
                <span className="font-semibold">UI Enhancement Task</span>.
              </li>
              <li className="border-l-4 border-yellow-500 pl-4 hover:bg-yellow-50 rounded transition">
                Commented on{" "}
                <span className="font-semibold">Design Discussion</span>.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
