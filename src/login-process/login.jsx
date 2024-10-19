import React, { useContext, useState } from "react";
import { AuthContext } from "./loginauth.jsx";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    // setSuccess("");
    const result = await login(email, password);
    if (result.success) {
      console.log(result.success);
      toast.success("Login Successful! Welcome", {
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
        navigate("/");
      }, 1000);
    } else {
      setError(result.message);
      toast.error(" Login Failed ! Please Enter Correctly..", {
        position: "top-right",
        autoClose: 1000,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="login-section">
          <div className="login-content">
            <a href="/">
              {" "}
              <img
                src="./photos\grocery-store.jpg"
                alt="Logo"
                className="logo"
              />{" "}
            </a>
            <h2>Login to Your Grocery Account</h2>
            <p>Shop fresh & organic groceries</p>
            <div className="social-login">
              <button className="social-btn fb">
                <i className="fab fa-facebook-f"></i>
              </button>
              <button className="social-btn google">
                <i className="fab fa-google"></i>
              </button>
            </div>
            <p>OR</p>
            <form className="login-form" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <a href="/forgotpassword" className="forgot">
                Forgot Password?
              </a>
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="signup-section">
          <div className="signup-content">
            <h2>New Here?</h2>
            <p>
              Sign up and get the freshest groceries delivered to your door!
            </p>
            <a href="/signup" className="signup-btn">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export { Login };
