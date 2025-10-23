import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";
import { FiX, FiUserPlus, FiCheck, FiX as FiReject } from "react-icons/fi";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";

const FriendRequests = ({ onClose }) => {
  const { currentUser } = useAuth();
  const { acceptFriendRequest, rejectFriendRequest, users } = useChat();
  const [pendingRequests, setPendingRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = onSnapshot(
      doc(db, "users", currentUser.uid),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setPendingRequests(data.pendingRequests || []);
          setSentRequests(data.sentRequests || []);
        }
      }
    );

    return unsubscribe;
  }, [currentUser]);

  const getPendingUsers = () => {
    return users.filter((user) => pendingRequests.includes(user.uid));
  };

  const getSentRequestUsers = () => {
    return users.filter((user) => sentRequests.includes(user.uid));
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1A1D23] dark:bg-[#1A1D23] light:bg-white border border-[#2B2F36] dark:border-[#2B2F36] light:border-[#E3E5E8] rounded-lg max-w-lg w-full p-6 shadow-2xl max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white dark:text-white light:text-[#060607]">
            Friend Requests
          </h2>
          <button
            onClick={onClose}
            className="text-[#B5BAC1] hover:text-white transition"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Pending Requests (Received) */}
        <div className="mb-6">
          <h3 className="text-white dark:text-white light:text-[#060607] font-semibold mb-3 flex items-center gap-2">
            <FiUserPlus className="text-[#5865F2]" />
            Pending ({getPendingUsers().length})
          </h3>

          {getPendingUsers().length === 0 ? (
            <p className="text-[#B5BAC1] text-sm">No pending requests</p>
          ) : (
            <div className="space-y-2">
              {getPendingUsers().map((user) => (
                <div
                  key={user.uid}
                  className="bg-[#2B2F36] dark:bg-[#2B2F36] light:bg-[#F2F3F5] rounded-lg p-3 flex items-center gap-3"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-bold">
                      {user.displayName?.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="flex-1">
                    <h4 className="text-white dark:text-white light:text-[#060607] font-semibold">
                      {user.displayName}
                    </h4>
                    <p className="text-[#B5BAC1] text-sm truncate">
                      {user.bio || user.email}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => acceptFriendRequest(user.uid)}
                      className="bg-[#23A55A] hover:bg-[#1e8e4f] text-white p-2 rounded transition"
                      title="Accept"
                    >
                      <FiCheck size={18} />
                    </button>
                    <button
                      onClick={() => rejectFriendRequest(user.uid)}
                      className="bg-[#F23F43] hover:bg-[#d63437] text-white p-2 rounded transition"
                      title="Reject"
                    >
                      <FiReject size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sent Requests */}
        <div>
          <h3 className="text-white dark:text-white light:text-[#060607] font-semibold mb-3">
            Sent ({getSentRequestUsers().length})
          </h3>

          {getSentRequestUsers().length === 0 ? (
            <p className="text-[#B5BAC1] text-sm">No sent requests</p>
          ) : (
            <div className="space-y-2">
              {getSentRequestUsers().map((user) => (
                <div
                  key={user.uid}
                  className="bg-[#2B2F36] dark:bg-[#2B2F36] light:bg-[#F2F3F5] rounded-lg p-3 flex items-center gap-3"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-bold">
                      {user.displayName?.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="flex-1">
                    <h4 className="text-white dark:text-white light:text-[#060607] font-semibold">
                      {user.displayName}
                    </h4>
                    <p className="text-yellow-400 text-sm">Pending...</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendRequests;
