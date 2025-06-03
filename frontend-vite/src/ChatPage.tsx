import "./chatpage.css";
import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useSearchParams } from "react-router";

export default function ChatPage() {
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);
  const [messageVal, setMessageVal] = useState<string>("");
  const [messageArr, setMessageArr] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  interface Message {
    id: string | number;
    text: string;
    username: string;
    time: string;
    type?: "message" | "notification";
  }

  useEffect(() => {
    console.log("🔌 Connecting to server...");
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to the server!");
      setConnected(true);

      //sets username, supposed to be visible for other users only
      const newusername = searchParams.get("username") || "";
      setUsername(newusername);
    });
    //receivs from the server and adds to the array
    newSocket.on("chat-message", (msg) => {
      console.log("received message from server");
      setMessageArr((prev) => [...prev, msg]);
    });

    //new user-connected
    newSocket.on("user-connected", (user) => {
      console.log(`${user.username} connected!`);

      //write it to the chat
      const connectNotification: Message = {
        id: Date.now(),
        text: `${user.username} joined the chat`,
        username: "System",
        time: new Date().toLocaleTimeString(),
        type: "notification",
      };
      //add to the messages array
      setMessageArr((prev) => [...prev, connectNotification]);
    });

    //user disconnected
    newSocket.on("user-disconnected", (user) => {
      console.log(`${user.username} disconnected`);

      //write it to the chat
      const disconnectNotification: Message = {
        id: Date.now(),
        text: `${user.username} left the chat`,
        username: "System",
        time: new Date().toLocaleTimeString(),
        type: "notification",
      };
      //add to the messages array
      setMessageArr((prev) => [...prev, disconnectNotification]);
    });

    newSocket.on("disconnect", () => {
      console.log("disconnected from the server!");
      setConnected(false);
    });

    return () => {
      console.log("Disconecting...");
      newSocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && messageVal.length > 1) {
      console.log("📤 Sending to server:", messageVal);

      const newMessage: Message = {
        id: Date.now(),
        text: messageVal,
        username: username,
        time: new Date().toLocaleTimeString(),
        type: "message",
      };

      socket.emit("text-message", newMessage);

      setMessageVal("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="container">
      <div className="chatter-bar">
        <h2>
          {connected ? "Connected to the Real Time Chat ✅ " : "Connecting..."}
        </h2>
      </div>
      <section className="messages-section">
        {messageArr ? (
          messageArr.map((message, index) => (
            <div
              className={
                message.type === "notification"
                  ? "notification-message"
                  : message.username !== username
                  ? "message"
                  : "message-you"
              }
              key={index}
            >
              {message.type === "notification" ? (
                <>
                  <p>{message.text}</p>
                  <small>{message.time}</small>
                </>
              ) : (
                <>
                  <h5>
                    {message.username !== username ? message.username : "you"}
                  </h5>
                  <p>{message.text}</p>
                  <small>{message.time}</small>
                </>
              )}
            </div>
          ))
        ) : (
          <p>no messages</p>
        )}
      </section>
      <div className="type-bar">
        <input
          className="input"
          placeholder="Type your message"
          value={messageVal}
          onChange={(e) => setMessageVal(e.target.value)}
          onKeyUp={handleKeyPress}
        ></input>
        <button
          type="submit"
          className="send-button"
          onClick={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
