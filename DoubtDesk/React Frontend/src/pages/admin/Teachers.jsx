import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";

import TeacherTable from "../../components/admin/TeacherTable";

import { getTeachers, blockTeacher, unblockTeacher, } from "../../api/adminService";
import SearchBar from "../../components/common/SearchBar";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");


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


  const handleToggleStatus = async (teacher) => {
    try {
      if (teacher.is_active) {
        await blockTeacher(teacher.teacher_id);
      } else {
        await unblockTeacher(teacher.teacher_id);
      }

      setTeachers((prev) =>
        prev.map((t) =>
          t.teacher_id === teacher.teacher_id
            ? { ...t, is_active: !t.is_active }
            : t
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update teacher status.");
    }
  };

  const searchText = search.toLowerCase();

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchText) ||
    teacher.email.toLowerCase().includes(searchText) ||
    (teacher.department ?? "").toLowerCase().includes(searchText)
  );

  return (
    <DashboardLayout role="admin">
      <DashboardHeader />

      <div className="bg-white rounded-xl shadow p-4 mb-6">

        <SearchBar
          placeholder="Search teachers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <TeacherTable
        teachers={filteredTeachers}
        loading={loading}
        onToggleStatus={handleToggleStatus}
      />
    </DashboardLayout>
  );
}

export default Teachers;