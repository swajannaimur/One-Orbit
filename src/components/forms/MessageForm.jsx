"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function MessageForm({ developerId, developerEmail }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !message) {
      Swal.fire("Error", "Please fill all fields", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/developers/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          developerId,
          developerEmail,
          name,
          email,
          message,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire("Sent", "Your message was sent successfully", "success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        Swal.fire("Error", data?.error || "Failed to send message", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Network error", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm">Name</label>
        <input
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm">Email</label>
        <input
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm">Message</label>
        <textarea
          className="textarea textarea-bordered w-full"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div>
        <button
          type="submit"
          className="btn btn-primary bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 group"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}
