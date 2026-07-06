import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useAuth } from "../../hooks/useAuth";

function DashboardLayout({ role, children }) {
  const { user } = useAuth();
  const activeRole = role || user?.role;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <Navbar />

      {/* Body */}
      <div className="flex">

        {/* Sidebar */}
        <Sidebar role={activeRole} />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;
