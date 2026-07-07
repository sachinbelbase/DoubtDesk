import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import SettingsCard from "../../components/common/SettingsCard";

function Settings() {
  return (
    <DashboardLayout role="teacher">

      <DashboardHeader
        title="Settings"
        subtitle="Manage your account preferences."
      />

      <SettingsCard role="teacher" />

    </DashboardLayout>
  );
}

export default Settings;