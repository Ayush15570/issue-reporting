import React, { useState } from "react";
import axios from "axios";
import API from "../utils/axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! 👋 I’m your assistant. Try asking:" },
  ]);
  const [loading, setLoading] = useState(false);

  // Predefined quick suggestions
  const suggestions = [
    "Show my reports",
    "Garbage reports in Bhopal",
    "Factory reports",
    "How to submit a report?",
  ];

  // Handle sending a message
  const sendMessage = async (msg) => {
    if (!msg) return;

    // Add user message to chat
    setMessages((prev) => [...prev, { sender: "user", text: msg }]);
    setLoading(true);

    try {
      const res = await API.post(
        "/chatbot",
        { message: msg },
        {
          headers: {
            Authorization: `Bearer ${"token"}`, // if using JWT
          },
        }
      );

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: res.data.message },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Something went wrong. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-white shadow-2xl rounded-2xl border border-gray-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-green-600 text-white p-3 font-semibold">
        SwachhRobo🌍
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2 max-h-96">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg text-sm max-w-[80%] ${
              m.sender === "user"
                ? "bg-green-100 ml-auto text-right"
                : "bg-gray-100 mr-auto"
            }`}
          >
            {m.text}
          </div>
        ))}
        {loading && (
          <div className="text-gray-400 text-sm">Bot is typing...</div>
        )}
      </div>

      {/* Suggested Quick Questions */}
      <div className="p-2 flex flex-wrap gap-2 border-t">
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => sendMessage(s)}
            className="bg-gray-200 hover:bg-green-200 px-2 py-1 rounded-full text-xs"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chatbot;
