// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "../lib/axios"; // Custom Axios instance

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(); // User information
  const [isAuth, setIsAuth] = useState(false);

  const [loading, setLoading] = useState(true); // Loading state

  // Function to handle user login
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        {
          email,
          password,
        }
      );

      if (response.data.data.user.role === "user") {
        setIsAuth(true);
        return { success: true };
      } else {
        return { success: false, message: "Invalid email or password." };
      }
    } catch (error) {
      if (error.response) {
        return {
          success: false,
          message:
            error.response.data.message || "Login failed. Please try again.",
        };
      } else if (error.request) {
        return { success: false, message: "No response from server." };
      } else {
        return { success: false, message: "An unexpected error occurred." };
      }
    }
  };

  // Function to handle user logout
  const logout = async () => {
    try {
      await axios.post("http://localhost:8000/api/v1/users/logout");
      setUser(null);
      setIsAuth(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Fetch user profile on component mount to maintain authentication state
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/users/me"
        );
        setUser(response.data.data.fullName);
        setIsAuth(true);
      } catch (error) {
        setUser(null);
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [login]);
  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
// export default UserAuthProvider;
