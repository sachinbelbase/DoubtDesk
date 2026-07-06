import DashboardLayout from "../../components/layout/DashboardLayout";
import StudentProfileCard from "../../components/student/StudentProfileCard";

function Profile() {
     return (
          <DashboardLayout role="student">

               <StudentProfileCard />

          </DashboardLayout>
     );
}

export default Profile;