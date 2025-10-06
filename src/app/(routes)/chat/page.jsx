"use client";

import { useState, useRef, useEffect } from "react";
import Sidebar from "./components/sidebar"

export default function ChatPage() {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState({
    Aisha: [
      { sender: "bot", text: "Hi! How are you?" },
      { sender: "user", text: "Hey Aisha!" },
    ],
    Zain: [{ sender: "bot", text: "Yo! Ready for the match?" }],
    Mia: [],
    Noah: [],
    Sophia: [],
  });

  const [newMsg, setNewMsg] = useState("");
  const scrollRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;

    setMessages((prev) => ({
      ...prev,
      [selectedFriend]: [...prev[selectedFriend], { sender: "user", text: newMsg }],
    }));

    setNewMsg("");
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] bg-base-200 mt-20">
      {/* Sidebar */}
      <Sidebar selectedFriend={selectedFriend} setSelectedFriend={setSelectedFriend} />

      {/* Chat Area */}
      {selectedFriend === null ? (
        <div className="w-full flex items-center justify-center">
          <h5 className="text-3xl text-black/40">No User Selected</h5>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-base-300 bg-base-100 flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img
                  src={`https://api.dicebear.com/9.x/initials/svg?seed=${selectedFriend}`}
                  alt={selectedFriend}
                />
              </div>
            </div>
            <h2 className="font-semibold">{selectedFriend}</h2>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
          >
            {messages[selectedFriend]?.map((msg, index) => (
              <div
                key={index}
                className={`chat ${
                  msg.sender === "user" ? "chat-end" : "chat-start"
                }`}
              >
                <div className="chat-bubble">{msg.text}</div>
              </div>
            ))}
            <div />
          </div>

          {/* input */}
          <form
            onSubmit={sendMessage}
            className="p-4 border-t border-base-300 bg-base-100 flex gap-2"
          >
            <input
              type="text"
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder={`Message ${selectedFriend}...`}
              className="input input-bordered flex-1"
            />
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
