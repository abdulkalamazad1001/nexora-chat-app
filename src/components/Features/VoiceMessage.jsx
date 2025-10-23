import React, { useState, useRef } from "react";
import { FiMic, FiStopCircle, FiSend, FiX } from "react-icons/fi";
import { uploadToCloudinary } from "../../config/cloudinary";
import { useChat } from "../../context/ChatContext";

const VoiceMessage = () => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [uploading, setUploading] = useState(false);

  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);
  const chunksRef = useRef([]);

  const { sendMessage } = useChat();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Could not access microphone. Please allow microphone access.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const sendVoiceMessage = async () => {
    if (!audioBlob) return;

    setUploading(true);

    try {
      // Convert blob to file
      const file = new File([audioBlob], `voice-${Date.now()}.webm`, {
        type: "audio/webm",
      });

      // Upload to Cloudinary
      const result = await uploadToCloudinary(file, "voice-messages");

      // Send message
      await sendMessage("🎤 Voice message", "audio", result.url);

      // Reset
      cancelRecording();
    } catch (error) {
      console.error("Error sending voice message:", error);
      alert("Failed to send voice message");
    } finally {
      setUploading(false);
    }
  };

  const cancelRecording = () => {
    setAudioBlob(null);
    setRecordingTime(0);
    chunksRef.current = [];
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Not recording and no audio recorded
  if (!recording && !audioBlob) {
    return (
      <button
        onClick={startRecording}
        className="text-neon-blue hover:text-neon-purple transition-colors"
        title="Record voice message"
      >
        <FiMic size={22} />
      </button>
    );
  }

  // Currently recording
  if (recording) {
    return (
      <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-2 animate-pulse">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
        <span className="text-red-400 text-sm font-mono font-bold">
          {formatTime(recordingTime)}
        </span>
        <button
          onClick={stopRecording}
          className="text-red-400 hover:text-red-500 transition-colors"
          title="Stop recording"
        >
          <FiStopCircle size={24} />
        </button>
      </div>
    );
  }

  // Audio recorded, ready to send
  return (
    <div className="flex items-center gap-2 bg-neon-blue/10 border border-neon-blue/30 rounded-full px-3 py-2">
      <audio
        src={URL.createObjectURL(audioBlob)}
        controls
        className="h-8"
        style={{ width: "200px" }}
      />
      <button
        onClick={sendVoiceMessage}
        disabled={uploading}
        className="bg-gradient-neon p-2 rounded-full text-white hover:shadow-neon transition-all disabled:opacity-50"
        title="Send voice message"
      >
        {uploading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        ) : (
          <FiSend size={18} />
        )}
      </button>
      <button
        onClick={cancelRecording}
        className="text-red-400 hover:text-red-500 transition-colors"
        title="Cancel"
      >
        <FiX size={20} />
      </button>
    </div>
  );
};

export default VoiceMessage;
  