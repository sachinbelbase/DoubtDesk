import Card from "../common/Card";

function QuestionCard({ question }) {
     if (!question) return null;
     return (
          <Card>
               <div className="question-card bg-white rounded-xl shadow p-5 mb-4 hover:shadow-lg transition">

                    <h3 className="font-semibold text-lg text-blue-900">
                         {question.title}
                    </h3>

                    <p className="my-3 text-gray-700">
                         {question.text}
                    </p>
               </div>

               <div className="flex gap-2 mb-3">

                    {
                         question.tags?.map(tag => (

                              <span
                                   key={tag}
                                   className=" bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                   {tag}
                              </span>
                         ))
                    }
               </div>

               <p className="text-sm text-gray-500">
                    Anonymous • {question.time}
               </p>
               <div className="text-center min-w-20">

                    <span className="font-bold text-xl">
                         {question.answers}
                    </span>
                    <p className="text-sm text-gray-500">Answers</p>
               </div>
          </Card>
     )
}

export default QuestionCard;