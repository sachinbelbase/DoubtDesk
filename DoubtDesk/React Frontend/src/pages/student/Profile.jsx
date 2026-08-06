import DashboardLayout from "../../components/layout/DashboardLayout";
import StudentProfileCard from "../../components/student/StudentProfileCard";
import stats from "../../components/student/StudentProfileStats";
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
               <StudentProfileCard stats={stats} />
          </DashboardLayout>
     );
}

export default Profile;