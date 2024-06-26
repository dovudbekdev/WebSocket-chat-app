const express = require("express");
const socketio = require("socket.io");
const dotenv = require("dotenv");
const http = require("http");
const path = require("path");

const formatMessage = require("./utils/message");
const {
  getCurrentUser,
  joinUser,
  leftUser,
  getRoomUsers,
} = require("./utils/users");

dotenv.config();

// Application
const app = express();

// Create server
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (client) => {
  const botName = "ChatBot";

  client.on("joinRoom", ({ username, room }) => {
    const user = joinUser(client.id, username, room);

    client.join(user.room);

    // Welcomming new user
    client.emit("message", formatMessage(botName, "welcome to Chat App"));

    // Inform others when a new user connects to the chat
    client.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `New ${user.username} joined to the chat`)
      );

    // Send user online info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  //   Listen to chatMessage event
  client.on("chatMessage", (msg) => {
    const user = getCurrentUser(client.id);
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // Client disconnect
  client.on("disconnect", () => {
    const user = leftUser(client.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} user left the chat`)
      );
    }

    // Send user online info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });
});

const PORT = process.env.PORT || 7000;

// Server listen
server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
