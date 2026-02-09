import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/login" element={!token ? <Login /> : <Navigate to="/dashboard" replace />} />

      <Route
        path="/dashboard"
        element={
          token ? <Dashboard /> : <Navigate to="/login" replace />
        }
      />

      {/* Explicit Root Redirect */}
      <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} replace />} />

      {/* Catch-all Redirect */}
      <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} replace />} />
    </Routes>
  );
}
