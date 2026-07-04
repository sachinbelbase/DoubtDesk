import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";

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
// import TeacherSettings from "../pages/teacher/Settings";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Reports from "../pages/admin/Reports";
// import AdminSettings from "../pages/admin/Settings";

// Home Page
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";


function AppRoutes() {
     return (
          <Routes>

               {/* Default Route */}
               <Route
                    path="/"
                    element={<Navigate to="/student/dashboard" replace />}
               />
          
               {/* Student */}
               <Route path="/student/dashboard" element={
                    <ProtectedRoute allowedRoles={["student"]}>
                         <StudentDashboard />
                    </ProtectedRoute>
               } />
               <Route path="/student/ask-question" element={
                    <ProtectedRoute allowedRoles={["student"]}>
                         <AskQuestion />
                    </ProtectedRoute>
               } />
               <Route path="/student/my-questions" element={
                    <ProtectedRoute allowedRoles={["student"]}>
                         <MyQuestions />
                    </ProtectedRoute>
               } />
               <Route path="/student/bookmarks" element={
                    <ProtectedRoute allowedRoles={["student"]}>
                         <Bookmarks />
                    </ProtectedRoute>
               } />
               <Route path="/student/notifications" element={
                    <ProtectedRoute allowedRoles={["student"]}>
                         <Notifications />
                    </ProtectedRoute>
               } />
               <Route path="/student/profile" element={
                    <ProtectedRoute allowedRoles={["student"]}>
                         <StudentProfile />
                    </ProtectedRoute>
               } />
               <Route path="/student/settings" element={
                    <ProtectedRoute allowedRoles={["student"]}>
                         <Settings />
                    </ProtectedRoute>
               } />

               {/* Teacher */}
               <Route path="/teacher/dashboard" element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                         <TeacherDashboard />
                    </ProtectedRoute>
               } />
               <Route path="/teacher/questions" element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                         <TeacherQuestions />
                    </ProtectedRoute>
               } />
               <Route path="/teacher/analytics" element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                         <TeacherAnalytics />
                    </ProtectedRoute>
               } />
               <Route path="/teacher/profile" element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                         <TeacherProfile />
                    </ProtectedRoute>
               } />
               {/* <Route path="/teacher/settings" element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                         <TeacherSettings />
                    </ProtectedRoute>
               } /> */}

               {/* Admin */}
               <Route path="/admin/dashboard" element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                         <AdminDashboard />
                    </ProtectedRoute>
               } />
               <Route path="/admin/users" element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                         <Users />
                    </ProtectedRoute>
               } />
               <Route path="/admin/reports" element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                         <Reports />
                    </ProtectedRoute>
               } />
               {/* <Route path="/admin/settings" element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                         <AdminSettings />
                    </ProtectedRoute>
               } /> */}

               {/* Home */}
               <Route path="/home" element={<Home />} />
               {/* Auth */}
               <Route path="/login" element={<Login />} />
               <Route path="/signup" element={<Signup />} />


          </Routes>
     );
}

export default AppRoutes;