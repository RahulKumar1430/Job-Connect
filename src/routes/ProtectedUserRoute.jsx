import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedUserRoute({ children }) {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // If not logged in or role is not 'user', redirect to login
  if (!user || user.role !== "user") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
