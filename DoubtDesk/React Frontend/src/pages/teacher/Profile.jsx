import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ProfileHeader from "../../components/common/ProfileHeader";
import TeacherStatus from "../../components/teacher/TeacherStats";
import { useAuth } from "../../hooks/useAuth";
import { getTeacherDashboard } from "../../api/dashboardService";
import ProfileCard from "../../components/common/ProfileCard";

function Profile() {

  const { user } = useAuth();

  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getTeacherDashboard();
        setStats(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <DashboardLayout role="teacher">

      <div className="mb-6">

        <h1 className="text-3xl font-bold">
          Profile
        </h1>

        <p className="text-gray-500 mt-2">
          Your activity on DoubtDesk.
        </p>

      </div>

      <div className="space-y-6">

        <ProfileCard
          role="teacher"
          stats={stats}
        />

      </div>

    </DashboardLayout>
  );
}

export default Profile;
