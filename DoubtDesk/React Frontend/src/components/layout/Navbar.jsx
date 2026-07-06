import { useNavigate } from "react-router-dom";
import { useNotifications } from "../../hooks/useNotifications";
import {
     Bell,
     Search,
     Moon,
     Menu,
     ChevronDown,
     UserCircle,
     LogOut,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

function Navbar() {
     const { user, logout } = useAuth();
     const { unreadCount } = useNotifications();
     const navigate = useNavigate();

     const handleLogout = () => {
          logout();
          navigate("/login");
     };

     const handleNotificationClick = () => {
          if (!user) return;

          switch (user.role) {
               case "student":
                    navigate("/student/notifications");
                    break;

               case "teacher":
                    navigate("/teacher/notifications");
                    break;

               case "admin":
                    navigate("/admin/notifications");
                    break;

               default:
                    break;
          }
     };

     return (
          <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-6">

               {/* Left Section */}
               <div className="flex items-center gap-4">

                    <button className="p-2 rounded-lg hover:bg-gray-100">
                         <Menu size={22} />
                    </button>

               </div>

               {/* Right Section */}

               <div className="flex items-center gap-5">

                    <button
                         onClick={handleNotificationClick}
                         className="
                         relative
                         bg-white
                         p-3
                         rounded-full
                         shadow
                         hover:bg-gray-100
                         transition
                    "
                    >
                         <Bell size={22} />

                         {unreadCount > 0 && (
                              <span
                                   className="
                                   absolute
                                   -top-1
                                   -right-1
                                   bg-red-500
                                   text-white
                                   text-xs
                                   rounded-full
                                   h-5
                                   w-5
                                   flex
                                   items-center
                                   justify-center
                              "
                              >
                                   {unreadCount}
                              </span>
                         )}

                    </button>

                    <button className="p-2 rounded-lg hover:bg-gray-100">
                         <Moon size={21} />
                    </button>

                    <div className="flex items-center gap-3 cursor-pointer">

                         <UserCircle size={38} />

                         <div>

                              <p className="font-semibold">
                                   {user?.name || "Anonymous User"}
                              </p>

                              <p className="text-sm text-gray-500 capitalize">
                                   {user?.role || "Student"}
                              </p>

                         </div>

                         <ChevronDown size={18} />

                    </div>

                    <button
                         onClick={handleLogout}
                         className="p-2 rounded-lg hover:bg-gray-100"
                         title="Log out"
                    >
                         <LogOut size={21} />
                    </button>

               </div>

          </header>
     );
}

export default Navbar;
