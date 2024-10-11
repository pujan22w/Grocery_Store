import React, { useContext, useState } from "react";
import { AuthContext } from "./admin-auth.jsx";
import { useNavigate } from "react-router-dom";
import "./admin-login.css";
import axios from "../lib/axios";

function AdminLog() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Sending login credentials to the backend API
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        {
          email,
          password,
        }
      );
      if (response.data) {
        login();
        setSuccess("Login successful. Welcome Admin!");
        navigate("/admin/panel");
      } else {
        setError("Invalid credentials or you are not an admin.");
      }
    } catch (error) {
      if (error.response) {
        setError(`Error 404 Found || "Login failed."`);
        alert("Plaese enter correctly");
      } else if (error.request) {
        setError("No response from server. Please try again later.");
      } else {
        setError(`Error: ${error}`);
      }
    }
  };

  return (
    <>
      <div className="admin-header">
        <img src="../photos\grocery-store.jpg" alt="logo-image" />
        <h4>Admin Login </h4>
      </div>
      <div className="admin-form-div">
        <form className="admin-form" onSubmit={handleLogin}>
          <h5>Email </h5>
          <label htmlFor="email" name="email" className="email">
            <input
              type="email"
              placeholder="Enter your email......"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <h5>Password </h5>
          <label htmlFor="password" name="password" className="password">
            <input
              type="text"
              placeholder="Enter your password......"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="admin-login-button" type="submit">
            {" "}
            Login
          </button>
        </form>
      </div>

      {error && (
        <p className="error" style={{ color: "red" }}>
          Plaese Enter correctly
        </p>
      )}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </>
  );
}
export default AdminLog;
