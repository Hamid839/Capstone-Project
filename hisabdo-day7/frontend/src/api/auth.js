import api from "./axios";

export function registerUser(data) {
  return api.post("/auth/register", data);
}

export function loginUser(data) {
  return api.post("/auth/login", data);
}

export function getCurrentUser() {
  return api.get("/auth/me");
}
