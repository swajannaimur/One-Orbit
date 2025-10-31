"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaTrashAlt, FaUserPlus, FaEnvelope, FaUser, FaCrown, FaUserTie, FaClock, FaPaperPlane } from "react-icons/fa";

export default function InviteForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("member");
  const [message, setMessage] = useState("");
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchInvites();
  }, []);

  async function fetchInvites() {
    try {
      const res = await fetch("/api/users/invite");
      if (!res.ok) return;
      const data = await res.json();
      setInvites(data.invites || []);
    } catch (err) {
      console.error("fetch invites", err);
    }
  }

  async function sendInvite(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/users/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, role, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to send invite");

      Swal.fire({
        icon: "success",
        title: "Invite Sent Successfully!",
        text: `${name} has been invited to join your team`,
        timer: 2000,
        showConfirmButton: false,
        background: '#1f2937', // dark gray background
        color: '#f9fafb', // light text
        iconColor: '#4f46e5'
      });
      setEmail("");
      setName("");
      setMessage("");
      setRole("member");
      fetchInvites();
    } catch (err) {
      Swal.fire({ 
        icon: "error", 
        title: "Invitation Failed", 
        text: err.message || err,
        background: '#111827',
        color: '#fef2f2',
        iconColor: '#dc2626'
      });
    } finally {
      setLoading(false);
    }
  }

  async function deleteInvite(id, email) {
    const confirm = await Swal.fire({
      title: "Delete Invitation?",
      text: `This will cancel the invitation sent to ${email}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: '#1f2937',
      color: '#fefce8',
      iconColor: '#eab308'
    });

    if (!confirm.isConfirmed) return;

    try {
      setDeletingId(id);
      const res = await fetch(`/api/users/invite/${id}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Failed to delete invite");

      setInvites((prev) => prev.filter((i) => String(i._id) !== String(id)));

      Swal.fire({
        icon: "success",
        title: "Invitation Deleted",
        text: "The invitation has been successfully cancelled",
        timer: 1500,
        showConfirmButton: false,
        background: '#111827',
        color: '#d1fae5',
        iconColor: '#16a34a'
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Deletion Failed",
        text: err.message || err,
        background: '#111827',
        color: '#fef2f2',
        iconColor: '#dc2626'
      });
    } finally {
      setDeletingId(null);
    }
  }

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin": return <FaCrown className="text-purple-400 dark:text-purple-300" />;
      case "manager": return <FaUserTie className="text-blue-400 dark:text-blue-300" />;
      default: return <FaUser className="text-gray-500 dark:text-gray-400" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200", icon: FaClock },
      done: { color: "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200", icon: FaPaperPlane },
      canceled: { color: "bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200", icon: FaTrashAlt }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <IconComponent className="text-xs" />
        {status}
      </span>
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark-bg rounded-2xl shadow-xl p-8 border border-blue-100 dark:border-gray-700 transition-colors">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4">
          <FaUserPlus className="text-2xl text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Invite Team Members
        </h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-md mx-auto">
          Send invitations to collaborate and grow your team
        </p>
      </div>

      {/* Invitation Form */}
      <form onSubmit={sendInvite} className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Name Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <FaUser className="text-blue-500" />
              Full Name
            </label>
            <input
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark-bg dark:text-gray-200 transition-all"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
            />
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <FaEnvelope className="text-purple-500" />
              Email Address
            </label>
            <input
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 dark-bg dark:text-gray-200 transition-all"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Role Selection */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <FaUserTie className="text-blue-500" />
              Team Role
            </label>
            <select
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark-bg dark:text-gray-200 transition-all appearance-none"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="member">Team Member</option>
              <option value="admin">Team Leader</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 opacity-0">Send</label>
            <button
              className={`w-full rounded-xl px-6 py-3 font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg ${
                loading
                  ? "bg-gradient-to-r from-blue-400 to-purple-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending Invite...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <FaPaperPlane />
                  Send Invitation
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Optional Message */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <FaEnvelope className="text-gray-500" />
            Personal Message (Optional)
          </label>
          <textarea
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark-bg dark:text-gray-200 transition-all resize-none"
            placeholder="Add a personal message to your invitation..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="3"
          />
        </div>
      </form>

      {/* Pending Invites */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <FaClock className="text-yellow-500" />
              Pending Invitations
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {invites.length} invitation{invites.length !== 1 ? 's' : ''} awaiting response
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full text-sm font-medium">
            <FaEnvelope />
            {invites.length}
          </div>
        </div>

        {invites.length === 0 ? (
          <div className="text-center py-8">
            <FaEnvelope className="text-4xl text-gray-300 dark:text-gray-500 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-300 font-medium">No pending invitations</p>
            <p className="text-sm text-gray-400 dark:text-gray-400 mt-1">Send your first invite to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {invites.map((inv) => (
              <div
                key={inv._id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                    {inv.name?.charAt(0) || inv.inviteeEmail?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-100">{inv.name || 'No Name'}</h4>
                      {getStatusBadge(inv.status)}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{inv.inviteeEmail}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 flex-wrap">
                      <span className="flex items-center gap-1">
                        {getRoleIcon(inv.role)}
                        <span className="capitalize">{inv.role}</span>
                      </span>
                      <span>Expires {new Date(inv.expiresAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => deleteInvite(inv._id, inv.inviteeEmail)}
                  disabled={deletingId === inv._id}
                  className="mt-4 sm:mt-0 p-3 text-red-500 hover:text-white hover:bg-red-500 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                  title="Delete invitation"
                >
                  {deletingId === inv._id ? (
                    <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FaTrashAlt className="group-hover:scale-110 transition-transform" />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{invites.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Total Invites</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {invites.filter(inv => inv.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Pending</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {invites.filter(inv => inv.status === 'done').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Accepted</div>
        </div>
      </div>
    </div>
  );
}
