import {
     MessageCircle,
     Eye,
     Bookmark,
     UserCircle,
} from "lucide-react";

import { useBookmarks } from "../../hooks/useBookmarks";

function QuestionCard({ question }) {
     const { isBookmarked, toggleBookmark } = useBookmarks();

     const bookmarked = isBookmarked(question.id);

     const difficultyColors = {
          Easy: "bg-green-100 text-green-700",
          Medium: "bg-yellow-100 text-yellow-700",
          Hard: "bg-red-100 text-red-700",
     };

     return (
          <div
               className="
      bg-white
      border
      border-gray-200
      rounded-2xl
      p-6
      shadow-sm
      hover:shadow-md
      transition-all
      duration-300
    "
          >
               {/* Top */}

               <div className="flex justify-between items-start">

                    <div className="flex gap-2 flex-wrap">

                         <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                              {question.category}
                         </span>

                         <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[question.difficulty]
                                   }`}
                         >
                              {question.difficulty}
                         </span>

                         <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${question.answers > 0
                                        ? "bg-green-100 text-green-700"
                                        : "bg-orange-100 text-orange-700"
                                   }`}
                         >
                              {question.answers > 0 ? "Answered" : "Pending"}
                         </span>

                    </div>

                    <button
                         onClick={() => toggleBookmark(question)}
                         className="hover:scale-110 transition"
                    >
                         <Bookmark
                              size={20}
                              fill={bookmarked ? "currentColor" : "none"}
                              className={
                                   bookmarked
                                        ? "text-blue-600"
                                        : "text-gray-400 hover:text-blue-600"
                              }
                         />
                    </button>

               </div>

               {/* Title */}

               <h2 className="text-xl font-semibold text-gray-900 mt-5">
                    {question.title}
               </h2>

               {/* Description */}

               <p className="text-gray-600 mt-3 leading-7">
                    {question.description}
               </p>

               {/* Footer */}

               <div className="flex justify-between items-center mt-6">

                    <div className="flex items-center gap-3">

                         <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">

                              <UserCircle
                                   size={24}
                                   className="text-gray-500"
                              />

                         </div>

                         <div>

                              <p className="text-sm font-medium">
                                   {question.author}
                              </p>

                              <p className="text-xs text-gray-500">
                                   {question.time}
                              </p>

                         </div>

                    </div>

                    <div className="flex items-center gap-5 text-gray-500">

                         <div className="flex items-center gap-1">
                              <MessageCircle size={18} />
                              <span>{question.answers}</span>
                         </div>

                         <div className="flex items-center gap-1">
                              <Eye size={18} />
                              <span>{question.views}</span>
                         </div>

                    </div>

               </div>

          </div>
     );
}

export default QuestionCard;