import { NavLink } from "react-router-dom";
import { UserCircle } from "lucide-react";
import { menus } from "../../data/sidebarMenu";


function Sidebar({role}) {
     const menu = menus[role] || [];

     return (
          <aside className="w-64 min-h-screen bg-white border-r shadow-sm flex flex-col">

               {/* Logo */}
               <div className="p-6 border-b">
                    <h1 className="text-2xl font-bold text-blue-900">
                         DoubtDesk
                    </h1>

                    <p className="text-sm text-gray-500">
                         Anonymous Q&A Platform
                    </p>
               </div>

               {/* Menu */}

               <nav className="flex-1 p-4">

                    {menu.map((item) => {

                         const Icon = item.icon;

                         return (

                              <NavLink
                                   key={item.label}
                                   to={item.path}
                                   className={({ isActive }) =>
                                        `flex items-center gap-4 p-3 rounded-xl mb-2 transition-all
                                             ${isActive
                                             ? "bg-blue-600 text-white"
                                             : "hover:bg-blue-50 text-gray-700"
                                        }`
                                   }
                              >

                                   <Icon size={20} />

                                   <span>{item.label}</span>

                              </NavLink>

                         );

                    })}

               </nav>

               {/* User */}

               <div className="border-t p-4">


               </div>

          </aside>
     );
}

export default Sidebar;