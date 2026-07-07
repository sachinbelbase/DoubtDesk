import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/common/Button";

import { questions as staticQuestions } from "../../data/questions";
import { useMyQuestions } from "../../hooks/useMyQuestions";
import { useAnswers } from "../../hooks/useAnswers";
import { getPendingQuestions } from "../../utils/questionStats";

function Notifications() {

     const navigate = useNavigate();
     const { myQuestions } = useMyQuestions();
     const { answers } = useAnswers();

     const allQuestions = [...myQuestions, ...staticQuestions];
     const pending = getPendingQuestions(allQuestions, answers);

     return (
          <DashboardLayout role="teacher">

               <div className="mb-6">

                    <h1 className="text-3xl font-bold">
                         Notifications
                    </h1>

                    <p className="text-gray-500 mt-2">
                         Questions still waiting for an answer.
                    </p>

               </div>

               {pending.length === 0 ? (
                    <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
                         You're all caught up — every question has an answer.
                    </div>
               ) : (
                    <div className="bg-white rounded-xl shadow divide-y">

                         {pending.map((question) => (
                              <div
                                   key={question.id}
                                   className="flex items-start gap-4 p-5"
                              >
                                   <Bell size={20} className="text-blue-600 mt-1" />

                                   <div className="flex-1">

                                        <p className="font-medium text-gray-900">
                                             {question.title}
                                        </p>

                                        <p className="text-sm text-gray-500 mt-1">
                                             {question.category} · {question.author}
                                        </p>

                                   </div>

                                   <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => navigate("/teacher/questions")}
                                   >
                                        Answer
                                   </Button>

                              </div>
                         ))}

                    </div>
               )}

          </DashboardLayout>
     );
}

export default Notifications;
