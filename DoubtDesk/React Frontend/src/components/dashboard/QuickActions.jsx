import { PlusCircle, Bookmark, FileQuestion } from "lucide-react";

function QuickActions() {
     return (
          <div className="bg-white rounded-xl shadow p-5">

               <h2 className="text-lg font-semibold mb-4">
                    ⚡ Quick Actions
               </h2>

               <button className="w-full flex items-center gap-3 bg-blue-600 text-white rounded-lg p-3 mb-3">

                    <PlusCircle />

                    Ask Question

               </button>

               <button className="w-full flex items-center gap-3 border rounded-lg p-3 mb-3">

                    <FileQuestion />

                    My Questions

               </button>

               <button className="w-full flex items-center gap-3 border rounded-lg p-3">

                    <Bookmark />

                    Bookmarks

               </button>

          </div>
     );
}

export default QuickActions;