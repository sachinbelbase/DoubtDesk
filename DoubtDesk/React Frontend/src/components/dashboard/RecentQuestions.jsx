import QuestionCard from "./QuestionCard";

import { questions } from "../../data/questions";

function RecentQuestions() {

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
                              key={question.id}
                              question={question}
                         />

                    ))}

               </div>

          </section>

     );

}

export default RecentQuestions;