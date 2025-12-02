// src/ProtectedRoutes/AdminRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function AdminRoute({ children }) {
  const { user, loading } = useContext(UserContext);

  if (loading) return null; // Wait for context to load

  //if (!user) return <Navigate to="/login" replace />; // Not logged in

  if (!user.isAdmin) return <Navigate to="/" replace />; // Not admin

  return children; // Admin allowed
}