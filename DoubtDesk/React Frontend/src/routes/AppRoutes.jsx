import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import { ROLES } from "../constants/roles";

// Public Pages
import Home from "../pages/Home";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import NotFound from "../pages/NotFound";
import QuestionDetails from "../components/common/QuestionDetails";

// Student Pages
import StudentDashboard from "../pages/student/Dashboard";
import AskQuestion from "../pages/student/AskQuestion";
import MyQuestions from "../pages/student/MyQuestions";
import StudentProfile from "../pages/student/Profile";


// Teacher Pages
import TeacherDashboard from "../pages/teacher/Dashboard";
import TeacherQuestions from "../pages/teacher/Questions";
import TeacherProfile from "../pages/teacher/Profile";


// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminStudents from "../pages/admin/Students";
import AdminTeachers from "../pages/admin/Teachers";
import AdminQuestions from "../pages/admin/Questions";


function AppRoutes() {
     return (
          <Routes>

               {/* Public */}
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
               <Route
                    path="/questions/:questionId"
                    element={
                         <ProtectedRoute allowedRoles={[ROLES.STUDENT, ROLES.TEACHER, ROLES.ADMIN]}>
                              <QuestionDetails />
                         </ProtectedRoute>
                    }
               />

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
                    path="/student/profile"
                    element={
                         <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                              <StudentProfile />
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
                    path="/teacher/profile"
                    element={
                         <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
                              <TeacherProfile />
                         </ProtectedRoute>
                    }
               />
               

               {/* Admin */}
               <Route path="/admin/dashboard"
               element={
               <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
               <AdminDashboard />
               </ProtectedRoute>
               } 
               />


               <Route path="/admin/students" 
               element={
               <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
               <AdminStudents />
               </ProtectedRoute>
               } 
               />

               <Route path="/admin/teachers" 
               
               element={
               <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
               <AdminTeachers />
               </ProtectedRoute>
               } 
               
               />
               <Route path="/admin/questions" 
               
               element={
               <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
               <AdminQuestions />
               </ProtectedRoute>
               }
               
               />

               {/* 404 */}
               <Route path="*" element={<NotFound />} />

          </Routes>
     );
}

export default AppRoutes;
