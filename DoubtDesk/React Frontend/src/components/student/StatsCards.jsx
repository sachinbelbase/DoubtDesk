import {
     MessageCircle,
     Bookmark,
     Star,
     CircleHelp
} from "lucide-react";

import StatCard from "./StatCard";

function StatsCards() {

     return (

          <div className="grid grid-cols-4 gap-5">

               <StatCard

                    title="Questions"

                    value="12"

                    icon={<CircleHelp />}

               />

               <StatCard

                    title="Answers"

                    value="30"

                    icon={<MessageCircle />}

               />

               <StatCard

                    title="Bookmarks"

                    value="8"

                    icon={<Bookmark />}

               />

               <StatCard

                    title="Reputation"

                    value="150"

                    icon={<Star />}

               />

          </div>

     )

}

export default StatsCards;