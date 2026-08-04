import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import QuickStats from "../../components/dashboard/QuickStats";

import { getAdminDashboard } from "../../api/adminDashboardService";
import AdminStats from "../../components/admin/AdminStats";

function Dashboard() {
     const [stats, setStats] = useState(null);

     useEffect(() => {
          const fetchStats = async () => {
               try {
                    const response = await getAdminDashboard();
                    setStats(response.data);
               } catch (err) {
                    console.error(err);
               }
          };

          fetchStats();
     }, []);

     return (
          <DashboardLayout role="admin">
               <DashboardHeader />

               <AdminStats stats={stats} />
          </DashboardLayout>
     );
}

export default Dashboard;