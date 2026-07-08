import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute({ allowedRoles, children }) {
     const { user, loading } = useAuth();

     console.log("Loading:", loading);
     console.log("User:", user);
     console.log("Allowed Roles:", allowedRoles);

     if (loading) return null;

     if (!user) {
          return <Navigate to="/login" replace />;
     }

     if (allowedRoles && !allowedRoles.includes(user.role)) {
          return <Navigate to="/" replace />;
     }

     return children;
}

export default ProtectedRoute;
