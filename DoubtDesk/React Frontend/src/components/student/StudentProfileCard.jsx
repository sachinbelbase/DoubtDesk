import { BookOpen, Bookmark } from "lucide-react";

import ProfileHeader from "../common/ProfileHeader";
import DashboardStatCard from "../dashboard/DashboardStatCard";
import { useAuth } from "../../hooks/useAuth";
import { useMyQuestions } from "../../hooks/useMyQuestions";
import { useBookmarks } from "../../hooks/useBookmarks";

function StudentProfileCard() {

     const { user } = useAuth();
     const { myQuestions } = useMyQuestions();
     const { bookmarks } = useBookmarks();

     return (
          <div className="space-y-6">

               <ProfileHeader
                    name={user?.name || "Anonymous Student"}
                    role={user?.role || "student"}
               />

               {/* Stats */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <DashboardStatCard
                         title="Questions Asked"
                         value={myQuestions.length}
                         icon={<BookOpen size={28} />}
                         color="bg-blue-500"
                    />

                    <DashboardStatCard
                         title="Bookmarks Saved"
                         value={bookmarks.length}
                         icon={<Bookmark size={28} />}
                         color="bg-yellow-500"
                    />

               </div>

          </div>
     );
}

export default StudentProfileCard;
