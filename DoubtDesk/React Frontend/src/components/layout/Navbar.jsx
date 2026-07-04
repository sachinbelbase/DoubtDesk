import {
     Bell,
     Search,
     Moon,
     Menu,
     ChevronDown,
     UserCircle
} from "lucide-react";

function Navbar() {
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
                                   Anonymous User
                              </p>

                              <p className="text-sm text-gray-500">
                                   Student
                              </p>

                         </div>

                         <ChevronDown size={18} />

                    </div>

               </div>

          </header>
     );
}

export default Navbar;