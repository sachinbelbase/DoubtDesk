function QuestionTable({
     questions,
     loading,
     onDelete,
}) {
     if (loading) {
          return <p>Loading questions...</p>;
     }

     return (
          <div className="bg-white rounded-xl shadow p-6">

               <h2 className="text-2xl font-bold mb-6">
                    Questions
               </h2>

               <table className="w-full">

                    <thead>

                         <tr className="border-b">

                              <th className="text-left py-3">Title</th>
                              <th className="text-left py-3">Student</th>
                              <th className="text-left py-3">Class</th>
                              <th className="text-left py-3">Visibility</th>
                              <th className="text-left py-3">Status</th>
                              <th className="text-left py-3">Teacher</th>
                              <th className="text-left py-3">Created</th>
                              <th className="text-center py-3">Actions</th>

                         </tr>

                    </thead>

                    <tbody>

                         {questions.map((question) => (

                              <tr
                                   key={question.question_id}
                                   className="border-b hover:bg-gray-50"
                              >

                                   <td className="py-3">
                                        {question.title}
                                   </td>

                                   <td>{question.student_name}</td>

                                   <td>{question.class_name}</td>

                                   <td>{question.visibility}</td>

                                   <td>
                                        <span
                                             className={`font-medium ${question.status === "ANSWERED"
                                                       ? "text-green-600"
                                                       : "text-orange-600"
                                                  }`}
                                        >
                                             {question.status}
                                        </span>
                                   </td>

                                   <td>
                                        {question.teacher_name || "-"}
                                   </td>

                                   <td>
                                        {new Date(question.created_at).toLocaleDateString()}
                                   </td>

                                   <td className="text-center">

                                        <button
                                             onClick={() =>
                                                  onDelete(question.question_id)
                                             }
                                             className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
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