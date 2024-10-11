// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "../lib/axios"; // Custom Axios instance

// Create the AuthContext
export const UserAuthContext = createContext();

// Create the AuthProvider component
export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User information
  const [isAuthenticated, setIsAuthenticated] = useState(false); // User authentication status
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

      if (response.data) {
        setUser(response.data.email);
        setIsAuthenticated(true);
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
      setIsAuthenticated(false);
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
        console.log(response.data.data.fullname);
        setUser(response.data.data.fullname);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserAuthContext.Provider
      value={{ user, isAuthenticated, login, logout, loading }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};
// export default UserAuthProvider;
