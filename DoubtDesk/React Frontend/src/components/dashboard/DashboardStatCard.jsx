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
                    rounded-xl
                    shadow
                    p-5
                    flex
                    justify-between
                    items-center
                    hover:shadow-lg
                    transition
               "
          >

               <div>

                    <p className="text-gray-500 text-sm">
                         {title}
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                         {value}
                    </h2>

               </div>

               <div
                    className={`
                         ${color}
                         w-14
                         h-14
                         rounded-full
                         flex
                         items-center
                         justify-center
                         text-white
                    `}
               >
                    {icon}
               </div>

          </div>

     );

}

export default DashboardStatCard;