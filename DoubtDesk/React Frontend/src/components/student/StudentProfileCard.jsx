import { useAuth } from "../../hooks/useAuth";
import { useMyQuestions } from "../../hooks/useMyQuestions";
import { useBookmarks } from "../../hooks/useBookmarks";

function StudentProfileCard() {
     const { user } = useAuth();
     const { myQuestions } = useMyQuestions();
     const { bookmarks } = useBookmarks();

     return (
          <section className="bg-white rounded-xl shadow p-8">

               <div className="flex items-center gap-6">

                    <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
                         {user?.name?.charAt(0).toUpperCase() || "S"}
                    </div>

                    <div>
                         <h2 className="text-2xl font-bold text-gray-900">
                              {user?.name || "Student"}
                         </h2>

                         <p className="text-gray-500">
                              {user?.role || "Student"}
                         </p>
                    </div>

               </div>

               <div className="grid grid-cols-2 gap-5 mt-8">

                    <div className="bg-gray-50 rounded-xl p-6 text-center">
                         <p className="text-sm text-gray-500">
                              Questions Asked
                         </p>

                         <h3 className="text-3xl font-bold mt-2">
                              {myQuestions.length}
                         </h3>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 text-center">
                         <p className="text-sm text-gray-500">
                              Bookmarks Saved
                         </p>

                         <h3 className="text-3xl font-bold mt-2">
                              {bookmarks.length}
                         </h3>
                    </div>

               </div>

               <div className="mt-8 border-t pt-6">

                    <h3 className="font-semibold text-lg">
                         Account Information
                    </h3>

                    <div className="mt-4 space-y-4">

                         <div>
                              <p className="text-sm text-gray-500">
                                   Name
                              </p>

                              <p className="font-medium">
                                   {user?.name || "Student"}
                              </p>
                         </div>

                         <div>
                              <p className="text-sm text-gray-500">
                                   Email
                              </p>

                              <p className="font-medium">
                                   {user?.email || "-"}
                              </p>
                         </div>

                         <div>
                              <p className="text-sm text-gray-500">
                                   Role
                              </p>

                              <p className="font-medium">
                                   {user?.role || "Student"}
                              </p>
                         </div>

                    </div>

               </div>

          </section>
     );
}

export default StudentProfileCard;