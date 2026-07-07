import { UserCircle } from "lucide-react";

function ProfileHeader({ name, role }) {
     return (
          <div className="bg-white rounded-2xl shadow p-8 flex items-center gap-6">

               <UserCircle size={72} className="text-blue-600" />

               <div>

                    <h2 className="text-2xl font-bold">
                         {name}
                    </h2>

                    <p className="text-gray-500 capitalize mt-1">
                         {role}
                    </p>

               </div>

          </div>
     );
}

export default ProfileHeader;
