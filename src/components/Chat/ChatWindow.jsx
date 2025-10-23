import React, { useEffect, useRef } from "react";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/AuthContext";
import { useCustomization } from "../../context/CustomizationContext";
import Message from "./Message";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";

const ChatWindow = () => {
  const { messages, selectedUser, typing, blockedUsers } = useChat(); // ADD blockedUsers
  const { currentUser } = useAuth();
  const { chatBackground, customBackgroundUrl, backgrounds } =
    useCustomization();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  // Get custom background
  const getBackgroundStyle = () => {
    if (chatBackground === "custom" && customBackgroundUrl) {
      return {
        backgroundImage: `url(${customBackgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      };
    }

    const bg = backgrounds[chatBackground];
    if (!bg) return {};

    return {
      background: bg.value,
      backgroundSize: bg.type === "pattern" ? "auto, cover" : "cover",
    };
  };

  const backgroundStyle = getBackgroundStyle();
  const isBlocked = blockedUsers?.includes(selectedUser?.uid); // ADD THIS

  if (!selectedUser) {
    return (
      <div
        className="flex-1 flex items-center justify-center relative overflow-hidden p-4"
        style={backgroundStyle}
      >
        {/* Animated Background Particles */}
        <div className="absolute inset-0 bg-black/30">
          <div className="absolute top-1/3 left-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-80 sm:h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="text-center relative z-10 animate-fadeIn mt-8 sm:mt-16 max-w-2xl">
          {/* NEXORA LOGO */}
          <div className="relative mb-6 sm:mb-10 inline-block">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mx-auto animate-float">
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-purple-500/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"></div>

              {/* Hexagon Container */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full drop-shadow-2xl"
                  >
                    <defs>
                      <linearGradient
                        id="hexGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: "#00E5FF", stopOpacity: 1 }}
                        />
                        <stop
                          offset="50%"
                          style={{ stopColor: "#A855F7", stopOpacity: 1 }}
                        />
                        <stop
                          offset="100%"
                          style={{ stopColor: "#EC4899", stopOpacity: 1 }}
                        />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <polygon
                      points="50,5 90,25 90,75 50,95 10,75 10,25"
                      fill="url(#hexGradient)"
                      className="animate-pulse-slow"
                      filter="url(#glow)"
                    />
                  </svg>

                  {/* Center Symbol */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div
                        className="text-5xl sm:text-6xl md:text-7xl font-black text-white drop-shadow-2xl animate-pulse-slow"
                        style={{
                          textShadow:
                            "0 0 30px rgba(0, 229, 255, 0.8), 0 0 60px rgba(168, 85, 247, 0.6)",
                        }}
                      >
                        ✕
                      </div>
                      <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 text-2xl sm:text-3xl animate-bounce-slow">
                        ⚡
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-8 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 blur-xl animate-spin-slow"></div>
                </div>
              </div>

              {/* Orbiting Particles */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 sm:w-3 sm:h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-orbit"></div>
                <div
                  className="absolute top-1/4 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50 animate-orbit"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                  className="absolute top-3/4 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-400 rounded-full shadow-lg shadow-pink-400/50 animate-orbit"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-orbit"
                  style={{ animationDelay: "1.5s" }}
                ></div>
                <div
                  className="absolute top-3/4 left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-300 rounded-full shadow-lg shadow-cyan-300/50 animate-orbit"
                  style={{ animationDelay: "2s" }}
                ></div>
                <div
                  className="absolute top-1/4 left-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-purple-300 rounded-full shadow-lg shadow-purple-300/50 animate-orbit"
                  style={{ animationDelay: "2.5s" }}
                ></div>
              </div>

              {/* Pulsing Rings */}
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-ping"></div>
              <div
                className="absolute inset-4 rounded-full border border-purple-400/20 animate-ping"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute inset-8 rounded-full border border-pink-400/15 animate-ping"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </div>

          {/* Text */}
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient px-4">
            Welcome to Nexora
          </h3>
          <p className="text-[var(--text-secondary)] mb-6 sm:mb-10 max-w-md mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-4 drop-shadow-lg">
            Select a friend from the sidebar to start your
            <span className="text-cyan-400 font-semibold">
              {" "}
              encrypted conversation
            </span>
          </p>

          {/* Feature badges */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 text-sm flex-wrap px-4">
            <div className="flex flex-col items-center gap-1 sm:gap-2 p-3 sm:p-4 glass-effect rounded-xl sm:rounded-2xl hover:scale-110 transition-all card-hover cursor-pointer">
              <span className="text-2xl sm:text-3xl animate-bounce">🔒</span>
              <span className="text-green-400 font-semibold text-xs sm:text-sm">
                End-to-End
              </span>
              <span className="text-[var(--text-tertiary)] text-[10px] sm:text-xs">
                Encrypted
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 sm:gap-2 p-3 sm:p-4 glass-effect rounded-xl sm:rounded-2xl hover:scale-110 transition-all card-hover cursor-pointer">
              <span
                className="text-2xl sm:text-3xl animate-bounce"
                style={{ animationDelay: "0.2s" }}
              >
                ⚡
              </span>
              <span className="text-cyan-400 font-semibold text-xs sm:text-sm">
                Real-time
              </span>
              <span className="text-[var(--text-tertiary)] text-[10px] sm:text-xs">
                Messages
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 sm:gap-2 p-3 sm:p-4 glass-effect rounded-xl sm:rounded-2xl hover:scale-110 transition-all card-hover cursor-pointer">
              <span
                className="text-2xl sm:text-3xl animate-bounce"
                style={{ animationDelay: "0.4s" }}
              >
                🚀
              </span>
              <span className="text-purple-400 font-semibold text-xs sm:text-sm">
                Lightning
              </span>
              <span className="text-[var(--text-tertiary)] text-[10px] sm:text-xs">
                Fast
              </span>
            </div>
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none hidden sm:block">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400/50 rounded-full animate-float-random"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader />

      {/* ✅ ADD THIS - Blocked User Warning */}
      {isBlocked && (
        <div className="px-4 py-3 bg-red-500/10 border-b border-red-500/30 animate-fadeIn">
          <div className="flex items-center gap-3 text-red-400">
            <span className="text-2xl">🚫</span>
            <div className="flex-1">
              <p className="font-semibold text-sm">
                You have blocked this user
              </p>
              <p className="text-xs text-red-400/70">
                Messages cannot be sent or received. Unblock to resume chat.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Messages Area with Custom Background */}
      <div className="flex-1 overflow-y-auto relative" style={backgroundStyle}>
        {/* Semi-transparent overlay for better text readability */}
        {chatBackground === "custom" && (
          <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
        )}

        <div className="relative z-10">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full p-4">
              <div className="text-center animate-fadeIn">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full gradient-btn flex items-center justify-center shadow-xl neon-glow">
                  <span className="text-4xl sm:text-5xl animate-wave">👋</span>
                </div>
                <p className="text-white text-base sm:text-lg font-semibold drop-shadow-lg">
                  {isBlocked
                    ? "This user is blocked"
                    : "Start the conversation!"}
                </p>
                {isBlocked && (
                  <p className="text-white/70 text-sm mt-2 drop-shadow-lg">
                    Unblock to send messages
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="py-4 px-2 sm:px-4">
              {messages.map((message) => (
                <Message
                  key={message.id}
                  message={message}
                  isOwn={message.senderId === currentUser.uid}
                />
              ))}
            </div>
          )}

          {/* Typing Indicator */}
          {typing && !isBlocked && (
            <div className="px-3 sm:px-4 py-2 animate-fadeIn">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full gradient-btn flex items-center justify-center text-white font-semibold text-sm sm:text-base animate-pulse">
                  {selectedUser?.displayName?.charAt(0).toUpperCase()}
                </div>
                <div className="glass-effect px-3 sm:px-4 py-2 sm:py-3 rounded-2xl shadow-lg">
                  <div className="flex gap-1 sm:gap-1.5">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-bounce"></span>
                    <span
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></span>
                    <span
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatWindow;
