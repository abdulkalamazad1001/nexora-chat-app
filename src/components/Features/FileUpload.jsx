import React, { useState } from "react";
import { uploadToCloudinary } from "../../config/cloudinary";
import { FiUpload, FiImage, FiVideo, FiFile } from "react-icons/fi";

const FileUpload = ({
  onUploadComplete,
  acceptedTypes = "image/*,video/*",
}) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setProgress(30);

    try {
      // Determine folder based on file type
      let folder = "chat-media";
      if (file.type.startsWith("image/")) folder = "chat-images";
      else if (file.type.startsWith("video/")) folder = "chat-videos";
      else folder = "chat-files";

      setProgress(60);

      // Upload to Cloudinary
      const result = await uploadToCloudinary(file, folder);

      setProgress(100);

      // Pass result back to parent component
      onUploadComplete({
        url: result.url,
        type: result.resourceType,
        format: result.format,
        name: file.name,
      });

      setUploading(false);
      setProgress(0);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept={acceptedTypes}
        onChange={handleFileSelect}
        disabled={uploading}
        className="hidden"
        id="file-upload"
      />

      <label
        htmlFor="file-upload"
        className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg 
          bg-neon-blue/10 hover:bg-neon-blue/20 border border-neon-blue/30 
          transition-all ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {uploading ? (
          <>
            <div className="animate-spin">⏳</div>
            <span>Uploading... {progress}%</span>
          </>
        ) : (
          <>
            <FiUpload className="text-neon-blue" />
            <span className="text-neon-blue">Upload File</span>
          </>
        )}
      </label>

      {uploading && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-neon-dark rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-neon transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
