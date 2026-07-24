import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import Landing from "../pages/landing/Landing";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Admin Auth
import AdminLogin from "../pages/auth/AdminLogin";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import ManageEvents from "../pages/admin/ManageEvents";
import ManageQuizzes from "../pages/admin/ManageQuizzes";
import QuizResults from "../pages/admin/QuizResults";
import AdminProfile from "../pages/admin/AdminProfile";
import DashboardLayout from "../layouts/DashboardLayout";

// Student Pages
import StudentLayout from "../layouts/StudentLayout";
import StudentDashboard from "../pages/student/StudentDashboard";
import StudentQuizzes from "../pages/student/StudentQuizzes";
import StudentEvents from "../pages/student/StudentEvents";
import StudentProfile from "../pages/student/StudentProfile";
import QuizAttempt from "../pages/student/QuizAttempt";
import StudentQuizResults from "../pages/student/StudentQuizResults";

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  
  const loginPath = allowedRole === "admin" ? "/admin/login" : "/login";

  if (!token) {
    return <Navigate to={loginPath} replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to={loginPath} replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dedicated Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

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

        {/* Supporting upstream's route for manage-quizzes */}
        <Route path="manage-quizzes" element={<Navigate to="quizzes" replace />} />

        <Route path="quizzes/:id/results" element={<QuizResults />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>

      {/* Student Protected Routes */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="quizzes" element={<StudentQuizzes />} />
        <Route path="quizzes/:id/attempt" element={<QuizAttempt />} />
        <Route path="quizzes/:id/results" element={<StudentQuizResults />} />
        <Route path="events" element={<StudentEvents />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>

      {/* Catch-all Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
