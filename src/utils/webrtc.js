import Peer from "simple-peer";

let localStream = null;
let peer = null;

// Get user media (camera/microphone)
export const getUserMedia = async (audio = true, video = true) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: audio,
      video: video ? { width: 1280, height: 720 } : false,
    });
    localStream = stream;
    return stream;
  } catch (error) {
    console.error("Error accessing media devices:", error);
    throw error;
  }
};

// Create peer connection (caller)
export const createPeer = (initiator, stream, onSignal, onStream, onClose) => {
  peer = new Peer({
    initiator: initiator,
    stream: stream,
    trickle: false,
    config: {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
      ],
    },
  });

  peer.on("signal", (signal) => {
    onSignal(signal);
  });

  peer.on("stream", (remoteStream) => {
    onStream(remoteStream);
  });

  peer.on("close", () => {
    onClose();
  });

  peer.on("error", (error) => {
    console.error("Peer error:", error);
  });

  return peer;
};

// Answer the call (receiver)
export const answerCall = (signal) => {
  if (peer) {
    peer.signal(signal);
  }
};

// End call
export const endCall = () => {
  if (peer) {
    peer.destroy();
    peer = null;
  }
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
    localStream = null;
  }
};

// Mute/unmute audio
export const toggleAudio = () => {
  if (localStream) {
    const audioTrack = localStream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      return audioTrack.enabled;
    }
  }
  return false;
};

// Mute/unmute video
export const toggleVideo = () => {
  if (localStream) {
    const videoTrack = localStream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      return videoTrack.enabled;
    }
  }
  return false;
};

export default {
  getUserMedia,
  createPeer,
  answerCall,
  endCall,
  toggleAudio,
  toggleVideo,
};
