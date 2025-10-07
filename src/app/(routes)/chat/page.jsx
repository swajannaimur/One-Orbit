// "use client";

// import { useState, useRef, useEffect } from "react";
// import Sidebar from "./components/sidebar"

// export default function ChatPage() {
//   const [users, setUsers] = useState([])
//   const [selectedFriend, setSelectedFriend] = useState(null);
//   const [messages, setMessages] = useState({
//     Aisha: [
//       { sender: "bot", text: "Hi! How are you?" },
//       { sender: "user", text: "Hey Aisha!" },
//     ],
//     Zain: [{ sender: "bot", text: "Yo! Ready for the match?" }],
//     Mia: [],
//     Noah: [],
//     Sophia: [],
//   });


//   const [newMsg, setNewMsg] = useState("");
//   const scrollRef = useRef(null);


//   useEffect(()=>{
//       const fetchUsers = async()=>{
//         try {
//           const res = await fetch("/api/users");
//           const users = await res.json();
//           setUsers(users);
//         } catch (error) {
//           console.log(error);
//         }
//       }
//       fetchUsers()
//     }, [])


//   // Auto-scroll to bottom
//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTo({
//         top: scrollRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   }, [messages]);

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (!newMsg.trim()) return;

//     setMessages((prev) => ({
//       ...prev,
//       [selectedFriend]: [...prev[selectedFriend], { sender: "user", text: newMsg }],
//     }));

//     setNewMsg("");
//   };

//   return (
//     <div className="flex h-[calc(100vh-5rem)] bg-base-200 mt-20">
//       {/* Sidebar */}
//       <Sidebar
//         users={users}
//         selectedFriend={selectedFriend}
//         setSelectedFriend={setSelectedFriend}
//       />

//       {/* Chat Area */}
//       {selectedFriend === null ? (
//         <div className="flex items-center mx-auto">
//           <h5 className="text-3xl text-black/40">No User Selected</h5>
//         </div>
//       ) : (
//         <div className="flex-1 flex flex-col">
//           {/* Header */}
//           <div className="p-4 border-b border-base-300 bg-base-100 flex items-center gap-3">
//             <div className="avatar">
//               <div className="w-10 rounded-full">
//                 {selectedFriend?.image ? (
//                   <img
//                     src={`https://api.dicebear.com/9.x/initials/svg?seed=${selectedFriend?.image}`}
//                     alt={selectedFriend?.image}
//                   />
//                 ) : (
//                   <img
//                     src={`https://api.dicebear.com/9.x/initials/svg?seed=${selectedFriend?.name}`}
//                     alt={selectedFriend?.name}
//                   />
//                 )}
//               </div>
//             </div>
//             <h2 className="font-semibold">{selectedFriend?.name}</h2>
//           </div>

//           {/* Messages */}
//           <div
//             ref={scrollRef}
//             className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
//           >
//             {messages[selectedFriend]?.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`chat ${
//                   msg.sender === "user" ? "chat-end" : "chat-start"
//                 }`}
//               >
//                 <div className="chat-bubble">{msg.text}</div>
//               </div>
//             ))}
//             <div />
//           </div>

//           {/* input */}
//           <form
//             onSubmit={sendMessage}
//             className="p-4 border-t border-base-300 bg-base-100 flex gap-2"
//           >
//             <input
//               type="text"
//               value={newMsg}
//               onChange={(e) => setNewMsg(e.target.value)}
//               placeholder={`Message ${selectedFriend}...`}
//               className="input input-bordered flex-1"
//             />
//             <button type="submit" className="btn btn-primary">
//               Send
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }













"use client";

import { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Sidebar from "./components/sidebar";

export default function ChatPage() {
  const [users, setUsers] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMsg, setNewMsg] = useState("");
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Initialize socket connection
  // useEffect(() => {
  //   if (typeof window === "undefined") return;

  //   console.log("Initializing socket connection...");

  //   const newSocket = io({
  //     path: "/api/socket",
  //     transports: ["polling", "websocket"], // Add fallback transports
  //   });

  //   newSocket.on("connect", () => {
  //     console.log("Connected to server with ID:", newSocket.id);
  //     setIsConnected(true);
  //   });

  //   newSocket.on("disconnect", () => {
  //     console.log("Disconnected from server");
  //     setIsConnected(false);
  //   });

  //   newSocket.on("connect_error", (error) => {
  //     console.error("Connection error:", error);
  //     setIsConnected(false);
  //   });

  //   setSocket(newSocket);

  //   return () => {
  //     console.log("Cleaning up socket connection");
  //     newSocket.close();
  //   };
  // }, []);

  // Socket event listeners
  // useEffect(() => {
  //   if (!socket) return;

  //   // Listen for new messages
  //   socket.on("new_message", (message) => {
  //     console.log("New message received:", message);
  //     setMessages((prev) => {
  //       const friendId =
  //         message.senderId === selectedFriend?._id
  //           ? selectedFriend._id
  //           : message.receiverId === selectedFriend?._id
  //           ? selectedFriend._id
  //           : message.senderId;

  //       return {
  //         ...prev,
  //         [friendId]: [
  //           ...(prev[friendId] || []),
  //           {
  //             _id: message._id || Date.now(),
  //             sender: message.senderId === "current-user-id" ? "user" : "bot",
  //             text: message.text,
  //             createdAt: message.createdAt,
  //           },
  //         ],
  //       };
  //     });
  //   });

  //   // Listen for typing indicators
  //   socket.on("user_typing", (data) => {
  //     if (data.senderId === selectedFriend?._id) {
  //       setIsTyping(data.isTyping);
  //     }
  //   });

  //   // Listen for errors
  //   socket.on("message_error", (error) => {
  //     console.error("Message error:", error);
  //   });

  //   return () => {
  //     socket.off("new_message");
  //     socket.off("user_typing");
  //     socket.off("message_error");
  //   };
  // }, [socket, selectedFriend]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const usersData = await res.json();
        setUsers(usersData);
      } catch (error) {
        console.log("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Fetch messages when friend is selected
  useEffect(() => {
    if (selectedFriend) {
      const fetchMessages = async () => {
        try {
          const res = await fetch(
            `/api/messages?userId=current-user-id&friendId=${selectedFriend._id}`
          );

          if (!res.ok) throw new Error("Failed to fetch messages");

          const messagesData = await res.json();
          console.log("Fetched messages:", messagesData);

          setMessages((prev) => ({
            ...prev,
            [selectedFriend._id]: messagesData.map((msg) => ({
              _id: msg._id,
              sender: msg.senderId === "current-user-id" ? "user" : "bot",
              text: msg.text,
              createdAt: msg.createdAt,
            })),
          }));
        } catch (error) {
          console.log("Failed to fetch messages:", error);
        }
      };

      fetchMessages();
    }
  }, [selectedFriend]);

  // Join room when socket is connected and friend is selected
  useEffect(() => {
    if (socket && isConnected && selectedFriend) {
      socket.emit("join_user", "current-user-id");
    }
  }, [socket, isConnected, selectedFriend]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMsg.trim() || !selectedFriend || !socket || !isConnected) {
      console.log("Cannot send message:", {
        hasMessage: !!newMsg.trim(),
        hasFriend: !!selectedFriend,
        hasSocket: !!socket,
        isConnected,
      });
      return;
    }

    try {
      console.log("Sending message:", newMsg);

      // Emit message via socket
      socket.emit("send_message", {
        senderId: "current-user-id",
        receiverId: selectedFriend._id,
        text: newMsg.trim(),
      });

      setNewMsg("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleTyping = () => {
    if (!selectedFriend || !socket || !isConnected) return;

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Emit typing start
    socket.emit("typing_start", {
      senderId: "current-user-id",
      receiverId: selectedFriend._id,
    });

    // Set timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing_stop", {
        senderId: "current-user-id",
        receiverId: selectedFriend._id,
      });
    }, 1000);
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] bg-base-200 mt-20">
      {/* Connection Status */}
      <div
        className={`absolute top-4 right-4 px-3 py-1 rounded text-sm ${
          isConnected ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}
      >
        {isConnected ? "Connected" : "Disconnected"}
      </div>

      {/* Sidebar */}
      <Sidebar
        users={users}
        selectedFriend={selectedFriend}
        setSelectedFriend={setSelectedFriend}
      />

      {/* Chat Area */}
      {selectedFriend === null ? (
        <div className="flex items-center mx-auto">
          <h5 className="text-3xl text-black/40">No User Selected</h5>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-base-300 bg-base-100 flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img
                  src={`https://api.dicebear.com/9.x/initials/svg?seed=${selectedFriend.name}`}
                  alt={selectedFriend.name}
                />
              </div>
            </div>
            <h2 className="font-semibold">{selectedFriend.name}</h2>
            {isTyping && (
              <div className="text-sm text-gray-500 italic">typing...</div>
            )}
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
          >
            {messages[selectedFriend._id]?.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${
                  msg.sender === "user" ? "chat-end" : "chat-start"
                }`}
              >
                <div className="chat-bubble">{msg.text}</div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={sendMessage}
            className="p-4 border-t border-base-300 bg-base-100 flex gap-2"
          >
            <input
              type="text"
              value={newMsg}
              onChange={(e) => {
                setNewMsg(e.target.value);
                handleTyping();
              }}
              placeholder={`Message ${selectedFriend.name}...`}
              className="input input-bordered flex-1"
              // disabled={!isConnected}
            />
            <button
              type="submit"
              className="btn btn-primary"
              // disabled={!newMsg.trim() || !isConnected}
            >
                {/* {isConnected ? "Send" : "Connecting..."} */}
                Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}