import axios from "axios";
import { useAuthStore } from "../stores/auth.store";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  timeout: 15000
});

/* =======================
   REQUEST INTERCEPTOR
======================= */
api.interceptors.request.use(config => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* =======================
   RESPONSE INTERCEPTOR
======================= */
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      // auto logout on token expiry
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
