import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../api/auth";

const AuthContext = createContext(null);

/**
 * AuthProvider
 * Holds the current user + token in React state (source of truth for
 * renders), while persisting the token in localStorage so the session
 * survives a page refresh. On mount, it rehydrates state from
 * localStorage.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setInitializing(false);
  }, []);

  async function login(email, password) {
    const res = await loginUser({ email, password });
    const { token: newToken, data } = res.data;

    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(data));

    setToken(newToken);
    setUser(data);
  }

  async function register(name, email, password) {
    const res = await registerUser({ name, email, password });
    const { token: newToken, data } = res.data;

    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(data));

    setToken(newToken);
    setUser(data);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    initializing,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
