import React from "react";
import ChatList from "../Chat/ChatList";
import ChatWindow from "../Chat/ChatWindow";

const ChatLayout = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-app-primary">
      {/* Sidebar - Chat List */}
      <ChatList />

      {/* Main Chat Window */}
      <ChatWindow />
    </div>
  );
};

export default ChatLayout;
