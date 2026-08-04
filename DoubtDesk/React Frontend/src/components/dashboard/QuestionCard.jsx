import {
     Globe,
     Users,
     Clock,
     UserCircle,
     Pencil,
     Trash2,
     MessageSquareReply,
     Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function QuestionCard({
     question,
     showActions = false,
     showViewAnswers = false,
     onViewAnswers,
     onEdit,
     onDelete,
     onAnswer,
}) {


     const navigate = useNavigate();

     const statusColors = {
          OPEN: "bg-yellow-100 text-yellow-700",
          ANSWERED: "bg-green-100 text-green-700",
          CLOSED: "bg-red-100 text-red-700",
     };

     return (
          <div
               onClick={() => navigate(`/questions/${question.question_id}`)}
               className="
                    bg-white
                    border
                    border-gray-200
                    rounded-2xl
                    p-6
                    shadow-sm
                    hover:shadow-md
                    hover:-translate-y-1
                    transition
                    cursor-pointer 
               "
          >

               {/* Top */}
               <div className="flex justify-between items-center flex-wrap gap-3">

                    <div className="flex gap-2">

                         <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">

                              {question.visibility === "COLLEGE" ? (
                                   <>
                                        <Globe size={14} />
                                        College
                                   </>
                              ) : (
                                   <>
                                        <Users size={14} />
                                        Class
                                   </>
                              )}

                         </span>

                         <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[question.status]}`}
                         >
                              {question.status}
                         </span>

                         {/* Future difficulty */}
                         {question.difficulty && (
                              <span className="px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-700">
                                   {question.difficulty}
                              </span>
                         )}

                    </div>

               </div>

               {/* Title */}

               <h2 className="text-xl font-semibold mt-5">
                    {question.title}
               </h2>

               {/* Description */}

               <p className="text-gray-600 mt-3 whitespace-pre-line">
                    {question.question_text}
               </p>

               {/* Footer */}

               <div className="flex justify-between items-center mt-6 flex-wrap gap-4">

                    <div className="flex items-center gap-3">

                         <UserCircle
                              className="text-gray-500"
                              size={28}
                         />

                         <div>

                              <p className="text-sm font-medium">
                                   {question.asked_by}
                              </p>

                              <div className="flex items-center gap-1 text-xs text-gray-500">

                                   <Clock size={14} />

                                   {new Date(question.created_at).toLocaleString()}

                              </div>

                         </div>

                    </div>

                    <div className="flex gap-2">

                         {showViewAnswers && (
                              <button
                                   onClick={(e) => {
                                        e.stopPropagation();
                                        onViewAnswers(question);
                                   }}
                                   className="p-2 rounded-lg hover:bg-gray-100"
                              >
                                   <Eye
                                        size={18}
                                        className="text-gray-600"
                                   />
                              </button>
                         )}

                         {showActions && (
                              <>
                                   {onAnswer && (
                                        <button
                                             onClick={(e) => {
                                                  e.stopPropagation();
                                                  onAnswer(question);
                                             }}
                                             className="p-2 rounded-lg hover:bg-green-100"
                                        >
                                             <MessageSquareReply
                                                  size={18}
                                                  className="text-green-600"
                                             />
                                        </button>
                                   )}

                                   {onEdit && question.status === "OPEN" && (
                                        <button
                                             onClick={(e) => {
                                                  e.stopPropagation();
                                                  onEdit(question);
                                             }}
                                             className="p-2 rounded-lg hover:bg-blue-100"
                                        >
                                             <Pencil
                                                  size={18}
                                                  className="text-blue-600"
                                             />
                                        </button>
                                   )}

                                   {onDelete &&  (
                                        <button
                                             onClick={(e) => {
                                                  e.stopPropagation();
                                                  onDelete(question);
                                             }}
                                             className="p-2 rounded-lg hover:bg-red-100"
                                        >
                                             <Trash2
                                                  size={18}
                                                  className="text-red-600"
                                             />
                                        </button>
                                   )}
                              </>
                         )}

                    </div>

               </div>

          </div>
     );
}

export default QuestionCard;