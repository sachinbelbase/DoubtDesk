function QuestionTable({
     questions,
     loading,
     onDelete,
}) {

     if (loading) {
          return (
               <p className="text-gray-600 dark:text-gray-300">
                    Loading questions...
               </p>
          );
     }

     return (
          <div
               className="
                    bg-white
                    dark:bg-gray-900

                    border
                    border-gray-200
                    dark:border-gray-700

                    rounded-xl
                    shadow
                    p-6

                    transition-colors
                    duration-300
               "
          >

               <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    Questions
               </h2>

               <table className="w-full">

                    <thead>

                         <tr className="border-b border-gray-200 dark:border-gray-700">

                              <th className="text-left py-3 text-gray-900 dark:text-white">
                                   Title
                              </th>

                              <th className="text-left py-3 text-gray-900 dark:text-white">
                                   Student
                              </th>

                              <th className="text-left py-3 text-gray-900 dark:text-white">
                                   Class
                              </th>

                              <th className="text-left py-3 text-gray-900 dark:text-white">
                                   Visibility
                              </th>

                              <th className="text-left py-3 text-gray-900 dark:text-white">
                                   Status
                              </th>

                              <th className="text-left py-3 text-gray-900 dark:text-white">
                                   Teacher
                              </th>

                              <th className="text-left py-3 text-gray-900 dark:text-white">
                                   Created
                              </th>

                              <th className="text-center py-3 text-gray-900 dark:text-white">
                                   Actions
                              </th>

                         </tr>

                    </thead>

                    <tbody>

                         {questions.map((question) => (

                              <tr
                                   key={question.question_id}
                                   className="
                                        border-b
                                        border-gray-200
                                        dark:border-gray-700

                                        hover:bg-gray-50
                                        dark:hover:bg-gray-800

                                        transition-colors
                                   "
                              >

                                   <td className="py-3 text-gray-900 dark:text-white">
                                        {question.title}
                                   </td>

                                   <td className="text-gray-700 dark:text-gray-300">
                                        {question.student_name}
                                   </td>

                                   <td className="text-gray-700 dark:text-gray-300">
                                        {question.class_name}
                                   </td>

                                   <td className="text-gray-700 dark:text-gray-300">
                                        {question.visibility}
                                   </td>

                                   <td>
                                        <span
                                             className={`font-medium ${question.status === "ANSWERED"
                                                       ? "text-green-600 dark:text-green-400"
                                                       : "text-orange-600 dark:text-orange-400"
                                                  }`}
                                        >
                                             {question.status}
                                        </span>
                                   </td>

                                   <td className="text-gray-700 dark:text-gray-300">
                                        {question.teacher_name || "-"}
                                   </td>

                                   <td className="text-gray-700 dark:text-gray-300">
                                        {new Date(
                                             question.created_at
                                        ).toLocaleDateString()}
                                   </td>

                                   <td className="text-center">

                                        <button
                                             onClick={() =>
                                                  onDelete(question.question_id)
                                             }
                                             className="
                                                  bg-red-500
                                                  hover:bg-red-600
                                                  text-white

                                                  px-3
                                                  py-1
                                                  rounded-lg

                                                  transition-colors
                                             "
                                        >
                                             Delete
                                        </button>

                                   </td>

                              </tr>

                         ))}

                    </tbody>

               </table>

          </div>
     );
}

export default QuestionTable;