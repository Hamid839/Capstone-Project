import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute
 * Wraps a page component and redirects to /login if the user isn't
 * authenticated. Waits for the initial auth check (from localStorage)
 * to finish before deciding, to avoid a flash-redirect on page refresh.
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated, initializing } = useAuth();

  if (initializing) {
    return <div className="page-loading">Checking your session...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
