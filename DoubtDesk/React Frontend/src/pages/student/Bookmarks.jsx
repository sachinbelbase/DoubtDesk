import DashboardLayout from "../../components/layout/DashboardLayout";
import BookmarkList from "../../components/student/BookmarkList";

function Bookmarks() {
     return (
          <DashboardLayout role="student">

               <div className="mb-6">

                    <h1 className="text-3xl font-bold">
                         Bookmarks
                    </h1>

                    <p className="text-gray-500 mt-2">
                         Questions you've saved to come back to later.
                    </p>

               </div>

               <BookmarkList />

          </DashboardLayout>
     );
}

export default Bookmarks;
