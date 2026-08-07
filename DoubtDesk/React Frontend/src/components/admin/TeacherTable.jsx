function TeacherTable({
     teachers,
     loading,
     onToggleStatus,
}) {

     if (loading) {
          return (
               <p className="text-gray-600 dark:text-gray-300">
                    Loading teachers...
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
                    Teachers
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
                                   Department
                              </th>

                              <th className="text-left py-3 text-gray-900 dark:text-white">
                                   Joined
                              </th>

                              <th className="text-left py-3 text-gray-900 dark:text-white">
                                   Status
                              </th>

                              <th className="text-center py-3 text-gray-900 dark:text-white">
                                   Actions
                              </th>

                         </tr>

                    </thead>

                    <tbody>

                         {teachers.map((teacher) => (

                              <tr
                                   key={teacher.teacher_id}
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
                                        {teacher.name}
                                   </td>

                                   <td className="text-gray-700 dark:text-gray-300">
                                        {teacher.email}
                                   </td>

                                   <td className="text-gray-700 dark:text-gray-300">
                                        {teacher.department || "Not Assigned"}
                                   </td>

                                   <td className="text-gray-700 dark:text-gray-300">
                                        {new Date(
                                             teacher.created_at
                                        ).toLocaleDateString()}
                                   </td>

                                   <td>
                                        {teacher.is_active ? (
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
                                             onClick={() =>
                                                  onToggleStatus(teacher)
                                             }
                                             className={`
                                                  px-3
                                                  py-1
                                                  rounded-lg
                                                  text-white
                                                  transition-colors

                                                  ${teacher.is_active
                                                       ? "bg-red-500 hover:bg-red-600"
                                                       : "bg-green-600 hover:bg-green-700"
                                                  }
                                             `}
                                        >
                                             {teacher.is_active
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

export default TeacherTable;