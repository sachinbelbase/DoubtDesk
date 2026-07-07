import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import TeacherStatus from "../../components/teacher/TeacherStats";
import Button from "../../components/common/Button";

import { questions as staticQuestions } from "../../data/questions";
import { useMyQuestions } from "../../hooks/useMyQuestions";
import { useAnswers } from "../../hooks/useAnswers";
import { getQuestionStats } from "../../utils/questionStats";

function Dashboard() {

     const navigate = useNavigate();
     const { myQuestions } = useMyQuestions();
     const { answers } = useAnswers();

     const allQuestions = [...myQuestions, ...staticQuestions];
     const { pending } = getQuestionStats(allQuestions, answers);

     return (
          <DashboardLayout role="teacher">

               <DashboardHeader
                    title="Teacher Dashboard"
                    subtitle="Review activity and help students with their doubts"
                    notificationCount={pending}
                    onBellClick={() => navigate("/teacher/notifications")}
               />

               <div className="mt-8">
                    <TeacherStatus />
               </div>

               <div className="mt-8">
                    <Button onClick={() => navigate("/teacher/questions")}>
                         Go to Questions
                    </Button>
               </div>

          </DashboardLayout>
     );
}

export default Dashboard;
