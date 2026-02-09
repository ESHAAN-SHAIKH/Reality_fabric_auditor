import { create } from "zustand";
import api from "../lib/api";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  loading: true,

  async checkAuth() {
    const token = localStorage.getItem("token");
    if (!token) {
      set({ user: null, token: null, loading: false });
      return;
    }

    try {
      const res = await api.get("/auth/me");
      set({ user: res.data.user, token, loading: false });
    } catch {
      localStorage.removeItem("token");
      set({ user: null, token: null, loading: false });
    }
  },

  login(token, user) {
    localStorage.setItem("token", token);
    set({ token, user });
  },

  logout() {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  }
}));
