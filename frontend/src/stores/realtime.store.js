import { create } from "zustand";
import socket from "../lib/socket";

export const useRealtimeStore = create(set => ({
  connected: false,
  detections: [],

  connect: token => {
    socket.auth = { token };
    socket.connect();

    socket.on("connect", () => {
      set({ connected: true });
    });

    socket.on("disconnect", () => {
      set({ connected: false });
    });

    socket.on("detection", data => {
      set(state => ({
        detections: [data, ...state.detections]
      }));
    });
  },

  disconnect: () => {
    socket.disconnect();
    set({ connected: false });
  }
}));
