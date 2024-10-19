// src/admin/AdminPanel.jsx
import React, { useContext } from "react";
import { AdminAuthContext } from "./admin-auth.jsx";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AdminLogout() {
  const { adminlogout } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // adminlogout(); // Update auth state
    toast.success("Logout Successfull", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      onClose: () => {
        navigate("/admin");
      },
    });
    setTimeout(() => {
      adminlogout();
      navigate("/admin/login");
    }, 1500);
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
