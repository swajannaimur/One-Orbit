"use client";

import { useState, useRef, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { useSession } from "next-auth/react";
import { useAbly, useCurrentUser } from "@/lib/AblyProvider";
import { MdOutlineSend } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";

export default function ChatPage() {
  const ably = useAbly();
  const { clientId, setClientId, usersList, setUsersList, onlineUsers } =
    useCurrentUser();
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({});
  const scrollRef = useRef(null);
  const { data: session } = useSession();
  const [addedFriend, setAddedFriend] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

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

  // Ably subscription for selected chat
  useEffect(() => {
    if (!ably || !clientId || !selectedFriend) return;

    const [a, b] = [String(clientId), String(selectedFriend?._id)].sort();
    const channelName = `private:${a}:${b}`;
    const channel = ably.channels.get(channelName);

    // Handle new messages
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

    // Handle typing indicator
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

    // Subscribe to message + typing
    channel.subscribe("message", messageHandler);
    channel.subscribe("typing", typingHandler);

    // Enter presence
    try {
      if (clientId) {
        channel.presence.enter({ clientId, status: "online" });
      }
    } catch (e) {
      console.log(e);
    }

    // Load old messages
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

    // Cleanup
    return () => {
      channel.unsubscribe("message", messageHandler);
      channel.unsubscribe("typing", typingHandler);
      try {
        channel.presence.leave();
      } catch (e) { }
    };
  }, [ably, clientId, selectedFriend]);

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
  }, [selectedFriend, messages, isTyping]);

  // ✅ Send message
  const sendMessage = async (e) => {
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

  // Handle typing publish
  const handleTyping = (isTyping) => {
    if (!ably || !selectedFriend) return;
    const [a, b] = [String(clientId), String(selectedFriend?._id)].sort();
    const channelName = `private:${a}:${b}`;
    const channel = ably.channels.get(channelName);
    channel.publish("typing", { senderId: clientId, isTyping });
  };

  return (
    <>
      {usersList.length === 0 ? (
        <div className="w-full h-screen flex items-center justify-center">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : (
        <div className="flex h-[calc(100vh-5rem)] max-w-7xl mx-auto mt-24 bg-base-200 dark-bg overflow-hidden">
          <div className={`h-full ${sidebarOpen ? "block" : "hidden"} md:block overflow-y-auto `}>
            <Sidebar
              friendsList={friendsList}
              contactsList={contactsList}
              selectedFriend={selectedFriend}
              setSelectedFriend={setSelectedFriend}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              onlineUsers={onlineUsers}
            />
          </div>

          {selectedFriend === null ? (
            <div className="flex items-center mx-auto">
              <h5 className="text-3xl text-black/40 dark:text-white">No User Selected</h5>
            </div>
          ) : (
            <div className="flex-1 flex flex-col ">
              {/* Header */}
              <div className="p-4 border-b border-base-300 bg-base-100 dark-bg dark:text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      {selectedFriend?.image ? (
                        <Image
                          src={selectedFriend.image}
                          alt={selectedFriend.name}
                          fill
                          className="object-cover rounded-full"
                          sizes="40px"
                        />
                      ) : (
                        <Image
                          src={`https://api.dicebear.com/9.x/initials/svg?seed=${selectedFriend?.name}`}
                          alt={selectedFriend?.name}
                          fill
                          className="object-cover rounded-full"
                          sizes="40px"
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <h2 className="font-semibold">{selectedFriend?.name}</h2>
                    <p
                      className={`text-sm ${onlineUsers.includes(selectedFriend?._id)
                          ? "text-green-500"
                          : "text-gray-400"
                        }`}
                    >
                      {onlineUsers.includes(selectedFriend?._id)
                        ? "Online"
                        : "Offline"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="md:hidden"
                >
                  <RxCross2 size={30} />
                </button>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
              >
                {(messages[String(selectedFriend?._id)] || []).map(
                  (msg, index) => (
                    <div
                      key={index}
                      className={`chat ${msg.senderId === clientId ? "chat-end" : "chat-start"
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
                        className={`chat-bubble ${msg.senderId === clientId ? "bg-blue-300" : ""
                          }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  )
                )}

                {/* Typing Indicator */}
                {isTyping && (
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
              </div>

              {/* Input */}
              <form
                onSubmit={sendMessage}
                className="p-4 border-t border-base-300 bg-base-100 dark-bg flex items-center gap-2"
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    handleTyping(true);
                    clearTimeout(typingTimeoutRef.current);
                    typingTimeoutRef.current = setTimeout(
                      () => handleTyping(false),
                      1000
                    );
                  }}
                  placeholder={`Message ${selectedFriend?.name}...`}
                  className="input input-bordered flex-1 rounded-full"
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
    </>
  );
}
