"use client";

import { useState, useEffect } from "react";
import { useCurrentUser } from "@/lib/AblyProvider";

export default function AddMemberModal({
  isOpen,
  onClose,
  group,
  onAddMember,
}) {
  const { clientId, usersList } = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [addingUserId, setAddingUserId] = useState(null); // Track which user is being added

  useEffect(() => {
    if (group && usersList.length > 0) {
      // Filter users who are not already members and not the current user
      const nonMembers = usersList.filter(
        (user) => !group.members.includes(user._id) && user._id !== clientId
      );
      setAvailableUsers(nonMembers);
    }
  }, [group, usersList, clientId]);

  const handleAddMember = async (userId) => {
    setAddingUserId(userId);
    setLoading(true);
    try {
      await onAddMember(group._id, userId);
      // Remove the user from available list after successful addition
      setAvailableUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Failed to add member:", error);
    } finally {
      setLoading(false);
      setAddingUserId(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Add Members to {group?.name}</h3>

        <div className="max-h-96 overflow-y-auto">
          {availableUsers.length === 0 ? (
            <p className="text-center text-gray-500 py-4">
              No users available to add
            </p>
          ) : (
            availableUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-4 bg-violet-200 hover:bg-violet-100 border-2 border-violet-500/10 dark:border-violet-900 dark:hover:bg-violet-100/10 rounded-2xl mb-3"
              >
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src={
                          user.image ||
                          `https://api.dicebear.com/9.x/initials/svg?seed=${user.name}`
                        }
                        alt={user.name}
                      />
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleAddMember(user._id)}
                  className="btn btn-sm text-violet-400 border-violet-300 hover:bg-violet-200 text-2xl"
                  disabled={loading && addingUserId === user._id}
                >
                  {loading && addingUserId === user._id ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    "+"
                  )}
                </button>
              </div>
            ))
          )}
        </div>

        <div className="modal-action">
          <button
            className="btn btn-outline rounded-full border-2 border-indigo-200 hover:bg-indigo-200"
            onClick={onClose}
            disabled={loading}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
