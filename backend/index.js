import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const app = express();

const httpServer = createServer(app);
const port = 3000;
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Random data arrays
const randomUsers = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Eve",
  "Frank",
  "Grace",
  "Henry",
  "Ivy",
  "Jack",
  "Kate",
  "Liam",
  "Maya",
  "Noah",
  "Olivia",
  "Paul",
];

const randomMessages = [
  "Hello everyone!",
  "How is everyone doing?",
  "Great weather today!",
  "Anyone up for a chat?",
  "Just joined the conversation",
  "What's the topic today?",
  "Nice to meet you all",
  "Having a good day",
  "Anyone else online?",
  "This is fun!",
];

//Function to gen. random events (new user connected, send message, user disconnected)
function generateRandomEvent() {
  const events = ["user_connected", "send_message", "user_disconnected"];
  const randomEvent = events[Math.floor(Math.random() * events.length)];

  switch (randomEvent) {
    case "user-connected":
      const randomUser =
        randomUsers[Math.floor(Math.random() * randomUsers.length)];
      console.log(` Generated event: ${randomUser} connected`);
      io.emit("user-connected", { username: randomUser });
      break;

    case "send_message":
      console.log("Generated event: Sending 1 message");
      const randomMessage =
        randomMessages[Math.floor(Math.random() * randomMessages.length)];
      const randomSender =
        randomUsers[Math.floor(Math.random() * randomUsers.length)];
      const id = Date.now();
      const time = new Date().toLocaleTimeString();
      io.emit("chat-message", {
        id: id,
        text: randomMessage,
        username: randomSender,
        time: time,
      });
      break;

    case "user_disconnected":
      const disconnectUser =
        randomUsers[Math.floor(Math.random() * randomUsers.length)];
      console.log(`Generated event: ${disconnectUser} disconnected`);
      io.emit("user-disconnected", { username: disconnectUser });
      break;
  }
}

// handles real-time WebSocket connections
io.on("connection", (socket) => {
  console.log("User connected! Socket ID:", socket.id);

  socket.on("text-message", (data) => {
    //receives message from the client
    console.log("Received from client:", data);

    io.emit("chat-message", data); //sends it back to the chat to all the users
    console.log("sent new message to users");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected! Socket ID:", socket.id);
  });
});

// Start random events every 5 seconds
setInterval(generateRandomEvent, 5000);

httpServer.listen(port, () => {
  console.log("🚀 Server running");
});
