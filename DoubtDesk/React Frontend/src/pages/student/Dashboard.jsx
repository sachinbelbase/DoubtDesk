import { useEffect, useState } from "react";

import { getStudentDashboard } from "../../api/dashboardService";
import { getQuestions } from "../../api/questionService";

import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import SearchSection from "../../components/dashboard/SearchSection";
import QuickStats from "../../components/dashboard/QuickStats";
import CategoryGrid from "../../components/dashboard/CategoryGrid";
import RecentQuestions from "../../components/dashboard/RecentQuestions";
import TrendingTopics from "../../components/dashboard/TrendingTopics";


function StudentDashboard() {

  const [search, setSearch] = useState("");

  const [stats, setStats] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const [sort, setSort] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("");

  const limit = 10;


  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        search,
        page,
        limit,
        sort,
      };

      if (statusFilter) {
        params.status_filter = statusFilter;
      }

      console.log("Params:", params);

      const response = await getQuestions(params);

      setQuestions(response.data.items);
      setTotalPages(response.data.total_pages);

    } catch (err) {
      console.log(err.response?.status);
      console.log(err.response?.data);

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

    const fetchStats = async () => {

      try {

        const response = await getStudentDashboard();

        setStats(response.data);

      } catch (err) {

        console.error(err);

      }

    };

    fetchStats();

  }, []);
  

  useEffect(() => {

    fetchQuestions();

  }, [page, sort, statusFilter]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    setPage(1);
    fetchQuestions();
  };

  return (
    <DashboardLayout role="student">

      <WelcomeBanner />

      <DashboardHeader/>

      <SearchSection
        search={search}
        sort={sort}
        onSearchChange={handleSearchChange}
        onSortChange={(e) => {
          setSort(e.target.value);
          setPage(1);
        }}
        onSearch={handleSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={(e) => {
          setStatusFilter(e.target.value);
          setPage(1);
        }}
      />

      <QuickStats stats={stats} />

      <RecentQuestions 
        questions={questions}
        loading={loading}
        error={error}
        fetchQuestions={fetchQuestions} 
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />

      <CategoryGrid />

      <TrendingTopics />

    </DashboardLayout>

  );
}

export default StudentDashboard;
