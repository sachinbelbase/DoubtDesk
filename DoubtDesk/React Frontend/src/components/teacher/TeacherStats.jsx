import { HelpCircle, CheckCircle2, Clock } from "lucide-react";

import DashboardStatCard from "../dashboard/DashboardStatCard";
import { questions as staticQuestions } from "../../data/questions";
import { useMyQuestions } from "../../hooks/useMyQuestions";
import { useAnswers } from "../../hooks/useAnswers";
import { getQuestionStats } from "../../utils/questionStats";

function TeacherStats() {

     const { myQuestions } = useMyQuestions();
     const { answers } = useAnswers();

     const allQuestions = [...myQuestions, ...staticQuestions];
     const stats = getQuestionStats(allQuestions, answers);

     return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

               <DashboardStatCard
                    title="Total Questions"
                    value={stats.total}
                    icon={<HelpCircle size={28} />}
                    color="bg-blue-500"
               />

               <DashboardStatCard
                    title="Answered"
                    value={stats.answered}
                    icon={<CheckCircle2 size={28} />}
                    color="bg-green-500"
               />

               <DashboardStatCard
                    title="Pending"
                    value={stats.pending}
                    icon={<Clock size={28} />}
                    color="bg-yellow-500"
               />

          </div>
     );
}

export default TeacherStats;
