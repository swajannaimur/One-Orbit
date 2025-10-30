"use client";

import { useState, useEffect } from "react";
import { useCurrentUser } from "@/lib/AblyProvider";

export default function CreateGroupModal({ isOpen, onClose, onCreateGroup }) {
  const { clientId, usersList } = useCurrentUser();
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filter out current user from available users
  const availableUsers = usersList.filter((user) => user._id !== clientId);

  const handleMemberToggle = (userId) => {
    setSelectedMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!groupName.trim() || selectedMembers.length === 0) return;

    setLoading(true);
    try {
      await onCreateGroup({
        name: groupName,
        description,
        createdBy: clientId, // Add this line
        members: [clientId, ...selectedMembers], // Include creator as member
      });
      resetForm();
      onClose();
    } catch (error) {
      console.error("Failed to create group:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setGroupName("");
    setDescription("");
    setSelectedMembers([]);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Create New Group</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label mb-2">
              <span className="label-text">Group Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter group name"
              className="input bg-violet-500/10 dark:bg-violet-950 border-violet-500/20 focus:outline-violet-500/50 dark:text-white flex-1 rounded-full w-full"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Description (Optional)</span>
            </label>
            <textarea
              placeholder="Enter group description"
              className="textarea bg-violet-500/10 dark:bg-violet-950 border-violet-500/20 focus:outline-violet-500/50 dark:text-white flex-1 rounded-2xl w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Add Members</span>
            </label>
            <div className="max-h-64 overflow-y-auto border bg-violet-500/10 dark:bg-violet-950 border-violet-500/20  dark:text-white rounded-2xl pt-3 pl-3">
              {availableUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between p-4 bg-violet-200 hover:bg-violet-100 border-2 border-violet-500/10 dark:border-violet-900 dark:hover:bg-violet-100/10 rounded-2xl mb-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-8 rounded-full">
                        <img
                          src={
                            user.image ||
                            `https://api.dicebear.com/9.x/initials/svg?seed=${user.name}`
                          }
                          alt={user.name}
                        />
                      </div>
                    </div>
                    <span>{user.name}</span>
                  </div>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={selectedMembers.includes(user._id)}
                    onChange={() => handleMemberToggle(user._id)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-outline rounded-full border-2 border-indigo-200 hover:bg-indigo-200"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn rounded-full bg-indigo-200"
              disabled={
                loading || !groupName.trim() || selectedMembers.length === 0
              }
            >
              {loading ? "Creating..." : "Create Group"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
