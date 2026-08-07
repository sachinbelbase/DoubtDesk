import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/common/Button";
import { getAdminDashboard } from "../../api/adminDashboardService";
import AdminStats from "../../components/admin/AdminStats";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import {
     Users,
     GraduationCap,
     CircleHelp,
} from "lucide-react";

function Dashboard() {
     const [stats, setStats] = useState(null);
     const navigate = useNavigate();

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

               <WelcomeBanner />

               <AdminStats stats={stats} />

               <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mt-6 dark:bg-gray-900">

                    <h2 className="text-xl font-semibold mb-5 dark:text-white">
                         Quick Actions
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">

                         <div
                              onClick={() => navigate("/admin/students")}
                              className="cursor-pointer rounded-xl border border-gray-200 p-6 hover:border-blue-500 hover:shadow-md dark:hover:bg-gray-800 transition dark:bg-gray-900"
                         >
                              <Users className="text-blue-600 mb-4" size={36} />

                              <h3 className="font-semibold text-lg dark:text-white">
                                   Students
                              </h3>

                              <p className="text-gray-500 text-sm mt-2">
                                   View and manage student accounts.
                              </p>
                         </div>

                         <div
                              onClick={() => navigate("/admin/teachers")}
                              className="cursor-pointer rounded-xl border border-gray-200 p-6 hover:border-green-500 hover:shadow-md dark:hover:bg-gray-800 transition"
                         >
                              <GraduationCap className="text-green-600 mb-4" size={36} />

                              <h3 className="font-semibold text-lg dark:text-white">
                                   Teachers
                              </h3>

                              <p className="text-gray-500 text-sm mt-2">
                                   Manage teacher accounts.
                              </p>
                         </div>

                         <div
                              onClick={() => navigate("/admin/questions")}
                              className="cursor-pointer rounded-xl border border-gray-200 p-6 hover:border-purple-500 hover:shadow-md dark:hover:bg-gray-800 transition"
                         >
                              <CircleHelp className="text-purple-600 mb-4" size={36} />

                              <h3 className="font-semibold text-lg dark:text-white">
                                   Questions
                              </h3>

                              <p className="text-gray-500 text-sm mt-2">
                                   Review and moderate questions.
                              </p>
                         </div>

                    </div>

               </div>

          </DashboardLayout>
     );
}

export default Dashboard;