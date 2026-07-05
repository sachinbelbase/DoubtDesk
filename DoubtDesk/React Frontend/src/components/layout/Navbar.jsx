import { useNavigate } from "react-router-dom";
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
     const navigate = useNavigate();

     const handleLogout = () => {
          logout();
          navigate("/login");
     };

     return (
          <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-6">

               {/* Left Section */}
               <div className="flex items-center gap-4">

                    <button className="p-2 rounded-lg hover:bg-gray-100">
                         <Menu size={22} />
                    </button>

                    <div className="relative">

                         <Search
                              size={18}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                         />

                         <input
                              type="text"
                              placeholder="Search doubts..."
                              className="
              w-80
              pl-10
              pr-4
              py-2
              rounded-lg
              border
              outline-none
              focus:border-blue-500
            "
                         />

                    </div>

               </div>

               {/* Right Section */}

               <div className="flex items-center gap-5">

                    <button className="p-2 rounded-lg hover:bg-gray-100">
                         <Bell size={21} />
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
