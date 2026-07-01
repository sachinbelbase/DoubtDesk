import {
     Home,
     Plus,
     FileQuestion,
     Bookmark,
     Users,
     BookOpen,
     Settings,
     UserCircle,
     Bell,
     AlertTriangle,
     BookImage,
     User
} from "lucide-react";

function Sidebar() {
     const items = [

          {
               name: "Home",
               icon: Home
          },

          {
               name: "Ask Question",
               icon: Plus
          },

          {
               name: "My Questions",
               icon: FileQuestion
          },

          {
               name: "Bookmarks",
               icon: Bookmark
          },

          {
               name: "Community",
               icon: Users
          },

          {
               name: "Guidelines",
               icon: BookOpen
          },

          {
               name: "Ask Doubt",
               icon: Plus
          },

          {
               name: "Resources",
               icon: BookImage
          },

          {
               name: "FAQ",
               icon: FileQuestion
          },

          {
               name: "Profile",
               icon: User
          },

          {
               name: "Notifications",
               icon: Bell
          },

          {
               name: "Warnings",
               icon: AlertTriangle
          },

          {
               name: "Settings",
               icon: Settings
          }

     ]

     return (

          <div
               className="sidebar w-64 bg-white shadow-md p-5 min-h-screen border-r flex flex-col">

               <h2
                    className="text-2xl font-bold text-blue-950">
                    DoubtDesk
               </h2>
               <p
                    className="mb-8 text-blue-950font-semiboldtext-sm">
                    Anonymous Q&A Platform
               </p>

               <div className="space-y-2">
                    {
                         items.map((item) => {
                              const Icon = item.icon;
                              return (
                                   <div
                                        key={item.name}
                                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-blue-50 cursor-pointer transition">

                                        <Icon size={20} />

                                        <span>
                                             {item.name}
                                        </span>
                                   </div>
                              )
                         })
                    }

               </div>

               <div
                    className="mt-auto bg-gray-100 rounded-xl p-4 flex gap-3 items-center">

                    <UserCircle size={20} />

                    <div>
                         <p className="font-semibold">
                              Anonymous User
                         </p>

                         <p className="text-sm text-gray-500">
                              Student
                         </p>

                    </div>

               </div>

          </div>
     )
}

export default Sidebar;