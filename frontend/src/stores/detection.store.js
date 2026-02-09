import { create } from "zustand";

export const useDetectionStore = create(set => ({
  detections: [],
  addDetection: d =>
    set(state => ({ detections: [d, ...state.detections] })),
  clear: () => set({ detections: [] })
}));
