import React, { useContext, useState } from "react";
import { AdminAuthContext } from "./admin-auth.jsx";
import { useNavigate } from "react-router-dom";
import "./admin-login.css";
import axios from "../lib/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminLog() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { adminlogin } = useContext(AdminAuthContext);
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
      console.log(response.data.data.user.role == "admin");
      if (response.data.data.user.role === "admin") {
        adminlogin();
        toast.success("Login Successful! Welcome Admin", {
          position: "top-right",
          autoClose: 1000, // Auto close after 2 seconds
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          navigate("/admin/panel");
        }, 1000);
        // setSuccess("Login successful. Welcome Admin!");

        // navigate("/admin/panel");
      } else {
        toast.error("You are not a admin", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored", // Auto clos
        });
        setError("You are not an admin.");
        // alert("You are not a admin");
      }
    } catch (error) {
      if (error.response) {
        toast.error("You are not a admin", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored", // Auto clos
        });
        setError(`Error 404 Found || "Login failed."`);
      } else if (error.request) {
        setError("No response from server. Please try again later.");
      } else {
        setError(`Error: ${error}`);
      }
    }
  };

  return (
    <>
      <ToastContainer />
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
    </>
  );
}
export default AdminLog;
