import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import UserTable from "../../components/admin/UserTable";

function Users() {
  return (
    <DashboardLayout role="admin">

      <DashboardHeader
        title="Manage Users"
        subtitle="View and manage all registered users."
      />

      <div className="mt-8">
        <UserTable />
      </div>

    </DashboardLayout>
  );
}

export default Users;