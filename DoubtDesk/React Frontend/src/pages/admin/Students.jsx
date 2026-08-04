import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";

import StudentTable from "../../components/admin/StudentTable";

import { getStudents } from "../../api/adminService";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudents();
        setStudents(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <DashboardLayout role="admin">
      <DashboardHeader />

      <StudentTable
        students={students}
        loading={loading}
      />
    </DashboardLayout>
  );
}

export default Students;