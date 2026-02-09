import { io } from "./server.js";

export function emitAnalysis(data) {
  io.emit("ai-analysis", data);
}
