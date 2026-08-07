import { NavLink } from "react-router-dom";
import { menus } from "../../data/sidebarMenu";

function Sidebar({ role, sidebarOpen }) {
     const menu = menus[role] || [];

     return (
          <aside
               className={`
                    bg-white
                    dark:bg-gray-900
                    border-r
                    border-gray-200
                    dark:border-gray-800
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
                         border-gray-200
                         dark:border-gray-800
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

                              <h1 className="font-bold text-gray-900 dark:text-white">
                                   DoubtDesk
                              </h1>

                              <p className="text-xs text-gray-500 dark:text-gray-400">
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
                                             : "text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-700 dark:hover:text-blue-400"}
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