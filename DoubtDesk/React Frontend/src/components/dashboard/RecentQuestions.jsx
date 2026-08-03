import { useState } from "react";
import QuestionCard from "./QuestionCard";
import ViewAnswersModal from "../student/ViewAnswersModal";
import AnswerQuestionModal from "../common/AnswerQuestionModal";

function RecentQuestions({
     questions,
     loading,
     error,
     fetchQuestions,
     page,
     setPage,
     totalPages,
}) {

     const [viewingQuestion, setViewingQuestion] = useState(null);
     const [answeringQuestion, setAnsweringQuestion] = useState(null);

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

               <div className="flex items-center justify-center gap-4 mt-8">

                    <button
                         onClick={() => setPage(page - 1)}
                         disabled={page === 1}
                         className="px-4 py-2 rounded-lg border disabled:opacity-50"
                    >
                         Previous
                    </button>

                    <span className="font-medium">
                         Page {page} of {totalPages}
                    </span>

                    <button
                         onClick={() => setPage(page + 1)}
                         disabled={page === totalPages}
                         className="px-4 py-2 rounded-lg border disabled:opacity-50"
                    >
                         Next
                    </button>

               </div>

          </section>

          

     );
}

export default RecentQuestions;