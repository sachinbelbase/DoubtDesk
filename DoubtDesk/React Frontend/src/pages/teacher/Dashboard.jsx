import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import TeacherStatus from "../../components/teacher/TeacherStats";
import Button from "../../components/common/Button";

import { useEffect, useState } from "react";
import { getTeacherDashboard,getRecentTeacherQuestions } from "../../api/dashboardService";
import TeacherQuickActions from "../../components/teacher/TeacherQuickActions"; 
import RecentQuestionsPreview from "../../components/teacher/RecentQuestionsPreview";  

function Dashboard() {

     const navigate = useNavigate();
     const [stats, setStats] = useState(null);
     const [recentQuestions, setRecentQuestions] = useState([]);

     useEffect(() => {

          const fetchStats = async () => {

               try {

                    const response = await getTeacherDashboard();
                    setStats(response.data);

                    const recentResponse = await getRecentTeacherQuestions();
                    setRecentQuestions(recentResponse.data);

               } catch (err) {
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
                    <RecentQuestionsPreview questions={recentQuestions} />
                    

               </div>

               

               <TeacherQuickActions />

          </DashboardLayout>
     );
}

export default Dashboard;
