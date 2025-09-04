import { Server } from "socket.io";

let users = {};

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("Starting Socket.IO server...");

    const io = new Server(res.socket.server, {
      cors: {
        origin: "*",
      },
    });

    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      socket.on("registerUser", (userName) => {
        users[socket.id] = { id: socket.id, name: userName, messages: [] };
        io.emit("updateUsers", users);
      });

      socket.on("sendMessage", (data) => {
        console.log(data);
        const { userId, message } = data;
        users[userId].messages.push({ sender: "user", message });
        io.emit("updateUsers", users);
      });

      socket.on("sendAdminMessage", (data) => {
        const { userId, message } = data;
        users[userId].messages.push({ sender: "admin", message });
        io.emit("updateUsers", users);
      });

      socket.on("disconnect", () => {
        delete users[socket.id];
        io.emit("updateUsers", users);
      });
    });
  }
  res.end();
}
