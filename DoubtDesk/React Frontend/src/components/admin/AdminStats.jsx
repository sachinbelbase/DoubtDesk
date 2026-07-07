import {
     Users,
     FileQuestion,
     Flag,
     ShieldBan,
} from "lucide-react";

import DashboardStatCard from "../dashboard/DashboardStatCard";

function AdminStats() {
     const stats = [
          {
               title: "Users",
               value: 124,
               icon: <Users size={24} />,
               color: "bg-blue-500",
          },
          {
               title: "Questions",
               value: 356,
               icon: <FileQuestion size={24} />,
               color: "bg-green-500",
          },
          {
               title: "Reports",
               value: 12,
               icon: <Flag size={24} />,
               color: "bg-yellow-500",
          },
          {
               title: "Banned Users",
               value: 3,
               icon: <ShieldBan size={24} />,
               color: "bg-red-500",
          },
     ];

     return (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
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

export default AdminStats;