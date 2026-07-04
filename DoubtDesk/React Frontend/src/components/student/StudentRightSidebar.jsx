import RecentActivity from "../dashboard/RecentQuestions";
import Leaderboard from "./Leaderboard";

function StudentRightSidebar() {
     return (
          <div className="space-y-6">

               <RecentActivity />

               <Leaderboard />

          </div>
     );
}

export default StudentRightSidebar;