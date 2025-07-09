// components/ProtectedRoute.jsx
import { useAuth } from "../../pages/Auth/AuthContext"; // Adjust the import path as needed
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ redirectTo = "/" }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} replace />;
}
