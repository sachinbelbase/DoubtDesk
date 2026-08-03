import { Clock, GraduationCap, UserRound } from "lucide-react";

function AnswerCard({ answer }) {

     const role = answer.answered_by_role;

     return (
          <div className="border rounded-xl p-5 bg-gray-50">

               <div className="flex justify-between items-center mb-3">

                    <div className="flex items-center gap-2">

                         {role === "Teacher" ? (
                              <GraduationCap
                                   size={18}
                                   className="text-blue-600"
                              />
                         ) : (
                              <UserRound
                                   size={18}
                                   className="text-green-600"
                              />
                         )}

                         <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${role === "Teacher"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-green-100 text-green-700"
                                   }`}
                         >
                              {role}
                         </span>

                    </div>

                    <div className="flex items-center gap-1 text-sm text-gray-500">

                         <Clock size={15} />

                         {new Date(answer.created_at).toLocaleDateString()}

                    </div>

               </div>

               <p className="text-gray-700 whitespace-pre-line">
                    {answer.answer_text}
               </p>

          </div>
     );
}

export default AnswerCard;