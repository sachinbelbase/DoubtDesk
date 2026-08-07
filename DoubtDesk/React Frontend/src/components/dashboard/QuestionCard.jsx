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
          OPEN: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
          ANSWERED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
          CLOSED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
     };

     return (
          <div
               onClick={() => navigate(`/questions/${question.question_id}`)}
               className="
                    bg-white
                    dark:bg-gray-900

                    border
                    border-gray-200
                    dark:border-gray-700
                    
                    rounded-2xl
                    p-6

                    shadow-sm
                    hover:shadow-lg
                    dark:hover:border-blue-500

                    transition-all
                    `transition-colors`
                    duration-300

                    cursor-pointer 
                    active:scale-[0.99]
                    select-none
               "
          >

               {/* Top */}
               <div className="flex justify-between items-center flex-wrap gap-3">

                    <div className="flex flex-wrap gap-2">

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
                              {question.status.charAt(0) + question.status.slice(1).toLowerCase()}
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

               <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-5 leading-snug">
                    {question.title}
               </h2>

               {/* Description */}

               <p className="text-gray-600 dark:text-gray-300 mt-3 whitespace-pre-line line-clamp-3">
                    {question.question_text}
               </p>
               
               <hr className="my-5 border-gray-200 dark:border-gray-700" />

               {/* Footer */}

               <div className="flex justify-between items-center mt-6 flex-wrap gap-4">

                    <div className="flex items-center gap-3">

                         <UserCircle
                              className="text-gray-500 dark:text-gray-400"
                              size={28}
                         />

                         <div>

                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                   {question.asked_by}
                              </p>

                              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">

                                   <Clock size={14} />

                                   {new Date(question.created_at).toLocaleDateString()}

                              </div>

                         </div>

                    </div>

                    <div className="flex flex-wrap gap-2">

                         {showViewAnswers && (
                              <button
                                   onClick={(e) => {
                                        e.stopPropagation();
                                        onViewAnswers(question);
                                   }}
                                   className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                              >
                                   <Eye
                                        size={18}
                                        className="text-gray-600 dark:text-gray-300"
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
                                             className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30transition-colors"
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
                                             className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30transition-colors"
                                        >
                                             <Pencil
                                                  size={18}
                                                  className="text-blue-600"
                                             />
                                        </button>
                                   )}

                                   {onDelete && question.status === "OPEN" && (
                                        <button
                                             onClick={(e) => {
                                                  e.stopPropagation();
                                                  onDelete(question);
                                             }}
                                             className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
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