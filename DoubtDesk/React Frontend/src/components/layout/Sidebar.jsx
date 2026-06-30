import {
     Home,
     MessageCircle,
     Plus,
     Bell,
     User,
     Settings
} from "lucide-react";

function Sidebar() {

     const menu = [

          {
               name: "Dashboard",
               icon: <Home size={20} />
          },

          {
               name: "My Questions",
               icon: <MessageCircle size={20} />
          },

          {
               name: "Ask Doubt",
               icon: <Plus size={20} />
          },

          {
               name: "Notifications",
               icon: <Bell size={20} />
          },

          {
               name: "Profile",
               icon: <User />
          },

          {
               name: "Settings",
               icon: <Settings size={20} />
          }

     ]

     return (

          <div className="sidebar w-64 bg-white shadow-md p-5">

               <h2 className="text-2xl font-bold mb-8">DoubtDesk</h2>
               {
                    menu.map((item, index) => (
                         <div
                              className="menu-item flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
                              key={index}
                         >

                              {item.icon}
                              <span>{item.name}</span>
                         </div>
                    ))
               }
          </div>
     )
}


export default Sidebar;