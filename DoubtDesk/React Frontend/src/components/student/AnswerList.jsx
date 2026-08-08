import AnswerCard from "./AnswerCard";

function AnswerList({ answers = [] }) {

     if (answers.length === 0) {
          return (
               <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center text-gray-500 dark:text-gray-400">
                    No answers yet.
               </div>
          );
     }

     return (
          <div className="space-y-4">

               {answers.map((answer) => (
                    <AnswerCard
                         key={answer.answer_id}
                         answer={answer}
                    />
               ))}

          </div>
     );
}

export default AnswerList;