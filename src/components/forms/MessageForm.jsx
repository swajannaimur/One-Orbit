"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function MessageForm({ developerId, developerEmail }) {
  const [message, setMessage] = useState("");
  const [ loading, setLoading ] = useState(false);
  const {data: session} = useSession();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!message) {
      Swal.fire("Error", "Please write a message", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: session?.user?.id,
          receiverId: developerId,
          text: message,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire("Sent", "Your message was sent successfully", "success");
        setMessage("");
        await fetch("/api/add-friend", {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify({
            senderId: session?.user?.id,
            receiverId: developerId,
          }),
        });
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
        <textarea
          className="textarea textarea-bordered w-full"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="flex justify-end">
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
