

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");
  
  // Redirect to login if no token exists
  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;

