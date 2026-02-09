// src/socket/socketClient.js
import { io as ioClient } from "socket.io-client";

let socket = null;

export function connectSocket(handlers = {}) {
  if (socket && socket.connected) return socket;

  // change URL if backend is on another host/port
  socket = ioClient("/", { transports: ["websocket", "polling"] });

  socket.on("connect", () => {
    handlers.onConnect?.();
    console.debug("Socket connected", socket.id);
  });

  socket.on("disconnect", (reason) => {
    handlers.onDisconnect?.(reason);
    console.debug("Socket disconnected", reason);
  });

  // custom detection event
  socket.on("detection", (payload) => {
    handlers.onDetection?.(payload);
  });

  socket.on("ai_unavailable", () => {
    handlers.onAiUnavailable?.();
  });

  return socket;
}

export function disconnectSocket() {
  if (!socket) return;
  socket.disconnect();
  socket = null;
}
