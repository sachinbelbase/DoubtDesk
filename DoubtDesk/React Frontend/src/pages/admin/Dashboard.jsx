import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import AdminStats from "../../components/admin/AdminStats";
import Button from "../../components/common/Button";

function Dashboard() {
     const navigate = useNavigate();

     return (
          <DashboardLayout role="admin">

               <DashboardHeader
                    title="Admin Dashboard"
                    subtitle="Monitor platform activity and manage the community"
               />

               <div className="mt-8">
                    <AdminStats />
               </div>

               <div className="mt-8 flex justify-end">
                    <Button onClick={() => navigate("/admin/users")}>
                         Manage Users
                    </Button>
               </div>

          </DashboardLayout>
     );
}

export default Dashboard;