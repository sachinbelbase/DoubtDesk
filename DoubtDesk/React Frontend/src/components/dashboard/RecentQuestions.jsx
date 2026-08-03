import { useEffect, useState } from "react";

import { getQuestions } from "../../api/questionService";

import QuestionCard from "./QuestionCard";
import ViewAnswersModal from "../student/ViewAnswersModal";
import AnswerQuestionModal from "../common/AnswerQuestionModal";

function RecentQuestions() {

     const [questions, setQuestions] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState("");

     const [viewingQuestion, setViewingQuestion] = useState(null);
     const [answeringQuestion, setAnsweringQuestion] = useState(null);

     const fetchQuestions = async () => {
          try {
               setLoading(true);

               const response = await getQuestions();

               setQuestions(response.data);
          } catch (err) {
               console.error(err);

               setError(
                    err.response?.data?.detail ||
                    "Failed to load questions."
               );
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {

          fetchQuestions();
          
     }, []);

     if (loading) {
          return <p>Loading questions...</p>;
     }

     if (error) {
          return <p className="text-red-600">{error}</p>;
     }

     return (

          <section className="mb-10">

               <div className="flex justify-between items-center mb-5">

                    <h2 className="text-2xl font-bold">
                         Recent Questions
                    </h2>

               </div>

               <div className="space-y-5">

                    {questions.map((question) => (

                         <QuestionCard
                              key={question.question_id}
                              question={question}
                              showViewAnswers={true}
                              showActions={true}
                              onViewAnswers={setViewingQuestion}
                              onAnswer={setAnsweringQuestion}
                         />

                    ))}

               </div>

               {viewingQuestion && (
                    <ViewAnswersModal
                         question={viewingQuestion}
                         onClose={() => setViewingQuestion(null)}
                    />
               )}

               {answeringQuestion && (
                    <AnswerQuestionModal
                         question={answeringQuestion}
                         onClose={() => setAnsweringQuestion(null)}
                         onSuccess={fetchQuestions}
                    />
               )}

          </section>

     );

}

export default RecentQuestions;