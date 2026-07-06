import { questions as allQuestions } from "../../data/questions";
import QuestionCard from "../dashboard/QuestionCard";
import QuestionFilter from "./QuestionFilter";

function QuestionFeed({
     questions = allQuestions,
     title = "Recent Questions",
     emptyMessage = "No questions yet.",
}) {
     return (
          <section className="mt-10">

               <QuestionFilter title={title} />

               {questions.length === 0 ? (
                    <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
                         {emptyMessage}
                    </div>
               ) : (
                    <div className="space-y-5">
                         {questions.map((question) => (
                              <QuestionCard
                                   key={question.id}
                                   question={question}
                              />
                         ))}
                    </div>
               )}

          </section>
     );
}

export default QuestionFeed;
