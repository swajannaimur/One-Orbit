"use client";

import { useState, useRef, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import AddMemberModal from "./components/AddMemberModal";
import { useSession } from "next-auth/react";
import { useAbly, useCurrentUser } from "@/lib/AblyProvider";
import { MdOutlineSend } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FaUserPlus } from "react-icons/fa";
import Image from "next/image";

export default function ChatPage() {
  const ably = useAbly();
  const { clientId, setClientId, usersList, setUsersList, onlineUsers } =
    useCurrentUser();
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({});
  const [groupMessages, setGroupMessages] = useState({});
  const scrollRef = useRef(null);
  const { data: session } = useSession();
  const [addedFriend, setAddedFriend] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [groupTyping, setGroupTyping] = useState({}); // Object to track typing users per group
  const [groups, setGroups] = useState([]);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const typingTimeoutRef = useRef(null);
  const groupTypingTimeoutsRef = useRef({}); // Separate timeouts for each group

  // Set clientId from NextAuth session
  useEffect(() => {
    if (session?.user?.id) {
      setClientId(session.user.id);
    }
  }, [session, setClientId]);

  const currentUser = usersList?.filter((user) => user._id === clientId);
  const friendsList = usersList.filter((user) =>
    currentUser[0]?.friends?.includes(user._id)
  );
  const contactsList = usersList.filter(
    (user) =>
      !currentUser[0]?.friends?.includes(user._id) && user._id !== clientId
  );

  // Fetch user's groups
  useEffect(() => {
    const fetchGroups = async () => {
      if (!clientId) return;

      try {
        const res = await fetch(`/api/groups?userId=${clientId}`);
        const groupsData = await res.json();
        setGroups(groupsData);
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      }
    };

    fetchGroups();
  }, [clientId]);

  // Ably subscription for private chat
  useEffect(() => {
    if (!ably || !clientId || !selectedFriend || selectedGroup) return;

    const [a, b] = [String(clientId), String(selectedFriend?._id)].sort();
    const channelName = `private:${a}:${b}`;
    const channel = ably.channels.get(channelName);

    const messageHandler = (msg) => {
      const incoming = msg.data;
      setMessages((prev) => {
        const updated = { ...prev };
        const friendId =
          incoming.senderId === clientId
            ? incoming.receiverId
            : incoming.senderId;
        const key = String(friendId);
        updated[key] = [...(updated[key] || []), incoming];
        return updated;
      });
    };

    const typingHandler = (msg) => {
      const { senderId, isTyping } = msg.data;
      if (senderId !== clientId) {
        setIsTyping(isTyping);
        clearTimeout(typingTimeoutRef.current);
        if (isTyping) {
          typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
          }, 2000);
        }
      }
    };

    channel.subscribe("message", messageHandler);
    channel.subscribe("typing", typingHandler);

    try {
      if (clientId) {
        channel.presence.enter({ clientId, status: "online" });
      }
    } catch (e) {
      console.log(e);
    }

    const fetchInitialMessages = async () => {
      try {
        const res = await fetch(
          `/api/messages?userId=${clientId}&friendId=${selectedFriend?._id}`
        );
        const fetchedMessages = await res.json();
        setMessages((prev) => ({
          ...prev,
          [String(selectedFriend?._id)]: fetchedMessages,
        }));
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };
    fetchInitialMessages();

    return () => {
      channel.unsubscribe("message", messageHandler);
      channel.unsubscribe("typing", typingHandler);
      try {
        channel.presence.leave();
      } catch (e) {}
    };
  }, [ably, clientId, selectedFriend, selectedGroup]);

  // Ably subscription for group chat
  useEffect(() => {
    if (!ably || !clientId || !selectedGroup || selectedFriend) return;

    const channelName = `group:${selectedGroup._id}`;
    const channel = ably.channels.get(channelName);

    const messageHandler = (msg) => {
      const incoming = msg.data;
      setGroupMessages((prev) => {
        const updated = { ...prev };
        const groupId = String(incoming.groupId);
        updated[groupId] = [...(updated[groupId] || []), incoming];
        return updated;
      });
    };

    // Group typing handler
    const typingHandler = (msg) => {
      const { senderId, isTyping, senderName } = msg.data;
      if (senderId !== clientId) {
        setGroupTyping((prev) => {
          const updated = { ...prev };
          const groupId = String(selectedGroup._id);

          if (isTyping) {
            // Add user to typing list
            if (!updated[groupId]) {
              updated[groupId] = [];
            }
            if (!updated[groupId].includes(senderId)) {
              updated[groupId] = [...updated[groupId], senderId];
            }
          } else {
            // Remove user from typing list
            if (updated[groupId]) {
              updated[groupId] = updated[groupId].filter(
                (id) => id !== senderId
              );
            }
          }

          return updated;
        });

        // Clear existing timeout for this user
        const timeoutKey = `${selectedGroup._id}-${senderId}`;
        if (groupTypingTimeoutsRef.current[timeoutKey]) {
          clearTimeout(groupTypingTimeoutsRef.current[timeoutKey]);
        }

        // Set new timeout to remove typing indicator
        if (isTyping) {
          groupTypingTimeoutsRef.current[timeoutKey] = setTimeout(() => {
            setGroupTyping((prev) => {
              const updated = { ...prev };
              const groupId = String(selectedGroup._id);
              if (updated[groupId]) {
                updated[groupId] = updated[groupId].filter(
                  (id) => id !== senderId
                );
              }
              return updated;
            });
          }, 2000);
        }
      }
    };

    channel.subscribe("message", messageHandler);
    channel.subscribe("typing", typingHandler);

    try {
      if (clientId) {
        channel.presence.enter({ clientId, status: "online" });
      }
    } catch (e) {
      console.log(e);
    }

    const fetchInitialGroupMessages = async () => {
      try {
        const res = await fetch(`/api/messages?groupId=${selectedGroup._id}`);
        const fetchedMessages = await res.json();
        setGroupMessages((prev) => ({
          ...prev,
          [String(selectedGroup._id)]: fetchedMessages,
        }));
      } catch (error) {
        console.error("Failed to fetch group messages:", error);
      }
    };
    fetchInitialGroupMessages();

    return () => {
      channel.unsubscribe("message", messageHandler);
      channel.unsubscribe("typing", typingHandler);
      try {
        channel.presence.leave();
      } catch (e) {}
    };
  }, [ably, clientId, selectedGroup, selectedFriend]);

  // ✅ Fetch list of users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const usersData = await res.json();
        setUsersList(usersData);
      } catch (error) {
        console.log("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, [addedFriend]);

  // ✅ Autoscroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [
    selectedFriend,
    selectedGroup,
    messages,
    groupMessages,
    isTyping,
    groupTyping,
  ]);

  // ✅ Send private message
  const sendPrivateMessage = async (e) => {
    e.preventDefault();
    if (!clientId || !message.trim() || !selectedFriend?._id) return;

    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: clientId,
          receiverId: selectedFriend?._id,
          text: message,
        }),
      });

      if (!currentUser[0]?.friends?.includes(selectedFriend?._id)) {
        await fetch("/api/add-friend", {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify({
            senderId: clientId,
            receiverId: selectedFriend?._id,
          }),
        });
        setAddedFriend(!addedFriend);
      }
    } catch (err) {
      console.error("Failed to send message", err);
    } finally {
      setMessage("");
    }
  };

  // ✅ Send group message
  const sendGroupMessage = async (e) => {
    e.preventDefault();
    if (!clientId || !message.trim() || !selectedGroup?._id) return;

    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: clientId,
          groupId: selectedGroup._id,
          text: message,
        }),
      });
    } catch (err) {
      console.error("Failed to send group message", err);
    } finally {
      setMessage("");
    }
  };

  // Handle typing publish for private chat
  const handlePrivateTyping = (isTyping) => {
    if (!ably || !selectedFriend || selectedGroup) return;
    const [a, b] = [String(clientId), String(selectedFriend?._id)].sort();
    const channelName = `private:${a}:${b}`;
    const channel = ably.channels.get(channelName);
    channel.publish("typing", { senderId: clientId, isTyping });
  };

  // Handle typing publish for group chat
  const handleGroupTyping = (isTyping) => {
    if (!ably || !selectedGroup || selectedFriend) return;
    const channelName = `group:${selectedGroup._id}`;
    const channel = ably.channels.get(channelName);
    const currentUserData = usersList.find((user) => user._id === clientId);
    channel.publish("typing", {
      senderId: clientId,
      senderName: currentUserData?.name || "User",
      isTyping,
    });
  };

  // Handle input change for both private and group chats
  const handleInputChange = (e) => {
    setMessage(e.target.value);

    if (selectedFriend) {
      handlePrivateTyping(true);
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(
        () => handlePrivateTyping(false),
        1000
      );
    } else if (selectedGroup) {
      handleGroupTyping(true);

      // Clear existing timeout for current user in this group
      const timeoutKey = `${selectedGroup._id}-${clientId}`;
      if (groupTypingTimeoutsRef.current[timeoutKey]) {
        clearTimeout(groupTypingTimeoutsRef.current[timeoutKey]);
      }

      // Set new timeout to stop typing indicator
      groupTypingTimeoutsRef.current[timeoutKey] = setTimeout(
        () => handleGroupTyping(false),
        1000
      );
    }
  };

  // Handle add member to group
  const handleAddMember = async (groupId, userId) => {
    try {
      const response = await fetch(`/api/groups/${groupId}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        // Refresh groups to get updated member list
        const res = await fetch(`/api/groups?userId=${clientId}`);
        const groupsData = await res.json();
        setGroups(groupsData);

        // Update selected group if it's the current one
        if (selectedGroup?._id === groupId) {
          setSelectedGroup(groupsData.find((g) => g._id === groupId));
        }
      }
    } catch (error) {
      console.error("Failed to add member:", error);
      throw error;
    }
  };

  const getSenderName = (senderId) => {
    const user = usersList.find((u) => u._id === senderId);
    return user ? user.name : "Unknown User";
  };

  const getTypingUsersText = (group) => {
    if (
      !group ||
      !groupTyping[group._id] ||
      groupTyping[group._id].length === 0
    ) {
      return null;
    }

    const typingUserIds = groupTyping[group._id];
    const typingUsers = typingUserIds.map((id) => getSenderName(id));

    if (typingUsers.length === 1) {
      return `${typingUsers[0]}`;
    } else if (typingUsers.length === 2) {
      return `${typingUsers[0]} and ${typingUsers[1]} are typing...`;
    } else {
      return `${typingUsers.slice(0, -1).join(", ")}, and ${
        typingUsers[typingUsers.length - 1]
      } are typing...`;
    }
  };

  const isGroupAdmin = selectedGroup?.createdBy === clientId;

  const typingUsersText = selectedGroup
    ? getTypingUsersText(selectedGroup)
    : null;

  return (
    <>    
      {usersList.length === 0 ? (
        <div className="w-full h-screen flex items-center justify-center">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : (
        <div
          className={`flex h-[calc(100vh-6rem)] gap-3 max-w-7xl mx-auto mt-24 bg-violet-100 dark:bg-violet-500/10 rounded-2xl overflow-hidden p-3`}
        >
          <div
            className={`h-full ${
              sidebarOpen ? "block" : "hidden"
            } md:block overflow-y-auto`}
          >
            <Sidebar
              friendsList={friendsList}
              contactsList={contactsList}
              selectedFriend={selectedFriend}
              setSelectedFriend={setSelectedFriend}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              onlineUsers={onlineUsers}
              groups={groups}
              setGroups={setGroups}
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
            />
          </div>

          {selectedFriend === null && selectedGroup === null ? (
            <div className="flex items-center mx-auto">
              <h5 className="text-3xl text-black/40 dark:text-white">
                No Chat Selected
              </h5>
            </div>
          ) : (
            <div className="flex-1 flex flex-col rounded-2xl bg-white dark:bg-violet-500/20">
              {/* Header */}
              <div className="p-4 border-b border-violet-500/10 dark:border-violet-900 dark:text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      {selectedFriend ? (
                        selectedFriend.image ? (
                          <Image
                            src={selectedFriend.image}
                            alt={selectedFriend.name}
                            fill
                            className="object-cover rounded-full"
                            sizes="40px"
                          />
                        ) : (
                          <img
                            src={`https://api.dicebear.com/9.x/initials/svg?seed=${selectedFriend?.name}`}
                            alt={selectedFriend?.name}
                            fill
                            className="object-cover rounded-full"
                            sizes="40px"
                          />
                        )
                      ) : selectedGroup ? (
                        <div className="bg-neutral text-neutral-content rounded-full w-10 h-10 flex items-center justify-center">
                          <span className="text-xs">
                            <img
                              src={`https://api.dicebear.com/9.x/initials/svg?seed=${selectedGroup.name}`}
                              alt={selectedGroup.name}
                            />
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <h2 className="font-semibold">
                      {selectedFriend?.name || selectedGroup?.name}
                    </h2>
                    <p className="text-sm text-gray-400">
                      {selectedFriend
                        ? onlineUsers.includes(selectedFriend?._id)
                          ? <span className="text-success">Online</span>
                          : "Offline"
                        : `${selectedGroup?.members.length} members`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {selectedGroup && isGroupAdmin && (
                    <button
                      onClick={() => setShowAddMemberModal(true)}
                      className="btn btn-linear px-2 btn-sm border-0 shadow-none"
                      title="Add Member"
                    >
                      <FaUserPlus size={20} />
                    </button>
                  )}
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="md:hidden"
                  >
                    <RxCross2 size={30} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
              >
                {selectedFriend
                  ? // Private messages
                    (messages[String(selectedFriend?._id)] || []).map(
                      (msg, index) => (
                        <div
                          key={index}
                          className={`chat ${
                            msg.senderId === clientId
                              ? "chat-end"
                              : "chat-start"
                          }`}
                        >
                          {msg.senderId !== clientId && (
                            <div className="chat-image avatar">
                              <div className="w-10 rounded-full relative h-10">
                                {selectedFriend?.image ? (
                                  <Image
                                    src={selectedFriend.image}
                                    alt={selectedFriend.name}
                                    fill
                                    className="object-cover rounded-full"
                                  />
                                ) : (
                                  <Image
                                    src={`https://api.dicebear.com/9.x/initials/svg?seed=${selectedFriend?.name}`}
                                    alt={selectedFriend?.name}
                                    fill
                                    className="object-cover rounded-full"
                                  />
                                )}
                              </div>
                            </div>
                          )}

                          <div
                            className={`chat-bubble ${
                              msg.senderId === clientId
                                ? "bg-purple-200"
                                : "bg-indigo-200"
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      )
                    )
                  : selectedGroup
                  ? // Group messages
                    (groupMessages[String(selectedGroup?._id)] || []).map(
                      (msg, index) => (
                        <div
                          key={index}
                          className={`chat ${
                            msg.senderId === clientId
                              ? "chat-end"
                              : "chat-start"
                          }`}
                        >
                          {msg.senderId !== clientId && (
                            <div className="chat-image avatar">
                              <div className="w-10 rounded-full relative h-10">
                                <img
                                  src={`https://api.dicebear.com/9.x/initials/svg?seed=${getSenderName(
                                    msg.senderId
                                  )}`}
                                  alt={getSenderName(msg.senderId)}
                                  fill
                                  className="object-cover rounded-full"
                                />
                              </div>
                            </div>
                          )}

                          <div
                            className={`chat-bubble ${
                              msg.senderId === clientId
                                ? "bg-purple-200"
                                : "bg-indigo-200"
                            }`}
                          >
                            <div className="flex flex-col">
                              {msg.senderId !== clientId && (
                                <span className="text-xs font-semibold opacity-70">
                                  {getSenderName(msg.senderId)}
                                </span>
                              )}
                              <span>{msg.text}</span>
                            </div>
                          </div>
                        </div>
                      )
                    )
                  : null}

                {/* Private Chat Typing Indicator */}
                {isTyping && selectedFriend && (
                  <div className="chat chat-start">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        {selectedFriend?.image ? (
                          <img
                            src={selectedFriend.image}
                            alt={selectedFriend.name}
                          />
                        ) : (
                          <img
                            src={`https://api.dicebear.com/9.x/initials/svg?seed=${selectedFriend?.name}`}
                            alt={selectedFriend?.name}
                          />
                        )}
                      </div>
                    </div>
                    <div className="chat-bubble">
                      <span className="loading loading-dots loading-lg"></span>
                    </div>
                  </div>
                )}

                {/* Group Chat Typing Indicator */}
                {typingUsersText && selectedGroup && (
                  <div className="chat chat-start">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <img
                          src={`https://api.dicebear.com/9.x/initials/svg?seed=${typingUsersText}`}
                          alt={typingUsersText}
                        />
                      </div>
                    </div>
                    <div className="chat-bubble bg-gray-200 text-gray-700">
                      <span className="italic">
                        {typingUsersText}{" "}
                        <span className="loading loading-dots loading-lg"></span>
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <form
                onSubmit={
                  selectedFriend ? sendPrivateMessage : sendGroupMessage
                }
                className="p-4 border-t border-violet-500/10 dark:border-violet-900 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={message}
                  onChange={handleInputChange}
                  placeholder={
                    selectedFriend
                      ? `Message ${selectedFriend?.name}...`
                      : `Message ${selectedGroup?.name}...`
                  }
                  className="input bg-violet-500/10 dark:bg-violet-950 border-violet-500/20 focus:outline-violet-500/50 dark:text-white flex-1 rounded-full"
                />
                <button
                  type="submit"
                  className="py-2 px-2.5 cursor-pointer btn-linear rounded-full"
                >
                  <MdOutlineSend size={30} />
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      <AddMemberModal
        isOpen={showAddMemberModal}
        onClose={() => setShowAddMemberModal(false)}
        group={selectedGroup}
        onAddMember={handleAddMember}
      />
    </>
  );
}