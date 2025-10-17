"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import {
  FiCalendar,
  FiDollarSign,
  FiTag,
  FiUser,
  FiMail,
  FiClock,
} from "react-icons/fi";
import {
  HiOutlineComputerDesktop,
  HiOutlineCalendarDays,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";

export default function ProjectDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) throw new Error("Post not found");
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 dark:text-gray-300">
        Project not found
      </div>
    );
  }

  // Helpers
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getDaysRemaining = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysRemaining = getDaysRemaining(post.deadline);
  const isUrgent = daysRemaining < 7;

  return (
    <div className="min-h-screen mt-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-blue-900 dark:from-white dark:to-blue-300 bg-clip-text text-transparent">
            {post.projectName}
          </h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800">
            <HiOutlineComputerDesktop className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">
              {post.category}
            </span>
          </div>
          {/* Request button */}
          <div>
    
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Gradient Top Bar */}
          <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>

          <div className="p-8">
            {/* Summary Section */}
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              {post.summary}
            </p>

            {/* Metrics Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
              {/* Budget */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <HiOutlineCurrencyDollar className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Budget
                  </p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    ${post.budget}
                  </p>
                </div>
              </div>

              {/* Deadline */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                  <HiOutlineCalendarDays className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Deadline
                  </p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    {formatDate(post.deadline)}
                    {isUrgent && (
                      <span className="px-2 py-0.5 text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full flex items-center gap-1">
                        <FiClock className="w-3 h-3" /> Urgent
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Days Remaining */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <FiCalendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Days Left
                  </p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {daysRemaining} days
                  </p>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-3">
                <FiTag className="w-5 h-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Required Skills
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {post.skills?.split(",").map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm border border-gray-200 dark:border-gray-600"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Client Info */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Client Information
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-lg font-semibold">
                  {post.clientName?.[0] || "C"}
                </div>
                <div>
                  <p className="text-md font-medium text-gray-900 dark:text-white">
                    {post.clientName}
                  </p>
                  <p className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                    <FiMail className="w-4 h-4" />
                    {post.clientEmail}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-10 flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Posted on {formatDate(post.postedDate)}</span>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
