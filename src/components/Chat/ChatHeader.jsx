// // import React, { useState, useEffect, useRef } from "react";
// // import { useChat } from "../../context/ChatContext";
// // import {
// //   FiPhone,
// //   FiVideo,
// //   FiSearch,
// //   FiMoreVertical,
// //   FiUserX,
// //   FiUserCheck,
// //   FiX,
// // } from "react-icons/fi";
// // import { format } from "date-fns";

// // const ChatHeader = () => {
// //   const { selectedUser, searchMessages, blockUser, unblockUser, blockedUsers } =
// //     useChat();
// //   const [showSearch, setShowSearch] = useState(false);
// //   const [showMenu, setShowMenu] = useState(false);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const menuRef = useRef(null);

// //   const isBlocked = blockedUsers?.includes(selectedUser?.uid);

// //   // Auto-close menu when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (e) => {
// //       if (menuRef.current && !menuRef.current.contains(e.target)) {
// //         setShowMenu(false);
// //       }
// //     };

// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   // Auto-close search when switching users
// //   useEffect(() => {
// //     setShowSearch(false);
// //     setSearchTerm("");
// //     searchMessages("");
// //     setShowMenu(false);
// //   }, [selectedUser]);

// //   const handleSearch = (value) => {
// //     setSearchTerm(value);
// //     searchMessages(value);
// //   };

// //   const handleCloseSearch = () => {
// //     setShowSearch(false);
// //     setSearchTerm("");
// //     searchMessages("");
// //   };

// //   const handleBlockUnblock = () => {
// //     if (isBlocked) {
// //       unblockUser(selectedUser.uid);
// //     } else {
// //       blockUser(selectedUser.uid);
// //     }
// //     setShowMenu(false); // Close menu after action
// //   };

// //   const formatLastSeen = (timestamp) => {
// //     if (!timestamp) return "Offline";
// //     const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
// //     const now = new Date();
// //     const diff = now - date;

// //     if (diff < 60000) return "Online";
// //     if (diff < 3600000) return `Last seen ${Math.floor(diff / 60000)}m ago`;
// //     if (diff < 86400000) return `Last seen at ${format(date, "HH:mm")}`;
// //     return `Last seen ${format(date, "dd MMM")}`;
// //   };

// //   return (
// //     <>
// //       {/* Search Bar */}
// //       {showSearch && (
// //         <div className="h-16 px-4 flex items-center gap-3 border-b border-[var(--border-color)] bg-[var(--bg-secondary)] animate-fadeIn">
// //           <FiSearch className="text-[var(--accent-cyan)]" size={20} />
// //           <input
// //             type="text"
// //             value={searchTerm}
// //             onChange={(e) => handleSearch(e.target.value)}
// //             placeholder="Search messages..."
// //             autoFocus
// //             className="flex-1 bg-transparent text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none font-medium"
// //           />
// //           {searchTerm && (
// //             <span className="text-xs text-[var(--text-secondary)] font-semibold">
// //               Press ESC to close
// //             </span>
// //           )}
// //           <button
// //             onClick={handleCloseSearch}
// //             className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-red-500 hover:bg-red-500/10 transition-all btn-3d"
// //           >
// //             <FiX size={20} />
// //           </button>
// //         </div>
// //       )}

// //       {/* Header */}
// //       <div className="h-16 px-4 flex items-center justify-between border-b border-[var(--border-color)] bg-gradient-to-r from-[var(--bg-secondary)] to-[var(--bg-tertiary)]">
// //         {/* User Info */}
// //         <div className="flex items-center gap-3">
// //           <div className="relative">
// //             {selectedUser?.photoURL ? (
// //               <img
// //                 src={selectedUser.photoURL}
// //                 alt={selectedUser.displayName}
// //                 className="w-11 h-11 rounded-full object-cover ring-2 ring-[var(--accent-cyan)]/30"
// //               />
// //             ) : (
// //               <div className="w-11 h-11 rounded-full gradient-btn flex items-center justify-center text-white font-semibold text-sm">
// //                 {selectedUser?.displayName?.charAt(0).toUpperCase()}
// //               </div>
// //             )}
// //             {selectedUser?.isOnline && (
// //               <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 border-2 border-[var(--bg-secondary)] rounded-full"></div>
// //             )}
// //           </div>
// //           <div>
// //             <h3 className="text-base font-bold text-[var(--text-primary)]">
// //               {selectedUser?.displayName}
// //             </h3>
// //             <p className="text-xs font-medium">
// //               {selectedUser?.isOnline ? (
// //                 <span className="text-green-400">● Online</span>
// //               ) : (
// //                 <span className="text-[var(--accent-cyan)]">
// //                   {formatLastSeen(selectedUser?.lastSeen)}
// //                 </span>
// //               )}
// //             </p>
// //           </div>
// //         </div>

// //         {/* Actions */}
// //         <div className="flex items-center gap-1">
// //           <button
// //             onClick={() => alert("Voice call coming soon!")}
// //             className="p-2.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--hover-bg)] transition-all btn-3d"
// //             title="Voice Call"
// //           >
// //             <FiPhone size={20} />
// //           </button>

// //           <button
// //             onClick={() => alert("Video call coming soon!")}
// //             className="p-2.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--hover-bg)] transition-all btn-3d"
// //             title="Video Call"
// //           >
// //             <FiVideo size={20} />
// //           </button>

// //           <button
// //             onClick={() => setShowSearch(!showSearch)}
// //             className={`p-2.5 rounded-lg transition-all btn-3d ${
// //               showSearch
// //                 ? "text-[var(--accent-cyan)] bg-[var(--hover-bg)]"
// //                 : "text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--hover-bg)]"
// //             }`}
// //             title="Search Messages"
// //           >
// //             <FiSearch size={20} />
// //           </button>

// //           <div className="relative" ref={menuRef}>
// //             <button
// //               onClick={() => setShowMenu(!showMenu)}
// //               className={`p-2.5 rounded-lg transition-all btn-3d ${
// //                 showMenu
// //                   ? "text-[var(--accent-cyan)] bg-[var(--hover-bg)]"
// //                   : "text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--hover-bg)]"
// //               }`}
// //             >
// //               <FiMoreVertical size={20} />
// //             </button>

// //             {showMenu && (
// //               <div className="absolute top-full right-0 mt-2 glass-effect rounded-xl shadow-2xl py-2 z-20 min-w-[180px] animate-fadeIn">
// //                 <button
// //                   onClick={handleBlockUnblock}
// //                   className={`flex items-center gap-3 px-4 py-3 w-full text-left text-sm transition-all font-semibold ${
// //                     isBlocked
// //                       ? "text-green-400 hover:bg-green-500/10"
// //                       : "text-red-400 hover:bg-red-500/10"
// //                   }`}
// //                 >
// //                   {isBlocked ? (
// //                     <FiUserCheck size={18} />
// //                   ) : (
// //                     <FiUserX size={18} />
// //                   )}
// //                   {isBlocked ? "Unblock User" : "Block User"}
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default ChatHeader;

// // import React, { useState, useEffect, useRef } from "react";
// // import { useChat } from "../../context/ChatContext";
// // import {
// //   FiPhone,
// //   FiVideo,
// //   FiSearch,
// //   FiMoreVertical,
// //   FiUserX,
// //   FiUserCheck,
// //   FiX,
// //   FiDroplet, // Using this as paint/customize icon
// // } from "react-icons/fi";
// // import { format } from "date-fns";
// // import ChatCustomizer from "../Features/ChatCustomizer";

// // const ChatHeader = () => {
// //   const { selectedUser, searchMessages, blockUser, unblockUser, blockedUsers } =
// //     useChat();
// //   const [showSearch, setShowSearch] = useState(false);
// //   const [showMenu, setShowMenu] = useState(false);
// //   const [showCustomizer, setShowCustomizer] = useState(false);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const menuRef = useRef(null);

// //   const isBlocked = blockedUsers?.includes(selectedUser?.uid);

// //   // Auto-close menu when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (e) => {
// //       if (menuRef.current && !menuRef.current.contains(e.target)) {
// //         setShowMenu(false);
// //       }
// //     };

// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   // Auto-close search when switching users
// //   useEffect(() => {
// //     setShowSearch(false);
// //     setSearchTerm("");
// //     searchMessages("");
// //     setShowMenu(false);
// //   }, [selectedUser]);

// //   const handleSearch = (value) => {
// //     setSearchTerm(value);
// //     searchMessages(value);
// //   };

// //   const handleCloseSearch = () => {
// //     setShowSearch(false);
// //     setSearchTerm("");
// //     searchMessages("");
// //   };

// //   const handleBlockUnblock = () => {
// //     if (isBlocked) {
// //       unblockUser(selectedUser.uid);
// //     } else {
// //       blockUser(selectedUser.uid);
// //     }
// //     setShowMenu(false);
// //   };

// //   const formatLastSeen = (timestamp) => {
// //     if (!timestamp) return "Offline";
// //     const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
// //     const now = new Date();
// //     const diff = now - date;

// //     if (diff < 60000) return "Online";
// //     if (diff < 3600000) return `Last seen ${Math.floor(diff / 60000)}m ago`;
// //     if (diff < 86400000) return `Last seen at ${format(date, "HH:mm")}`;
// //     return `Last seen ${format(date, "dd MMM")}`;
// //   };

// //   return (
// //     <>
// //       {/* Search Bar */}
// //       {showSearch && (
// //         <div className="h-16 px-4 flex items-center gap-3 border-b border-[var(--border-color)] bg-[var(--bg-secondary)] animate-fadeIn">
// //           <FiSearch className="text-[var(--accent-cyan)]" size={20} />
// //           <input
// //             type="text"
// //             value={searchTerm}
// //             onChange={(e) => handleSearch(e.target.value)}
// //             placeholder="Search messages..."
// //             autoFocus
// //             className="flex-1 bg-transparent text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none font-medium"
// //           />
// //           {searchTerm && (
// //             <span className="text-xs text-[var(--text-secondary)] font-semibold">
// //               Press ESC to close
// //             </span>
// //           )}
// //           <button
// //             onClick={handleCloseSearch}
// //             className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-red-500 hover:bg-red-500/10 transition-all btn-3d"
// //           >
// //             <FiX size={20} />
// //           </button>
// //         </div>
// //       )}

// //       {/* Header */}
// //       <div className="h-16 px-4 flex items-center justify-between border-b border-[var(--border-color)] bg-gradient-to-r from-[var(--bg-secondary)] to-[var(--bg-tertiary)]">
// //         {/* User Info */}
// //         <div className="flex items-center gap-3">
// //           <div className="relative">
// //             {selectedUser?.photoURL ? (
// //               <img
// //                 src={selectedUser.photoURL}
// //                 alt={selectedUser.displayName}
// //                 className="w-11 h-11 rounded-full object-cover ring-2 ring-[var(--accent-cyan)]/30"
// //               />
// //             ) : (
// //               <div className="w-11 h-11 rounded-full gradient-btn flex items-center justify-center text-white font-semibold text-sm">
// //                 {selectedUser?.displayName?.charAt(0).toUpperCase()}
// //               </div>
// //             )}
// //             {selectedUser?.isOnline && (
// //               <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 border-2 border-[var(--bg-secondary)] rounded-full"></div>
// //             )}
// //           </div>
// //           <div>
// //             <h3 className="text-base font-bold text-[var(--text-primary)]">
// //               {selectedUser?.displayName}
// //             </h3>
// //             <p className="text-xs font-medium">
// //               {selectedUser?.isOnline ? (
// //                 <span className="text-green-400">● Online</span>
// //               ) : (
// //                 <span className="text-[var(--accent-cyan)]">
// //                   {formatLastSeen(selectedUser?.lastSeen)}
// //                 </span>
// //               )}
// //             </p>
// //           </div>
// //         </div>

// //         {/* Actions */}
// //         <div className="flex items-center gap-1">
// //           {/* Customize Button - Using Paint Brush Emoji */}
// //           <button
// //             onClick={() => setShowCustomizer(true)}
// //             className="p-2.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--hover-bg)] transition-all btn-3d"
// //             title="Customize Chat"
// //           >
// //             <span className="text-xl">🎨</span>
// //           </button>

// //           <button
// //             onClick={() => alert("Voice call coming soon!")}
// //             className="p-2.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--hover-bg)] transition-all btn-3d"
// //             title="Voice Call"
// //           >
// //             <FiPhone size={20} />
// //           </button>

// //           <button
// //             onClick={() => alert("Video call coming soon!")}
// //             className="p-2.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--hover-bg)] transition-all btn-3d"
// //             title="Video Call"
// //           >
// //             <FiVideo size={20} />
// //           </button>

// //           <button
// //             onClick={() => setShowSearch(!showSearch)}
// //             className={`p-2.5 rounded-lg transition-all btn-3d ${
// //               showSearch
// //                 ? "text-[var(--accent-cyan)] bg-[var(--hover-bg)]"
// //                 : "text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--hover-bg)]"
// //             }`}
// //             title="Search Messages"
// //           >
// //             <FiSearch size={20} />
// //           </button>

// //           <div className="relative" ref={menuRef}>
// //             <button
// //               onClick={() => setShowMenu(!showMenu)}
// //               className={`p-2.5 rounded-lg transition-all btn-3d ${
// //                 showMenu
// //                   ? "text-[var(--accent-cyan)] bg-[var(--hover-bg)]"
// //                   : "text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--hover-bg)]"
// //               }`}
// //             >
// //               <FiMoreVertical size={20} />
// //             </button>

// //             {showMenu && (
// //               <div className="absolute top-full right-0 mt-2 glass-effect rounded-xl shadow-2xl py-2 z-20 min-w-[180px] animate-fadeIn border border-[var(--border-color)]">
// //                 <button
// //                   onClick={handleBlockUnblock}
// //                   className={`flex items-center gap-3 px-4 py-3 w-full text-left text-sm transition-all font-semibold ${
// //                     isBlocked
// //                       ? "text-green-400 hover:bg-green-500/10"
// //                       : "text-red-400 hover:bg-red-500/10"
// //                   }`}
// //                 >
// //                   {isBlocked ? (
// //                     <FiUserCheck size={18} />
// //                   ) : (
// //                     <FiUserX size={18} />
// //                   )}
// //                   {isBlocked ? "Unblock User" : "Block User"}
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Customizer Modal */}
// //       {showCustomizer && (
// //         <ChatCustomizer onClose={() => setShowCustomizer(false)} />
// //       )}
// //     </>
// //   );
// // };

// // export default ChatHeader;

// import React, { useState, useEffect, useRef } from "react";
// import { useChat } from "../../context/ChatContext";
// import {
//   FiPhone,
//   FiVideo,
//   FiSearch,
//   FiMoreVertical,
//   FiUserX,
//   FiUserCheck,
//   FiX,
//   FiTrash2,
// } from "react-icons/fi";
// import { format } from "date-fns";
// import ChatCustomizer from "../Features/ChatCustomizer";

// const ChatHeader = () => {
//   const {
//     selectedUser,
//     searchMessages,
//     blockUser,
//     unblockUser,
//     blockedUsers,
//     clearChat,
//   } = useChat();

//   const [showSearch, setShowSearch] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);
//   const [showCustomizer, setShowCustomizer] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const menuRef = useRef(null);

//   const isBlocked = blockedUsers?.includes(selectedUser?.uid);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     setShowSearch(false);
//     setSearchTerm("");
//     searchMessages("");
//     setShowMenu(false);
//   }, [selectedUser]);

//   const handleSearch = (value) => {
//     setSearchTerm(value);
//     searchMessages(value);
//   };

//   const handleCloseSearch = () => {
//     setShowSearch(false);
//     setSearchTerm("");
//     searchMessages("");
//   };

//   const handleBlockUnblock = async () => {
//     if (!selectedUser) return;

//     try {
//       if (isBlocked) {
//         await unblockUser(selectedUser.uid);
//       } else {
//         await blockUser(selectedUser.uid);
//       }
//       setShowMenu(false);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleClearChat = async () => {
//     if (!selectedUser) return;

//     const confirmed = window.confirm(
//       `Are you sure you want to clear all messages with ${selectedUser.displayName}? This cannot be undone.`
//     );

//     if (confirmed) {
//       try {
//         await clearChat(selectedUser.uid);
//         setShowMenu(false);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     }
//   };

//   const formatLastSeen = (timestamp) => {
//     if (!timestamp) return "Offline";
//     const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
//     const now = new Date();
//     const diff = now - date;

//     if (diff < 60000) return "Online";
//     if (diff < 3600000) return `Last seen ${Math.floor(diff / 60000)}m ago`;
//     if (diff < 86400000) return `Last seen at ${format(date, "HH:mm")}`;
//     return `Last seen ${format(date, "dd MMM")}`;
//   };

//   return (
//     <>
//       {showSearch && (
//         <div className="h-16 px-4 flex items-center gap-3 border-b border-[var(--border-color)] bg-[var(--bg-secondary)] animate-fadeIn">
//           <FiSearch className="text-[var(--accent-cyan)]" size={20} />
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => handleSearch(e.target.value)}
//             placeholder="Search messages..."
//             autoFocus
//             className="flex-1 bg-transparent text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none font-medium"
//           />
//           {searchTerm && (
//             <span className="text-xs text-[var(--text-secondary)] font-semibold">
//               Press ESC to close
//             </span>
//           )}
//           <button
//             onClick={handleCloseSearch}
//             className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-red-500 hover:bg-red-500/10 transition-all btn-3d"
//           >
//             <FiX size={20} />
//           </button>
//         </div>
//       )}

//       <div className="h-16 px-4 flex items-center justify-between border-b border-[var(--border-color)] bg-gradient-to-r from-[var(--bg-secondary)] to-[var(--bg-tertiary)]">
//         <div className="flex items-center gap-3">
//           <div className="relative">
//             {selectedUser?.photoURL ? (
//               <img
//                 src={selectedUser.photoURL}
//                 alt={selectedUser.displayName}
//                 className="w-11 h-11 rounded-full object-cover ring-2 ring-[var(--accent-cyan)]/30"
//               />
//             ) : (
//               <div className="w-11 h-11 rounded-full gradient-btn flex items-center justify-center text-white font-semibold text-sm">
//                 {selectedUser?.displayName?.charAt(0).toUpperCase()}
//               </div>
//             )}
//             {selectedUser?.isOnline && (
//               <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 border-2 border-[var(--bg-secondary)] rounded-full"></div>
//             )}
//           </div>
//           <div>
//             <h3 className="text-base font-bold text-[var(--text-primary)]">
//               {selectedUser?.displayName}
//             </h3>
//             <p className="text-xs font-medium">
//               {selectedUser?.isOnline ? (
//                 <span className="text-green-400">● Online</span>
//               ) : (
//                 <span className="text-[var(--accent-cyan)]">
//                   {formatLastSeen(selectedUser?.lastSeen)}
//                 </span>
//               )}
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center gap-1">
//           <button
//             onClick={() => setShowCustomizer(true)}
//             className="p-2.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--hover-bg)] transition-all btn-3d"
//             title="Customize Chat"
//           >
//             <span className="text-xl">🎨</span>
//           </button>

//           <button
//             onClick={() => alert("Voice call coming soon!")}
//             className="p-2.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--hover-bg)] transition-all btn-3d"
//             title="Voice Call"
//           >
//             <FiPhone size={20} />
//           </button>

//           <button
//             onClick={() => alert("Video call coming soon!")}
//             className="p-2.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--hover-bg)] transition-all btn-3d"
//             title="Video Call"
//           >
//             <FiVideo size={20} />
//           </button>

//           <button
//             onClick={() => setShowSearch(!showSearch)}
//             className={`p-2.5 rounded-lg transition-all btn-3d ${
//               showSearch
//                 ? "text-[var(--accent-cyan)] bg-[var(--hover-bg)]"
//                 : "text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--hover-bg)]"
//             }`}
//             title="Search Messages"
//           >
//             <FiSearch size={20} />
//           </button>

//           <div className="relative" ref={menuRef}>
//             <button
//               onClick={() => setShowMenu(!showMenu)}
//               className={`p-2.5 rounded-lg transition-all btn-3d ${
//                 showMenu
//                   ? "text-[var(--accent-cyan)] bg-[var(--hover-bg)]"
//                   : "text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--hover-bg)]"
//               }`}
//             >
//               <FiMoreVertical size={20} />
//             </button>

//             {showMenu && (
//               <div className="absolute top-full right-0 mt-2 glass-effect rounded-xl shadow-2xl py-2 z-20 min-w-[200px] animate-fadeIn border border-[var(--border-color)]">
//                 <button
//                   onClick={handleClearChat}
//                   className="flex items-center gap-3 px-4 py-3 w-full text-left text-sm transition-all font-semibold text-orange-400 hover:bg-orange-500/10"
//                 >
//                   <FiTrash2 size={18} />
//                   Clear Chat
//                 </button>
//                 <div className="h-px bg-[var(--border-color)] my-1"></div>
//                 <button
//                   onClick={handleBlockUnblock}
//                   className={`flex items-center gap-3 px-4 py-3 w-full text-left text-sm transition-all font-semibold ${
//                     isBlocked
//                       ? "text-green-400 hover:bg-green-500/10"
//                       : "text-red-400 hover:bg-red-500/10"
//                   }`}
//                 >
//                   {isBlocked ? (
//                     <>
//                       <FiUserCheck size={18} />
//                       Unblock User
//                     </>
//                   ) : (
//                     <>
//                       <FiUserX size={18} />
//                       Block User
//                     </>
//                   )}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {showCustomizer && (
//         <ChatCustomizer onClose={() => setShowCustomizer(false)} />
//       )}
//     </>
//   );
// };

// export default ChatHeader;

import React, { useState, useEffect, useRef } from "react";
import { useChat } from "../../context/ChatContext";
import {
  FiPhone,
  FiVideo,
  FiSearch,
  FiMoreVertical,
  FiUserX,
  FiUserCheck,
  FiX,
  FiTrash2,
} from "react-icons/fi";
import { format } from "date-fns";
import ChatCustomizer from "../Features/ChatCustomizer";

const ChatHeader = () => {
  const {
    selectedUser,
    searchMessages,
    blockUser,
    unblockUser,
    blockedUsers,
    clearChat,
  } = useChat();
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTime, setCurrentTime] = useState(Date.now());
  const menuRef = useRef(null);

  const isBlocked = blockedUsers?.includes(selectedUser?.uid);

  // Update current time every second for real-time last seen
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setShowMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setShowSearch(false);
    setSearchTerm("");
    searchMessages("");
    setShowMenu(false);
  }, [selectedUser]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    searchMessages(value);
  };

  const handleCloseSearch = () => {
    setShowSearch(false);
    setSearchTerm("");
    searchMessages("");
  };

  const handleBlockUnblock = () => {
    if (!selectedUser) return;
    if (isBlocked) unblockUser(selectedUser.uid);
    else blockUser(selectedUser.uid);
    setShowMenu(false);
  };

  const handleClearChat = () => {
    if (!selectedUser) return;
    if (window.confirm("Are you sure you want to clear all messages?")) {
      clearChat(selectedUser.uid);
      setShowMenu(false);
    }
  };

  const formatLastSeen = (timestamp) => {
    if (!timestamp) return "Offline";

    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      const diff = currentTime - date.getTime();

      if (diff < 10000) return "Online";
      if (diff < 60000) return "Last seen just now";
      if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000);
        return `Last seen ${minutes} ${minutes === 1 ? "min" : "mins"} ago`;
      }
      if (diff < 86400000) return `Last seen at ${format(date, "HH:mm")}`;
      if (diff < 172800000)
        return `Last seen yesterday at ${format(date, "HH:mm")}`;
      return `Last seen ${format(date, "dd MMM 'at' HH:mm")}`;
    } catch {
      return "Offline";
    }
  };

  return (
    <>
      {showSearch && (
        <div className="h-16 px-4 flex items-center gap-3 border-b border-[var(--border-color)] bg-[var(--bg-secondary)] animate-fadeIn">
          <FiSearch className="text-[var(--accent-cyan)]" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search messages..."
            autoFocus
            className="flex-1 bg-transparent text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none font-medium"
          />
          {searchTerm && (
            <span className="text-xs text-[var(--text-secondary)] font-semibold">
              Press ESC to close
            </span>
          )}
          <button
            onClick={handleCloseSearch}
            className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-red-500 hover:bg-red-500/10 transition-all btn-3d"
          >
            <FiX size={20} />
          </button>
        </div>
      )}

      <div className="h-16 px-4 flex items-center justify-between border-b border-[var(--border-color)] bg-gradient-to-r from-[var(--bg-secondary)] to-[var(--bg-tertiary)]">
        <div className="flex items-center gap-3">
          <div className="relative">
            {selectedUser?.photoURL ? (
              <img
                src={selectedUser.photoURL}
                alt={selectedUser.displayName}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-[var(--accent-cyan)]/30"
              />
            ) : (
              <div className="w-11 h-11 rounded-full gradient-btn flex items-center justify-center text-white font-semibold text-sm">
                {selectedUser?.displayName?.charAt(0).toUpperCase()}
              </div>
            )}
            {selectedUser?.isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 border-2 border-[var(--bg-secondary)] rounded-full"></div>
            )}
          </div>
          <div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">
              {selectedUser?.displayName}
            </h3>
            <p className="text-xs font-medium">
              {selectedUser?.isOnline ? (
                <span className="text-green-400">● Online</span>
              ) : (
                <span className="text-[var(--accent-cyan)]">
                  {formatLastSeen(selectedUser?.lastSeen)}
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowCustomizer(true)}
            className="p-2.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--hover-bg)] transition-all btn-3d"
            title="Customize Chat"
          >
            <span className="text-xl">🎨</span>
          </button>

          <button
            onClick={() => alert("Voice call coming soon!")}
            className="p-2.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--hover-bg)] transition-all btn-3d"
            title="Voice Call"
          >
            <FiPhone size={20} />
          </button>

          <button
            onClick={() => alert("Video call coming soon!")}
            className="p-2.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--hover-bg)] transition-all btn-3d"
            title="Video Call"
          >
            <FiVideo size={20} />
          </button>

          <button
            onClick={() => setShowSearch(!showSearch)}
            className={`p-2.5 rounded-lg transition-all btn-3d ${
              showSearch
                ? "text-[var(--accent-cyan)] bg-[var(--hover-bg)]"
                : "text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--hover-bg)]"
            }`}
            title="Search Messages"
          >
            <FiSearch size={20} />
          </button>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className={`p-2.5 rounded-lg transition-all btn-3d ${
                showMenu
                  ? "text-[var(--accent-cyan)] bg-[var(--hover-bg)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--hover-bg)]"
              }`}
            >
              <FiMoreVertical size={20} />
            </button>

            {showMenu && (
              <div className="absolute top-full right-0 mt-2 glass-effect rounded-xl shadow-2xl py-2 z-20 min-w-[200px] animate-fadeIn border border-[var(--border-color)]">
                <button
                  onClick={handleClearChat}
                  className="flex items-center gap-3 px-4 py-3 w-full text-left text-sm transition-all font-semibold text-orange-400 hover:bg-orange-500/10"
                >
                  <FiTrash2 size={18} /> Clear Chat
                </button>
                <div className="h-px bg-[var(--border-color)] my-1"></div>
                <button
                  onClick={handleBlockUnblock}
                  className={`flex items-center gap-3 px-4 py-3 w-full text-left text-sm transition-all font-semibold ${
                    isBlocked
                      ? "text-green-400 hover:bg-green-500/10"
                      : "text-red-400 hover:bg-red-500/10"
                  }`}
                >
                  {isBlocked ? (
                    <>
                      <FiUserCheck size={18} /> Unblock User
                    </>
                  ) : (
                    <>
                      <FiUserX size={18} /> Block User
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showCustomizer && (
        <ChatCustomizer onClose={() => setShowCustomizer(false)} />
      )}
    </>
  );
};

export default ChatHeader;
