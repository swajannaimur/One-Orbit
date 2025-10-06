import { Server } from "socket.io";

let io;

export async function GET(req) {
  if (!io) {
    io = new Server((global.server ??= require("http").createServer()), {
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      console.log("🟢 User connected:", socket.id);

      socket.on("send-message", (data) => {
        // broadcast message to all
        io.emit("receive-message", data);
      });

      socket.on("disconnect", () => {
        console.log("🔴 User disconnected:", socket.id);
      });
    });
  }

  return new Response("Socket.io server running", { status: 200 });
}
