import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import { ROLES } from "../constants/roles";

// Public Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";

// Student Pages
import StudentDashboard from "../pages/student/Dashboard";
import AskQuestion from "../pages/student/AskQuestion";
import MyQuestions from "../pages/student/MyQuestions";
import Bookmarks from "../pages/student/Bookmarks";
import Notifications from "../pages/student/Notifications";
import StudentProfile from "../pages/student/Profile";
import Settings from "../pages/student/Settings";

// Teacher Pages
import TeacherDashboard from "../pages/teacher/Dashboard";
import TeacherQuestions from "../pages/teacher/Questions";
import TeacherAnalytics from "../pages/teacher/Analytics";
import TeacherProfile from "../pages/teacher/Profile";
import TeacherSettings from "../pages/teacher/Settings";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Reports from "../pages/admin/Reports";
import AdminSettings from "../pages/admin/Settings";


function AppRoutes() {
     return (
          <Routes>

               {/* Public */}
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Signup />} />

               {/* Student */}
               <Route
                    path="/student/dashboard"
                    element={
                         <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                              <StudentDashboard />
                         </ProtectedRoute>
                    }
               />
               <Route
                    path="/student/ask-question"
                    element={
                         <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                              <AskQuestion />
                         </ProtectedRoute>
                    }
               />
               <Route
                    path="/student/my-questions"
                    element={
                         <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                              <MyQuestions />
                         </ProtectedRoute>
                    }
               />
               <Route
                    path="/student/bookmarks"
                    element={
                         <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                              <Bookmarks />
                         </ProtectedRoute>
                    }
               />
               <Route
                    path="/student/notifications"
                    element={
                         <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                              <Notifications />
                         </ProtectedRoute>
                    }
               />
               <Route
                    path="/student/profile"
                    element={
                         <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                              <StudentProfile />
                         </ProtectedRoute>
                    }
               />
               <Route
                    path="/student/settings"
                    element={
                         <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                              <Settings />
                         </ProtectedRoute>
                    }
               />

               {/* Teacher */}
               <Route
                    path="/teacher/dashboard"
                    element={
                         <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
                              <TeacherDashboard />
                         </ProtectedRoute>
                    }
               />
               <Route
                    path="/teacher/questions"
                    element={
                         <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
                              <TeacherQuestions />
                         </ProtectedRoute>
                    }
               />
               <Route
                    path="/teacher/analytics"
                    element={
                         <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
                              <TeacherAnalytics />
                         </ProtectedRoute>
                    }
               />
               <Route
                    path="/teacher/profile"
                    element={
                         <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
                              <TeacherProfile />
                         </ProtectedRoute>
                    }
               />
               <Route
                    path="/teacher/settings"
                    element={
                         <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
                              <TeacherSettings />
                         </ProtectedRoute>
                    }
               />

               {/* Admin */}
               <Route
                    path="/admin/dashboard"
                    element={
                         <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                              <AdminDashboard />
                         </ProtectedRoute>
                    }
               />
               <Route
                    path="/admin/users"
                    element={
                         <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                              <Users />
                         </ProtectedRoute>
                    }
               />
               <Route
                    path="/admin/reports"
                    element={
                         <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                              <Reports />
                         </ProtectedRoute>
                    }
               />
               <Route
                    path="/admin/settings"
                    element={
                         <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                              <AdminSettings />
                         </ProtectedRoute>
                    }
               />

               {/* 404 */}
               <Route path="*" element={<NotFound />} />

          </Routes>
     );
}

export default AppRoutes;
