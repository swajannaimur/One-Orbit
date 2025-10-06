"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatPage() {
  const friendsList = ["Aisha", "Zain", "Mia", "Noah", "Sophia"];

  const [activeFriend, setActiveFriend] = useState(friendsList[0]);
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
      [activeFriend]: [...prev[activeFriend], { sender: "user", text: newMsg }],
    }));

    setNewMsg("");
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] bg-base-200 mt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-base-300 border-r border-base-200 flex flex-col">
        <h2 className="text-lg font-bold p-4 border-b border-base-200">
          Friends
        </h2>
        <div className="flex-1 overflow-y-auto">
          {friendsList.map((friend) => (
            <div
              key={friend}
              onClick={() => setActiveFriend(friend)}
              className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-base-200 ${
                activeFriend === friend ? "bg-base-200" : ""
              }`}
            >
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={`https://api.dicebear.com/9.x/initials/svg?seed=${friend}`}
                    alt={friend}
                  />
                </div>
              </div>
              <span className="font-medium">{friend}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-base-300 bg-base-100 flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img
                src={`https://api.dicebear.com/9.x/initials/svg?seed=${activeFriend}`}
                alt={activeFriend}
              />
            </div>
          </div>
          <h2 className="font-semibold">{activeFriend}</h2>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
          {messages[activeFriend]?.map((msg, index) => (
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
            placeholder={`Message ${activeFriend}...`}
            className="input input-bordered flex-1"
          />
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
