import { UserCircle, Clock, BadgeCheck } from "lucide-react";

function AnswerCard({ answer }) {
     return (
          <div
               className="
        bg-white
        dark:bg-gray-900
        border
        border-gray-200
        dark:border-gray-700
        rounded-2xl
        p-6
        shadow-sm
      "
          >
               {/* Header */}

               <div className="flex justify-between items-start">

                    <div className="flex items-center gap-3">

                         <UserCircle
                              size={42}
                              className="text-green-600"
                         />

                         <div>

                              <div className="flex items-center gap-2">

                                   <h3 className="font-semibold text-gray-900 dark:text-white">
                                        {answer.teacher_name}
                                   </h3>

                                   <BadgeCheck
                                        size={18}
                                        className="text-blue-500"
                                   />

                              </div>

                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                   Teacher
                              </p>

                         </div>

                    </div>

                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">

                         <Clock size={15} />

                         {new Date(answer.created_at).toLocaleString()}

                    </div>

               </div>

               {/* Divider */}

               <hr className="my-5 border-gray-100 dark:border-gray-800" />

               {/* Answer */}

               <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line leading-8">
                    {answer.answer_text}
               </p>

          </div>
     );
}

export default AnswerCard;