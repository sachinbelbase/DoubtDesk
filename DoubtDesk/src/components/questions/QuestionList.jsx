import QuestionCard from "./QuestionCard";

function QuestionList({questions}) {
  return (
    <div>
          {
               questions.map(question => (
                    <QuestionCard
                         key={question.id}
                         question={question}
                    />
               ))
          }
    </div>
  )
}

export default QuestionList
