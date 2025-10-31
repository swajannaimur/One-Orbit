"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import CreateGroupModal from "./CreateGroupModal";

export default function Sidebar({
  friendsList,
  contactsList,
  selectedFriend,
  setSelectedFriend,
  sidebarOpen,
  setSidebarOpen,
  onlineUsers,
  groups,
  setGroups,
  selectedGroup,
  setSelectedGroup,
}) {
  const [category, setCategory] = useState(
    friendsList.length === 0 ? "contact" : "friends"
  );
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  const handleCreateGroup = async (groupData) => {
    try {
      const response = await fetch("/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(groupData),
      });

      if (response.ok) {
        const newGroup = await response.json();
        setGroups((prev) => [newGroup, ...prev]);
        setSelectedGroup(newGroup);
        setSelectedFriend(null);
      } else {
        const errorData = await response.json();
        console.error("Failed to create group:", errorData);
        throw new Error(errorData.error || "Failed to create group");
      }
    } catch (error) {
      console.error("Failed to create group:", error);
      throw error;
    }
  };

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
    setSelectedFriend(null);
    setSidebarOpen(false);
  };

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
    setSelectedGroup(null);
    setSidebarOpen(false);
  };

  return (
    <>
      <aside
        className={`md:w-72 w-full h-190 md:h-auto bg-white dark:bg-violet-500/20 dark:text-white rounded-2xl border-base-200 md:static z-50 absolute ${
          sidebarOpen ? "left-0 bottom-0" : "-left-195"
        }`}
      >
        <div className="flex border-b border-violet-500/10 dark:border-violet-900">
          <button
            onClick={() => setCategory("friends")}
            className={`py-3 cursor-pointer w-1/3 ${
              category === "friends"
                ? "text-purple-600 font-bold border-b-2 border-purple-600 dark:text-white"
                : "font-normal text-black/60 dark:text-white/70"
            }`}
          >
            Friends
          </button>
          <button
            onClick={() => setCategory("contact")}
            className={`py-3 cursor-pointer w-1/3 ${
              category === "contact"
                ? "text-purple-600 font-bold border-b-2 border-purple-600 dark:text-white"
                : "font-normal text-black/60 dark:text-white/70"
            }`}
          >
            Contact
          </button>
          <button
            onClick={() => setCategory("groups")}
            className={`py-3 cursor-pointer w-1/3 ${
              category === "groups"
                ? "text-purple-600 font-bold border-b-2 border-purple-600 dark:text-white"
                : "font-normal text-black/60 dark:text-white/70"
            }`}
          >
            Groups
          </button>
        </div>

        <div className="h-[calc(100vh-11.7rem)] overflow-y-auto mt-3 px-2">
          {category === "friends" && (
            <>
              {friendsList.map((user) => (
                <div
                  key={user._id}
                  onClick={() => handleSelectFriend(user)}
                  className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-violet-100 border-2 border-violet-500/10 dark:border-violet-900 dark:hover:bg-violet-100/10 rounded-2xl mb-3 ${
                    selectedFriend?._id === user._id
                      ? "bg-violet-100 dark:bg-violet-100/10"
                      : ""
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
                  <div>
                    <span className="font-semibold text-lg">{user.name}</span>
                    <p
                      className={`text-sm ${
                        onlineUsers.includes(String(user._id))
                          ? "text-success"
                          : "text-gray-400"
                      }`}
                    >
                      {onlineUsers.includes(String(user._id))
                        ? "Online"
                        : "Offline"}
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}

          {category === "contact" && (
            <>
              {contactsList.map((user) => (
                <div
                  key={user._id}
                  onClick={() => handleSelectFriend(user)}
                  className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-violet-100 border border-gray-200 dark:border-violet-900 dark:hover:bg-violet-100/10 rounded-2xl mb-3 ${
                    selectedFriend?._id === user._id
                      ? "bg-violet-100 dark:bg-violet-100/10"
                      : ""
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
            </>
          )}

          {category === "groups" && (
            <>
              {/* Create Group Button */}
              <div className="mb-3">
                <button
                  onClick={() => setShowCreateGroupModal(true)}
                  className="btn btn-linear border-0 shadow-none font-light btn-sm w-full flex items-center gap-2"
                >
                  <FaPlus />
                  Create Group
                </button>
              </div>

              {/* Groups List */}
              {groups.map((group) => (
                <div
                  key={group._id}
                  onClick={() => handleSelectGroup(group)}
                  className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-violet-100 border border-gray-200 dark:border-violet-900 dark:hover:bg-violet-100/10 rounded-2xl mb-3 ${
                    selectedGroup?._id === group._id
                      ? "bg-violet-100 dark:bg-violet-100/10"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-neutral text-neutral-content rounded-full w-10">
                        <span className="text-xs">
                          <img
                            src={`https://api.dicebear.com/9.x/initials/svg?seed=${group.name}`}
                            alt={group.name}
                          />
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium block">{group.name}</span>
                      <span className="text-xs text-gray-500">
                        {group.members.length} members
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </aside>

      <CreateGroupModal
        isOpen={showCreateGroupModal}
        onClose={() => setShowCreateGroupModal(false)}
        onCreateGroup={handleCreateGroup}
      />
    </>
  );
}