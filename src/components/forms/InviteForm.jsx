"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaTrashAlt, FaUserPlus } from "react-icons/fa";

export default function InviteForm() {
  const [email, setEmail] = useState("");
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
        body: JSON.stringify({ email, role, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to send invite");

      Swal.fire({
        icon: "success",
        title: "Invite sent!",
        timer: 1500,
        showConfirmButton: false,
      });
      setEmail("");
      setMessage("");
      fetchInvites();
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message || err });
    } finally {
      setLoading(false);
    }
  }

  async function deleteInvite(id) {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This invite will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      setDeletingId(id);
      const res = await fetch(`/api/users/invite/${id}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Failed to delete invite");

      // Optimistically update local list without refetch
      setInvites((prev) => prev.filter((i) => String(i._id) !== String(id)));

      Swal.fire({
        icon: "success",
        title: "Invite deleted",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || err,
      });
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl shadow-md p-6 border border-indigo-100">
      <h3 className="text-2xl font-bold bg-gradient-to-br from-indigo-700 to-indigo-500 bg-clip-text text-transparent mb-4 flex items-center gap-2">
        <FaUserPlus className="text-indigo-600" /> Invite a Teammate
      </h3>

      <form
        onSubmit={sendInvite}
        className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5"
      >
        <input
          className="md:col-span-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <select
          className="md:col-span-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="member">Member</option>
          <option value="admin">Team Leader</option>
        </select>
        <button
          className={`md:col-span-1 rounded-lg px-4 py-2 font-semibold text-white transition duration-300 ${
            loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Invite"}
        </button>
        <textarea
          className="md:col-span-3 border border-gray-300 rounded-lg px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Optional message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>

      <h4 className="font-medium text-gray-700 mb-3 border-b pb-2">
        Pending Invites
      </h4>
      {invites.length === 0 ? (
        <p className="text-sm text-gray-500 italic">No invites yet.</p>
      ) : (
        <ul className="space-y-3">
          {invites.map((inv) => (
            <li
              key={inv._id}
              className="flex justify-between items-center bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow transition"
            >
              <div>
                <div className="text-sm font-semibold text-gray-800">
                  {inv.inviteeEmail}
                </div>
                <div className="text-xs text-gray-500">
                  {inv.status} • expires{" "}
                  {new Date(inv.expiresAt).toLocaleDateString()}
                </div>
              </div>
              <div className="text-sm font-medium text-indigo-600">
                {inv.role}
              </div>
              <button
                onClick={() => deleteInvite(inv._id)}
                className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition"
                title="Delete invite"
              >
                <FaTrashAlt />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
