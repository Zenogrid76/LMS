import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Helper to check JWT expiry (returns true if expired)
function isTokenExpired(token) {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("access_token"));
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!token && !isTokenExpired(token));
  const navigate = useNavigate();

  // Auto-logout if token is expired
  useEffect(() => {
    if (token && isTokenExpired(token)) {
      logout();
    }
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem("access_token", newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = (navigate) => {
    localStorage.removeItem("access_token");
    setToken(null);
    setIsAuthenticated(false);
     if (navigate) navigate("/"); // Redirect to home
  };

  // Optional: check token validity on mount
  useEffect(() => {
    if (token && isTokenExpired(token)) {
      logout();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
