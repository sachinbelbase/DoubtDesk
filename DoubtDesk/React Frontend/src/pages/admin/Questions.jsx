import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";

import QuestionTable from "../../components/admin/QuestionTable";
import SearchBar from "../../components/common/SearchBar";
import Button from "../../components/common/Button";

import {
     getQuestions,
     deleteQuestion,
} from "../../api/adminService";

function Questions() {
     const [questions, setQuestions] = useState([]);
     const [loading, setLoading] = useState(true);
     const [search, setSearch] = useState("");

     useEffect(() => {
          fetchQuestions();
     }, []);

     const fetchQuestions = async () => {
          try {
               const response = await getQuestions();
               setQuestions(response.data);
          } catch (err) {
               console.error(err);
          } finally {
               setLoading(false);
          }
     };

     const handleDelete = async (questionId) => {
          const confirmDelete = window.confirm(
               "Delete this question permanently?"
          );

          if (!confirmDelete) return;

          try {
               await deleteQuestion(questionId);

               setQuestions((prev) =>
                    prev.filter((q) => q.question_id !== questionId)
               );
          } catch (err) {
               console.error(err);
               alert("Failed to delete question.");
          }
     };

     const searchText = search.toLowerCase();

     const filteredQuestions = questions.filter((question) =>
          question.title.toLowerCase().includes(searchText) ||
          question.student_name.toLowerCase().includes(searchText) ||
          question.class_name.toLowerCase().includes(searchText) ||
          question.visibility.toLowerCase().includes(searchText) ||
          question.status.toLowerCase().includes(searchText) ||
          (question.teacher_name ?? "").toLowerCase().includes(searchText)
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

               <QuestionTable
                    questions={filteredQuestions}
                    loading={loading}
                    onDelete={handleDelete}
               />
          </DashboardLayout>
     );
}

export default Questions;