// import React, { useState, useEffect, useRef } from "react";
// import { useChat } from "../../context/ChatContext";
// import { uploadToCloudinary } from "../../config/cloudinary";
// import VoiceMessage from "../Features/VoiceMessage";
// import EmojiPicker from "../Features/EmojiPicker";
// import { FiPlus, FiFile, FiImage, FiSend } from "react-icons/fi";
// import toast from "react-hot-toast";

// const MessageInput = () => {
//   const [message, setMessage] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [showAttach, setShowAttach] = useState(false);
//   const attachRef = useRef(null);
//   const typingTimeoutRef = useRef(null);
//   const { sendMessage, setTypingStatus } = useChat();

//   // Auto-close attach menu
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (attachRef.current && !attachRef.current.contains(e.target)) {
//         setShowAttach(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (message.trim()) {
//       setTypingStatus(true);
//     }

//     if (typingTimeoutRef.current) {
//       clearTimeout(typingTimeoutRef.current);
//     }

//     typingTimeoutRef.current = setTimeout(() => {
//       setTypingStatus(false);
//     }, 1000);

//     return () => {
//       if (typingTimeoutRef.current) {
//         clearTimeout(typingTimeoutRef.current);
//       }
//     };
//   }, [message]);

//   const handleSend = async () => {
//     if (!message.trim()) return;

//     try {
//       setTypingStatus(false);
//       await sendMessage(message, "text", null, { encrypted: true });
//       setMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   const handleFileUpload = async (e, type) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (file.size > 50 * 1024 * 1024) {
//       toast.error("File must be less than 50MB");
//       return;
//     }

//     setUploading(true);
//     const uploadToast = toast.loading("Uploading...");

//     try {
//       let folder =
//         type === "image"
//           ? "chat-images"
//           : type === "video"
//           ? "chat-videos"
//           : "chat-documents";
//       const result = await uploadToCloudinary(file, folder);
//       const fileSize = (file.size / 1024 / 1024).toFixed(2) + " MB";

//       await sendMessage(
//         message || file.name,
//         type === "file" ? "file" : type,
//         result.url,
//         {
//           fileName: file.name,
//           fileSize: fileSize,
//         }
//       );

//       setMessage("");
//       toast.success("Uploaded!", { id: uploadToast });
//     } catch (error) {
//       toast.error("Upload failed", { id: uploadToast });
//     } finally {
//       setUploading(false);
//       setShowAttach(false);
//     }
//   };

//   return (
//     <div className="px-4 pb-4 pt-2">
//       <div className="glass-effect rounded-2xl flex items-center gap-3 px-3 py-2.5 border border-[var(--border-color)] focus-within:border-[var(--accent-cyan)]/50 transition-all shadow-md">
//         {/* Attach Button */}
//         <div className="relative flex-shrink-0" ref={attachRef}>
//           <button
//             onClick={() => setShowAttach(!showAttach)}
//             className="p-2 text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] rounded-lg hover:bg-[var(--hover-bg)] transition-all flex items-center justify-center"
//           >
//             <FiPlus
//               size={20}
//               className={`transition-transform ${
//                 showAttach ? "rotate-45" : ""
//               }`}
//             />
//           </button>

//           {showAttach && (
//             <div className="absolute bottom-full mb-2 left-0 glass-effect rounded-xl shadow-2xl p-2 min-w-[200px] animate-fadeIn">
//               <label className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[var(--hover-bg)] rounded-lg transition-all text-[var(--text-primary)] font-medium">
//                 <FiImage size={18} className="text-[var(--accent-cyan)]" />
//                 Upload Image
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleFileUpload(e, "image")}
//                   className="hidden"
//                   disabled={uploading}
//                 />
//               </label>
//               <label className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[var(--hover-bg)] rounded-lg transition-all text-[var(--text-primary)] font-medium">
//                 <FiFile size={18} className="text-[var(--accent-purple)]" />
//                 Upload File
//                 <input
//                   type="file"
//                   accept="*"
//                   onChange={(e) => handleFileUpload(e, "file")}
//                   className="hidden"
//                   disabled={uploading}
//                 />
//               </label>
//             </div>
//           )}
//         </div>

//         {/* Message Input */}
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyPress={handleKeyPress}
//           disabled={uploading}
//           placeholder={uploading ? "Uploading..." : "Type a message..."}
//           className="flex-1 bg-transparent text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none font-medium text-[15px]"
//         />

//         {/* Right Icons - Perfect Spacing */}
//         <div className="flex items-center gap-3 flex-shrink-0">
//           {/* Emoji Picker */}
//           <div className="w-10 h-10 flex items-center justify-center">
//             <EmojiPicker
//               onEmojiSelect={(emoji) => setMessage(message + emoji)}
//             />
//           </div>

//           {/* Voice Message */}
//           <div className="w-10 h-10 flex items-center justify-center">
//             <VoiceMessage />
//           </div>

//           {/* Send Button */}
//           <button
//             onClick={handleSend}
//             disabled={!message.trim() || uploading}
//             className={`gradient-btn p-3 rounded-xl transition-all flex items-center justify-center ${
//               message.trim() && !uploading
//                 ? "hover:scale-105 btn-3d shadow-lg"
//                 : "opacity-50 cursor-not-allowed"
//             }`}
//           >
//             <FiSend className="text-white" size={18} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessageInput;
import React, { useState, useRef, useEffect } from "react";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/AuthContext";
import {
  FiSend,
  FiPaperclip,
  FiImage,
  FiVideo,
  FiMusic,
  FiFile,
  FiX,
  FiSmile,
} from "react-icons/fi";
import toast from "react-hot-toast";

const emojis = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "🤣",
  "😂",
  "🙂",
  "🙃",
  "😉",
  "😊",
  "😇",
  "🥰",
  "😍",
  "🤩",
  "😘",
  "😗",
  "☺️",
  "😚",
  "😙",
  "🥲",
  "😋",
  "😛",
  "😜",
  "🤪",
  "😝",
  "🤑",
  "🤗",
  "🤭",
  "🫢",
  "🫣",
  "🤫",
  "🤔",
  "🫡",
  "🤐",
  "🤨",
  "😐",
  "😑",
  "😶",
  "🫥",
  "😏",
  "😒",
  "🙄",
  "😬",
  "😮‍💨",
  "🤥",
  "😌",
  "😔",
  "😪",
  "🤤",
  "😴",
  "😷",
  "🤒",
  "🤕",
  "🤢",
  "🤮",
  "🤧",
  "🥵",
  "🥶",
  "🥴",
  "😵",
  "😵‍💫",
  "🤯",
  "🤠",
  "🥳",
  "🥸",
  "😎",
  "🤓",
  "🧐",
  "😕",
  "🫤",
  "😟",
  "🙁",
  "☹️",
  "😮",
  "😯",
  "😲",
  "😳",
  "🥺",
  "🥹",
  "😦",
  "😧",
  "😨",
  "😰",
  "😥",
  "😢",
  "😭",
  "😱",
  "😖",
  "😣",
  "😞",
  "😓",
  "😩",
  "😫",
  "🥱",
  "😤",
  "😡",
  "😠",
  "🤬",
  "😈",
  "👿",
  "💀",
  "☠️",
  "💩",
  "🤡",
  "👹",
  "👺",
  "👻",
  "👽",
  "👾",
  "🤖",
  "❤️",
  "🧡",
  "💛",
  "💚",
  "💙",
  "💜",
  "🖤",
  "🤍",
  "🤎",
  "💔",
  "❤️‍🔥",
  "❤️‍🩹",
  "💕",
  "💞",
  "💓",
  "💗",
  "💖",
  "💘",
  "💝",
  "💟",
  "👍",
  "👎",
  "👏",
  "🙌",
  "👐",
  "🤝",
  "🙏",
  "✊",
  "👊",
  "🤛",
  "🤜",
  "🤞",
  "✌️",
  "🤟",
  "🤘",
  "👌",
  "🤌",
  "🤏",
  "👈",
  "👉",
  "👆",
  "👇",
  "☝️",
  "✋",
  "🤚",
  "🖐️",
  "🖖",
  "👋",
  "🤙",
  "💪",
  "🦾",
  "🖕",
  "✍️",
  "🙏",
  "💅",
  "🦵",
  "🦿",
  "🦶",
  "👂",
  "🦻",
  "👃",
  "🧠",
  "🫀",
  "🫁",
  "🦷",
  "🦴",
  "👀",
  "👁️",
  "👅",
  "👄",
  "💋",
  "🩸",
  "🔥",
  "⚡",
  "💫",
  "⭐",
  "✨",
  "💥",
  "💢",
  "💯",
  "✅",
  "❌",
  "⭕",
  "🎉",
  "🎊",
  "🎈",
  "🎁",
  "🏆",
  "🥇",
  "🥈",
  "🥉",
  "🏅",
  "🎖️",
  "📣",
  "📢",
];

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [sendingMessage, setSendingMessage] = useState(false);

  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const audioInputRef = useRef(null);
  const attachMenuRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const { sendMessage, setTypingStatus, selectedUser, blockedUsers } =
    useChat();
  const { currentUser } = useAuth();

  const CLOUDINARY_UPLOAD_PRESET =
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "neon_chat_preset";
  const CLOUDINARY_CLOUD_NAME =
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "de5zhxsfa";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        attachMenuRef.current &&
        !attachMenuRef.current.contains(event.target)
      ) {
        setShowAttachMenu(false);
      }
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (message.trim()) {
      setTypingStatus(true);
    } else {
      setTypingStatus(false);
    }
    return () => setTypingStatus(false);
  }, [message, setTypingStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() && selectedFiles.length === 0) return;

    // Check if user is blocked
    if (blockedUsers?.includes(selectedUser?.uid)) {
      toast.error("You cannot send messages to blocked users");
      return;
    }

    setSendingMessage(true);
    setTimeout(() => setSendingMessage(false), 600);

    try {
      if (message.trim()) {
        await sendMessage(message.trim());
        setMessage("");
      }

      if (selectedFiles.length > 0) {
        await handleFileUpload();
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
    setShowAttachMenu(false);
  };

  const processFiles = (files) => {
    const maxSize = 10 * 1024 * 1024;
    const validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        toast.error(`${file.name} is too large (max 10MB)`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;
    setSelectedFiles((prev) => [...prev, ...validFiles]);

    validFiles.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreviews((prev) => [
            ...prev,
            { file, preview: e.target.result, type: "image" },
          ]);
        };
        reader.readAsDataURL(file);
      } else if (file.type.startsWith("video/")) {
        setFilePreviews((prev) => [
          ...prev,
          { file, preview: null, type: "video" },
        ]);
      } else if (file.type.startsWith("audio/")) {
        setFilePreviews((prev) => [
          ...prev,
          { file, preview: null, type: "audio" },
        ]);
      } else {
        setFilePreviews((prev) => [
          ...prev,
          { file, preview: null, type: "file" },
        ]);
      }
    });
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
      { method: "POST", body: formData }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Upload failed: ${errorData.error?.message || "Unknown error"}`
      );
    }

    const data = await response.json();
    return data.secure_url;
  };

  const handleFileUpload = async () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    let uploadedCount = 0;

    try {
      for (const file of selectedFiles) {
        const fileType = file.type.startsWith("image/")
          ? "image"
          : file.type.startsWith("video/")
          ? "video"
          : file.type.startsWith("audio/")
          ? "audio"
          : "file";

        const downloadURL = await uploadToCloudinary(file);

        await sendMessage("", fileType, downloadURL, {
          fileName: file.name,
          fileSize: formatFileSize(file.size),
        });

        uploadedCount++;
        setUploadProgress((uploadedCount / selectedFiles.length) * 100);
      }

      toast.success("Files sent!");
      setSelectedFiles([]);
      setFilePreviews([]);
    } catch (error) {
      toast.error("Failed to upload files");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const getFileIcon = (type) => {
    switch (type) {
      case "image":
        return <FiImage className="text-green-500" />;
      case "video":
        return <FiVideo className="text-blue-500" />;
      case "audio":
        return <FiMusic className="text-purple-500" />;
      default:
        return <FiFile className="text-gray-500" />;
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const isBlocked = blockedUsers?.includes(selectedUser?.uid);

  return (
    <>
      {filePreviews.length > 0 && (
        <div className="border-t border-[var(--border-color)] p-4 bg-[var(--bg-secondary)]">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-[var(--text-secondary)]">
              Files to send ({filePreviews.length})
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filePreviews.map((item, index) => (
              <div
                key={index}
                className="relative group glass-effect rounded-lg p-2 w-20 h-20 flex items-center justify-center"
              >
                {item.type === "image" ? (
                  <img
                    src={item.preview}
                    alt="preview"
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <div className="text-2xl">{getFileIcon(item.type)}</div>
                )}
                <button
                  onClick={() => removeFile(index)}
                  className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FiX size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {dragActive && (
        <div className="absolute inset-0 bg-[var(--accent-cyan)]/20 backdrop-blur-sm border-2 border-dashed border-[var(--accent-cyan)] rounded-lg flex items-center justify-center z-10">
          <div className="text-center">
            <FiPaperclip className="text-[var(--accent-cyan)] text-4xl mx-auto mb-2" />
            <p className="text-[var(--text-primary)] font-semibold">
              Drop files here
            </p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className="glass-effect border-t border-[var(--border-color)] p-3 sm:p-4 relative"
      >
        <div className="flex items-end gap-2 sm:gap-3">
          <div className="relative" ref={emojiPickerRef}>
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              disabled={isBlocked}
              className="p-2.5 sm:p-3 glass-effect rounded-xl text-[var(--accent-cyan)] hover:bg-[var(--hover-bg)] transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSmile size={20} />
            </button>

            {showEmojiPicker && (
              <div className="absolute bottom-full left-0 mb-2 glass-effect rounded-2xl p-3 shadow-2xl border border-[var(--border-color)] animate-fadeIn z-50 w-72 max-h-80 overflow-y-auto">
                <div className="grid grid-cols-8 gap-2">
                  {emojis.map((emoji, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleEmojiSelect(emoji)}
                      className="text-2xl hover:scale-125 transition-all p-1 hover:bg-[var(--hover-bg)] rounded-lg"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={attachMenuRef}>
            <button
              type="button"
              onClick={() => setShowAttachMenu(!showAttachMenu)}
              disabled={isBlocked}
              className="p-2.5 sm:p-3 glass-effect rounded-xl text-[var(--accent-cyan)] hover:bg-[var(--hover-bg)] transition-all hover:scale-110 hover:rotate-45 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiPaperclip size={20} />
            </button>

            {showAttachMenu && (
              <div className="absolute bottom-full left-0 mb-2 glass-effect rounded-xl shadow-xl p-2 min-w-[150px] animate-fadeIn z-20 border border-[var(--border-color)]">
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[var(--hover-bg)] rounded-lg text-sm transition text-[var(--text-primary)]"
                >
                  <FiImage className="text-green-500" /> Image
                </button>
                <button
                  type="button"
                  onClick={() => videoInputRef.current?.click()}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[var(--hover-bg)] rounded-lg text-sm transition text-[var(--text-primary)]"
                >
                  <FiVideo className="text-blue-500" /> Video
                </button>
                <button
                  type="button"
                  onClick={() => audioInputRef.current?.click()}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[var(--hover-bg)] rounded-lg text-sm transition text-[var(--text-primary)]"
                >
                  <FiMusic className="text-purple-500" /> Audio
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[var(--hover-bg)] rounded-lg text-sm transition text-[var(--text-primary)]"
                >
                  <FiFile className="text-gray-500" /> File
                </button>
              </div>
            )}

            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <input
              ref={audioInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder={
              isBlocked ? "Cannot send to blocked user" : "Type a message..."
            }
            rows="1"
            disabled={isBlocked}
            className="flex-1 bg-[var(--bg-tertiary)] border border-[var(--border-color)] focus:border-[var(--accent-cyan)] rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-[var(--text-primary)] focus:outline-none resize-none max-h-32 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />

          <button
            type="submit"
            disabled={
              (!message.trim() && selectedFiles.length === 0) ||
              uploading ||
              isBlocked
            }
            className={`p-2.5 sm:p-3 gradient-btn btn-3d rounded-xl text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
              sendingMessage ? "animate-send-fly" : "hover:scale-110"
            }`}
          >
            <FiSend
              size={20}
              className={`transition-all duration-300 ${
                sendingMessage
                  ? "translate-x-20 translate-y-[-20px] opacity-0"
                  : ""
              }`}
            />
          </button>
        </div>

        {uploading && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[var(--text-secondary)]">
                Uploading...
              </span>
              <span className="text-xs text-[var(--text-secondary)]">
                {Math.round(uploadProgress)}%
              </span>
            </div>
            <div className="h-1 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </form>

      <style>{`
        @keyframes send-fly {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(100px, -100px) rotate(45deg); opacity: 0; }
        }
        .animate-send-fly { animation: send-fly 0.6s ease-out; }
      `}</style>
    </>
  );
};

export default MessageInput;
