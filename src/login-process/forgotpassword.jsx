import React from "react";
import { Link } from "react-router-dom";
import "./forgotpassword.css";
function ForgotPassword() {
  return (
    <>
      <div className="forgot-password-container">
        <h1>Forgot Your Password?</h1>
        <p>
          Don't worry! Just enter your email address below, and we'll send you a
          link to reset your password.
        </p>
        <form>
          <div className="input-group">
            <label for="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              autoComplete="off"
              required
            />
          </div>
          <button className="send-link" type="submit">Send Reset Link</button>
        </form>
        <p className="back-to-login">
          <a href="/login">Back to Login</a>
        </p>
      </div>
    </>
  );
}
export { ForgotPassword };
