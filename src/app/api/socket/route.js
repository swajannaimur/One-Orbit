// import { NextResponse } from "next/server";
// import { Server } from "socket.io";
// import clientPromise from "@/lib/mongodb";

// let io;

// async function saveMessageToDB(senderId, receiverId, text) {
//   try {
//     const client = await clientPromise;
//     const db = client.db(process.env.DB_NAME);
//     const collection = db.collection("messages");

//     const message = {
//       senderId,
//       receiverId,
//       text,
//       createdAt: new Date(),
//     };

//     const result = await collection.insertOne(message);
//     return {
//       _id: result.insertedId,
//       ...message,
//     };
//   } catch (error) {
//     console.error("Error saving message to DB:", error);
//     throw error;
//   }
// }

// export async function GET(req) {
//   try {
//     if (io) {
//       return NextResponse.json({ message: "Socket already running" });
//     }

//     // For App Router, we need to get the underlying server differently
//     // This is a workaround since App Router doesn't directly expose the server
//     const { socket } = req;

//     if (!socket?.server) {
//       throw new Error("Socket server not available");
//     }

//     io = new Server(socket.server, {
//       path: "/api/socket",
//       addTrailingSlash: false,
//       cors: {
//         origin: "*",
//         methods: ["GET", "POST"],
//       },
//     });

//     io.on("connection", (socket) => {
//       console.log("User connected:", socket.id);

//       socket.on("join_user", (userId) => {
//         socket.join(userId);
//         console.log(`User ${userId} joined room`);
//       });

//       socket.on("send_message", async (data) => {
//         const { senderId, receiverId, text } = data;
//         console.log("Message received:", data);

//         try {
//           const message = await saveMessageToDB(senderId, receiverId, text);

//           socket.emit("new_message", message);
//           socket.to(receiverId).emit("new_message", message);
//           console.log("Message sent to users");
//         } catch (error) {
//           console.error("Failed to save message:", error);
//           socket.emit("message_error", { error: "Failed to send message" });
//         }
//       });

//       socket.on("typing_start", (data) => {
//         socket.to(data.receiverId).emit("user_typing", {
//           senderId: data.senderId,
//           isTyping: true,
//         });
//       });

//       socket.on("typing_stop", (data) => {
//         socket.to(data.receiverId).emit("user_typing", {
//           senderId: data.senderId,
//           isTyping: false,
//         });
//       });

//       socket.on("disconnect", () => {
//         console.log("User disconnected:", socket.id);
//       });
//     });

//     return NextResponse.json({ message: "Socket initialized" });
//   } catch (error) {
//     console.error("Socket initialization error:", error);
//     return NextResponse.json(
//       { error: "Failed to initialize socket" },
//       { status: 500 }
//     );
//   }
// }
