import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";

function DashboardLayout({ role, children }) {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <Navbar />

      {/* Body */}
      <div className="flex">

        {/* Sidebar */}
        <Sidebar role={role} />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>

        {/* Right Sidebar */}
        <RightSidebar role={role} />

      </div>

    </div>
  );
}

export default DashboardLayout;