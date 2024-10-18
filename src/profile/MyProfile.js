import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
import "./MyProfile.css";
import { Footer } from "../footer.js";
import { NavBar } from "../navbar.jsx";
function MyProfile() {
  const [UserData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/users/me"
        );
        setUserData(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  const formattedDOB = new Date(UserData.dateOfBirth).toLocaleDateString();

  return (
    <>
      <NavBar />

      <div className="user-profile-container">
        <h2>User Profile</h2>
        <form className="user-profile-form">
          <div className="form-group">
            <label htmlFor="fullname">Full Name:</label>
            <input
              type="text"
              id="fullname"
              value={UserData.fullName}
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={UserData.email} readOnly />
          </div>

          <div className="form-group">
            <label htmlFor="phonenumber">Phone Number:</label>
            <input
              type="tel"
              id="phonenumber"
              value={UserData.phonenumber}
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" value={UserData.address} readOnly />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <input type="text" id="gender" value={UserData.gender} readOnly />
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth:</label>
            <input type="text" id="dateOfBirth" value={formattedDOB} readOnly />
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
export default MyProfile;
