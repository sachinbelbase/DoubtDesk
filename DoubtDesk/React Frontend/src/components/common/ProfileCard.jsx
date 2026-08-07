import {
     Mail,
     GraduationCap,
     BookOpen,
     CheckCircle2,
     Bookmark,
     Users,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

function ProfileCard({ stats, role }) {
     const { user } = useAuth();

     const profileStats =
          role === "teacher"
               ? [
                    {
                         label: "Total Questions",
                         value: stats?.total_questions ?? 0,
                         icon: <BookOpen className="text-blue-600" size={22} />,
                    },
                    {
                         label: "Answered",
                         value: stats?.answered_questions ?? 0,
                         icon: <CheckCircle2 className="text-green-600" size={22} />,
                    },
                    {
                         label: "Pending",
                         value: stats?.pending_questions ?? 0,
                         icon: <Bookmark className="text-yellow-600" size={22} />,
                    },
                    {
                         label: "Students",
                         value: stats?.total_students ?? 0,
                         icon: <Users className="text-purple-600" size={22} />,
                    },
               ]
               : [
                    {
                         label: "Questions",
                         value: stats?.total_questions ?? 0,
                         icon: <BookOpen className="text-blue-600" size={22} />,
                    },
                    {
                         label: "Answered",
                         value: stats?.answered_questions ?? 0,
                         icon: <CheckCircle2 className="text-green-600" size={22} />,
                    },
                    {
                         label: "Open",
                         value: stats?.open_questions ?? 0,
                         icon: <Bookmark className="text-yellow-600" size={22} />,
                    },
                    {
                         label: "Class",
                         value: stats?.class_questions ?? 0,
                         icon: <Users className="text-purple-600" size={22} />,
                    },
               ];

     return (
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 overflow-hidden ">

               {/* Cover */}
               <div className="h-36 `bg-gradient-to-r` from-gray-500 to-indigo-600  " />

               <div className="px-8 pb-8">

                    {/* Avatar */}
                    <div className="-mt-14 flex justify-center">
                         <div className="w-28 h-28 rounded-full bg-white dark:bg-gray-900 dark:text-white p-1 shadow-lg">
                              <div className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold text-white dark:text-white">
                                   {user?.name
                                        ?.split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .toUpperCase()}
                              </div>
                         </div>
                    </div>

                    {/* Name */}
                    <div className="text-center mt-5">
                         <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                              {user?.name}
                         </h2>

                         <p className="text-gray-500 capitalize dark:text-white mt-2">
                              {user?.role}
                         </p>
                    </div>

                    {/* Information */}
                    <div className="mt-10">

                         <h3 className="text-lg font-semibold dark:text-white mb-4">
                              {role === "teacher"
                                   ? "Teacher Information"
                                   : "Student Information"}
                         </h3>

                         <div className="grid md:grid-cols-2 gap-5 dark:text-white">

                              <div className="border rounded-xl p-5">
                                   <div className="flex items-center gap-3 mb-2 dark:text-white">
                                        <Mail className="text-blue-600" size={20} />
                                        <span className="font-semibold">Email</span>
                                   </div>

                                   <p className="text-gray-600 dark:text-white">
                                        {user?.email}
                                   </p>
                              </div>

                              <div className="border rounded-xl p-5">
                                   <div className="flex items-center gap-3 mb-2">
                                        <GraduationCap className="text-blue-600" size={20} />
                                        <span className="font-semibold dark:text-white">Role</span>
                                   </div>

                                   <p className="text-gray-600 capitalize dark:text-white">
                                        {user?.role}
                                   </p>
                              </div>

                         </div>

                    </div>

                    {/* Statistics */}
                    <div className="mt-10">

                         <h3 className="text-lg font-semibold mb-4 dark:text-white">
                              Statistics
                         </h3>

                         <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 dark:text-white">

                              {profileStats.map((item) => (
                                   <div
                                        key={item.label}
                                        className="border rounded-xl p-6 text-center hover:shadow-md transition"
                                   >
                                        <div className="flex justify-center mb-3">
                                             {item.icon}
                                        </div>

                                        <h4 className="text-3xl font-bold">
                                             {item.value}
                                        </h4>

                                        <p className="text-sm text-gray-500 mt-2 dark:text-white">
                                             {item.label}
                                        </p>
                                   </div>
                              ))}

                         </div>

                    </div>

               </div>
          </div>
     );
}

export default ProfileCard;