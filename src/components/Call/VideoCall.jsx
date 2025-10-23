import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";
import {
  getUserMedia,
  createPeer,
  answerCall,
  endCall,
  toggleAudio,
  toggleVideo,
} from "../../utils/webrtc";
import {
  FiPhone,
  FiPhoneOff,
  FiMic,
  FiMicOff,
  FiVideo,
  FiVideoOff,
} from "react-icons/fi";

const VideoCall = ({ callData, onClose }) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [callStatus, setCallStatus] = useState("Connecting...");

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const { currentUser } = useAuth();
  const { selectedUser } = useChat();

  useEffect(() => {
    initializeCall();

    return () => {
      endCall();
    };
  }, []);

  const initializeCall = async () => {
    try {
      // Get user media
      const stream = await getUserMedia(true, true);
      setLocalStream(stream);

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Create peer connection
      const isInitiator = callData?.initiator === currentUser.uid;

      const peer = createPeer(
        isInitiator,
        stream,
        (signal) => {
          // Send signal to other user via Firestore
          console.log("Sending signal:", signal);
          // TODO: Save signal to Firestore
        },
        (remoteStream) => {
          setRemoteStream(remoteStream);
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
          setCallStatus("Connected");
        },
        () => {
          setCallStatus("Call ended");
          setTimeout(onClose, 2000);
        }
      );

      if (!isInitiator && callData?.signal) {
        answerCall(callData.signal);
      }

      setCallStatus("Ringing...");
    } catch (error) {
      console.error("Error initializing call:", error);
      setCallStatus("Failed to connect");
    }
  };

  const handleToggleAudio = () => {
    const enabled = toggleAudio();
    setAudioEnabled(enabled);
  };

  const handleToggleVideo = () => {
    const enabled = toggleVideo();
    setVideoEnabled(enabled);
  };

  const handleEndCall = () => {
    endCall();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col">
      {/* Call Header */}
      <div className="glass-effect border-b border-neon-blue/20 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold text-lg">
              {selectedUser?.displayName}
            </h3>
            <p className="text-neon-blue text-sm">{callStatus}</p>
          </div>
        </div>
      </div>

      {/* Video Streams */}
      <div className="flex-1 relative">
        {/* Remote Video (Full Screen) */}
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Local Video (Picture-in-Picture) */}
        <div className="absolute top-4 right-4 w-48 h-36 rounded-lg overflow-hidden border-2 border-neon-blue shadow-neon">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        </div>

        {/* No Video Placeholder */}
        {!remoteStream && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gradient-neon flex items-center justify-center text-white text-5xl font-bold mb-4 mx-auto">
                {selectedUser?.displayName?.charAt(0).toUpperCase()}
              </div>
              <p className="text-white text-xl">{callStatus}</p>
            </div>
          </div>
        )}
      </div>

      {/* Call Controls */}
      <div className="glass-effect border-t border-neon-blue/20 p-6">
        <div className="flex items-center justify-center gap-6">
          {/* Mute Audio */}
          <button
            onClick={handleToggleAudio}
            className={`p-4 rounded-full transition-all ${
              audioEnabled
                ? "bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue"
                : "bg-red-500/20 hover:bg-red-500/30 text-red-400"
            }`}
          >
            {audioEnabled ? <FiMic size={24} /> : <FiMicOff size={24} />}
          </button>

          {/* Mute Video */}
          <button
            onClick={handleToggleVideo}
            className={`p-4 rounded-full transition-all ${
              videoEnabled
                ? "bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue"
                : "bg-red-500/20 hover:bg-red-500/30 text-red-400"
            }`}
          >
            {videoEnabled ? <FiVideo size={24} /> : <FiVideoOff size={24} />}
          </button>

          {/* End Call */}
          <button
            onClick={handleEndCall}
            className="p-5 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all shadow-lg"
          >
            <FiPhoneOff size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
