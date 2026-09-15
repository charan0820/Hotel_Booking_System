import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

/**
 * Holds the logged-in user and auth token in memory.
 * TODO: connect to POST /api/auth/login, /register, and GET /api/auth/me
 * once authController is implemented, and persist the token (e.g. via a
 * cookie set by the backend, or another storage approach that fits your
 * security requirements).
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token),
    isAdmin: user?.role === 'admin',
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
