import DashboardLayout from "../../components/layout/DashboardLayout";
import ProfileCard from "../../components/common/ProfileCard";
import { useEffect, useState } from "react";
import { getStudentDashboard } from "../../api/dashboardService";

function Profile() {

     const [stats, setStats] = useState(null);

     useEffect(() => {
          const fetchStats = async () => {
               try {
                    const response = await getStudentDashboard();
                    setStats(response.data);
               } catch (err) {
                    console.error(err);
               }
          };

          fetchStats();
     }, []);

     return (
          <DashboardLayout role="student">

               <div className="mb-4">
                    <p className="text-gray-500">
                         Manage your profile and view your activity.
                    </p>
               </div>

               <ProfileCard
                    role="student"
                    stats={stats}
               />

          </DashboardLayout>
     );
}

export default Profile;