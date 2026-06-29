function QuestionCard({ question }) {
     return (
          <div className="
                    question-card bg-white
                    rounded-xl
                    shadow
                    p-5
                    mb-4
                    hover:shadow-lg
                    transition">

               <div className="font-semibold">
                    <h3> Anonymous Student </h3>
                    
                    <p className="my-3 text-gray-700">
                         {question.text}
                    </p>
               </div>

               <div className="flex justify-between">
                    <span className="
                              bg-blue-100
                              text-blue-700
                              px-3
                              py-1
                              rounded-full
                         ">
                         {question.subject}
                    </span>

                    <p>
                         {question.answers} Answers
                    </p>

               </div>
          </div>
     )
}

export default QuestionCard;