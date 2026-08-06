import {
     Globe,
     Users,
     Clock,
     UserCircle,
} from "lucide-react";

function QuestionHeader({ question }) {
     const statusColors = {
          OPEN: "bg-yellow-100 text-yellow-700",
          ANSWERED: "bg-green-100 text-green-700",
          CLOSED: "bg-red-100 text-red-700",
     };

     return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

               {/* Badges */}
               <div className="flex flex-wrap gap-3 mb-5">

                    <span className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">

                         {question.visibility === "COLLEGE" ? (
                              <>
                                   <Globe size={16} />
                                   College
                              </>
                         ) : (
                              <>
                                   <Users size={16} />
                                   Class
                              </>
                         )}

                    </span>

                    <span
                         className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[question.status]}`}
                    >
                         {question.status.charAt(0) +
                              question.status.slice(1).toLowerCase()}
                    </span>

               </div>

               {/* Title */}
               <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                    {question.title}
               </h1>

               {/* User */}
               <div className="flex items-center justify-between flex-wrap gap-4 mt-6">

                    <div className="flex items-center gap-3">

                         <UserCircle
                              size={40}
                              className="text-gray-400"
                         />

                         <div>

                              <p className="font-semibold">
                                   {question.asked_by}
                              </p>

                              <p className="text-sm text-gray-500">
                                   Student
                              </p>

                         </div>

                    </div>

                    <div className="flex items-center gap-2 text-gray-500 text-sm">

                         <Clock size={16} />

                         {new Date(question.created_at).toLocaleString()}

                    </div>

               </div>

          </div>
     );
}

export default QuestionHeader;