import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import QuestionHeader from "../../components/teacher/QuestionHeader";
import AnswerCard from "../../components/common/AnswerCard";
import AnswerForm from "../../components/teacher/AnswerForm";

import { useParams } from "react-router-dom";
import { getQuestion, getQuestionAnswers } from "../../api/questionService";

function QuestionDetails() {
     const { id } = useParams();

     const [question, setQuestion] = useState(null);
     const [answers, setAnswers] = useState([]);

     const [loading, setLoading] = useState(true);
     const [error, setError] = useState("");

     useEffect(() => {
          const fetchQuestion = async () => {
               try {
                    setLoading(true);

                    const [questionResponse, answersResponse] = await Promise.all([
                         getQuestion(id),
                         getQuestionAnswers(id),
                    ]);

                    setQuestion(questionResponse.data);
                    setAnswers(answersResponse.data);
               } catch (err) {
                    console.error(err);

                    setError(
                         err.response?.data?.detail ||
                         "Failed to load question."
                    );
               } finally {
                    setLoading(false);
               }
          };

          fetchQuestion();
     }, [id]);

     if (loading) {
          return (
               <DashboardLayout>
                    <p>Loading...</p>
               </DashboardLayout>
          );
     }

     if (error) {
          return (
               <DashboardLayout>
                    <p className="text-red-600">{error}</p>
               </DashboardLayout>
          );
     }

     return (
          <DashboardLayout role={user?.role}>

               <div className="max-w-4xl mx-auto p-6">

                         <div className="mb-8">
                              <h1 className="text-3xl font-bold text-gray-900">
                                   Question Details
                              </h1>

                              <p className="text-gray-500 mt-2">
                                   View the complete discussion and answers.
                              </p>
                         </div>


                    {/* Question Header */}

                    <QuestionHeader question={question} />

                    {/* Question Body */}

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mt-6">

                         <h2 className="text-xl font-semibold mb-5">
                              Question
                         </h2>

                         <p className="whitespace-pre-line text-gray-700 leading-8">
                              {question.question_text}
                         </p>

                    </div>

                    {/* Answers */}

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mt-6">

                         <h2 className="text-2xl font-bold mb-6">
                              Answers ({answers.length})
                         </h2>

                         {answers.length === 0 ? (

                              <p className="text-gray-500">
                                   No answers yet.
                              </p>

                         ) : (

                              <div className="space-y-5">

                                   {answers.map((answer) => (
                                        <AnswerCard
                                             key={answer.answer_id}
                                             answer={answer}
                                        />
                                   ))}

                              </div>

                         )}

                    </div>

                    {/* Teacher Only */}

                    {isTeacher && (

                         <div className="mt-8">

                              <AnswerForm
                                   questionId={question.question_id}
                                   onSuccess={fetchAnswers}
                              />

                         </div>

                    )}

               </div>

          </DashboardLayout>
     );
}

export default QuestionDetails;