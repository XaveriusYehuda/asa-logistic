import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({
  children,
  allowedRole,
  setActiveDashboard
}) {
  const { user, loading } =
    useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return (
      <Navigate to="/" />
    );
    setActiveDashboard(false);
  }

  if (user) {
    if (allowedRole && user.role !== allowedRole) {
      return user.role === 'officer' 
        ? <Navigate to="/officer" replace /> 
        : <Navigate to="/visitor" replace />;
      setActiveDashboard(true);
    }
  }

  return children;
}

export default ProtectedRoute;