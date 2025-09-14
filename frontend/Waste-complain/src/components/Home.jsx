import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import API from "../utils/axios";
import { FiMessageSquare, FiX, FiZap, FiUsers, FiCpu } from "react-icons/fi";
import { motion } from "framer-motion";

const Home = () => {
  const { user: userData, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! 👋 I’m your assistant. Try asking:" },
  ]);
  const [loadingChat, setLoadingChat] = useState(false);

  const suggestions = [
    "Show my reports",
    "Garbage reports in Bhopal",
    "Factory reports",
    "How to submit a report?",
  ];

  const sendMessage = async (msg) => {
    if (!msg) return;
    setMessages((prev) => [...prev, { sender: "user", text: msg }]);
    setLoadingChat(true);
    try {
      const res = await API.post("/chatbot", { message: msg });
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: res.data.message },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Something went wrong. Try again." },
      ]);
    } finally {
      setLoadingChat(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center 
      bg-gradient-to-b from-green-100 via-white to-green-50 px-6 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-green-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      {/* Hero Section */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-extrabold text-green-700 mb-6 leading-tight drop-shadow-md"
      >
        Report Issues. Empower Communities. <br /> Build Better Cities.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg md:text-xl text-gray-700 max-w-2xl mb-10 leading-relaxed"
      >
        Join <span className="font-bold text-green-700">UrbanEyes</span> to
        make your city smarter by reporting and resolving civic issues with ease.
        Let’s create cleaner, safer, and more sustainable neighborhoods 🌍
      </motion.p>

      {/* CTA Buttons */}
      <div className="flex gap-4 mb-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            !userData ? navigate("/login") : navigate("/register")
          }
          className="px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 
          text-white font-semibold shadow-lg hover:shadow-xl transition flex items-center gap-2"
        >
          🚀 Get Started
        </motion.button>

        <Link
          to="/about"
          className="px-6 py-3 rounded-full border-2 border-green-600 text-green-700 
          font-semibold hover:bg-green-50 transition"
        >
          Learn More
        </Link>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full mb-20">
        {[
          {
            title: "Quick Reports",
            desc: "Easily report civic issues in seconds.",
            icon: <FiZap size={32} className="text-green-600" />,
          },
          {
            title: "Community Impact",
            desc: "Track reports resolved in your area.",
            icon: <FiUsers size={32} className="text-green-600" />,
          },
          {
            title: "Eco Assistant",
            desc: "AI chatbot for instant help and guidance.",
            icon: <FiCpu size={32} className="text-green-600" />,
          },
        ].map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white/70 backdrop-blur-lg shadow-xl p-8 rounded-2xl border border-green-100 text-left relative overflow-hidden"
          >
            <div className="mb-4">{f.icon}</div>
            <h3 className="text-2xl font-bold text-green-700 mb-2">
              {f.title}
            </h3>
            <p className="text-gray-600">{f.desc}</p>

            {/* Decorative blur */}
            <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-green-200 rounded-full blur-2xl opacity-20"></div>
          </motion.div>
        ))}
      </div>

      {/* Floating Chatbot */}
      <div className="fixed bottom-5 right-5">
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="bg-green-600 text-white p-4 rounded-full shadow-lg animate-bounce hover:scale-110 transition"
          >
            <FiMessageSquare size={24} />
          </button>
        )}

        {open && (
          <div className="w-80 h-[500px] bg-white shadow-2xl rounded-2xl border border-gray-200 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-green-600 text-white p-3 font-semibold flex justify-between items-center">
              SwachhRobo 🌍
              <button onClick={() => setOpen(false)}>
                <FiX size={20} />
              </button>
            </div>

            {/* Chat Window */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2 max-h-[400px]">
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
              {loadingChat && (
                <div className="text-gray-400 text-sm">Bot is typing...</div>
              )}
            </div>

            {/* Suggestions */}
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
        )}
      </div>
    </div>
  );
};

export default Home;
