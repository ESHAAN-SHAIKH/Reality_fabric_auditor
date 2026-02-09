import { Server } from "socket.io";

export function initWebSocket(server) {
  const io = new Server(server, {
    cors: { origin: "*" }
  });

  io.on("connection", socket => {
    socket.on("subscribe", streamId => {
      socket.join(streamId);
    });
  });

  return io;
}
