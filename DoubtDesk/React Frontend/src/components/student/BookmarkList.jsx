import { useNavigate } from "react-router-dom";
import BookmarkCard from "./BookmarkCard";
import Button from "../common/Button";
import { useBookmarks } from "../../hooks/useBookmarks";

function BookmarkList() {

     const { bookmarks } = useBookmarks();
     const navigate = useNavigate();

     if (bookmarks.length === 0) {
          return (
               <div className="bg-white rounded-xl shadow p-10 text-center">

                    <p className="text-gray-500 mb-4">
                         You haven't bookmarked any questions yet.
                    </p>

                    <Button onClick={() => navigate("/student/dashboard")}>
                         Browse Questions
                    </Button>

               </div>
          );
     }

     return (
          <div className="space-y-5">

               {bookmarks.map((question) => (
                    <BookmarkCard
                         key={question.id}
                         question={question}
                    />
               ))}

          </div>
     );
}

export default BookmarkList;
