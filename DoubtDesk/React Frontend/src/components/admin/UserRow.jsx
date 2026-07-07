import Button from "../common/Button";

function UserRow({ user }) {
     return (
          <tr className="border-b hover:bg-gray-50 transition-colors">

               <td className="px-6 py-4 font-medium text-gray-900">
                    {user.name}
               </td>

               <td className="px-6 py-4 text-gray-600">
                    {user.email}
               </td>

               <td className="px-6 py-4 capitalize">
                    {user.role}
               </td>

               <td className="px-6 py-4">
                    <span
                         className={`
            px-3
            py-1
            rounded-full
            text-sm
            font-medium
            ${user.status === "Active"
                                   ? "bg-green-100 text-green-700"
                                   : "bg-red-100 text-red-700"
                              }
          `}
                    >
                         {user.status}
                    </span>
               </td>

               <td className="px-6 py-4">
                    <Button
                         variant="outline"
                         size="sm"
                    >
                         View
                    </Button>
               </td>

          </tr>
     );
}

export default UserRow;