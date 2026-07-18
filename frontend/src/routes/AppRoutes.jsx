import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/landing/Landing";
import Login from "../pages/auth/Login";
import ManageQuizzes from "../pages/admin/ManageQuizzes";
import Register from "../pages/auth/Register";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
<Route path="/register" element={<Register />} />
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
       <Route path="/admin/manage-quizzes" element={<ManageQuizzes/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;