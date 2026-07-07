import { questions as staticQuestions } from "../../data/questions";
import { useMyQuestions } from "../../hooks/useMyQuestions";

function AnalyticsCharts() {

     const { myQuestions } = useMyQuestions();
     const allQuestions = [...myQuestions, ...staticQuestions];

     const countsByCategory = allQuestions.reduce((acc, question) => {
          acc[question.category] = (acc[question.category] || 0) + 1;
          return acc;
     }, {});

     const categoryEntries = Object.entries(countsByCategory).sort(
          (a, b) => b[1] - a[1]
     );

     if (categoryEntries.length === 0) {
          return (
               <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
                    No questions yet to analyze.
               </div>
          );
     }

     const maxCount = Math.max(...categoryEntries.map(([, count]) => count));

     return (
          <div className="bg-white rounded-xl shadow p-6">

               <h2 className="text-lg font-semibold mb-5">
                    Questions by Category
               </h2>

               <div className="space-y-4">

                    {categoryEntries.map(([category, count]) => (
                         <div key={category}>

                              <div className="flex justify-between text-sm mb-1">
                                   <span className="text-gray-700">{category}</span>
                                   <span className="text-gray-500">{count}</span>
                              </div>

                              <div className="w-full bg-gray-100 rounded-full h-3">
                                   <div
                                        className="bg-blue-600 h-3 rounded-full"
                                        style={{ width: `${(count / maxCount) * 100}%` }}
                                   />
                              </div>

                         </div>
                    ))}

               </div>

          </div>
     );
}

export default AnalyticsCharts;
