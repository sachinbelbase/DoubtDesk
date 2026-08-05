function StudentTable({ students, loading, onToggleStatus, }) {

     if (loading) {
          return <p>Loading students...</p>;
     }

     return (
          <div className="bg-white rounded-xl shadow p-6">

               <h2 className="text-2xl font-bold mb-6">
                    Students
               </h2>

               <table className="w-full">

                    <thead>

                         <tr className="border-b">

                              <th className="text-left py-3">Name</th>
                              <th className="text-left py-3">Email</th>
                              <th className="text-left py-3">Program</th>
                              <th className="text-left py-3">Semester</th>
                              <th className="text-left py-3">Section</th>
                              <th className="text-left py-3">Status</th>
                              <th className="text-left py-3">Actions</th>

                         </tr>

                    </thead>

                    <tbody>

                         {students.map((student) => (

                              <tr
                                   key={student.student_id}
                                   className="border-b hover:bg-gray-50"
                              >

                                   <td className="py-3">{student.name}</td>

                                   <td>{student.email}</td>

                                   <td>{student.program}</td>

                                   <td>{student.semester}</td>

                                   <td>{student.section}</td>

                                   <td>
                                        {student.is_active ? (
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
                                             onClick={() => onToggleStatus(student)}
                                             className={`px-3 py-1 rounded-lg text-white ${student.is_active
                                                       ? "bg-red-500 hover:bg-red-600"
                                                       : "bg-green-600 hover:bg-green-700"
                                                  }`}
                                        >
                                             {student.is_active ? "Block" : "Unblock"}
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