import React, { useState } from "react";
import { useChat } from "../../context/ChatContext";
import { FiX, FiUserPlus, FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";

const AddFriends = ({ onClose }) => {
  const { users, sendFriendRequest } = useChat();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFriend = async (userId) => {
    try {
      await sendFriendRequest(userId);
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="glass-effect rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 animate-fadeIn card-hover">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[var(--bg-tertiary)] hover:bg-red-500 transition-all text-[var(--text-primary)] hover:text-white"
        >
          <FiX size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold neon-text mb-1">Add Friends</h2>
          <p className="text-[var(--text-secondary)] text-xs">
            Find and connect with people
          </p>
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-tertiary)]" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-[var(--accent-cyan)] rounded-xl pl-10 pr-4 py-2.5 text-[var(--text-primary)] focus:outline-none focus:neon-glow transition-all"
            />
          </div>
        </div>

        {/* Users List */}
        <div className="space-y-2">
          {filteredUsers.length === 0 ? (
            <p className="text-center text-[var(--text-tertiary)] py-8">
              No users found
            </p>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.uid}
                className="flex items-center gap-3 p-3 glass-effect rounded-xl hover:bg-[var(--hover-bg)] transition-all"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full gradient-btn flex items-center justify-center text-white font-bold">
                    {user.displayName?.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h4 className="text-[var(--text-primary)] font-semibold text-sm truncate">
                    {user.displayName}
                  </h4>
                  <p className="text-[var(--text-tertiary)] text-xs truncate">
                    {user.email}
                  </p>
                </div>

                <button
                  onClick={() => handleAddFriend(user.uid)}
                  className="p-2 gradient-btn btn-3d rounded-lg text-white hover:scale-105 transition-all"
                >
                  <FiUserPlus size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AddFriends;
