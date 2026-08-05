function TeacherTable({ teachers, loading, onToggleStatus, }) {
     if (loading) {
          return <p>Loading teachers...</p>;
     }

     return (
          <div className="bg-white rounded-xl shadow p-6">

               <h2 className="text-2xl font-bold mb-6">
                    Teachers
               </h2>

               <table className="w-full">

                    <thead>

                         <tr className="border-b">
                              <th className="text-left py-3">Name</th>
                              <th className="text-left py-3">Email</th>
                              <th className="text-left py-3">Department</th>
                              <th className="text-left py-3">Joined</th>
                              <th className="text-left py-3">Status</th>
                              <th className="text-center py-3">Actions</th>
                         </tr>

                    </thead>

                    <tbody>

                         {teachers.map((teacher) => (

                              <tr
                                   key={teacher.teacher_id}
                                   className="border-b hover:bg-gray-50"
                              >

                                   <td className="py-3">
                                        {teacher.name}
                                   </td>

                                   <td>
                                        {teacher.email}
                                   </td>

                                   <td>
                                        {teacher.department || "Not Assigned"}
                                   </td>

                                   <td>
                                        {new Date(teacher.created_at).toLocaleDateString()}
                                   </td>

                                   <td>
                                        {teacher.is_active ? (
                                             <span className="text-green-600 font-medium">
                                                  Active
                                             </span>
                                        ) : (
                                             <span className="text-red-600 font-medium">
                                                  Blocked
                                             </span>
                                        )}
                                   </td>

                                   <td className="text-center">
                                        <button
                                             onClick={() => onToggleStatus(teacher)}
                                             className={`px-3 py-1 rounded-lg text-white ${teacher.is_active
                                                       ? "bg-red-500 hover:bg-red-600"
                                                       : "bg-green-600 hover:bg-green-700"
                                                  }`}
                                        >
                                             {teacher.is_active ? "Block" : "Unblock"}
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