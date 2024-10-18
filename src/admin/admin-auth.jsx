// src/context/AuthContext.jsx
import React, { createContext, useState } from "react";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  // Initialize isAuth from localStorage to persist login on refresh
  const [isAdminAuth, setIsAdminAuth] = useState(() => {
    const savedAdminAuth = localStorage.getItem("isAdminAuth");
    return savedAdminAuth ? JSON.parse(savedAdminAuth) : false;
  });

  const adminlogin = () => {
    setIsAdminAuth(true);
    console.log("admin true");
  };

  const adminlogout = () => {
    setIsAdminAuth(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAdminAuth, adminlogin, adminlogout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
