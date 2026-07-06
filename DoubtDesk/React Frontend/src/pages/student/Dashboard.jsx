import { useState } from "react";

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

  // Handlers
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
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
      />

      <QuickStats />

      <RecentQuestions />

      <CategoryGrid />

      <TrendingTopics />

    </DashboardLayout>

  );
}

export default StudentDashboard;
