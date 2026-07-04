import StudentRightSidebar from "../student/StudentRightSidebar";

function RightSidebar({ role }) {

     return (

          <aside className="w-80 bg-gray-100 p-5 hidden xl:block">

               {role === "student" && <StudentRightSidebar />}

               {role === "teacher" && (
                    <div>Teacher Sidebar</div>
               )}

               {role === "admin" && (
                    <div>Admin Sidebar</div>
               )}

          </aside>

     );

}

export default RightSidebar;