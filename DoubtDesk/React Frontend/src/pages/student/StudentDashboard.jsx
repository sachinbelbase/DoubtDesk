import DashboardLayout from '../../components/layout/DashboardLayout'
import WelcomeBanner from "../../components/student/WelcomeBanner";
import QuestionCard from "../../components/student/QuestionCard";
import { questions } from "../../data/questions";


function StudentDashboard() {
  return (

    <DashboardLayout>

      <WelcomeBanner />
      <h2 className="mt-8 mb-3 font-bold">
        Recent Questions
      </h2>
      {
        questions.map(q =>
          <QuestionCard
            key={q.id}
            question={q} />
        )}
    </DashboardLayout>
  )

}

export default StudentDashboard