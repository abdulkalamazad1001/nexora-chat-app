import React, { useState, useRef } from "react";
import { useCustomization } from "../../context/CustomizationContext";
import { FiX, FiCheck, FiUpload, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

const ChatCustomizer = ({ onClose }) => {
  const {
    chatTheme,
    chatBackground,
    customBackgroundUrl,
    updateTheme,
    updateBackground,
    updateCustomBackground,
    deleteCustomBackground,
    colorThemes,
    backgrounds,
  } = useCustomization();

  const [activeTab, setActiveTab] = useState("theme");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Cloudinary config
  const CLOUDINARY_UPLOAD_PRESET =
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "neon_chat_preset";
  const CLOUDINARY_CLOUD_NAME =
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "de5zhxsfa";

  const handleThemeChange = (themeId) => {
    updateTheme(themeId);
    toast.success(`Theme changed to ${colorThemes[themeId].name}!`);
  };

  const handleBackgroundChange = (bgId) => {
    updateBackground(bgId);
    toast.success(`Background changed to ${backgrounds[bgId].name}!`);
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file!");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB!");
      return;
    }

    setUploading(true);

    try {
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      const imageUrl = data.secure_url;

      // Save to context
      updateCustomBackground(imageUrl);
      toast.success("Custom background uploaded successfully! 🎉");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteCustomBackground = () => {
    deleteCustomBackground();
    toast.success("Custom background removed!");
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="glass-effect rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp border border-[var(--border-color)]">
        {/* Header */}
        <div className="sticky top-0 glass-effect border-b border-[var(--border-color)] p-4 sm:p-6 rounded-t-3xl z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold neon-text">
                🎨 Customize Chat
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                Personalize your chat experience
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[var(--bg-tertiary)] hover:bg-red-500 transition-all text-[var(--text-primary)] hover:text-white hover:scale-110"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setActiveTab("theme")}
              className={`flex-1 py-2 px-4 rounded-xl font-semibold text-sm transition-all ${
                activeTab === "theme"
                  ? "bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] text-white shadow-lg"
                  : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--hover-bg)]"
              }`}
            >
              💬 Message Theme
            </button>
            <button
              onClick={() => setActiveTab("background")}
              className={`flex-1 py-2 px-4 rounded-xl font-semibold text-sm transition-all ${
                activeTab === "background"
                  ? "bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] text-white shadow-lg"
                  : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--hover-bg)]"
              }`}
            >
              🖼️ Background
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {activeTab === "theme" ? (
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-4 uppercase tracking-wider">
                Choose Your Message Color
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(colorThemes).map(([id, theme]) => (
                  <button
                    key={id}
                    onClick={() => handleThemeChange(parseInt(id))}
                    className="relative group"
                  >
                    <div
                      className={`aspect-square rounded-2xl bg-gradient-to-br ${
                        theme.gradient
                      } shadow-lg transition-all hover:scale-105 hover:shadow-2xl ${
                        chatTheme === parseInt(id) ? "ring-4 ring-white" : ""
                      }`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center p-3">
                        <div className="text-center">
                          <p
                            className="text-[10px] sm:text-xs font-semibold"
                            style={{ color: theme.text }}
                          >
                            Hello!
                          </p>
                          <div className="flex items-center justify-center gap-0.5 mt-1">
                            <FiCheck size={8} style={{ color: theme.check }} />
                            <FiCheck size={8} style={{ color: theme.check }} />
                          </div>
                        </div>
                      </div>

                      {chatTheme === parseInt(id) && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <FiCheck
                            size={14}
                            className="text-green-500"
                            strokeWidth={3}
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-center mt-2 text-[var(--text-secondary)] font-medium">
                      {theme.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-4 uppercase tracking-wider">
                Choose Your Chat Background
              </h3>

              {/* Upload Custom Photo Section */}
              <div className="mb-6 p-4 glass-effect rounded-2xl border-2 border-dashed border-[var(--accent-cyan)]/30 hover:border-[var(--accent-cyan)] transition-all">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-purple)] flex items-center justify-center">
                      <FiUpload size={24} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[var(--text-primary)] mb-1">
                      Upload Custom Photo
                    </h4>
                    <p className="text-xs text-[var(--text-tertiary)] mb-2">
                      Choose your own image as background (Max 5MB)
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="px-4 py-2 bg-[var(--accent-cyan)] text-white rounded-lg text-sm font-semibold hover:bg-[var(--accent-cyan)]/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {uploading ? "Uploading..." : "Choose Image"}
                    </button>
                  </div>
                </div>

                {/* Custom Background Preview */}
                {customBackgroundUrl && (
                  <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-[var(--text-primary)]">
                        Your Custom Background
                      </span>
                      <button
                        onClick={handleDeleteCustomBackground}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                        title="Delete custom background"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                    <div
                      className={`aspect-video rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-all ${
                        chatBackground === "custom"
                          ? "ring-4 ring-[var(--accent-cyan)]"
                          : ""
                      }`}
                      style={{
                        backgroundImage: `url(${customBackgroundUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      onClick={() => updateBackground("custom")}
                    >
                      {chatBackground === "custom" && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--accent-cyan)] rounded-full flex items-center justify-center shadow-lg">
                          <FiCheck
                            size={14}
                            className="text-white"
                            strokeWidth={3}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Preset Backgrounds */}
              <h4 className="text-sm font-semibold text-[var(--text-secondary)] mb-3 uppercase tracking-wider">
                Preset Backgrounds
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(backgrounds)
                  .filter(([id]) => id !== "custom")
                  .map(([id, bg]) => (
                    <button
                      key={id}
                      onClick={() => handleBackgroundChange(id)}
                      className="relative group"
                    >
                      <div
                        className={`aspect-video rounded-2xl shadow-lg transition-all hover:scale-105 hover:shadow-2xl ${
                          chatBackground === id
                            ? "ring-4 ring-[var(--accent-cyan)]"
                            : ""
                        }`}
                        style={{
                          background: bg.value,
                          backgroundSize:
                            bg.type === "pattern" ? "auto, cover" : "cover",
                        }}
                      >
                        {chatBackground === id && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--accent-cyan)] rounded-full flex items-center justify-center shadow-lg">
                            <FiCheck
                              size={14}
                              className="text-white"
                              strokeWidth={3}
                            />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-2xl transition-all"></div>
                      </div>
                      <p className="text-xs text-center mt-2 text-[var(--text-secondary)] font-medium">
                        {bg.name}
                      </p>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 glass-effect border-t border-[var(--border-color)] p-4 rounded-b-3xl">
          <p className="text-xs text-center text-[var(--text-tertiary)]">
            💡 Your preferences are saved automatically
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ChatCustomizer;
