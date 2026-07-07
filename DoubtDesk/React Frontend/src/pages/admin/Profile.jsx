import DashboardLayout from "../../components/layout/DashboardLayout";
import ProfileHeader from "../../components/common/ProfileHeader";
import AdminStats from "../../components/admin/AdminStats";
import { useAuth } from "../../hooks/useAuth";

function Profile() {
     const { user } = useAuth();

     return (
          <DashboardLayout role="admin">

               <div className="mb-6">

                    <h1 className="text-3xl font-bold">
                         Profile
                    </h1>

                    <p className="text-gray-500 mt-2">
                         View your administrator profile and platform activity.
                    </p>

               </div>

               <div className="space-y-6">

                    <ProfileHeader
                         name={user?.name || "Administrator"}
                         role={user?.role || "admin"}
                    />

                    <AdminStats />

               </div>

          </DashboardLayout>
     );
}

export default Profile;