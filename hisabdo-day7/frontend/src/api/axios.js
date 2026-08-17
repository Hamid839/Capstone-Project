import axios from "axios";

// Base URL for the backend API. In development, Vite proxies /api to the
// backend (see vite.config.js), so this can stay relative.
const api = axios.create({
  baseURL: "/api",
});

// Attach the JWT (if present) to every outgoing request automatically.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the server ever responds 401 (expired/invalid token), clear local
// auth state so the app can redirect back to login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

export default api;
