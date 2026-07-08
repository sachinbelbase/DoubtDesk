import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function DashboardLayout({ children, role }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar
        role={role}
        sidebarOpen={sidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;