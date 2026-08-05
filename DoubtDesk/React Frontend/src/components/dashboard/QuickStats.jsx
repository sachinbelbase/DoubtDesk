import {
     BookOpen,
     MessageCircleReply,
     Clock3,
     Globe,
} from "lucide-react";

import DashboardStatCard from "./DashboardStatCard";

function QuickStats({ stats }) {

     const dashboardStats = [

          {
               title: "Questions Asked",
               value: stats?.total_questions ?? 0,
               icon: <BookOpen size={28} />,
               color: "bg-blue-500",
          },

          {
               title: "Answers Received",
               value: stats?.answered_questions ?? 0,
               icon: <MessageCircleReply size={28} />,
               color: "bg-green-500",
          },

          {
               title: "Pending Questions",
               value: stats?.open_questions ?? 0,
               icon: <Clock3 size={28} />,
               color: "bg-yellow-500",
          },

          {
               title: "Class Questions",
               value: stats?.class_questions ?? 0,
               icon: <Globe size={28} />,
               color: "bg-purple-500",
          }

     ];

     return (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

               {dashboardStats.map((stat) => (

                    <DashboardStatCard
                         key={stat.title}
                         title={stat.title}
                         value={stat.value}
                         icon={stat.icon}
                         color={stat.color}
                    />

               ))}
          </div>

     );

}

export default QuickStats;