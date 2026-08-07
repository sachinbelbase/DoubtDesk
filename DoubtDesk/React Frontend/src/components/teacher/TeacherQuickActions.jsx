import { useNavigate } from "react-router-dom";
import { ClipboardList, User } from "lucide-react";

function TeacherQuickActions() {
     const navigate = useNavigate();

     return (
          <div className="bg-white rounded-xl shadow p-6 mt-8 dark:bg-gray-900">
               <h2 className="text-xl font-semibold mb-5 dark:text-white">
                    Quick Actions
               </h2>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <button
                         onClick={() => navigate("/teacher/questions")}
                         className="flex items-center gap-3 p-4 rounded-xl border hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                         <ClipboardList className="text-blue-600" size={28} />

                         <div className="text-left">
                              <p className="font-semibold dark:text-white">
                                   View Questions
                              </p>

                              <p className="text-sm text-gray-500">
                                   Review and answer student questions
                              </p>
                         </div>
                    </button>

                    <button
                         onClick={() => navigate("/teacher/profile")}
                         className="flex items-center gap-3 p-4 rounded-xl border hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                         <User className="text-green-600" size={28} />

                         <div className="text-left">
                              <p className="font-semibold dark:text-white">
                                   My Profile
                              </p>

                              <p className="text-sm text-gray-500">
                                   Update your account
                              </p>
                         </div>
                    </button>

               </div>
          </div>
     );
}

export default TeacherQuickActions;