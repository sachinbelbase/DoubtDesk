import { useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import QuestionCard from "../../components/dashboard/QuestionCard";
import AnswerForm from "../../components/teacher/AnswerForm";
import Button from "../../components/common/Button";

import { questions as staticQuestions } from "../../data/questions";
import { useMyQuestions } from "../../hooks/useMyQuestions";

function Questions() {

     const { myQuestions } = useMyQuestions();
     const allQuestions = [...myQuestions, ...staticQuestions];

     const [expandedId, setExpandedId] = useState(null);

     const toggleExpand = (id) => {
          setExpandedId((prev) => (prev === id ? null : id));
     };

     return (
          <DashboardLayout role="teacher">

               <div className="mb-6">

                    <h1 className="text-3xl font-bold">
                         Questions
                    </h1>

                    <p className="text-gray-500 mt-2">
                         Answer questions submitted by students.
                    </p>

               </div>

               <div className="space-y-5">

                    {allQuestions.map((question) => (
                         <div key={question.id}>

                              <QuestionCard question={question} />

                              <div className="flex justify-end mt-2">
                                   <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => toggleExpand(question.id)}
                                   >
                                        {expandedId === question.id ? "Close" : "Answer"}
                                   </Button>
                              </div>

                              {expandedId === question.id && (
                                   <AnswerForm questionId={question.id} />
                              )}

                         </div>
                    ))}

               </div>

          </DashboardLayout>
     );
}

export default Questions;
