import { useEffect, useState } from "react";
import AnswerQuestionModal from "../../components/common/AnswerQuestionModal";
import DashboardLayout from "../../components/layout/DashboardLayout";
import QuestionFeed from "../../components/student/QuestionFeed";

import { getQuestions } from "../../api/questionService";
import SearchBar from "../../components/common/SearchBar";
import Button from "../../components/common/Button";
import Select from "../../components/common/Select";
import { statusFilters } from "../../data/statusFilters";
import { sorts } from "../../data/sorts";

function Questions() {
     const [questions, setQuestions] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState("");
     const [selectedQuestion, setSelectedQuestion] = useState(null);
     const [search, setSearch] = useState("");
     const [statusFilter, setStatusFilter] = useState("");
     const [sort, setSort] = useState("newest");

     const handleAnswer = (question) => {
          setSelectedQuestion(question);
     };

     const handleSearch = () => {
          fetchQuestions();
     };

     const fetchQuestions = async () => {
          try {
               const params = {
                    search,
                    sort,
               };

               if (statusFilter) {
                    params.status_filter = statusFilter;
               }

               const response = await getQuestions(params);
               setQuestions(response.data.items);

          } catch (err) {
               console.error(err);

               const detail = err.response?.data?.detail;

               if (Array.isArray(detail)) {
                    setError(detail[0].msg);
               } else {
                    setError(detail || "Failed to load questions.");
               }

          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchQuestions();
     }, []);

     useEffect(() => {
          fetchQuestions();
     }, [sort, statusFilter]);

     if (loading) {
          return (
               <DashboardLayout role="teacher">
                    <p>Loading...</p>
               </DashboardLayout>
          );
     }

     if (error) {
          return (
               <DashboardLayout role="teacher">
                    <p className="text-red-600">{error}</p>
               </DashboardLayout>
          );
     }

     return (
          <DashboardLayout role="teacher">

               <div className="mb-6">
                    <h1 className="text-3xl font-bold">
                         Student Questions
                    </h1>

                    <p className="text-gray-500 mt-2">
                         Browse and answer students' questions.
                    </p>
               </div>

               <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-6">

                    <div className="flex flex-col lg:flex-row gap-4 items-center">

                         {/* Search */}
                         <div className="flex-1 w-full">
                              <SearchBar
                                   value={search}
                                   onChange={(e) => setSearch(e.target.value)}
                                   placeholder="Search questions..."
                              />
                         </div>

                         {/* Search Button */}
                         <Button onClick={handleSearch}>
                              Search
                         </Button>

                         {/* Status */}
                         <div className="w-full lg:w-48">
                              <Select
                                   name="status"
                                   value={statusFilter}
                                   onChange={(e) => setStatusFilter(e.target.value)}
                                   options={statusFilters}
                              />
                         </div>

                         {/* Sort */}
                         <div className="w-full lg:w-48">
                              <Select
                                   name="sort"
                                   value={sort}
                                   onChange={(e) => setSort(e.target.value)}
                                   options={sorts}
                              />
                         </div>

                    </div>

               </div>

               <QuestionFeed
                    questions={questions}
                    title="All Questions"
                    emptyMessage="No questions available."
                    showActions={true}
                    showFilter={false}
                    onAnswer={handleAnswer}
               />

               {selectedQuestion && (
                    <AnswerQuestionModal
                         question={selectedQuestion}
                         onClose={() => setSelectedQuestion(null)}
                         onSuccess={fetchQuestions}
                    />
               )}

          </DashboardLayout>
     );
}

export default Questions;