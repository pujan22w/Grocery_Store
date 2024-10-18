import React, { useContext, useState } from "react";
import { AuthContext } from "./loginauth.jsx";
import { useNavigate } from "react-router-dom";
import "./login.css";
function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const result = await login(email, password);
    if (result.success) {
      setSuccess("Login successful. Welcome!");
      alert("Login Successful");
      navigate("/");
    } else {
      setError(result.message);
      alert(result.message);
    }
  };

  return (
    <>
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
