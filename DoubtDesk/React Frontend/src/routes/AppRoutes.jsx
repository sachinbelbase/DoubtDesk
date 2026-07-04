import { Routes, Route, Navigate } from "react-router-dom";


// Student Pages
import StudentDashboard from "../pages/student/Dashboard";
import AskQuestion from "../pages/student/AskQuestion";
import MyQuestions from "../pages/student/MyQuestions";
// import Bookmarks from "../pages/student/Bookmarks";
import Notifications from "../pages/student/Notifications";
import StudentProfile from "../pages/student/Profile";

// Teacher Pages
import TeacherDashboard from "../pages/teacher/Dashboard";
import TeacherQuestions from "../pages/teacher/Questions";
import TeacherAnalytics from "../pages/teacher/Analytics";
import TeacherProfile from "../pages/teacher/Profile";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Reports from "../pages/admin/Reports";



function AppRoutes() {
     return (
          <Routes>

               {/* Default Route */}
               <Route
                    path="/"
                    element={<Navigate to="/student/dashboard" replace />}
               />
          
               {/* Student */}
               <Route path="/student/dashboard" element={<StudentDashboard />} />
               <Route path="/student/ask-question" element={<AskQuestion />} />
               <Route path="/student/my-questions" element={<MyQuestions />} />
               <Route path="/student/bookmarks" element={<Bookmarks />} />
               <Route path="/student/notifications" element={<Notifications />} />
               <Route path="/student/profile" element={<StudentProfile />} />

               {/* Teacher */}
               <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
               <Route path="/teacher/questions" element={<TeacherQuestions />} />
               <Route path="/teacher/analytics" element={<TeacherAnalytics />} />
               <Route path="/teacher/profile" element={<TeacherProfile />} />

               {/* Admin */}
               <Route path="/admin/dashboard" element={<AdminDashboard />} />
               <Route path="/admin/users" element={<Users />} />
               <Route path="/admin/reports" element={<Reports />} />

          </Routes>
     );
}

export default AppRoutes;