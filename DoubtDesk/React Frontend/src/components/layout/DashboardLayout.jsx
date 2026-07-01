import Sidebar from "./Sidebar";
import Navbar from "../common/Navbar";

function DashboardLayout({ children }) {

  return (

    <div className="dashboard flex h-screen bg-gray-100">

      <Sidebar />

      <div className="main flex-1">

        <Navbar />

        <div className="content p-6">

          {children}

        </div>

      </div>

    </div>
  )
}

export default DashboardLayout;