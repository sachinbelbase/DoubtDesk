import DashboardLayout from '../../components/layout/DashboardLayout'
import QuestionList from '../../components/questions/QuestionList'

function StudentDashboard() {
  const questions = [
    {
      id: 1,
      text: "Explain normalization in DBMS?",
      subject: ["DBMS"],
      answers: 5
    },
  ]

  return (
    <DashboardLayout>
      <h1>Student Dashboard</h1>
      <p>Welcome to DoubtDesk!</p>
      <h3>Ask your Doubt</h3>
      <button>Ask Question</button>
      <hr />

      <QuestionList
        questions={questions}
      />
    </DashboardLayout>
  )
}

export default StudentDashboard