import {
     Home,
     MessageCircle,
     Plus,
     Bell,
     User,
     Settings,
     AlertTriangle,
     FileQuestionIcon,
     MailQuestionMark,
     Book,
     BookDashed,
     LucideBookDashed,
     BookImage
} from "lucide-react";

function Sidebar() {

     const menu = [

          {
               name: "Home",
               icon: <Home size={20} />
          },

          {
               name: "Ask Question",
               icon: <MessageCircle size={20} />
          },
          {
               name: "Questions Feed",
               icon: <MessageCircle size={20} />
          },
          {
               name: "My Questions",
               icon: <MessageCircle size={20} />
          },
          {
               name: "Bookmarks",
               icon: <MessageCircle size={20} />
          },


          {
               name: "Ask Doubt",
               icon: <Plus size={20} />
          },
          {
               name: "Guidelines",
               icon: <BookImage size={20} />
          },
          {
               name: "FAQ",
               icon: <FileQuestionIcon size={20} />
          },

          {
               name: "Profile",
               icon: <User />
          },

          {
               name: "Notifications",
               icon: <Bell size={20} />
          },

          {
               name: "Warnings",
               icon: <AlertTriangle size={20} />
          },

          {
               name: "Settings",
               icon: <Settings size={20} />
          }

     ]

     return (

          <div className="sidebar w-64 bg-white shadow-md p-5">

               <h2 className="text-2xl font-bold mb-1 text-blue-950">DoubtDesk </h2>
               <p className=" mb-8 text-blue-950 font-semibold">Anonymous Q&A Platform</p>
               {
                    menu.map((item, index) => (
                         <div
                              className="menu-item flex items-center gap-3 p-3 rounded-lg hover:bg-blue-900 hover:text-white cursor-pointer"

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