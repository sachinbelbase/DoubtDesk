import {
     BookOpen,
     MessageCircle,
     Bookmark,
     Trophy,
} from "lucide-react";

import DashboardStatCard from "./DashboardStatCard";

function QuickStats() {

     const stats = [

          {
               title: "Questions",
               value: 45,
               icon: <BookOpen size={28} />,
               color: "bg-blue-500",
          },

          {
               title: "Answers",
               value: 28,
               icon: <MessageCircle size={28} />,
               color: "bg-green-500",
          },

          {
               title: "Bookmarks",
               value: 16,
               icon: <Bookmark size={28} />,
               color: "bg-yellow-500",
          },

          {
               title: "Reputation",
               value: 180,
               icon: <Trophy size={28} />,
               color: "bg-purple-500",
          },

     ];

     return (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

               {stats.map((stat) => (

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