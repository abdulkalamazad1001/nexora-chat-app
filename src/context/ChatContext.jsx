// // import { createContext, useContext, useState, useEffect } from "react";
// // import {
// //   collection,
// //   addDoc,
// //   query,
// //   orderBy,
// //   onSnapshot,
// //   serverTimestamp,
// //   getDocs,
// //   doc,
// //   updateDoc,
// //   deleteDoc,
// //   setDoc,
// //   arrayUnion,
// //   arrayRemove,
// // } from "firebase/firestore";
// // import { db } from "../config/firebase";
// // import { useAuth } from "./AuthContext";
// // import { encryptMessage, decryptMessage } from "../utils/encryption";
// // import toast from "react-hot-toast";

// // const ChatContext = createContext();

// // export const useChat = () => {
// //   const context = useContext(ChatContext);
// //   if (!context) {
// //     throw new Error("useChat must be used within ChatProvider");
// //   }
// //   return context;
// // };

// // export const ChatProvider = ({ children }) => {
// //   const [messages, setMessages] = useState([]);
// //   const [filteredMessages, setFilteredMessages] = useState([]);
// //   const [users, setUsers] = useState([]);
// //   const [blockedUsers, setBlockedUsers] = useState([]);
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [typing, setTyping] = useState(false);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [showMediaGallery, setShowMediaGallery] = useState(false);
// //   const { currentUser } = useAuth();

// //   // Fetch all users
// //   useEffect(() => {
// //     if (!currentUser) return;

// //     const fetchUsers = async () => {
// //       try {
// //         const usersQuery = query(collection(db, "users"));
// //         const snapshot = await getDocs(usersQuery);
// //         const usersList = snapshot.docs
// //           .map((doc) => doc.data())
// //           .filter((user) => user.uid !== currentUser.uid);
// //         setUsers(usersList);
// //       } catch (error) {
// //         console.error("Error fetching users:", error);
// //       }
// //     };

// //     fetchUsers();

// //     const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
// //       const usersList = snapshot.docs
// //         .map((doc) => doc.data())
// //         .filter((user) => user.uid !== currentUser.uid);
// //       setUsers(usersList);
// //     });

// //     return unsubscribe;
// //   }, [currentUser]);

// //   // Listen to messages
// //   useEffect(() => {
// //     if (!currentUser || !selectedUser) return;

// //     const chatId = getChatId(currentUser.uid, selectedUser.uid);

// //     const messagesQuery = query(
// //       collection(db, "chats", chatId, "messages"),
// //       orderBy("timestamp", "asc")
// //     );

// //     const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
// //       const messagesList = snapshot.docs.map((doc) => {
// //         const data = doc.data();
// //         if (data.encrypted && data.text) {
// //           data.text = decryptMessage(data.text);
// //         }
// //         return {
// //           id: doc.id,
// //           ...data,
// //         };
// //       });
// //       setMessages(messagesList);
// //       setFilteredMessages(messagesList);
// //     });

// //     return unsubscribe;
// //   }, [currentUser, selectedUser]);

// //   // Listen to typing status
// //   useEffect(() => {
// //     if (!currentUser || !selectedUser) return;

// //     const chatId = getChatId(currentUser.uid, selectedUser.uid);

// //     const unsubscribe = onSnapshot(doc(db, "chats", chatId), (docSnapshot) => {
// //       if (docSnapshot.exists()) {
// //         const data = docSnapshot.data();
// //         setTyping(data[`typing_${selectedUser.uid}`] || false);
// //       }
// //     });

// //     return unsubscribe;
// //   }, [currentUser, selectedUser]);

// //   // Filter messages based on search
// //   useEffect(() => {
// //     if (!searchTerm.trim()) {
// //       setFilteredMessages(messages);
// //       return;
// //     }

// //     const filtered = messages.filter((msg) =>
// //       msg.text?.toLowerCase().includes(searchTerm.toLowerCase())
// //     );
// //     setFilteredMessages(filtered);
// //   }, [searchTerm, messages]);

// //   const getChatId = (uid1, uid2) => {
// //     return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
// //   };

// //   // Send message
// //   const sendMessage = async (
// //     text,
// //     type = "text",
// //     mediaUrl = null,
// //     options = {}
// //   ) => {
// //     if (!currentUser || !selectedUser) return;

// //     const chatId = getChatId(currentUser.uid, selectedUser.uid);

// //     const {
// //       selfDestruct = false,
// //       destructTime = 10000,
// //       encrypted = true,
// //     } = options;

// //     try {
// //       const messageData = {
// //         text: encrypted && text ? encryptMessage(text) : text,
// //         type: type,
// //         mediaUrl: mediaUrl,
// //         senderId: currentUser.uid,
// //         senderName: currentUser.displayName,
// //         senderPhoto: currentUser.photoURL || null,
// //         receiverId: selectedUser.uid,
// //         timestamp: serverTimestamp(),
// //         read: false,
// //         encrypted: encrypted,
// //         selfDestruct: selfDestruct,
// //         destructTime: destructTime,
// //         reactions: {},
// //         pinned: false,
// //         fileName: options.fileName || null,
// //         fileSize: options.fileSize || null,
// //       };

// //       const docRef = await addDoc(
// //         collection(db, "chats", chatId, "messages"),
// //         messageData
// //       );

// //       if (selfDestruct) {
// //         setTimeout(async () => {
// //           try {
// //             await deleteDoc(doc(db, "chats", chatId, "messages", docRef.id));
// //           } catch (error) {
// //             console.error("Error deleting message:", error);
// //           }
// //         }, destructTime);
// //       }
// //     } catch (error) {
// //       console.error("Error sending message:", error);
// //       toast.error("Failed to send message");
// //       throw error;
// //     }
// //   };

// //   // Add reaction
// //   const addReaction = async (messageId, emoji) => {
// //     if (!currentUser || !selectedUser) return;

// //     const chatId = getChatId(currentUser.uid, selectedUser.uid);

// //     try {
// //       const messageRef = doc(db, "chats", chatId, "messages", messageId);
// //       await updateDoc(messageRef, {
// //         [`reactions.${currentUser.uid}`]: emoji,
// //       });
// //     } catch (error) {
// //       console.error("Error adding reaction:", error);
// //     }
// //   };

// //   // Delete message
// //   const deleteMessage = async (messageId) => {
// //     if (!currentUser || !selectedUser) return;

// //     const chatId = getChatId(currentUser.uid, selectedUser.uid);

// //     try {
// //       await deleteDoc(doc(db, "chats", chatId, "messages", messageId));
// //       toast.success("Message deleted");
// //     } catch (error) {
// //       console.error("Error deleting message:", error);
// //       toast.error("Failed to delete message");
// //     }
// //   };

// //   // Copy message
// //   const copyMessage = (text) => {
// //     navigator.clipboard.writeText(text);
// //     toast.success("Copied to clipboard");
// //   };

// //   // Pin message
// //   const pinMessage = async (messageId) => {
// //     if (!currentUser || !selectedUser) return;

// //     const chatId = getChatId(currentUser.uid, selectedUser.uid);

// //     try {
// //       const messageRef = doc(db, "chats", chatId, "messages", messageId);
// //       await updateDoc(messageRef, {
// //         pinned: true,
// //       });
// //       toast.success("Message pinned");
// //     } catch (error) {
// //       console.error("Error pinning message:", error);
// //       toast.error("Failed to pin message");
// //     }
// //   };

// //   // Unpin message
// //   const unpinMessage = async (messageId) => {
// //     if (!currentUser || !selectedUser) return;

// //     const chatId = getChatId(currentUser.uid, selectedUser.uid);

// //     try {
// //       const messageRef = doc(db, "chats", chatId, "messages", messageId);
// //       await updateDoc(messageRef, {
// //         pinned: false,
// //       });
// //       toast.success("Message unpinned");
// //     } catch (error) {
// //       console.error("Error unpinning message:", error);
// //     }
// //   };

// //   // Block user
// //   const blockUser = async (userId) => {
// //     try {
// //       await updateDoc(doc(db, "users", currentUser.uid), {
// //         blockedUsers: arrayUnion(userId),
// //       });
// //       setBlockedUsers([...blockedUsers, userId]);
// //       toast.success("User blocked");
// //     } catch (error) {
// //       console.error("Error blocking user:", error);
// //       toast.error("Failed to block user");
// //     }
// //   };

// //   // Unblock user
// //   const unblockUser = async (userId) => {
// //     try {
// //       await updateDoc(doc(db, "users", currentUser.uid), {
// //         blockedUsers: arrayRemove(userId),
// //       });
// //       setBlockedUsers(blockedUsers.filter((id) => id !== userId));
// //       toast.success("User unblocked");
// //     } catch (error) {
// //       console.error("Error unblocking user:", error);
// //       toast.error("Failed to unblock user");
// //     }
// //   };

// //   // FRIEND REQUEST FUNCTIONS

// //   // Send Friend Request
// //   const sendFriendRequest = async (userId) => {
// //     if (!currentUser) return;

// //     try {
// //       // Add to sender's sent requests
// //       await updateDoc(doc(db, "users", currentUser.uid), {
// //         sentRequests: arrayUnion(userId),
// //       });

// //       // Add to receiver's pending requests
// //       await updateDoc(doc(db, "users", userId), {
// //         pendingRequests: arrayUnion(currentUser.uid),
// //       });

// //       toast.success("Friend request sent!");
// //     } catch (error) {
// //       console.error("Error sending friend request:", error);
// //       toast.error("Failed to send friend request");
// //     }
// //   };

// //   // Accept Friend Request
// //   const acceptFriendRequest = async (userId) => {
// //     if (!currentUser) return;

// //     try {
// //       // Add to both users' friends lists
// //       await updateDoc(doc(db, "users", currentUser.uid), {
// //         friends: arrayUnion(userId),
// //         pendingRequests: arrayRemove(userId),
// //       });

// //       await updateDoc(doc(db, "users", userId), {
// //         friends: arrayUnion(currentUser.uid),
// //         sentRequests: arrayRemove(currentUser.uid),
// //       });

// //       toast.success("Friend request accepted!");
// //     } catch (error) {
// //       console.error("Error accepting friend request:", error);
// //       toast.error("Failed to accept request");
// //     }
// //   };

// //   // Reject Friend Request
// //   const rejectFriendRequest = async (userId) => {
// //     if (!currentUser) return;

// //     try {
// //       // Remove from pending requests
// //       await updateDoc(doc(db, "users", currentUser.uid), {
// //         pendingRequests: arrayRemove(userId),
// //       });

// //       // Remove from sender's sent requests
// //       await updateDoc(doc(db, "users", userId), {
// //         sentRequests: arrayRemove(currentUser.uid),
// //       });

// //       toast.success("Friend request rejected");
// //     } catch (error) {
// //       console.error("Error rejecting friend request:", error);
// //       toast.error("Failed to reject request");
// //     }
// //   };

// //   // Remove Friend
// //   const removeFriend = async (userId) => {
// //     if (!currentUser) return;

// //     if (!window.confirm("Remove this friend?")) return;

// //     try {
// //       // Remove from both users' friends lists
// //       await updateDoc(doc(db, "users", currentUser.uid), {
// //         friends: arrayRemove(userId),
// //       });

// //       await updateDoc(doc(db, "users", userId), {
// //         friends: arrayRemove(currentUser.uid),
// //       });

// //       toast.success("Friend removed");
// //       setSelectedUser(null);
// //     } catch (error) {
// //       console.error("Error removing friend:", error);
// //       toast.error("Failed to remove friend");
// //     }
// //   };

// //   // Set typing status
// //   const setTypingStatus = async (isTyping) => {
// //     if (!currentUser || !selectedUser) return;

// //     const chatId = getChatId(currentUser.uid, selectedUser.uid);

// //     try {
// //       const chatRef = doc(db, "chats", chatId);
// //       await setDoc(
// //         chatRef,
// //         {
// //           [`typing_${currentUser.uid}`]: isTyping,
// //           participants: [currentUser.uid, selectedUser.uid],
// //         },
// //         { merge: true }
// //       );
// //     } catch (error) {
// //       console.error("Error setting typing status:", error);
// //     }
// //   };

// //   // Search messages
// //   const searchMessages = (term) => {
// //     setSearchTerm(term);
// //   };

// //   const value = {
// //     messages: filteredMessages,
// //     users,
// //     blockedUsers,
// //     selectedUser,
// //     setSelectedUser,
// //     sendMessage,
// //     addReaction,
// //     deleteMessage,
// //     copyMessage,
// //     pinMessage,
// //     unpinMessage,
// //     blockUser,
// //     unblockUser,
// //     sendFriendRequest, // Added
// //     acceptFriendRequest, // Added
// //     rejectFriendRequest, // Added
// //     removeFriend, // Added
// //     setTypingStatus,
// //     searchMessages,
// //     typing,
// //     loading,
// //     showMediaGallery,
// //     setShowMediaGallery,
// //   };

// //   return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
// // };

// import { createContext, useContext, useState, useEffect, useRef } from "react";
// import { useAuth } from "./AuthContext";
// import {
//   collection,
//   query,
//   orderBy,
//   onSnapshot,
//   addDoc,
//   updateDoc,
//   doc,
//   serverTimestamp,
//   where,
//   getDocs,
//   getDoc,
//   setDoc,
//   arrayUnion,
//   arrayRemove,
//   deleteDoc,
// } from "firebase/firestore";
// import { db } from "../config/firebase";
// import toast from "react-hot-toast";

// const ChatContext = createContext();

// export const useChat = () => {
//   const context = useContext(ChatContext);
//   if (!context) {
//     throw new Error("useChat must be used within ChatProvider");
//   }
//   return context;
// };

// export const ChatProvider = ({ children }) => {
//   const { currentUser } = useAuth();
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [typing, setTyping] = useState(false); // Other user typing
//   const [searchTerm, setSearchTerm] = useState("");
//   const [blockedUsers, setBlockedUsers] = useState([]);

//   const typingTimeoutRef = useRef(null);

//   // Generate chat ID
//   const getChatId = (uid1, uid2) => {
//     return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
//   };

//   // Load all users
//   useEffect(() => {
//     if (!currentUser) return;

//     const usersRef = collection(db, "users");
//     const q = query(usersRef, where("uid", "!=", currentUser.uid));

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const usersList = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setUsers(usersList);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, [currentUser]);

//   // Load blocked users
//   useEffect(() => {
//     if (!currentUser) return;

//     const loadBlockedUsers = async () => {
//       try {
//         const userDoc = await getDoc(doc(db, "users", currentUser.uid));
//         if (userDoc.exists()) {
//           setBlockedUsers(userDoc.data().blockedUsers || []);
//         }
//       } catch (error) {
//         console.error("Error loading blocked users:", error);
//       }
//     };

//     loadBlockedUsers();
//   }, [currentUser]);

//   // Listen for typing status from OTHER user
//   useEffect(() => {
//     if (!currentUser || !selectedUser) {
//       setTyping(false);
//       return;
//     }

//     const chatId = getChatId(currentUser.uid, selectedUser.uid);
//     const chatRef = doc(db, "chats", chatId);

//     const unsubscribe = onSnapshot(chatRef, (docSnap) => {
//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         // Check if the OTHER user is typing
//         const otherUserTyping = data[`${selectedUser.uid}_typing`] || false;
//         setTyping(otherUserTyping);
//       }
//     });

//     return () => unsubscribe();
//   }, [currentUser, selectedUser]);

//   // Load messages for selected user
//   useEffect(() => {
//     if (!currentUser || !selectedUser) {
//       setMessages([]);
//       return;
//     }

//     const chatId = getChatId(currentUser.uid, selectedUser.uid);
//     const messagesRef = collection(db, "chats", chatId, "messages");
//     const q = query(messagesRef, orderBy("timestamp", "asc"));

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const messagesList = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setMessages(messagesList);
//     });

//     return () => unsubscribe();
//   }, [currentUser, selectedUser]);

//   // Send message
//   const sendMessage = async (
//     text,
//     type = "text",
//     fileUrl = null,
//     metadata = {}
//   ) => {
//     if (!currentUser || !selectedUser) return;

//     try {
//       const chatId = getChatId(currentUser.uid, selectedUser.uid);
//       const messagesRef = collection(db, "chats", chatId, "messages");

//       await addDoc(messagesRef, {
//         text,
//         type,
//         fileUrl,
//         metadata,
//         senderId: currentUser.uid,
//         receiverId: selectedUser.uid,
//         timestamp: serverTimestamp(),
//         read: false,
//         reactions: {},
//         pinned: false,
//       });

//       // Update last message in chat
//       const chatRef = doc(db, "chats", chatId);
//       await setDoc(
//         chatRef,
//         {
//           lastMessage: text || `Sent a ${type}`,
//           lastMessageTime: serverTimestamp(),
//           participants: [currentUser.uid, selectedUser.uid],
//           [`${currentUser.uid}_typing`]: false, // Stop typing when message sent
//         },
//         { merge: true }
//       );
//     } catch (error) {
//       console.error("Error sending message:", error);
//       throw error;
//     }
//   };

//   // Delete message
//   const deleteMessage = async (messageId) => {
//     if (!currentUser || !selectedUser) return;

//     try {
//       const chatId = getChatId(currentUser.uid, selectedUser.uid);
//       const messageRef = doc(db, "chats", chatId, "messages", messageId);
//       await deleteDoc(messageRef);
//       toast.success("Message deleted");
//     } catch (error) {
//       console.error("Error deleting message:", error);
//       toast.error("Failed to delete message");
//     }
//   };

//   // Pin/Unpin message
//   const togglePinMessage = async (messageId, currentPinned) => {
//     if (!currentUser || !selectedUser) return;

//     try {
//       const chatId = getChatId(currentUser.uid, selectedUser.uid);
//       const messageRef = doc(db, "chats", chatId, "messages", messageId);
//       await updateDoc(messageRef, {
//         pinned: !currentPinned,
//       });
//       toast.success(currentPinned ? "Message unpinned" : "Message pinned");
//     } catch (error) {
//       console.error("Error toggling pin:", error);
//       toast.error("Failed to update message");
//     }
//   };

//   // Add reaction
//   const addReaction = async (messageId, emoji) => {
//     if (!currentUser || !selectedUser) return;

//     try {
//       const chatId = getChatId(currentUser.uid, selectedUser.uid);
//       const messageRef = doc(db, "chats", chatId, "messages", messageId);

//       await updateDoc(messageRef, {
//         [`reactions.${currentUser.uid}`]: emoji,
//       });
//     } catch (error) {
//       console.error("Error adding reaction:", error);
//       toast.error("Failed to add reaction");
//     }
//   };

//   // Remove reaction
//   const removeReaction = async (messageId) => {
//     if (!currentUser || !selectedUser) return;

//     try {
//       const chatId = getChatId(currentUser.uid, selectedUser.uid);
//       const messageRef = doc(db, "chats", chatId, "messages", messageId);

//       await updateDoc(messageRef, {
//         [`reactions.${currentUser.uid}`]: null,
//       });
//     } catch (error) {
//       console.error("Error removing reaction:", error);
//     }
//   };

//   // Set typing status (THIS IS THE FIX!)
//   const setTypingStatus = async (isTyping) => {
//     if (!currentUser || !selectedUser) return;

//     try {
//       const chatId = getChatId(currentUser.uid, selectedUser.uid);
//       const chatRef = doc(db, "chats", chatId);

//       // Update YOUR typing status in Firebase
//       await setDoc(
//         chatRef,
//         {
//           [`${currentUser.uid}_typing`]: isTyping,
//           participants: [currentUser.uid, selectedUser.uid],
//         },
//         { merge: true }
//       );

//       // Auto-clear typing after 3 seconds
//       if (typingTimeoutRef.current) {
//         clearTimeout(typingTimeoutRef.current);
//       }

//       if (isTyping) {
//         typingTimeoutRef.current = setTimeout(async () => {
//           await setDoc(
//             chatRef,
//             {
//               [`${currentUser.uid}_typing`]: false,
//             },
//             { merge: true }
//           );
//         }, 3000);
//       }
//     } catch (error) {
//       console.error("Error setting typing status:", error);
//     }
//   };

//   // Search messages
//   const searchMessages = (term) => {
//     setSearchTerm(term);
//   };

//   // Filter messages based on search
//   const filteredMessages = searchTerm
//     ? messages.filter((msg) =>
//         msg.text?.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     : messages;

//   // Block user
//   const blockUser = async (userId) => {
//     if (!currentUser) return;

//     try {
//       const userRef = doc(db, "users", currentUser.uid);
//       await updateDoc(userRef, {
//         blockedUsers: arrayUnion(userId),
//       });

//       setBlockedUsers((prev) => [...prev, userId]);
//       toast.success("User blocked");
//     } catch (error) {
//       console.error("Error blocking user:", error);
//       toast.error("Failed to block user");
//     }
//   };

//   // Unblock user
//   const unblockUser = async (userId) => {
//     if (!currentUser) return;

//     try {
//       const userRef = doc(db, "users", currentUser.uid);
//       await updateDoc(userRef, {
//         blockedUsers: arrayRemove(userId),
//       });

//       setBlockedUsers((prev) => prev.filter((id) => id !== userId));
//       toast.success("User unblocked");
//     } catch (error) {
//       console.error("Error unblocking user:", error);
//       toast.error("Failed to unblock user");
//     }
//   };

//   // Clear chat
//   const clearChat = async (userId) => {
//     if (!currentUser) return;

//     try {
//       const chatId = getChatId(currentUser.uid, userId);
//       const messagesRef = collection(db, "chats", chatId, "messages");

//       const messagesSnapshot = await getDocs(messagesRef);

//       const deletePromises = messagesSnapshot.docs.map((doc) =>
//         deleteDoc(doc.ref)
//       );

//       await Promise.all(deletePromises);

//       toast.success("Chat cleared!");
//     } catch (error) {
//       console.error("Error clearing chat:", error);
//       toast.error("Failed to clear chat");
//     }
//   };

//   const value = {
//     selectedUser,
//     setSelectedUser,
//     messages: filteredMessages,
//     users,
//     loading,
//     typing, // This is now OTHER user's typing status
//     sendMessage,
//     deleteMessage,
//     togglePinMessage,
//     addReaction,
//     removeReaction,
//     setTypingStatus,
//     searchMessages,
//     blockUser,
//     unblockUser,
//     blockedUsers,
//     clearChat,
//     getChatId,
//   };

//   return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
// };

import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  where,
  getDocs,
  getDoc,
  setDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import toast from "react-hot-toast";

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within ChatProvider");
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typing, setTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [blockedUsers, setBlockedUsers] = useState([]);

  const typingTimeoutRef = useRef(null);

  const getChatId = (uid1, uid2) => {
    return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
  };

  // Load users
  useEffect(() => {
    if (!currentUser) return;

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "!=", currentUser.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Load blocked users
  useEffect(() => {
    if (!currentUser) return;

    const loadBlockedUsers = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setBlockedUsers(userDoc.data().blockedUsers || []);
        }
      } catch (error) {
        console.error("Error loading blocked users:", error);
      }
    };

    loadBlockedUsers();
  }, [currentUser]);

  // Listen for other user's typing status
  useEffect(() => {
    if (!currentUser || !selectedUser) {
      setTyping(false);
      return;
    }

    const chatId = getChatId(currentUser.uid, selectedUser.uid);
    const chatRef = doc(db, "chats", chatId);

    const unsubscribe = onSnapshot(chatRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const otherUserTyping = data[`${selectedUser.uid}_typing`] || false;
        setTyping(otherUserTyping);
      }
    });

    return () => unsubscribe();
  }, [currentUser, selectedUser]);

  // Load messages
  useEffect(() => {
    if (!currentUser || !selectedUser) {
      setMessages([]);
      return;
    }

    const chatId = getChatId(currentUser.uid, selectedUser.uid);
    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesList);
    });

    return () => unsubscribe();
  }, [currentUser, selectedUser]);

  // Send message
  const sendMessage = async (
    text,
    type = "text",
    fileUrl = null,
    metadata = {}
  ) => {
    if (!currentUser || !selectedUser) return;

    try {
      const chatId = getChatId(currentUser.uid, selectedUser.uid);
      const messagesRef = collection(db, "chats", chatId, "messages");

      await addDoc(messagesRef, {
        text,
        type,
        fileUrl,
        metadata,
        senderId: currentUser.uid,
        receiverId: selectedUser.uid,
        timestamp: serverTimestamp(),
        read: false,
        reactions: {},
        pinned: false,
      });

      const chatRef = doc(db, "chats", chatId);
      await setDoc(
        chatRef,
        {
          lastMessage: text || `Sent a ${type}`,
          lastMessageTime: serverTimestamp(),
          participants: [currentUser.uid, selectedUser.uid],
          [`${currentUser.uid}_typing`]: false,
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  };

  // Delete message
  const deleteMessage = async (messageId) => {
    if (!currentUser || !selectedUser) return;

    try {
      const chatId = getChatId(currentUser.uid, selectedUser.uid);
      const messageRef = doc(db, "chats", chatId, "messages", messageId);
      await deleteDoc(messageRef);
      toast.success("Message deleted");
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    }
  };

  // Pin/Unpin message
  const togglePinMessage = async (messageId, currentPinned) => {
    if (!currentUser || !selectedUser) return;

    try {
      const chatId = getChatId(currentUser.uid, selectedUser.uid);
      const messageRef = doc(db, "chats", chatId, "messages", messageId);
      await updateDoc(messageRef, {
        pinned: !currentPinned,
      });
      toast.success(currentPinned ? "Message unpinned" : "Message pinned");
    } catch (error) {
      console.error("Error toggling pin:", error);
      toast.error("Failed to update message");
    }
  };

  // Add reaction
  const addReaction = async (messageId, emoji) => {
    if (!currentUser || !selectedUser) return;

    try {
      const chatId = getChatId(currentUser.uid, selectedUser.uid);
      const messageRef = doc(db, "chats", chatId, "messages", messageId);

      await updateDoc(messageRef, {
        [`reactions.${currentUser.uid}`]: emoji,
      });
    } catch (error) {
      console.error("Error adding reaction:", error);
      toast.error("Failed to add reaction");
    }
  };

  // Remove reaction
  const removeReaction = async (messageId) => {
    if (!currentUser || !selectedUser) return;

    try {
      const chatId = getChatId(currentUser.uid, selectedUser.uid);
      const messageRef = doc(db, "chats", chatId, "messages", messageId);

      await updateDoc(messageRef, {
        [`reactions.${currentUser.uid}`]: null,
      });
    } catch (error) {
      console.error("Error removing reaction:", error);
    }
  };

  // Set typing status
  const setTypingStatus = async (isTyping) => {
    if (!currentUser || !selectedUser) return;

    try {
      const chatId = getChatId(currentUser.uid, selectedUser.uid);
      const chatRef = doc(db, "chats", chatId);

      await setDoc(
        chatRef,
        {
          [`${currentUser.uid}_typing`]: isTyping,
          participants: [currentUser.uid, selectedUser.uid],
        },
        { merge: true }
      );

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      if (isTyping) {
        typingTimeoutRef.current = setTimeout(async () => {
          await setDoc(
            chatRef,
            {
              [`${currentUser.uid}_typing`]: false,
            },
            { merge: true }
          );
        }, 3000);
      }
    } catch (error) {
      console.error("Error setting typing status:", error);
    }
  };

  // Search messages
  const searchMessages = (term) => {
    setSearchTerm(term);
  };

  const filteredMessages = searchTerm
    ? messages.filter((msg) =>
        msg.text?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : messages;

  // Block user
  const blockUser = async (userId) => {
    if (!currentUser) return;

    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        blockedUsers: arrayUnion(userId),
      });

      setBlockedUsers((prev) => [...prev, userId]);
      toast.success("User blocked");
    } catch (error) {
      console.error("Error blocking user:", error);
      toast.error("Failed to block user");
    }
  };

  // Unblock user
  const unblockUser = async (userId) => {
    if (!currentUser) return;

    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        blockedUsers: arrayRemove(userId),
      });

      setBlockedUsers((prev) => prev.filter((id) => id !== userId));
      toast.success("User unblocked");
    } catch (error) {
      console.error("Error unblocking user:", error);
      toast.error("Failed to unblock user");
    }
  };

  // Clear chat
  const clearChat = async (userId) => {
    if (!currentUser) return;

    try {
      const chatId = getChatId(currentUser.uid, userId);
      const messagesRef = collection(db, "chats", chatId, "messages");

      const messagesSnapshot = await getDocs(messagesRef);

      const deletePromises = messagesSnapshot.docs.map((doc) =>
        deleteDoc(doc.ref)
      );

      await Promise.all(deletePromises);

      toast.success("Chat cleared!");
    } catch (error) {
      console.error("Error clearing chat:", error);
      toast.error("Failed to clear chat");
    }
  };

  const value = {
    selectedUser,
    setSelectedUser,
    messages: filteredMessages,
    users,
    loading,
    typing,
    sendMessage,
    deleteMessage,
    togglePinMessage,
    addReaction,
    removeReaction,
    setTypingStatus,
    searchMessages,
    blockUser,
    unblockUser,
    blockedUsers,
    clearChat,
    getChatId,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
