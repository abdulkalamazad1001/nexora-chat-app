import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { FiX, FiCamera, FiSave } from "react-icons/fi";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { uploadToCloudinary } from "../../config/cloudinary";
import toast from "react-hot-toast";

const UserProfile = ({ onClose }) => {
  const { currentUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: currentUser?.displayName || "",
    bio: currentUser?.bio || "",
    photoURL: currentUser?.photoURL || "",
  });
  const fileInputRef = useRef(null);
  const modalRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setUploading(true);
    const uploadToast = toast.loading("Uploading profile photo...");

    try {
      const result = await uploadToCloudinary(file, "profile-photos");

      await updateProfile(auth.currentUser, {
        photoURL: result.url,
      });

      await updateDoc(doc(db, "users", currentUser.uid), {
        photoURL: result.url,
      });

      setFormData({ ...formData, photoURL: result.url });
      toast.success("Profile photo updated!", { id: uploadToast });
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast.error("Failed to upload photo", { id: uploadToast });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    const saveToast = toast.loading("Updating profile...");

    try {
      await updateProfile(auth.currentUser, {
        displayName: formData.displayName,
      });

      await updateDoc(doc(db, "users", currentUser.uid), {
        displayName: formData.displayName,
        bio: formData.bio,
      });

      toast.success("Profile updated!", { id: saveToast });
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile", { id: saveToast });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 modal-backdrop">
      <div
        ref={modalRef}
        className="glass-effect rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 animate-fadeIn card-hover"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[var(--bg-tertiary)] hover:bg-red-500 transition-all text-[var(--text-primary)] hover:text-white z-10"
        >
          <FiX size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold neon-text mb-1">
            Profile Settings
          </h2>
          <p className="text-[var(--text-secondary)] text-xs">
            Customize your NeonChat identity
          </p>
        </div>

        {/* Profile Photo */}
        <div className="flex flex-col items-center mb-5">
          <div className="relative group">
            {formData.photoURL ? (
              <img
                src={formData.photoURL}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover neon-border"
              />
            ) : (
              <div className="w-24 h-24 rounded-full gradient-btn flex items-center justify-center text-white text-4xl font-bold neon-border">
                {formData.displayName?.charAt(0).toUpperCase()}
              </div>
            )}

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="absolute bottom-0 right-0 gradient-btn p-2 rounded-full text-white btn-3d disabled:opacity-50"
            >
              {uploading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <FiCamera size={16} />
              )}
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <p className="text-[var(--text-tertiary)] text-[10px] mt-2">
            Click camera to change photo
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-[var(--text-primary)] text-xs font-semibold mb-1.5">
              Display Name
            </label>
            <input
              type="text"
              value={formData.displayName}
              onChange={(e) =>
                setFormData({ ...formData, displayName: e.target.value })
              }
              disabled={!editMode}
              className={`w-full bg-[var(--bg-secondary)] border rounded-xl px-3 py-2.5 text-[var(--text-primary)] text-sm focus:outline-none transition-all ${
                editMode
                  ? "border-[var(--accent-cyan)] focus:neon-glow"
                  : "border-[var(--border-color)]"
              }`}
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-[var(--text-primary)] text-xs font-semibold mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={currentUser?.email}
              disabled
              className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl px-3 py-2.5 text-[var(--text-tertiary)] text-sm cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-[var(--text-primary)] text-xs font-semibold mb-1.5">
              Bio / Status
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              disabled={!editMode}
              rows={2}
              className={`w-full bg-[var(--bg-secondary)] border rounded-xl px-3 py-2.5 text-[var(--text-primary)] text-sm focus:outline-none transition-all resize-none ${
                editMode
                  ? "border-[var(--accent-cyan)] focus:neon-glow"
                  : "border-[var(--border-color)]"
              }`}
              placeholder="Hey there! I'm using NeonChat"
              maxLength={150}
            />
            <p className="text-[var(--text-tertiary)] text-[10px] mt-1">
              {formData.bio.length}/150 characters
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-5">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="flex-1 gradient-btn btn-3d text-white py-2.5 rounded-xl font-semibold text-sm"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setEditMode(false);
                  setFormData({
                    displayName: currentUser?.displayName || "",
                    bio: currentUser?.bio || "",
                    photoURL: currentUser?.photoURL || "",
                  });
                }}
                className="flex-1 bg-[var(--bg-tertiary)] text-[var(--text-primary)] py-2.5 rounded-xl font-semibold hover:bg-[var(--hover-bg)] transition-all text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 gradient-btn btn-3d text-white py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm"
              >
                <FiSave size={16} />
                Save
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
