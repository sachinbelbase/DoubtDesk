import { questions } from "../../data/questions";
import QuestionCard from "../dashboard/QuestionCard"; 
import QuestionFilter from "./QuestionFilter";

function QuestionFeed() {
     return (
          <section className="mt-10">

               <QuestionFilter />

               <div className="space-y-5">

                    {questions.map((question) => (
                         <QuestionCard
                              key={question.id}
                              question={question}
                         />
                    ))}

               </div>

          </section>
     );
}

export default QuestionFeed;