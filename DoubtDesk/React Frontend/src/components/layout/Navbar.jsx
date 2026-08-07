import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationDropdown from "../common/NotificationDropdown";
import ThemeToggle from "../common/ThemeToggle";
import {
     Menu,
     Bell,
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
     const [showNotifications, setShowNotifications] = useState(false);

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


     return (
          <header className="sticky top-0 z-50 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 flex items-center justify-between">

               {/* Left */}

               <div className="flex items-center gap-4">

                    <button
                         onClick={() => setSidebarOpen(!sidebarOpen)}
                         className="
                              p-2
                              rounded-lg
                              hover:bg-gray-100
                              dark:hover:bg-gray-800
                              transition
                         "
                    >
                         <Menu size={22} className="text-gray-700 dark:text-gray-200" />
                    </button>

                    <div>

                         <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                              DoubtDesk
                         </h1>

                         <p className="text-xs text-gray-500 dark:text-gray-400">
                              Anonymous Learning Platform
                         </p>

                    </div>

               </div>

               {/* Right */}

               <div className="flex items-center gap-3">

                    {/* Notification */}

                    <div className="relative">
                         <button
                              onClick={() => setShowNotifications(!showNotifications)}
                              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                         >
                              <Bell size={20} className="text-gray-700 dark:text-gray-200" />

                              {unreadCount > 0 && (
                                   <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                                        {unreadCount}
                                   </span>
                              )}
                         </button>

                         {showNotifications && (
                              <NotificationDropdown />
                         )}
                    </div>

                    {/* Theme */}

                    <ThemeToggle />

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
                                   border-gray-200
                                   dark:border-gray-700
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

                                   <p className="font-semibold text-gray-900 dark:text-white">
                                        {user?.name}
                                   </p>

                                   <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                        {user?.role}
                                   </p>

                              </div>

                              <ChevronDown size={18} className="text-gray-700 dark:text-gray-300" />

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
                                        dark:bg-gray-900
                                        rounded-xl
                                        shadow-lg
                                        border
                                        border-gray-200
                                        dark:border-gray-700
                                        overflow-hidden
                                   "
                              >

                                   <button
                                        onClick={handleProfile}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                                   >
                                        <User size={18} />
                                        Profile
                                   </button>

                                   <hr className="border-gray-200 dark:border-gray-700" />

                                   <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
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