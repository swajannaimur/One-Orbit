"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function InviteForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [message, setMessage] = useState("");
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(false);

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
        title: "Invite sent",
        timer: 1400,
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

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-3">Invite a teammate</h3>
      <form
        onSubmit={sendInvite}
        className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4"
      >
        <input
          className="md:col-span-1 border rounded px-3 py-2"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <select
          className="md:col-span-1 border rounded px-3 py-2"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>
        <button
          className="md:col-span-1 bg-indigo-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Invite"}
        </button>
        <textarea
          className="md:col-span-3 border rounded px-3 py-2 mt-2"
          placeholder="Optional message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>

      <h4 className="font-medium mb-2">Pending invites</h4>
      {invites.length === 0 ? (
        <p className="text-sm text-gray-500">No invites yet.</p>
      ) : (
        <ul className="space-y-2">
          {invites.map((inv) => (
            <li
              key={inv._id}
              className="border rounded px-3 py-2 flex justify-between items-center"
            >
              <div>
                <div className="text-sm font-medium">{inv.inviteeEmail}</div>
                <div className="text-xs text-gray-500">
                  {inv.status} • expires{" "}
                  {new Date(inv.expiresAt).toLocaleDateString()}
                </div>
              </div>
              <div className="text-sm text-gray-500">{inv.role}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
