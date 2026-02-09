import api from "../lib/api";

export async function login(data) {
  const res = await api.post("/auth/login", data);
  localStorage.setItem("accessToken", res.data.accessToken);
  return res.data;
}

export async function register(data) {
  return api.post("/auth/register", data);
}
