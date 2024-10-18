import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdminAuth, children }) => {
  if (!isAdminAuth) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
