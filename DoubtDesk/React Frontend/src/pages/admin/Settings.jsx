import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import SettingsCard from "../../components/common/SettingsCard";

function Settings() {
  return (
    <DashboardLayout role="admin">

      <DashboardHeader
        title="Settings"
        subtitle="Manage your administrator preferences."
      />

      <SettingsCard role="admin" />

    </DashboardLayout>
  );
}

export default Settings;