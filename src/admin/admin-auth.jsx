// src/context/AuthContext.jsx
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize isAuth from localStorage to persist login on refresh
  const [isAuth, setIsAuth] = useState(() => {
    const savedAuth = localStorage.getItem("isAuth");
    return savedAuth ? JSON.parse(savedAuth) : false;
  });

  const login = () => {
    setIsAuth(true);
    localStorage.setItem("isAuth", true);
  };

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("isAuth");
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
