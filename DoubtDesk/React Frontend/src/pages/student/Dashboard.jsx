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

  // Search States
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const [stats, setStats] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const limit = 10;


  const fetchQuestions = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await getQuestions({
        search,
        page,
        limit,
      });

      setQuestions(response.data.items);
      setTotalPages(response.data.total_pages);

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.detail ||
        "Failed to load questions."
      );

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

  }, [page]);

  // Handlers
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    fetchQuestions();
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  return (
    <DashboardLayout role="student">

      <WelcomeBanner />

      <DashboardHeader/>

      <SearchSection
        search={search}
        category={category}
        difficulty={difficulty}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onDifficultyChange={handleDifficultyChange}
        onSearch={handleSearch}
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
