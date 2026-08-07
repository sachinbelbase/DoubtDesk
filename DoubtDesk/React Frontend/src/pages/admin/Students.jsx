import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";

import StudentTable from "../../components/admin/StudentTable";
import SearchBar from "../../components/common/SearchBar";
import Button from "../../components/common/Button";

import { getStudents, blockStudent, unblockStudent } from "../../api/adminService";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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


  const handleToggleStatus = async (student) => {
    try {
      if (student.is_active) {
        await blockStudent(student.student_id);
      } else {
        await unblockStudent(student.student_id);
      }

      setStudents((prev) =>
        prev.map((s) =>
          s.student_id === student.student_id
            ? {
              ...s,
              is_active: !s.is_active,
            }
            : s
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update student status.");
    }
  };
    console.log(students);

    const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase()) ||
    student.program.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = () => {
  };

  return (
    <DashboardLayout role="admin">
      <DashboardHeader />

      <div className="bg-white rounded-xl shadow p-4 mb-6 dark:bg-gray-950">

        <div className="flex flex-col md:flex-row gap-4 items-center">

          <div className="flex-1 w-full">
            <SearchBar
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Button onClick={handleSearch}>
            Search
          </Button>

        </div>

      </div>
      
      <StudentTable
        students={filteredStudents}
        loading={loading}
        onToggleStatus={handleToggleStatus}
      />
    </DashboardLayout>
  );
}

export default Students;