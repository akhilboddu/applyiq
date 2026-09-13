// src/lib/api.js
import axios from "axios";

// The one place the API host is defined. VITE_API_URL is baked in at build
// time by Vite; the fallback keeps `npm run dev` working with no .env file.
// Deployed builds MUST set it — see render.yaml and client/.env.example.
export const API_ORIGIN =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const api = axios.create({
  baseURL: `${API_ORIGIN}/api`,
});

// Every /api/applications route is behind authenticateToken, which expects
// an "Authorization: Bearer <token>" header. LoginPage stores the token.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
