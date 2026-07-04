import {
     MessageCircle,
     Bookmark,
     Star,
     CircleHelp
} from "lucide-react";

import DashboardStatCard from "../dashboard/DashboardStatCard";

function StatsCards() {

     return (

          <div className="grid grid-cols-4 gap-5">

               <DashboardStatCard
                    title="Questions"
                    value="12"
                    icon={<CircleHelp />}
               />

               <DashboardStatCard
                    title="Answers"
                    value="30"
                    icon={<MessageCircle />}
               />

               <DashboardStatCard
                    title="Bookmarks"
                    value="8"
                    icon={<Bookmark />}
               />

               <DashboardStatCard
                    title="Reputation"
                    value="150"
                    icon={<Star />}
               />

          </div>

     )

}

export default StatsCards;