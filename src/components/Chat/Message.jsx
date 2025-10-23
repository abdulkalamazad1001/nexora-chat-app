// import React, { useState } from "react";
// import { useChat } from "../../context/ChatContext";
// import { useAuth } from "../../context/AuthContext";
// import {
//   FiTrash2,
//   FiCopy,
//   FiStar,
//   FiMoreVertical,
//   FiDownload,
//   FiCheck,
//   FiLock,
// } from "react-icons/fi";

// // 🎨 COLOR THEMES - Just change this number to switch themes! (1-8)
// const ACTIVE_THEME = 8; // Change this to 1, 2, 3, 4, 5, 6, 7, or 8

// // 🎨 All Color Themes
// const colorThemes = {
//   1: {
//     name: "Deep Blue",
//     gradient: "from-[#1E3A8A] via-[#3B82F6] to-[#6366F1]",
//     text: "#F5F3FF",
//     time: "rgba(224, 231, 255, 0.8)",
//     check: "#E0E7FF",
//     lock: "text-[#E0E7FF]/70",
//     shadow: "0 4px 16px rgba(59, 130, 246, 0.3)",
//     icon: "#3B82F6",
//   },
//   2: {
//     name: "Teal Emerald",
//     gradient: "from-[#0D9488] via-[#14B8A6] to-[#10B981]",
//     text: "#F0FDFA",
//     time: "rgba(204, 251, 241, 0.75)",
//     check: "#CCFBF1",
//     lock: "text-[#CCFBF1]/70",
//     shadow: "0 4px 16px rgba(20, 184, 166, 0.25)",
//     icon: "#14B8A6",
//   },
//   3: {
//     name: "Purple Magenta",
//     gradient: "from-[#7C3AED] via-[#A855F7] to-[#EC4899]",
//     text: "#FFF7ED",
//     time: "rgba(254, 243, 199, 0.8)",
//     check: "#FEF3C7",
//     lock: "text-[#FEF3C7]/70",
//     shadow: "0 4px 16px rgba(168, 85, 247, 0.3)",
//     icon: "#A855F7",
//   },
//   4: {
//     name: "Sunset Orange",
//     gradient: "from-[#EA580C] via-[#F97316] to-[#FB923C]",
//     text: "#FFF7ED",
//     time: "rgba(255, 237, 213, 0.8)",
//     check: "#FFEDD5",
//     lock: "text-[#FFEDD5]/70",
//     shadow: "0 4px 16px rgba(249, 115, 22, 0.3)",
//     icon: "#F97316",
//   },
//   5: {
//     name: "Rose Gold",
//     gradient: "from-[#BE185D] via-[#EC4899] to-[#F472B6]",
//     text: "#FDF2F8",
//     time: "rgba(252, 231, 243, 0.8)",
//     check: "#FCE7F3",
//     lock: "text-[#FCE7F3]/70",
//     shadow: "0 4px 16px rgba(236, 72, 153, 0.3)",
//     icon: "#EC4899",
//   },
//   6: {
//     name: "Forest Green",
//     gradient: "from-[#047857] via-[#059669] to-[#10B981]",
//     text: "#F0FDF4",
//     time: "rgba(209, 250, 229, 0.8)",
//     check: "#D1FAE5",
//     lock: "text-[#D1FAE5]/70",
//     shadow: "0 4px 16px rgba(5, 150, 105, 0.25)",
//     icon: "#059669",
//   },
//   7: {
//     name: "Electric Purple",
//     gradient: "from-[#6B21A8] via-[#9333EA] to-[#A855F7]",
//     text: "#FAF5FF",
//     time: "rgba(243, 232, 255, 0.8)",
//     check: "#F3E8FF",
//     lock: "text-[#F3E8FF]/70",
//     shadow: "0 4px 16px rgba(147, 51, 234, 0.35)",
//     icon: "#9333EA",
//   },
//   8: {
//     name: "Midnight Blue",
//     gradient: "from-[#0C4A6E] via-[#0369A1] to-[#0284C7]",
//     text: "#F0F9FF",
//     time: "rgba(224, 242, 254, 0.8)",
//     check: "#E0F2FE",
//     lock: "text-[#E0F2FE]/70",
//     shadow: "0 4px 16px rgba(3, 105, 161, 0.3)",
//     icon: "#0369A1",
//   },
// };

// const Message = ({ message, isOwn }) => {
//   const { deleteMessage, copyMessage, pinMessage, unpinMessage, addReaction } =
//     useChat();
//   const { currentUser } = useAuth();
//   const [showMenu, setShowMenu] = useState(false);

//   // Get active theme
//   const theme = colorThemes[ACTIVE_THEME];

//   const formatTime = (timestamp) => {
//     if (!timestamp) return "";
//     const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
//     return date.toLocaleTimeString("en-US", {
//       hour: "numeric",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const quickReactions = ["❤️", "👍", "😂", "😮", "😢", "🔥"];

//   const handleReaction = (emoji) => {
//     addReaction(message.id, emoji);
//   };

//   const getReactionCounts = () => {
//     if (!message.reactions) return [];
//     const counts = {};
//     Object.values(message.reactions).forEach((emoji) => {
//       counts[emoji] = (counts[emoji] || 0) + 1;
//     });
//     return Object.entries(counts);
//   };

//   const renderMedia = () => {
//     if (message.type === "image") {
//       return (
//         <div className="mb-2 max-w-xs">
//           <img
//             src={message.mediaUrl}
//             alt="Shared"
//             className="w-full rounded-xl cursor-pointer hover:opacity-90 transition shadow-md"
//             onClick={() => window.open(message.mediaUrl, "_blank")}
//           />
//         </div>
//       );
//     }

//     if (message.type === "video") {
//       return (
//         <div className="mb-2 max-w-xs">
//           <video
//             src={message.mediaUrl}
//             controls
//             className="w-full rounded-xl shadow-md"
//           />
//         </div>
//       );
//     }

//     if (message.type === "audio") {
//       return (
//         <div className="mb-2">
//           <audio src={message.mediaUrl} controls className="max-w-xs" />
//         </div>
//       );
//     }

//     if (message.type === "file") {
//       return (
//         <a
//           href={message.mediaUrl}
//           download={message.fileName}
//           className="flex items-center gap-3 p-3 glass-effect rounded-xl hover:bg-[var(--hover-bg)] transition mb-2 max-w-xs"
//         >
//           <div
//             className="p-2 rounded-lg"
//             style={{ backgroundColor: `${theme.icon}20` }}
//           >
//             <FiDownload style={{ color: theme.icon }} size={18} />
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="text-sm font-medium truncate">{message.fileName}</p>
//             <p className="text-xs text-[var(--text-tertiary)]">
//               {message.fileSize}
//             </p>
//           </div>
//         </a>
//       );
//     }

//     return null;
//   };

//   const reactionCounts = getReactionCounts();

//   return (
//     <div
//       className={`flex gap-2 sm:gap-3 mb-4 px-3 sm:px-4 animate-fadeIn ${
//         isOwn ? "flex-row-reverse" : ""
//       }`}
//       style={{
//         fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
//       }}
//     >
//       {/* Avatar */}
//       {!isOwn && (
//         <div className="flex-shrink-0 mt-1">
//           {message.senderPhoto ? (
//             <img
//               src={message.senderPhoto}
//               alt={message.senderName}
//               className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-[#2D3A4D]/50"
//             />
//           ) : (
//             <div
//               className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-white font-bold text-[10px] sm:text-xs ring-2 ring-[#2D3A4D]/50`}
//             >
//               {message.senderName?.charAt(0).toUpperCase()}
//             </div>
//           )}
//         </div>
//       )}

//       {/* Message Content */}
//       <div
//         className={`flex flex-col ${
//           isOwn ? "items-end" : "items-start"
//         } max-w-[70%] sm:max-w-md group`}
//       >
//         {/* Sender Name */}
//         {!isOwn && (
//           <span
//             className="text-[10px] mb-1 font-semibold px-1"
//             style={{ color: "#6B7C95", letterSpacing: "0.5px" }}
//           >
//             {message.senderName}
//           </span>
//         )}

//         <div className="relative">
//           {/* Message Bubble */}
//           <div
//             className={`relative px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl shadow-md transition-all ${
//               isOwn
//                 ? `bg-gradient-to-br ${theme.gradient} rounded-tr-md`
//                 : "bg-[#1E2A3A] rounded-tl-md"
//             } ${message.pinned ? "ring-2 ring-[#FFC107]/40" : ""}`}
//             style={{
//               boxShadow: isOwn
//                 ? theme.shadow
//                 : "0 2px 12px rgba(0, 0, 0, 0.15)",
//             }}
//           >
//             {/* Pinned Star */}
//             {message.pinned && (
//               <div className="absolute -top-1.5 -right-1.5">
//                 <div className="p-1 bg-[#FFC107] rounded-full shadow-lg">
//                   <FiStar size={9} className="text-white fill-white" />
//                 </div>
//               </div>
//             )}

//             {renderMedia()}

//             {/* Text */}
//             {message.text && (
//               <p
//                 className={`text-[13px] sm:text-sm break-words whitespace-pre-wrap leading-[1.5]`}
//                 style={{
//                   color: isOwn ? theme.text : "#E4E9F0",
//                   fontWeight: "500",
//                   letterSpacing: "0.01em",
//                   textShadow: isOwn ? "0 1px 2px rgba(0, 0, 0, 0.1)" : "none",
//                 }}
//               >
//                 {message.text}
//               </p>
//             )}

//             {/* Footer */}
//             <div
//               className={`flex items-center gap-1 mt-1 ${
//                 isOwn ? "justify-end" : "justify-start"
//               }`}
//             >
//               {message.encrypted && (
//                 <FiLock
//                   size={9}
//                   className={isOwn ? theme.lock : "text-[#8A9AB0]/60"}
//                 />
//               )}
//               <span
//                 className="text-[9px] font-medium"
//                 style={{
//                   color: isOwn ? theme.time : "#8A9AB0",
//                   letterSpacing: "0.02em",
//                 }}
//               >
//                 {formatTime(message.timestamp)}
//               </span>
//               {isOwn && (
//                 <span className="flex items-center ml-0.5">
//                   {message.read ? (
//                     <span
//                       className="flex items-center"
//                       style={{ color: theme.check }}
//                     >
//                       <FiCheck size={10} className="-mr-1.5" strokeWidth={3} />
//                       <FiCheck size={10} strokeWidth={3} />
//                     </span>
//                   ) : (
//                     <FiCheck
//                       size={10}
//                       style={{ color: `${theme.check}99` }}
//                       strokeWidth={3}
//                     />
//                   )}
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Reactions */}
//           {reactionCounts.length > 0 && (
//             <div
//               className={`flex flex-wrap gap-1 mt-1.5 ${
//                 isOwn ? "justify-end" : "justify-start"
//               }`}
//             >
//               {reactionCounts.map(([emoji, count]) => (
//                 <span
//                   key={emoji}
//                   className="text-[11px] px-2 py-0.5 bg-[#1E2A3A] rounded-full shadow-sm flex items-center gap-1 border border-[#2D3A4D]"
//                 >
//                   <span className="text-xs">{emoji}</span>
//                   {count > 1 && (
//                     <span
//                       className="text-[9px] font-bold"
//                       style={{ color: "#8A9AB0" }}
//                     >
//                       {count}
//                     </span>
//                   )}
//                 </span>
//               ))}
//             </div>
//           )}

//           {/* Menu Button */}
//           <button
//             onClick={() => setShowMenu(!showMenu)}
//             className={`absolute top-0 ${
//               isOwn
//                 ? "left-0 -translate-x-full -ml-1"
//                 : "right-0 translate-x-full mr-1"
//             } p-1.5 glass-effect rounded-lg text-[#6B7C95] opacity-0 group-hover:opacity-100 transition-all hover:scale-105`}
//             style={{
//               color: "#6B7C95",
//             }}
//             onMouseEnter={(e) => (e.currentTarget.style.color = theme.icon)}
//             onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7C95")}
//           >
//             <FiMoreVertical size={14} />
//           </button>

//           {/* Message Menu */}
//           {showMenu && (
//             <>
//               <div
//                 className="fixed inset-0 z-10"
//                 onClick={() => setShowMenu(false)}
//               ></div>
//               <div
//                 className={`absolute ${
//                   isOwn ? "right-0" : "left-0"
//                 } top-full mt-2 bg-[#1A2332] rounded-2xl shadow-2xl p-2 w-56 z-20 animate-fadeIn border border-[#2D3A4D]`}
//                 style={{
//                   boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
//                 }}
//               >
//                 {/* Reactions */}
//                 <div className="p-2 border-b border-[#2D3A4D] mb-1 bg-[#0F1621] rounded-xl overflow-hidden">
//                   <div className="flex gap-1.5 justify-center flex-wrap">
//                     {quickReactions.map((emoji) => (
//                       <button
//                         key={emoji}
//                         onClick={() => {
//                           handleReaction(emoji);
//                           setShowMenu(false);
//                         }}
//                         className="text-lg hover:scale-110 active:scale-95 transition-transform p-1.5 hover:bg-[#1E2A3A] rounded-lg"
//                       >
//                         {emoji}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Options */}
//                 <button
//                   onClick={() => {
//                     copyMessage(message.text);
//                     setShowMenu(false);
//                   }}
//                   className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#1E2A3A] rounded-xl text-sm transition"
//                   style={{ color: "#E4E9F0" }}
//                 >
//                   <FiCopy size={15} style={{ color: theme.icon }} />
//                   <span>Copy message</span>
//                 </button>

//                 <button
//                   onClick={() => {
//                     message.pinned
//                       ? unpinMessage(message.id)
//                       : pinMessage(message.id);
//                     setShowMenu(false);
//                   }}
//                   className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#1E2A3A] rounded-xl text-sm transition"
//                   style={{ color: "#E4E9F0" }}
//                 >
//                   <FiStar size={15} style={{ color: "#FFC107" }} />
//                   <span>
//                     {message.pinned ? "Unpin message" : "Pin message"}
//                   </span>
//                 </button>

//                 {isOwn && (
//                   <button
//                     onClick={() => {
//                       deleteMessage(message.id);
//                       setShowMenu(false);
//                     }}
//                     className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#FF3B30]/10 rounded-xl text-sm transition mt-1 border-t border-[#2D3A4D]"
//                     style={{ color: "#FF3B30" }}
//                   >
//                     <FiTrash2 size={15} />
//                     <span>Delete message</span>
//                   </button>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Message;

import React, { useState } from "react";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/AuthContext";
import { useCustomization } from "../../context/CustomizationContext";
import {
  FiTrash2,
  FiCopy,
  FiStar,
  FiMoreVertical,
  FiDownload,
  FiCheck,
  FiLock,
} from "react-icons/fi";

const Message = ({ message, isOwn }) => {
  const { deleteMessage, copyMessage, pinMessage, unpinMessage, addReaction } =
    useChat();
  const { currentUser } = useAuth();
  const { chatTheme, colorThemes } = useCustomization();
  const [showMenu, setShowMenu] = useState(false);

  // Get the current theme
  const theme = colorThemes[chatTheme];

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const quickReactions = ["❤️", "👍", "😂", "😮", "😢", "🔥"];

  const handleReaction = (emoji) => {
    addReaction(message.id, emoji);
  };

  const getReactionCounts = () => {
    if (!message.reactions) return [];
    const counts = {};
    Object.values(message.reactions).forEach((emoji) => {
      counts[emoji] = (counts[emoji] || 0) + 1;
    });
    return Object.entries(counts);
  };

  const renderMedia = () => {
    if (message.type === "image") {
      return (
        <div className="mb-2 max-w-xs">
          <img
            src={message.mediaUrl}
            alt="Shared"
            className="w-full rounded-xl cursor-pointer hover:opacity-90 transition shadow-md"
            onClick={() => window.open(message.mediaUrl, "_blank")}
          />
        </div>
      );
    }

    if (message.type === "video") {
      return (
        <div className="mb-2 max-w-xs">
          <video
            src={message.mediaUrl}
            controls
            className="w-full rounded-xl shadow-md"
          />
        </div>
      );
    }

    if (message.type === "audio") {
      return (
        <div className="mb-2">
          <audio src={message.mediaUrl} controls className="max-w-xs" />
        </div>
      );
    }

    if (message.type === "file") {
      return (
        <a
          href={message.mediaUrl}
          download={message.fileName}
          className="flex items-center gap-3 p-3 glass-effect rounded-xl hover:bg-[var(--hover-bg)] transition mb-2 max-w-xs"
        >
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${theme.icon}20` }}
          >
            <FiDownload style={{ color: theme.icon }} size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{message.fileName}</p>
            <p className="text-xs text-[var(--text-tertiary)]">
              {message.fileSize}
            </p>
          </div>
        </a>
      );
    }

    return null;
  };

  const reactionCounts = getReactionCounts();

  return (
    <div
      className={`flex gap-2 sm:gap-3 mb-4 px-3 sm:px-4 animate-fadeIn ${
        isOwn ? "flex-row-reverse" : ""
      }`}
      style={{
        fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
      }}
    >
      {/* Avatar */}
      {!isOwn && (
        <div className="flex-shrink-0 mt-1">
          {message.senderPhoto ? (
            <img
              src={message.senderPhoto}
              alt={message.senderName}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-[#2D3A4D]/50"
            />
          ) : (
            <div
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-white font-bold text-[10px] sm:text-xs ring-2 ring-[#2D3A4D]/50`}
            >
              {message.senderName?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      )}

      {/* Message Content */}
      <div
        className={`flex flex-col ${
          isOwn ? "items-end" : "items-start"
        } max-w-[70%] sm:max-w-md group`}
      >
        {/* Sender Name */}
        {!isOwn && (
          <span
            className="text-[10px] mb-1 font-semibold px-1"
            style={{ color: "#6B7C95", letterSpacing: "0.5px" }}
          >
            {message.senderName}
          </span>
        )}

        <div className="relative">
          {/* Message Bubble */}
          <div
            className={`relative px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl shadow-md transition-all ${
              isOwn
                ? `bg-gradient-to-br ${theme.gradient} rounded-tr-md`
                : "bg-[#1E2A3A] rounded-tl-md"
            } ${message.pinned ? "ring-2 ring-[#FFC107]/40" : ""}`}
            style={{
              boxShadow: isOwn
                ? theme.shadow
                : "0 2px 12px rgba(0, 0, 0, 0.15)",
            }}
          >
            {/* Pinned Star */}
            {message.pinned && (
              <div className="absolute -top-1.5 -right-1.5">
                <div className="p-1 bg-[#FFC107] rounded-full shadow-lg">
                  <FiStar size={9} className="text-white fill-white" />
                </div>
              </div>
            )}

            {renderMedia()}

            {/* Text */}
            {message.text && (
              <p
                className={`text-[13px] sm:text-sm break-words whitespace-pre-wrap leading-[1.5]`}
                style={{
                  color: isOwn ? theme.text : "#E4E9F0",
                  fontWeight: "500",
                  letterSpacing: "0.01em",
                  textShadow: isOwn ? "0 1px 2px rgba(0, 0, 0, 0.1)" : "none",
                }}
              >
                {message.text}
              </p>
            )}

            {/* Footer */}
            <div
              className={`flex items-center gap-1 mt-1 ${
                isOwn ? "justify-end" : "justify-start"
              }`}
            >
              {message.encrypted && (
                <FiLock
                  size={9}
                  className={isOwn ? theme.lock : "text-[#8A9AB0]/60"}
                />
              )}
              <span
                className="text-[9px] font-medium"
                style={{
                  color: isOwn ? theme.time : "#8A9AB0",
                  letterSpacing: "0.02em",
                }}
              >
                {formatTime(message.timestamp)}
              </span>
              {isOwn && (
                <span className="flex items-center ml-0.5">
                  {message.read ? (
                    <span
                      className="flex items-center"
                      style={{ color: theme.check }}
                    >
                      <FiCheck size={10} className="-mr-1.5" strokeWidth={3} />
                      <FiCheck size={10} strokeWidth={3} />
                    </span>
                  ) : (
                    <FiCheck
                      size={10}
                      style={{ color: `${theme.check}99` }}
                      strokeWidth={3}
                    />
                  )}
                </span>
              )}
            </div>
          </div>

          {/* Reactions */}
          {reactionCounts.length > 0 && (
            <div
              className={`flex flex-wrap gap-1 mt-1.5 ${
                isOwn ? "justify-end" : "justify-start"
              }`}
            >
              {reactionCounts.map(([emoji, count]) => (
                <span
                  key={emoji}
                  className="text-[11px] px-2 py-0.5 bg-[#1E2A3A] rounded-full shadow-sm flex items-center gap-1 border border-[#2D3A4D]"
                >
                  <span className="text-xs">{emoji}</span>
                  {count > 1 && (
                    <span
                      className="text-[9px] font-bold"
                      style={{ color: "#8A9AB0" }}
                    >
                      {count}
                    </span>
                  )}
                </span>
              ))}
            </div>
          )}

          {/* Menu Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`absolute top-0 ${
              isOwn
                ? "left-0 -translate-x-full -ml-1"
                : "right-0 translate-x-full mr-1"
            } p-1.5 glass-effect rounded-lg text-[#6B7C95] opacity-0 group-hover:opacity-100 transition-all hover:scale-105`}
            style={{ color: "#6B7C95" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = theme.icon)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7C95")}
          >
            <FiMoreVertical size={14} />
          </button>

          {/* Message Menu */}
          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              ></div>
              <div
                className={`absolute ${
                  isOwn ? "right-0" : "left-0"
                } top-full mt-2 bg-[#1A2332] rounded-2xl shadow-2xl p-2 w-56 z-20 animate-fadeIn border border-[#2D3A4D]`}
                style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)" }}
              >
                {/* Reactions */}
                <div className="p-2 border-b border-[#2D3A4D] mb-1 bg-[#0F1621] rounded-xl overflow-hidden">
                  <div className="flex gap-1.5 justify-center flex-wrap">
                    {quickReactions.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => {
                          handleReaction(emoji);
                          setShowMenu(false);
                        }}
                        className="text-lg hover:scale-110 active:scale-95 transition-transform p-1.5 hover:bg-[#1E2A3A] rounded-lg"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Options */}
                <button
                  onClick={() => {
                    copyMessage(message.text);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#1E2A3A] rounded-xl text-sm transition"
                  style={{ color: "#E4E9F0" }}
                >
                  <FiCopy size={15} style={{ color: theme.icon }} />
                  <span>Copy message</span>
                </button>

                <button
                  onClick={() => {
                    message.pinned
                      ? unpinMessage(message.id)
                      : pinMessage(message.id);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#1E2A3A] rounded-xl text-sm transition"
                  style={{ color: "#E4E9F0" }}
                >
                  <FiStar size={15} style={{ color: "#FFC107" }} />
                  <span>
                    {message.pinned ? "Unpin message" : "Pin message"}
                  </span>
                </button>

                {isOwn && (
                  <button
                    onClick={() => {
                      deleteMessage(message.id);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#FF3B30]/10 rounded-xl text-sm transition mt-1 border-t border-[#2D3A4D]"
                    style={{ color: "#FF3B30" }}
                  >
                    <FiTrash2 size={15} />
                    <span>Delete message</span>
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
