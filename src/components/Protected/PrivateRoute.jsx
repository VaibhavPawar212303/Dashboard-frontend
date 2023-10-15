import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) {
    if (token === "undefined") {
      return <Navigate to="/login" replace />;
    } else {
      return children;
    }
  } else if (!token) {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
