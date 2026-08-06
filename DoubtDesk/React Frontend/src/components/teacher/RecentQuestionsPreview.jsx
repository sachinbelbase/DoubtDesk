import { Clock, Globe, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function RecentQuestionsPreview({ questions }) {
     const navigate = useNavigate();

     return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mt-8">

               <div className="flex items-center justify-between mb-6">

                    <div>
                         <h2 className="text-xl font-bold">
                              Recent Open Questions
                         </h2>

                         <p className="text-sm text-gray-500 mt-1">
                              Latest questions waiting for an answer.
                         </p>
                    </div>

                    <button
                         onClick={() => navigate("/teacher/questions")}
                         className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                         View All
                         <ArrowRight size={18} />
                    </button>

               </div>

               {questions.length === 0 ? (
                    <div className="py-10 text-center text-gray-500">
                         No open questions.
                    </div>
               ) : (
                    <div className="space-y-4">

                         {questions.map((question) => (
                              <div
                                   key={question.question_id}
                                   onClick={() => navigate(`/questions/${question.question_id}`)}
                                   className="
                border
                rounded-xl
                p-4
                hover:bg-gray-50
                hover:border-blue-300
                cursor-pointer
                transition-all
              "
                              >

                                   <div className="flex justify-between items-start gap-4">

                                        <div>

                                             <h3 className="font-semibold text-gray-900">
                                                  {question.title}
                                             </h3>

                                             <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">

                                                  <span className="flex items-center gap-1">
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

                                                  <span className="flex items-center gap-1">
                                                       <Clock size={14} />
                                                       {new Date(question.created_at).toLocaleDateString()}
                                                  </span>

                                             </div>

                                        </div>

                                   </div>

                              </div>
                         ))}

                    </div>
               )}

          </div>
     );
}

export default RecentQuestionsPreview;