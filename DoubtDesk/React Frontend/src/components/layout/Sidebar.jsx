import { NavLink } from "react-router-dom";
import { menus } from "../../data/sidebarMenu";

function Sidebar({ role, sidebarOpen }) {
     const menu = menus[role] || [];

     return (
          <aside
               className={`
                    bg-white
                    border-r
                    shadow-sm
                    transition-all
                    duration-300
                    flex
                    flex-col
                    ${sidebarOpen ? "w-64" : "w-20"}
               `}
          >

               {/* Logo */}

               <div
                    className={`
                         h-16
                         border-b
                         flex
                         items-center
                         ${sidebarOpen ? "px-6" : "justify-center"}
                    `}
               >

                    <div
                         className="
                              w-10
                              h-10
                              rounded-xl
                              bg-blue-600
                              text-white
                              flex
                              items-center
                              justify-center
                              font-bold
                              text-lg
                              `flex-shrink-0`
                         "
                    >
                         DD
                    </div>

                    {sidebarOpen && (

                         <div className="ml-3">

                              <h1 className="font-bold text-gray-900">
                                   DoubtDesk
                              </h1>

                              <p className="text-xs text-gray-500">
                                   Anonymous Platform
                              </p>

                         </div>

                    )}

               </div>

               {/* Menu */}

               <nav className="flex-1 p-3">

                    {menu.map((item) => {

                         const Icon = item.icon;

                         return (

                              <NavLink
                                   key={item.label}
                                   to={item.path}
                                   title={!sidebarOpen ? item.label : ""}
                                   className={({ isActive }) =>
                                        `
                                        flex
                                        items-center
                                        ${sidebarOpen
                                             ? "gap-3 px-4 justify-start"
                                             : "justify-center"}

                                        py-3
                                        mb-2
                                        rounded-xl
                                        transition-all
                                        duration-200

                                        ${isActive
                                             ? "bg-blue-600 text-white shadow"
                                             : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"}
                                   `
                                   }
                              >

                                   <Icon size={20} />

                                   {sidebarOpen && (
                                        <span className="font-medium">
                                             {item.label}
                                        </span>
                                   )}

                              </NavLink>

                         );

                    })}

               </nav>

          </aside>
     );
}

export default Sidebar;