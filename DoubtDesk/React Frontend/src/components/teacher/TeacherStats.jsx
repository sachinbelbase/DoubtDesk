import {
     HelpCircle,
     CheckCircle2,
     Clock3,
     MessageSquareText,
} from "lucide-react";

import DashboardStatCard from "../dashboard/DashboardStatCard";

function TeacherStats({ stats }) {
     if (!stats) {
          return <p>Loading statistics...</p>;
     }

     return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

               <DashboardStatCard
                    title="Total Questions"
                    value={stats.total_questions}
                    icon={<HelpCircle size={28} />}
                    color="bg-blue-500"
               />

               <DashboardStatCard
                    title="Answered"
                    value={stats.answered_questions}
                    icon={<CheckCircle2 size={28} />}
                    color="bg-green-500"
               />

               <DashboardStatCard
                    title="Pending"
                    value={stats.pending_questions}
                    icon={<Clock3 size={28} />}
                    color="bg-yellow-500"
               />

               <DashboardStatCard
                    title="My Answers"
                    value={stats.total_answers}
                    icon={<MessageSquareText size={28} />}
                    color="bg-purple-500"
               />

          </div>
     );
}

export default TeacherStats;