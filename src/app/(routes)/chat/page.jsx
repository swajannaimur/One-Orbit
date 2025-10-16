
"use client";

import { useState, useRef, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { useSession } from "next-auth/react";
import { useAbly, useCurrentUser } from "@/lib/AblyProvider";
import Ably from "ably";

export default function ChatPage() {
  const ably = useAbly();
  const { clientId, setClientId, usersList, setUsersList } = useCurrentUser();
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({}); // { [friendId]: [msgs] }
  const scrollRef = useRef(null);
  const { data: session } = useSession();

  // Set clientId from NextAuth session
  useEffect(() => {
    if (session?.user?.id) {
      setClientId(session.user.id);
    }
  }, [ session, setClientId ]);


  const currentUser = usersList.filter(user => user._id === clientId);

  const friendsList = usersList.filter((user) => currentUser[0]?.friends?.includes(user._id));
  const contactsList = usersList.filter((user) => !currentUser[ 0 ]?.friends?.includes(user._id) && user._id !== clientId);
  

  // Subscribe to Ably channel for a selected friend
  useEffect(() => {
    if (!ably || !clientId || !selectedFriend) return;

    // Channel name deterministic for a 1:1 chat
    const [a, b] = [String(clientId), String(selectedFriend._id)].sort();
    const channelName = `private:${a}:${b}`;

    // Create the realtime client instance (from the same ably object)
    // ably in provider is a Realtime instance already. However, the provider uses `Realtime({key})`
    // If ably is a Realtime instance, use ably.channels.get(...)
    const channel = ably.channels.get(channelName);

    // Subscribe to message events
    const messageHandler = (msg) => {
      const incoming = msg.data;
      // update messages state
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

    channel.subscribe("message", messageHandler);

    // Enter presence to announce online
    try {
      if(clientId){
        channel.presence.enter({ clientId, status: "online" });
      }
    } catch (e) {
      // presence.enter might fail if using insecure key or on serverless restrictions — ignore for dev
      console.log(e);
    }

    // Fetch initial history from our API
    const fetchInitialMessages = async () => {
      try {
        const res = await fetch(
          `/api/messages?userId=${clientId}&friendId=${selectedFriend._id}`
        );
        const fetchedMessages = await res.json();
        setMessages((prev) => ({...prev, [String(selectedFriend._id)]: fetchedMessages}));
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchInitialMessages();

    return () => {
      channel.unsubscribe("message", messageHandler);
      try {
        channel.presence.leave();
      } catch (e) {}
    };
  }, [ably, clientId, selectedFriend]);

  // Fetch list of users
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
  }, [setUsersList]);

  // Autoscroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [selectedFriend, messages]);

  // Send message — call server API to save & publish
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!clientId || !message.trim() || !selectedFriend?._id) return;

    // Save to DB and publish (server will publish to Ably)
    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: clientId,
          receiverId: selectedFriend._id,
          text: message,
        }),
      });

      if (!currentUser[0]?.friends?.includes(selectedFriend._id)) {
        await fetch("/api/add-friend", {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify({
            senderId: clientId,
            receiverId: selectedFriend._id,
          }),
        });
      }

    } catch (err) {
      console.error("Failed to send message", err);
    } finally {
      setMessage("");
    }
  };

  return (
    <>
      {usersList.length === 0 ? (
        <div className="w-full h-[100vh] flex items-center justify-center">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : (
        <div className="flex h-[calc(100vh-5rem)] bg-base-200 mt-20">
          <Sidebar
            friendsList={friendsList}
            contactsList={contactsList}
            selectedFriend={selectedFriend}
            setSelectedFriend={setSelectedFriend}
          ></Sidebar>

          {selectedFriend === null ? (
            <div className="flex items-center mx-auto">
              <h5 className="text-3xl text-black/40">No User Selected</h5>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b border-base-300 bg-base-100 flex items-center gap-3">
                <div className="avatar">
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
                <h2 className="font-semibold">{selectedFriend?.name}</h2>
              </div>

              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
              >
                {(messages[String(selectedFriend._id)] || []).map(
                  (msg, index) => (
                    <div
                      key={index}
                      className={`chat ${
                        msg.senderId === clientId ? "chat-end" : "chat-start"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {msg.senderId !== clientId && (
                          <div className="avatar">
                            <div className="w-5 rounded-full">
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
                        )}
                        <div
                          className={`chat-bubble ${
                            msg.senderId === clientId ? "bg-blue-300" : ""
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>

              <form
                onSubmit={sendMessage}
                className="p-4 border-t border-base-300 bg-base-100 flex gap-2"
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Message ${selectedFriend?.name}...`}
                  className="input input-bordered flex-1"
                />
                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
}
