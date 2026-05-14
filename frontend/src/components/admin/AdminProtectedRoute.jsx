import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function AdminProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    if (decoded.role !== allowedRole) {
      return <Navigate to="/admin/login" replace />;
    }

    return children;
  } catch {
    return <Navigate to="/admin/login" replace />;
  }
}
