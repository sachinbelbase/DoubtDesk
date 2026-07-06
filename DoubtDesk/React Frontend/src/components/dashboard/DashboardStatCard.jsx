function DashboardStatCard({
     title,
     value,
     icon,
     color = "bg-blue-500",
}) {
     return (

          <div
               className="
                    bg-white
                    border
                    border-gray-100
                    rounded-2xl
                    p-6
                    flex
                    items-center
                    justify-between
                    shadow-sm
                    hover:shadow-xl
                    hover:-translate-y-1
                    transition-all
                    duration-300
               "
          >

               <div>

                    <p className="text-sm font-medium text-gray-500">
                         {title}
                    </p>

                    <h2 className="text-4xl font-bold text-gray-900 mt-2">
                         {value}
                    </h2>

               </div>

               <div
                    className={`
                         ${color}
                         w-14
                         h-14
                         rounded-2xl
                         flex
                         items-center
                         justify-center
                         text-white
                         shadow-md
                    `}
               >
                    {icon}
               </div>

          </div>

     );
}

export default DashboardStatCard;