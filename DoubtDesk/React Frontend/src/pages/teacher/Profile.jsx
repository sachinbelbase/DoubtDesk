import DashboardLayout from "../../components/layout/DashboardLayout";
import ProfileHeader from "../../components/common/ProfileHeader";
import TeacherStatus from "../../components/teacher/TeacherStats";
import { useAuth } from "../../hooks/useAuth";

function Profile() {

  const { user } = useAuth();

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

        <ProfileHeader
          name={user?.name || "Teacher"}
          role={user?.role || "teacher"}
        />

        <TeacherStatus />

      </div>

    </DashboardLayout>
  );
}

export default Profile;
