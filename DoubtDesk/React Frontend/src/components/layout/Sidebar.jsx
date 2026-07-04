import { NavLink } from "react-router-dom";
import { UserCircle } from "lucide-react";
import { menus } from "../../data/sidebarMenu";


function Sidebar({role}) {
     const menu = menus[role] || [];

//      return (

//           <div
//                className="sidebar w-64 bg-white shadow-md p-5 min-h-screen border-r flex flex-col">

//                <h2
//                     className="text-2xl font-bold text-blue-950">
//                     DoubtDesk
//                </h2>
//                <p
//                     className="mb-8 text-blue-950font-semiboldtext-sm">
//                     Anonymous Q&A Platform
//                </p>

//                <div className="space-y-2">
//                     {
//                          items.map((item) => {
//                               const Icon = item.icon;
//                               return (
//                                    <div
//                                         key={item.name}
//                                         className="flex items-center gap-4 p-3 rounded-xl hover:bg-blue-50 cursor-pointer transition">

//                                         <Icon size={20} />

//                                         <span>
//                                              {item.name}
//                                         </span>
//                                    </div>
//                               )
//                          })
//                     }

//                </div>

//                <div
//                     className="mt-auto bg-gray-100 rounded-xl p-4 flex gap-3 items-center">

//                     <UserCircle size={20} />

//                     <div>
//                          <p className="font-semibold">
//                               Anonymous User
//                          </p>

//                          <p className="text-sm text-gray-500">
//                               Student
//                          </p>

//                     </div>

//                </div>

//           </div>
//      )
// }
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

                    <div className="flex items-center gap-3">

                         <UserCircle size={42} />

                         <div>

                              <p className="font-semibold">
                                   Anonymous User
                              </p>

                              <p className="text-sm capitalize text-gray-500">
                                   {role}
                              </p>

                         </div>

                    </div>

               </div>

          </aside>
     );
}

export default Sidebar;