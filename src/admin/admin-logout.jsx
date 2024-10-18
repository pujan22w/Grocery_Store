// src/admin/AdminPanel.jsx
import React, { useContext } from "react";
import { AdminAuthContext } from "./admin-auth.jsx";
import { useNavigate } from "react-router-dom";
// import AdminPaanel from "./admin-panel/admin-panel.jsx";
import AppAdminComponent from "../adminPanel/AppComponent.jsx";
// import "./admin-panel/panel-style.css";
function AdminLogout() {
  const { adminlogout } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    adminlogout(); // Update auth state
    alert("Logout sucessful");
    navigate("/admin"); // Redirect to login page
  };

  return (
    <>
      {/* <AppAdminComponent /> */}
      <button
        onClick={handleLogout}
        style={{
          color: "white",
          backgroundColor: "blue",
          marginTop: 10,
        }}
        className="logout-button"
      >
        Logout
      </button>
    </>
  );
}

export default AdminLogout;
