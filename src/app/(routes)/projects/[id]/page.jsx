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
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function ProjectDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession()


  // Inside your component
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBidButton = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const role = session?.user?.role;

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

  const handleConfirm = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const bidAmount = formData.get("myBid");

    const modalData = {
      projectId: id,
      projectName: post.projectName,
      category: post.category,
      budget: post.budget,
      clientName: post.clientName,
      clientEmail: post.clientEmail,
      bid: Number(bidAmount),
      developerEmail: session?.user?.email,
    };

    try {
      const res = await fetch("/api/bids", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modalData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Bid Placed Successfully");
        closeModal();
      } else {
        toast.error("Failed to place bid: " + data.error)
      }
    } catch (err) {
      toast.error("Something went wrong while submitting your bid.")
    }
  };


  return (
    <div className="min-h-screen mt-24 bg-linear-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-linear-to-r from-gray-900 to-blue-900 dark:from-white dark:to-blue-300 bg-clip-text text-transparent">
            {post.projectName}
          </h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800">
            <HiOutlineComputerDesktop className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">
              {post.category}
            </span>
          </div>

          {/* Bid Now button */}
          {role === "developer" && (
            <div className="mt-6">
              <button
                onClick={handleBidButton}
                className="px-6 py-3 btn-linear btn-hover text-white font-semibold rounded-xl shadow-md"
              >
                Bid Now
              </button>

              {/* Modal */}
              {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4">
                  <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden max-w-md w-full">

                    {/* linear Top Bar */}
                    <div className="h-2 bg-linear-to-r from-blue-500 to-purple-600"></div>

                    {/* Modal Content */}
                    <form onSubmit={handleConfirm}>
                      <div className="p-6">
                        {/* Header */}
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                          {post.projectName}
                        </h3>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800 mb-4">
                          <HiOutlineComputerDesktop className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-blue-700 dark:text-blue-300 font-medium">
                            {post.category}
                          </span>
                        </div>

                        {/* Budget & Deadline */}
                        <div className="flex items-center justify-between gap-6 mb-4 text-start">

                          {/* Budget */}
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                              <HiOutlineCurrencyDollar className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold dark:text-gray-400">Budget</p>
                              <p className="text-md  text-gray-900 dark:text-white">${post.budget}</p>
                            </div>
                          </div>

                          {/* Deadline */}
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                              <HiOutlineCalendarDays className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold dark:text-gray-400">Deadline</p>
                              <p className="text-md  text-gray-900 dark:text-white">
                                {formatDate(post.deadline)}
                              </p>
                            </div>
                          </div>
                        </div>


                        {/* Client Info */}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
                          <h4 className="text-lg text-start font-semibold text-gray-900 dark:text-white mb-2">
                            Client Information
                          </h4>
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-lg font-semibold">
                              {post.clientName?.[0] || "C"}
                            </div>
                            <div>
                              <p className="text-md text-start font-semibold text-gray-900 dark:text-white">
                                {post.clientName}
                              </p>
                              <p className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                                <FiMail className="w-4 h-4" />
                                {post.clientEmail}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Your Bid Field */}
                        <div className="mb-4 w-full">
                          <label className="block text-lg font-semibold dark:text-gray-300 mb-1">
                            Your Price
                          </label>
                          <input type="number"
                            name="myBid"
                            min="0"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your bid"
                          />
                        </div>

                        {/* Modal Buttons */}
                        <div className="flex justify-end gap-4 mt-4">
                          <button
                            onClick={closeModal}
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md">
                            Cancel
                          </button>

                          <button
                            type="submit"
                            className="px-4 py-2 btn-linear text-white rounded-md"
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* linear Top Bar */}
          <div className="h-2 bg-linear-to-r from-blue-500 to-purple-600"></div>

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
              <h3 className="text-lg text-start font-semibold text-gray-900 dark:text-white mb-4">
                Client Information
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-lg font-semibold">
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
    </div >
  );
}
