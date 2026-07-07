import UserRow from "./UserRow";

const users = [
     {
          id: 1,
          name: "Sachin Belbase",
          email: "sachin@student.edu",
          role: "student",
          status: "Active",
     },
     {
          id: 2,
          name: "Ram Sharma",
          email: "ram@teacher.edu",
          role: "teacher",
          status: "Active",
     },
     {
          id: 3,
          name: "Hari KC",
          email: "hari@student.edu",
          role: "student",
          status: "Banned",
     },
];

function UserTable() {
     return (
          <div className="bg-white rounded-xl shadow overflow-hidden">

               <table className="w-full">

                    <thead className="bg-gray-100">

                         <tr>

                              <th className="px-6 py-4 text-left">Name</th>

                              <th className="px-6 py-4 text-left">Email</th>

                              <th className="px-6 py-4 text-left">Role</th>

                              <th className="px-6 py-4 text-left">Status</th>

                              <th className="px-6 py-4 text-left">Action</th>

                         </tr>

                    </thead>

                    <tbody>

                         {users.map((user) => (
                              <UserRow
                                   key={user.id}
                                   user={user}
                              />
                         ))}

                    </tbody>

               </table>

          </div>
     );
}

export default UserTable;