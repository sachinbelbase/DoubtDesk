import QuestionCard from "../dashboard/QuestionCard";
import QuestionFilter from "./QuestionFilter";

function QuestionFeed({
     questions = [],
     title = "Recent Questions",
     emptyMessage = "No questions yet.",
     showActions = false,
     showViewAnswers = false,
     onViewAnswers,
     onEdit,
     onDelete,
     onAnswer,
     showFilter = true,
}) {
     return (
          <section className="mt-10">

               {showFilter && <QuestionFilter title={title} />}

               {questions.length === 0 ? (
                    <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
                         {emptyMessage}
                    </div>
               ) : (
                    <div className="space-y-5">
                         {questions.map((question) => (

                              <QuestionCard
                                   key={question.question_id}
                                   question={question}
                                   showActions={showActions}
                                   showViewAnswers={showViewAnswers}
                                   onViewAnswers={onViewAnswers}
                                   onEdit={onEdit}
                                   onDelete={onDelete}
                                   onAnswer={onAnswer}
                              />
                         ))}
                    </div>
               )}

          </section>
     );
}

export default QuestionFeed;
