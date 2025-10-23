"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function Sidebar({
  friendsList,
  contactsList,
  selectedFriend,
  setSelectedFriend,
  sidebarOpen,
  setSidebarOpen,
  onlineUsers,
}) {
  const [category, setCategory] = useState(
    friendsList.length === 0 ? "contact" : "friends"
  );

  return (
    <aside
      className={`md:w-72 w-full bg-base-300 border-r border-base-200 md:static z-50 absolute ${
        sidebarOpen ? "left-0" : "-left-195"
      }`}
    >
      <div className="flex border-b border-black/10">
        <button
          onClick={() => setCategory("friends")}
          className={`py-3 cursor-pointer w-1/2 ${
            category === "friends"
              ? "text-purple-600 font-bold border-b-2 border-purple-600"
              : "font-normal text-black/60"
          }`}
        >
          Friends
        </button>
        <button
          onClick={() => setCategory("contact")}
          className={`py-3 cursor-pointer w-1/2 ${
            category === "contact"
              ? "text-purple-600 font-bold border-b-2 border-purple-600"
              : "font-normal text-black/60"
          }`}
        >
          Contact
        </button>
      </div>

      <div className="flex-1 h-[calc(100vh-7.5rem)] overflow-y-auto">
        {category === "friends"
          ? friendsList.map((user) => (
              <div
                key={user._id}
                onClick={() => {
                  setSelectedFriend(user);
                  setSidebarOpen(!sidebarOpen);
                }}
                className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-base-200 ${
                  selectedFriend?._id === user._id ? "bg-base-200" : ""
                }`}
              >
                <div className="relative w-10 h-10">
                  <div
                    className={`avatar ${
                      onlineUsers.includes(String(user._id))
                        ? "avatar-online"
                        : "avatar-offline"
                    }`}
                  >
                    <div className="w-10 rounded-full">
                      {user.image ? (
                        <img src={user.image} alt={user.name} />
                      ) : (
                        <img
                          src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.name}`}
                          alt={user.name}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <span className="font-medium">{user.name}</span>
              </div>
            ))
          : contactsList.map((user) => (
              <div
                key={user._id}
                onClick={() => {
                  setSelectedFriend(user);
                  setSidebarOpen(!sidebarOpen);
                }}
                className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-base-200 ${
                  selectedFriend?._id === user._id ? "bg-base-200" : ""
                }`}
              >
                <div className="relative w-10 h-10">
                  <div
                    className={`avatar ${
                      onlineUsers.includes(String(user._id))
                        ? "avatar-online"
                        : "avatar-offline"
                    }`}
                  >
                    <div className="w-10 rounded-full">
                      {user.image ? (
                        <img src={user.image} alt={user.name} />
                      ) : (
                        <img
                          src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.name}`}
                          alt={user.name}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <span className="font-medium">{user.name}</span>
              </div>
            ))}
      </div>
    </aside>
  );
}

