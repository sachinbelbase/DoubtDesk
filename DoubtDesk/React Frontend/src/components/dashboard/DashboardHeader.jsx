import { Bell } from "lucide-react";

function DashboardHeader({
     title,
     subtitle,
     notificationCount = 0,
}) {
     return (
          <div className="flex items-center justify-between mb-8">

               {/* Left Side */}

               <div>

                    <h1 className="text-3xl font-bold text-gray-900">
                         {title}
                    </h1>

                    <p className="text-gray-500 mt-2">
                         {subtitle}
                    </p>

               </div>

               {/* Right Side */}

               <button
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

                    {notificationCount > 0 && (
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
                              {notificationCount}
                         </span>
                    )}

               </button>

          </div>
     );
}

export default DashboardHeader;