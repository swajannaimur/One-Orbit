"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FiCalendar,
  FiDollarSign,
  FiUser,
  FiMail,
  FiClock,
  FiTag,
  FiArrowRight,
  FiSearch,
  FiFilter,
  FiTrendingUp,
} from "react-icons/fi";
import {
  HiOutlineComputerDesktop,
  HiOutlineCurrencyDollar,
  HiOutlineCalendarDays,
} from "react-icons/hi2";

export default function AllProjects() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, []);

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate days remaining until deadline
  const getDaysRemaining = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Get budget in formatted string
  const formatBudget = (budget) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(budget);
  };

  // Filter posts based on search and category
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.skills?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "all" || post.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = [
    "all",
    ...new Set(posts.map((post) => post.category).filter(Boolean)),
  ];

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800 mb-6">
            <FiTrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Active Projects
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-blue-900 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">
              Discover Amazing
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Browse through our curated collection of projects and find the
            perfect opportunity for your skills.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Search Bar */}
            <div className="lg:col-span-2">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects by name, category, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <FiFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 appearance-none text-gray-900 dark:text-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => {
              const daysRemaining = getDaysRemaining(post.deadline);
              const isUrgent = daysRemaining < 7;

              return (
                <div
                  key={post._id}
                  className="group bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:scale-105 overflow-hidden"
                >
                  {/* Project Header with Status */}
                  <div className="relative">
                    <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                    <div className="p-6">
                      {/* Project Title and Category */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-2">
                            {post.projectName}
                          </h3>
                          <div className="flex items-center gap-2">
                            <HiOutlineComputerDesktop className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                              {post.category}
                            </span>
                          </div>
                        </div>

                        {/* Urgent Badge */}
                        {isUrgent && (
                          <div className="flex-shrink-0">
                            <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-medium rounded-full flex items-center gap-1">
                              <FiClock className="w-3 h-3" />
                              Urgent
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Project Summary */}
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 line-clamp-3">
                        {post.summary}
                      </p>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="px-6 pb-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                          <HiOutlineCurrencyDollar className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Budget
                          </div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {formatBudget(post.budget)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                          <HiOutlineCalendarDays className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Deadline
                          </div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {daysRemaining}d left
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <FiTag className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          Required Skills
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {post.skills?.split(",").map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full border border-gray-200 dark:border-gray-600"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Client Info */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            {post.clientName?.[0] || "C"}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {post.clientName}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                              <FiMail className="w-3 h-3" />
                              {post.clientEmail}
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Posted Date */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <FiCalendar className="w-3 h-3" />
                        Posted {formatDate(post.postedDate)}
                      </div>
                      
                      <div>
                        <Link href={`projects/${post._id}`}><button className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all duration-300 group">
                          Details
                          <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </button></Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            /* Empty State */
            <div className="col-span-full text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <FiSearch className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No projects found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {searchTerm || filterCategory !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "There are no projects available at the moment."}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        {filteredPosts.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Showing {filteredPosts.length} of {posts.length} projects
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
