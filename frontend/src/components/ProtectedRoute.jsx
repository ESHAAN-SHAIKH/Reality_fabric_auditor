import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";

export default function ProtectedRoute({ children }) {
  const user = useAuthStore(s => s.user);
  return user ? children : <Navigate to="/login" />;
}
