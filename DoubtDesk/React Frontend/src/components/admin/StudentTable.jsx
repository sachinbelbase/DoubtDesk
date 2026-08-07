function StudentTable({
     students,
     loading,
     onToggleStatus,
}) {

     if (loading) {
          return (
               <p className="text-gray-600 dark:text-gray-300">
                    Loading students...
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
                    Students
               </h2>

               <table className="w-full">

                    <thead>

                         <tr className="border-b border-gray-200 dark:border-gray-700">

                              <th className="text-left py-3 text-gray-900 dark:text-white">
                                   Name
                              </th>

                              <th className="text-left py-3 text-gray-900 dark:text-white">
                                   Email
                              </th>

                              <th className="text-left py-3 text-gray-900 dark:text-white">
                                   Program
                              </th>

                              <th className="text-left py-3 text-gray-900 dark:text-white">
                                   Semester
                              </th>

                              <th className="text-left py-3 text-gray-900 dark:text-white">
                                   Section
                              </th>

                              <th className="text-left py-3 text-gray-900 dark:text-white">
                                   Status
                              </th>

                              <th className="text-left py-3 text-gray-900 dark:text-white">
                                   Actions
                              </th>

                         </tr>

                    </thead>

                    <tbody>

                         {students.map((student) => (

                              <tr
                                   key={student.student_id}
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
                                        {student.name}
                                   </td>

                                   <td className="text-gray-700 dark:text-gray-300">
                                        {student.email}
                                   </td>

                                   <td className="text-gray-700 dark:text-gray-300">
                                        {student.program}
                                   </td>

                                   <td className="text-gray-700 dark:text-gray-300">
                                        {student.semester}
                                   </td>

                                   <td className="text-gray-700 dark:text-gray-300">
                                        {student.section}
                                   </td>

                                   <td>
                                        {student.is_active ? (
                                             <span className="text-green-600 dark:text-green-400 font-medium">
                                                  Active
                                             </span>
                                        ) : (
                                             <span className="text-red-600 dark:text-red-400 font-medium">
                                                  Blocked
                                             </span>
                                        )}
                                   </td>

                                   <td className="text-center">

                                        <button
                                             onClick={() => onToggleStatus(student)}
                                             className={`
                                                  px-3
                                                  py-1
                                                  rounded-lg
                                                  text-white
                                                  transition-colors

                                                  ${student.is_active
                                                       ? "bg-red-500 hover:bg-red-600"
                                                       : "bg-green-600 hover:bg-green-700"
                                                  }
                                             `}
                                        >
                                             {student.is_active
                                                  ? "Block"
                                                  : "Unblock"}
                                        </button>

                                   </td>

                              </tr>

                         ))}

                    </tbody>

               </table>

          </div>
     );
}

export default StudentTable;