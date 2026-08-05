import { useNavigate } from "react-router-dom";
import { ClipboardList, User } from "lucide-react";

function TeacherQuickActions() {
     const navigate = useNavigate();

     return (
          <div className="bg-white rounded-xl shadow p-6 mt-8">
               <h2 className="text-xl font-semibold mb-5">
                    Quick Actions
               </h2>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <button
                         onClick={() => navigate("/teacher/questions")}
                         className="flex items-center gap-3 p-4 rounded-xl border hover:bg-gray-50 transition"
                    >
                         <ClipboardList className="text-blue-600" size={28} />

                         <div className="text-left">
                              <p className="font-semibold">
                                   View Questions
                              </p>

                              <p className="text-sm text-gray-500">
                                   Review and answer student questions
                              </p>
                         </div>
                    </button>

                    <button
                         onClick={() => navigate("/teacher/profile")}
                         className="flex items-center gap-3 p-4 rounded-xl border hover:bg-gray-50 transition"
                    >
                         <User className="text-green-600" size={28} />

                         <div className="text-left">
                              <p className="font-semibold">
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