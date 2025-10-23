import React, { useState, useEffect } from "react";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/AuthContext";
import { FiSearch, FiX } from "react-icons/fi";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { formatDistanceToNow } from "date-fns";

const UserList = () => {
  const {
    users,
    selectedUser,
    setSelectedUser,
    loading,
    blockedUsers,
    getChatId,
  } = useChat();
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [userChats, setUserChats] = useState({});

  // Load last message for each user
  useEffect(() => {
    if (!currentUser || users.length === 0) return;

    const unsubscribes = users.map((user) => {
      const chatId = getChatId(currentUser.uid, user.uid);
      const messagesRef = collection(db, "chats", chatId, "messages");
      const q = query(messagesRef, orderBy("timestamp", "desc"), limit(1));

      return onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const lastMessage = snapshot.docs[0].data();
          setUserChats((prev) => ({
            ...prev,
            [user.uid]: {
              lastMessage: lastMessage.text || "Sent a file",
              timestamp: lastMessage.timestamp,
            },
          }));
        }
      });
    });

    return () => unsubscribes.forEach((unsub) => unsub());
  }, [currentUser, users, getChatId]);

  // Filter and sort users
  const filteredUsers = users
    .filter((user) => !blockedUsers?.includes(user.uid)) // Hide blocked users
    .filter(
      (user) =>
        user.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      // Sort by last message timestamp (most recent first)
      const aTime = userChats[a.uid]?.timestamp?.toMillis() || 0;
      const bTime = userChats[b.uid]?.timestamp?.toMillis() || 0;
      return bTime - aTime;
    });

  const formatLastSeen = (timestamp) => {
    if (!timestamp) return "";
    try {
      const date = timestamp.toDate();
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return "";
    }
  };

  if (loading) {
    return (
      <div className="w-full sm:w-80 border-r border-[var(--border-color)] glass-effect flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-16 h-16 rounded-full gradient-btn"></div>
          <div className="text-[var(--text-secondary)] font-semibold">
            Loading users...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full sm:w-80 border-r border-[var(--border-color)] glass-effect flex flex-col">
      <div className="p-4 border-b border-[var(--border-color)]">
        <h2 className="text-xl font-bold neon-text mb-3">Messages</h2>

        <div className="relative">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
            size={18}
          />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent-cyan)] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <FiX size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center mb-4">
              <span className="text-3xl">🔍</span>
            </div>
            <p className="text-[var(--text-secondary)] font-semibold mb-1">
              {searchQuery
                ? "No users found"
                : blockedUsers?.length > 0
                ? "All users blocked"
                : "No users available"}
            </p>
            <p className="text-xs text-[var(--text-tertiary)]">
              {searchQuery
                ? "Try a different search term"
                : "Start chatting with someone!"}
            </p>
          </div>
        ) : (
          filteredUsers.map((user) => {
            const chat = userChats[user.uid];
            return (
              <div
                key={user.uid}
                onClick={() => setSelectedUser(user)}
                className={`p-4 border-b border-[var(--border-color)] cursor-pointer transition-all hover:bg-[var(--hover-bg)] ${
                  selectedUser?.uid === user.uid
                    ? "bg-[var(--hover-bg)] border-l-4 border-l-[var(--accent-cyan)]"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-[var(--accent-cyan)]/20"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full gradient-btn flex items-center justify-center text-white font-semibold">
                        {user.displayName?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    {user.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 border-2 border-[var(--bg-secondary)] rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="font-semibold text-[var(--text-primary)] truncate text-sm">
                        {user.displayName}
                      </h3>
                      {chat?.timestamp && (
                        <span className="text-[10px] text-[var(--text-tertiary)] ml-2">
                          {formatLastSeen(chat.timestamp)}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] truncate">
                      {chat?.lastMessage ? (
                        <span className="text-[var(--text-tertiary)]">
                          {chat.lastMessage}
                        </span>
                      ) : user.isOnline ? (
                        <span className="text-green-400 font-medium">
                          ● Online
                        </span>
                      ) : (
                        <span>Tap to start chatting</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="p-3 border-t border-[var(--border-color)] text-center">
        <p className="text-xs text-[var(--text-tertiary)]">
          {filteredUsers.length} {filteredUsers.length === 1 ? "user" : "users"}{" "}
          available
          {blockedUsers?.length > 0 && (
            <span className="text-red-400 ml-1">
              ({blockedUsers.length} blocked)
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default UserList;
