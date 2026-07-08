import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
     Menu,
     Bell,
     Moon,
     ChevronDown,
     User,
     Settings,
     LogOut,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import { useNotifications } from "../../hooks/useNotifications";

function Navbar({
     sidebarOpen,
     setSidebarOpen,
}) {
     const navigate = useNavigate();

     const { user, logout } = useAuth();
     const { unreadCount } = useNotifications();

     const [showDropdown, setShowDropdown] = useState(false);

     const getInitials = (name = "Anonymous User") =>
          name
               .split(" ")
               .map((word) => word[0])
               .join("")
               .toUpperCase();

     const handleLogout = () => {
          logout();
          navigate("/login");
     };

     const handleProfile = () => {
          navigate(`/${user.role}/profile`);
          setShowDropdown(false);
     };

     const handleSettings = () => {
          navigate(`/${user.role}/settings`);
          setShowDropdown(false);
     };

     const handleNotification = () => {
          if (user?.role === "student")
               navigate("/student/notifications");

          else if (user?.role === "teacher")
               navigate("/teacher/notifications");

          else
               navigate("/admin/reports");
     };

     return (
          <header className="sticky top-0 z-50 h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">

               {/* Left */}

               <div className="flex items-center gap-4">

                    <button
                         onClick={() => setSidebarOpen(!sidebarOpen)}
                         className="
                              p-2
                              rounded-lg
                              hover:bg-gray-100
                              transition
                         "
                    >
                         <Menu size={22} />
                    </button>

                    <div>

                         <h1 className="text-xl font-bold text-gray-900">
                              DoubtDesk
                         </h1>

                         <p className="text-xs text-gray-500">
                              Anonymous Learning Platform
                         </p>

                    </div>

               </div>

               {/* Right */}

               <div className="flex items-center gap-3">

                    {/* Notification */}

                    <button
                         onClick={handleNotification}
                         className="
                              relative
                              p-2
                              rounded-lg
                              hover:bg-gray-100
                              transition
                         "
                    >

                         <Bell size={20} />

                         {unreadCount > 0 && (
                              <span
                                   className="
                                        absolute
                                        -top-1
                                        -right-1
                                        w-5
                                        h-5
                                        rounded-full
                                        bg-red-500
                                        text-white
                                        text-xs
                                        flex
                                        items-center
                                        justify-center
                                   "
                              >
                                   {unreadCount}
                              </span>
                         )}

                    </button>

                    {/* Theme */}

                    <button
                         className="
                              p-2
                              rounded-lg
                              hover:bg-gray-100
                              transition
                         "
                    >
                         <Moon size={20} />
                    </button>

                    {/* Profile */}

                    <div className="relative">

                         <button
                              onClick={() =>
                                   setShowDropdown(!showDropdown)
                              }
                              className="
                                   flex
                                   items-center
                                   gap-3
                                   pl-3
                                   border-l
                              "
                         >

                              <div
                                   className="
                                        w-10
                                        h-10
                                        rounded-full
                                        bg-blue-600
                                        text-white
                                        flex
                                        items-center
                                        justify-center
                                        font-semibold
                                   "
                              >
                                   {getInitials(user?.name)}
                              </div>

                              <div className="text-left hidden md:block">

                                   <p className="font-semibold">
                                        {user?.name}
                                   </p>

                                   <p className="text-xs text-gray-500 capitalize">
                                        {user?.role}
                                   </p>

                              </div>

                              <ChevronDown size={18} />

                         </button>

                         {/* Dropdown */}

                         {showDropdown && (

                              <div
                                   className="
                                        absolute
                                        right-0
                                        mt-3
                                        w-56
                                        bg-white
                                        rounded-xl
                                        shadow-lg
                                        border
                                        overflow-hidden
                                   "
                              >

                                   <button
                                        onClick={handleProfile}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
                                   >
                                        <User size={18} />
                                        Profile
                                   </button>

                                   <button
                                        onClick={handleSettings}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
                                   >
                                        <Settings size={18} />
                                        Settings
                                   </button>

                                   <hr />

                                   <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
                                   >
                                        <LogOut size={18} />
                                        Logout
                                   </button>

                              </div>

                         )}

                    </div>

               </div>

          </header>
     );
}

export default Navbar;