import React, { useState, useEffect } from "react";
import axios from "../lib/axios"; // Ensure axios is correctly imported
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import your CSS file
// import logo from "../assets/logo.png"; // Replace with the actual path to your logo

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    fullName: "",
    phonenumber: "",
    password: "",
    dob: "",
    address: "",
    gender: "",
  });
  const navigate = useNavigate();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpSentTime, setOtpSentTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle sending OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8000/api/v1/otp/", {
        email: formData.email,
      });

      if (response.status === 201) {
        if (response.data && response.data.success) {
          setIsOtpSent(true);
          setOtpSentTime(Date.now());
          // alert("OTP sent to your email.");
          toast.success("OTP sent to your email.", {
            position: "top-right",
            autoClose: 800,
            theme: "colored",
          });
        } else {
          // Handle case where the server did not return success
          setError("Failed to send OTP. Please try again.");
          toast.error("Failed to send OTP. Please try again.");
        }
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred while sending OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle sign up
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Check if OTP is expired (5 minutes)
    const currentTime = Date.now();
    if (currentTime - otpSentTime > 5 * 60 * 1000) {
      toast.error("Otp Expired Plaese try again!", {
        position: "top-right",
        autoClose: 1000,
        theme: "colored",
      });

      setError("OTP has expired. Please request a new one.");
      setIsOtpSent(false);
      return;
    }
    console.log("Phone Number Type:", typeof formData.phonenumber);
    console.log("Phone Number Value:", formData.phonenumber);
    try {
      // Proceed to sign up
      const signUpResponse = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        {
          fullName: formData.fullName,
          email: formData.email,
          otp: formData.otp,
          address: formData.address,
          password: formData.password,
          phonenumber: formData.phonenumber,
          dateOfBirth: formData.dob,
          gender: formData.gender,
        }
      );

      if (signUpResponse.status === 201) {
        alert("Sign up successful!");
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
          navigate("/login");
        }, 1000);
        // navigate("/login");
        // Reset form data
        setFormData({
          email: "",
          otp: "",
          fullName: "",
          phonenumber: "",
          password: "",
          dateOfBirth: "",
          address: "",
          gender: "",
        });
        setIsOtpSent(false);
        setOtpSentTime(null);
      } else {
        setError(
          signUpResponse.data?.message ||
            "Sign up failed. Please check your details and try again."
        );
      }
    } catch (err) {
      setError("An error occour", error);
    } finally {
      setLoading(false);
    }
  };

  // Effect to handle OTP expiration
  useEffect(() => {
    if (isOtpSent) {
      const timer = setInterval(() => {
        const currentTime = Date.now();
        if (currentTime - otpSentTime > 5 * 60 * 1000) {
          setIsOtpSent(false);
          setError("OTP has expired. Please request a new one.");
          clearInterval(timer);
        }
      }, 50000);

      return () => clearInterval(timer);
    }
  }, [isOtpSent, otpSentTime]);

  return (
    <>
      <ToastContainer />
      <div className="signup-container">
        <div className="signup-form-wrapper">
          <div className="signup-header">
            <a href="/">
              <img
                src="./photos\grocery-store.jpg"
                alt="Logo"
                className="logo"
              />
            </a>
            <h2 className="signup-title">Sign Up</h2>
          </div>
          <form
            onSubmit={isOtpSent ? handleSignUp : handleSendOtp}
            className="signup-form"
          >
            {/* Email and Send OTP Section */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                disabled={isOtpSent}
              />
            </div>

            {/* OTP Section */}
            <div className="form-group">
              <label htmlFor="otp">OTP</label>
              <input
                type="text"
                id="otp"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                required={isOtpSent}
                className="form-input"
                disabled={!isOtpSent}
              />
            </div>

            {/* Additional Fields */}
            <div className="additional-fields">
              <div className="form-group">
                <label htmlFor="fullname">Full Name</label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required={isOtpSent}
                  className="form-input"
                  disabled={!isOtpSent}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phonenumber">Phone Number</label>
                <input
                  type="text"
                  id="phonenumber"
                  name="phonenumber"
                  placeholder="Enter your phone number"
                  value={formData.phonenumber}
                  onChange={handleChange}
                  required={isOtpSent}
                  className="form-input"
                  disabled={!isOtpSent}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required={isOtpSent}
                  className="form-input"
                  disabled={!isOtpSent}
                />
              </div>

              <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required={isOtpSent}
                  className="form-input"
                  disabled={!isOtpSent}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  required={isOtpSent}
                  className="form-input"
                  disabled={!isOtpSent}
                />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <div className="gender-options">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={handleChange}
                      required={isOtpSent}
                      disabled={!isOtpSent}
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleChange}
                      required={isOtpSent}
                      disabled={!isOtpSent}
                    />
                    Female
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      checked={formData.gender === "other"}
                      onChange={handleChange}
                      required={isOtpSent}
                      disabled={!isOtpSent}
                    />
                    Other
                  </label>
                </div>
              </div>
            </div>
            <ToastContainer />
            <button type="submit" disabled={loading} className="btn">
              {isOtpSent
                ? loading
                  ? "Signing Up..."
                  : "Sign Up"
                : loading
                ? "Sending OTP..."
                : "Send OTP"}
            </button>
          </form>
          <div className="last-foot">
            <p>
              Already have an account?{" "}
              <span>
                <a href="/login">Login </a>
              </span>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
