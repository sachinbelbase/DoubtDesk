function TeacherTable({ teachers, loading }) {
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
                              <th className="text-left py-3">Joined</th>
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
                                        {new Date(teacher.created_at).toLocaleDateString()}
                                   </td>

                              </tr>

                         ))}

                    </tbody>

               </table>

          </div>
     );
}

export default TeacherTable;