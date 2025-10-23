import React, { useState, useEffect } from "react";
import { useChat } from "../../context/ChatContext";
import { FiX, FiDownload } from "react-icons/fi";

const MediaGallery = ({ onClose }) => {
  const { messages } = useChat();
  const [activeTab, setActiveTab] = useState("images");
  const [mediaItems, setMediaItems] = useState([]);

  useEffect(() => {
    const filterMedia = () => {
      if (activeTab === "images") {
        return messages.filter((msg) => msg.type === "image");
      } else if (activeTab === "videos") {
        return messages.filter((msg) => msg.type === "video");
      } else if (activeTab === "files") {
        return messages.filter((msg) => msg.type === "file");
      }
      return [];
    };

    setMediaItems(filterMedia());
  }, [activeTab, messages]);

  const handleDownload = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
      {/* Header */}
      <div className="glass-effect border-b border-neon-blue/20 p-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold neon-text">Media Gallery</h2>
        <button
          onClick={onClose}
          className="text-white hover:text-red-400 transition-colors"
        >
          <FiX size={24} />
        </button>
      </div>

      {/* Tabs */}
      <div className="glass-effect border-b border-neon-blue/20 p-4 flex gap-4">
        <button
          onClick={() => setActiveTab("images")}
          className={`px-6 py-2 rounded-lg transition-all ${
            activeTab === "images"
              ? "bg-gradient-neon text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Images ({messages.filter((m) => m.type === "image").length})
        </button>
        <button
          onClick={() => setActiveTab("videos")}
          className={`px-6 py-2 rounded-lg transition-all ${
            activeTab === "videos"
              ? "bg-gradient-neon text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Videos ({messages.filter((m) => m.type === "video").length})
        </button>
        <button
          onClick={() => setActiveTab("files")}
          className={`px-6 py-2 rounded-lg transition-all ${
            activeTab === "files"
              ? "bg-gradient-neon text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Files ({messages.filter((m) => m.type === "file").length})
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {mediaItems.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-lg">No {activeTab} found</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {mediaItems.map((item) => (
              <div
                key={item.id}
                className="relative group glass-effect rounded-lg overflow-hidden"
              >
                {activeTab === "images" && (
                  <img
                    src={item.mediaUrl}
                    alt="gallery"
                    className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition"
                    onClick={() => window.open(item.mediaUrl, "_blank")}
                  />
                )}

                {activeTab === "videos" && (
                  <video
                    src={item.mediaUrl}
                    className="w-full h-48 object-cover"
                    controls
                  />
                )}

                {activeTab === "files" && (
                  <div className="p-4 flex items-center gap-3">
                    <div className="text-4xl">📄</div>
                    <div className="flex-1">
                      <p className="text-white font-semibold truncate">
                        {item.fileName || "File"}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {item.fileSize || "Unknown size"}
                      </p>
                    </div>
                  </div>
                )}

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(item.mediaUrl)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-neon-dark/80 p-2 rounded-lg transition-opacity"
                >
                  <FiDownload className="text-white" size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaGallery;
