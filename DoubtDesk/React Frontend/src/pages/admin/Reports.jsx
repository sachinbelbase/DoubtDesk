import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import ReportTable from "../../components/admin/ReportTable";

function Reports() {
  return (
    <DashboardLayout role="admin">

      <DashboardHeader
        title="Reported Content"
        subtitle="Review and manage reported questions."
      />

      <div className="mt-8">
        <ReportTable />
      </div>

    </DashboardLayout>
  );
}

export default Reports;