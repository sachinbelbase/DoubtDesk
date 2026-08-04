import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AnswerForm from "../../components/teacher/AnswerForm";
import { getQuestion, getQuestionAnswers, } from "../../api/questionService";
import { useAuth } from "../../hooks/useAuth";

function QuestionDetails() {
     const { questionId } = useParams();

     const [question, setQuestion] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState("");
     const [answers, setAnswers] = useState([]);

     const { user } = useAuth();

     const isTeacher = user?.role === "teacher";

     const fetchAnswers = async () => {
          try {
               const response = await getQuestionAnswers(questionId);
               setAnswers(response.data);
          } catch (err) {
               console.error(err);
          }
     };

     useEffect(() => {
          const fetchData = async () => {
               try {
                    setLoading(true);

                    const questionRes = await getQuestion(questionId);

                    setQuestion(questionRes.data);

                    await fetchAnswers();

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

          fetchData();
     }, [questionId]);

     if (loading) return <p>Loading...</p>;

     if (error) return <p className="text-red-600">{error}</p>;

     return (
          <div className="max-w-4xl mx-auto p-6">
               <h1 className="text-3xl font-bold mb-4">
                    {question.title}
               </h1>

               <p className="text-gray-700 mb-6">
                    {question.question_text}
               </p>

               <div className="space-y-2 text-sm text-gray-500">
                    <p>Status: {question.status}</p>
                    <p>Asked by: {question.asked_by}</p>
               </div>

               <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-5">
                         Answers
                    </h2>

                    {answers.length === 0 ? (
                         <p className="text-gray-500">
                              No answers yet.
                         </p>
                    ) : (
                         <div className="space-y-5">
                              {answers.map((answer) => (
                                   <div
                                        key={answer.answer_id}
                                        className="border rounded-xl p-5 bg-white shadow-sm"
                                   >
                                        <div className="flex justify-between mb-2">
                                             <h3 className="font-semibold">
                                                  {answer.teacher_name}
                                             </h3>

                                             <span className="text-sm text-gray-500">
                                                  {new Date(answer.created_at).toLocaleString()}
                                             </span>
                                        </div>

                                        <p className="whitespace-pre-line text-gray-700">
                                             {answer.answer_text}
                                        </p>
                                   </div>
                              ))}
                         </div>
                    )}
               </div>

               <AnswerForm
                    questionId={question.question_id}
                    onSuccess={fetchAnswers}
               />
               
          </div>
     );
}

export default QuestionDetails;