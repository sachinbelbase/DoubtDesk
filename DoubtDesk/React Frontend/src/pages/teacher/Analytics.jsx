import DashboardLayout from "../../components/layout/DashboardLayout";
import AnalyticsCharts from "../../components/teacher/AnalyticsChart";
import TeacherStatus from "../../components/teacher/TeacherStats";

function Analytics() {
  return (
    <DashboardLayout role="teacher">

      <div className="mb-6">

        <h1 className="text-3xl font-bold">
          Analytics
        </h1>

        <p className="text-gray-500 mt-2">
          A look at question activity across DoubtDesk.
        </p>

      </div>

      <div className="space-y-6">

        <TeacherStatus />

        <AnalyticsCharts />

      </div>

    </DashboardLayout>
  );
}

export default Analytics;
