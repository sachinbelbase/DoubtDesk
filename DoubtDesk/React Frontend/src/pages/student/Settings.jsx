import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import SettingsCard from "../../components/common/SettingsCard";

function Settings() {
  return (
    <DashboardLayout role="student">

      <DashboardHeader
        title="Settings"
        subtitle="Manage your account preferences."
      />

      <SettingsCard role="student" />

    </DashboardLayout>
  );
}

export default Settings;