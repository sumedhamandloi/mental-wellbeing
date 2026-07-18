import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "../pages/auth/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";
import ManageEvents from "../pages/admin/ManageEvents";
import ManageQuizzes from "../pages/admin/ManageQuizzes";
import QuizResults from "../pages/admin/QuizResults";
import DashboardLayout from "../layouts/DashboardLayout";

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      
      {/* Admin Protected Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="events" element={<ManageEvents />} />
        <Route path="quizzes" element={<ManageQuizzes />} />
        <Route path="quizzes/:id/results" element={<QuizResults />} />
        <Route
          path="profile"
          element={
            <div className="p-8">
              <h1 className="text-3xl font-extrabold text-[#386641] tracking-tight mb-4">Profile</h1>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-gray-500">
                Departmental administrator profile settings and access keys. Coming soon.
              </div>
            </div>
          }
        />
      </Route>

      {/* Redirects */}
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
