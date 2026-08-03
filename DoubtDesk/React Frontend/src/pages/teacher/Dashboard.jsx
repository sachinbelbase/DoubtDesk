import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import TeacherStatus from "../../components/teacher/TeacherStats";
import Button from "../../components/common/Button";

import { useEffect, useState } from "react";
import { getTeacherDashboard } from "../../api/dashboardService";

function Dashboard() {

     const navigate = useNavigate();
     const [stats, setStats] = useState(null);

     useEffect(() => {

          const fetchStats = async () => {

               try {

                    const response = await getTeacherDashboard();
                    console.log("Teacher Dashboard:", response.data);

                    setStats(response.data);

               } catch (err) {
                    console.error("Teacher dashboard error:", err);
                    console.error(err);

               }

          };

          fetchStats();

     }, []);

     return (
          <DashboardLayout role="teacher">

               <DashboardHeader
                    title="Teacher Dashboard"
                    subtitle="Review activity and help students with their doubts"
                    notificationCount={0}
                    onBellClick={() => navigate("/teacher/notifications")}
               />

               <div className="mt-8">
                    <TeacherStatus stats={stats} />
               </div>

               <div className="mt-8">
                    <Button onClick={() => navigate("/teacher/questions")}>
                         Go to Questions
                    </Button>
               </div>

          </DashboardLayout>
     );
}

export default Dashboard;
