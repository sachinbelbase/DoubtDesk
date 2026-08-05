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

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-10">

               <div className="flex items-center justify-between mb-6">

                    <div>

                         <h2 className="text-2xl font-bold text-gray-900">
                              Recent Questions
                         </h2>

                         <p className="text-sm text-gray-500 mt-1">
                              Browse the latest questions from your class and college.
                         </p>

                    </div>

                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
                         {questions.length} Questions
                    </span>

               </div>

               {questions.length === 0 ? (

                    <div className="py-16 text-center">

                         <p className="text-gray-500">
                              No questions found.
                         </p>

                    </div>

               ) : (

                    <div className="space-y-5">

                         {questions.map((question) => (
                              <QuestionCard
                                   key={question.question_id}
                                   question={question}
                                   showViewAnswers
                                   showActions
                                   onViewAnswers={setViewingQuestion}
                                   onAnswer={setAnsweringQuestion}
                              />
                         ))}

                    </div>

               )}

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
                         className="
                                   px-5
                                   py-2
                                   rounded-lg
                                   border
                                   border-gray-300
                                   hover:bg-gray-50
                                   disabled:opacity-40
                                   disabled:cursor-not-allowed
                                   transition
                                   "
                    >
                         Previous
                    </button>

                    <span className="font-medium">
                         Page {page} of {totalPages}
                    </span>

                    <button
                         onClick={() => setPage(page + 1)}
                         disabled={page === totalPages}
                         className="
                                   px-5
                                   py-2
                                   rounded-lg
                                   border
                                   border-gray-300
                                   hover:bg-gray-50
                                   disabled:opacity-40
                                   disabled:cursor-not-allowed
                                   transition
                                   "
                    >
                         Next
                    </button>

               </div>

          </section>

          

     );
}

export default RecentQuestions;