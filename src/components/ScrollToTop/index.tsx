import { useState, useEffect, useRef } from "react";
import { BsChatDotsFill, BsX } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000/api/socket");  // Add the correct path to your socket API route

export default function ChatPopup() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "admin", message: "👋 Hello! How can we assist you today?" },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Listen for incoming messages from admin
    socket.on("receiveAdminMessage", (msg) => {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { sender: "admin", message: msg },
      ]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("receiveAdminMessage");
    };
  }, []);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const sendMessage = () => {
    if (message.trim()) {
      const userMessage = { sender: "user", message };
      setChatHistory((prevHistory) => [...prevHistory, userMessage]);

      // Emit the message to the server
      socket.emit("sendMessage", { message });

      // Clear the input field
      setMessage("");
    }
  };

  useEffect(() => {
    // Scroll to the bottom when a new message is added
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="fixed bottom-8 right-8 z-[99000]">
      {/* Chat Icon */}
      <div
        onClick={toggleChat}
        aria-label="toggle chat"
        className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-black to-black text-white shadow-lg transition duration-300 ease-in-out hover:scale-110 hover:shadow-2xl"
      >
        <BsChatDotsFill size={24} />
      </div>

      {/* Chat Box */}
      {isChatOpen && (
        <div className="absolute bottom-16 right-0 w-80 rounded-xl bg-white shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-black to-black px-4 py-3 rounded-t-xl text-white border-b-2 border-b-white">
            <h4 className="text-lg font-semibold">Live Chat</h4>
            <button
              onClick={toggleChat}
              className="hover:text-gray-200"
              aria-label="close chat"
            >
              <BsX size={24} />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 h-64 overflow-y-auto custom-scrollbar">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`mb-3 ${chat.sender === "user" ? "flex justify-end pl-10" : "pr-10"}`}>
                <p
                  className={`text-sm ${chat.sender === "user" ? "bg-[#0a0a0a] text-white" : "bg-gray-100 text-gray-800"} rounded-md px-3 py-2 max-w-max`}
                >
                  {chat.message}
                </p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t">
            <div className="flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-black focus:ring focus:ring-black"
              />
              <button
                onClick={sendMessage}
                className="ml-2 rounded-full bg-[#0a0a0a] p-2 text-white hover:bg-gray-700 focus:ring focus:ring-black"
                aria-label="send message"
              >
                <IoMdSend size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
