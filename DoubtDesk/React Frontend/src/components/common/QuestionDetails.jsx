import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AnswerForm from "../../components/teacher/AnswerForm";
import {
     getQuestion,
     getQuestionAnswers,
} from "../../api/questionService";
import { useAuth } from "../../hooks/useAuth";
import QuestionHeader from "../../components/teacher/QuestionHeader";
import AnswerCard from "./AnswerCard";

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

     if (loading)
          return (
               <p className="text-gray-600 dark:text-gray-300">
                    Loading...
               </p>
          );

     if (error)
          return (
               <p className="text-red-600 dark:text-red-400">
                    {error}
               </p>
          );

     return (
          <div
               className="
                    max-w-4xl
                    mx-auto
                    p-6
                    dark:bg-gray-950
                    text-gray-900
                    dark:text-white

                    transition-colors
                    duration-300
               "
          >
               <QuestionHeader question={question} />

               <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-5 text-gray-900 dark:text-white">
                         Answers
                    </h2>

                    {answers.length === 0 ? (
                         <p className="text-gray-500 dark:text-gray-400">
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

               {isTeacher && (
                    <AnswerForm
                         questionId={question.question_id}
                         onSuccess={fetchAnswers}
                    />
               )}
          </div>
     );
}

export default QuestionDetails;