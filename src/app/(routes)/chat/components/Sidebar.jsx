"use client";
import React, { useState } from "react";

export default function Sidebar({usersList, userId, selectedFriend, setSelectedFriend}) {
  const [ category, setCategory ] = useState("friends");

  // Filter out the current user from the list
  const filteredUsers = usersList.filter((user) => user._id !== userId);


  return (
    <aside className="w-72 bg-base-300 border-r border-base-200">
      <div className="flex">
        <button
          onClick={() => setCategory("friends")}
          className={`btn cursor-pointer w-1/2 ${
            category === "friends"
              ? "text-black font-bold"
              : "font-normal text-black/60"
          }`}
        >
          Friends
        </button>
        <button
          onClick={() => setCategory("contact")}
          className={`btn cursor-pointer w-1/2 ${
            category === "contact"
              ? "text-black font-bold"
              : "font-normal text-black/60"
          }`}
        >
          Contact
        </button>
      </div>
      <div className="flex-1 h-[calc(100vh-7.5rem)] overflow-y-auto">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            onClick={() => setSelectedFriend(user)}
            className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-base-200 ${
              selectedFriend?._id === user._id ? "bg-base-200" : ""
            }`}
          >
            <div className="avatar">
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
            <span className="font-medium">{user.name}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
