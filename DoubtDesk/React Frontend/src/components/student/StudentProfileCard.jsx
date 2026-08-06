import { User, Mail, GraduationCap, BookOpen, CheckCircle2, Bookmark, Users } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

function StudentProfileCard({ stats }) {
     const { user } = useAuth();

     const profileStats = [
          {
               label: "Questions",
               value: stats?.total_questions ?? 0,
               icon: <BookOpen size={20} className="text-blue-600" />,
          },
          {
               label: "Answered",
               value: stats?.answered_questions ?? 0,
               icon: <CheckCircle2 size={20} className="text-green-600" />,
          },
          {
               label: "Open",
               value: stats?.open_questions ?? 0,
               icon: <Bookmark size={20} className="text-yellow-600" />,
          },
          {
               label: "Class",
               value: stats?.class_questions ?? 0,
               icon: <Users size={20} className="text-purple-600" />,
          },
     ];

     return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

               {/* Cover */}
               <div className="h-28 `bg-gradient-to-r` from-blue-600 to-indigo-600" />

               {/* Profile */}
               <div className="px-8 pb-8">

                    {/* Avatar */}
                    <div className="-mt-12 flex justify-center">
                         <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg">
                              <div className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold text-white">
                                   {user?.name
                                        ?.split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .toUpperCase()}
                              </div>
                         </div>
                    </div>

                    {/* Name */}
                    <div className="text-center mt-4">
                         <h2 className="text-2xl font-bold text-gray-900">
                              {user?.name}
                         </h2>

                         <p className="text-gray-500 mt-1">
                              {user?.role}
                         </p>
                    </div>

                    {/* Info */}
                    <div className="grid md:grid-cols-2 gap-4 mt-8">

                         <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
                              <Mail className="text-blue-600" size={20} />
                              <div>
                                   <p className="text-xs text-gray-500">Email</p>
                                   <p className="font-medium">{user?.email}</p>
                              </div>
                         </div>

                         <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
                              <GraduationCap className="text-blue-600" size={20} />
                              <div>
                                   <p className="text-xs text-gray-500">Role</p>
                                   <p className="font-medium capitalize">{user?.role}</p>
                              </div>
                         </div>

                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

                         {profileStats.map((item) => (
                              <div
                                   key={item.label}
                                   className="rounded-xl border border-gray-200 p-5 text-center hover:shadow-md transition"
                              >
                                   <div className="flex justify-center mb-2">
                                        {item.icon}
                                   </div>

                                   <h3 className="text-2xl font-bold">
                                        {item.value}
                                   </h3>

                                   <p className="text-sm text-gray-500 mt-1">
                                        {item.label}
                                   </p>
                              </div>
                         ))}

                    </div>

               </div>
          </div>
     );
}

export default StudentProfileCard;