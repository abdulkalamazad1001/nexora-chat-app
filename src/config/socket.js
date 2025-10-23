import { io } from "socket.io-client";

// For development, we'll use Firebase Firestore as signaling
// In production, you'd use a proper Socket.io server
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3001";

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
});

export default socket;
