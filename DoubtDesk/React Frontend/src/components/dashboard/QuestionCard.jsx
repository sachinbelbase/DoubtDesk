import { MessageCircle, Eye, Bookmark } from "lucide-react";
import { useBookmarks } from "../../hooks/useBookmarks";

function QuestionCard({ question }) {

     const { isBookmarked, toggleBookmark } = useBookmarks();
     const bookmarked = isBookmarked(question.id);

     return (
          <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">

               {/* Category */}
               <span className="inline-block bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
                    {question.category}
               </span>

               {/* Title */}
               <h2 className="text-xl font-semibold mt-3">
                    {question.title}
               </h2>

               {/* Description */}
               <p className="text-gray-600 mt-2">
                    {question.description}
               </p>

               {/* Footer */}
               <div className="flex justify-between items-center mt-5">

                    <div className="flex gap-5 text-gray-500 text-sm">

                         <span>{question.author}</span>

                         <span>{question.time}</span>

                    </div>

                    <div className="flex gap-5">

                         <div className="flex items-center gap-1 text-gray-500">
                              <MessageCircle size={18} />
                              {question.answers}
                         </div>

                         <div className="flex items-center gap-1 text-gray-500">
                              <Eye size={18} />
                              {question.views}
                         </div>

                         <button onClick={() => toggleBookmark(question)}>
                              <Bookmark
                                   size={20}
                                   className={
                                        bookmarked
                                             ? "text-blue-600"
                                             : "text-gray-500 hover:text-blue-600"
                                   }
                                   fill={bookmarked ? "currentColor" : "none"}
                              />
                         </button>

                    </div>

               </div>

          </div>
     );
}

export default QuestionCard;
