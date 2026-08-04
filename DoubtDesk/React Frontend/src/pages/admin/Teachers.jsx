import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";

import TeacherTable from "../../components/admin/TeacherTable";

import { getTeachers } from "../../api/adminService";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await getTeachers();
        setTeachers(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <DashboardLayout role="admin">
      <DashboardHeader />

      <TeacherTable
        teachers={teachers}
        loading={loading}
      />
    </DashboardLayout>
  );
}

export default Teachers;