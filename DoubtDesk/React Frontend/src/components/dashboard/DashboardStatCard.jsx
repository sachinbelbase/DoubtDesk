const colorMap = {
     "bg-blue-500": { bg: "bg-blue-50 dark:bg-blue-950", text: "text-blue-600 dark:text-blue-400" },
     "bg-green-500": { bg: "bg-green-50 dark:bg-green-950", text: "text-green-600 dark:text-green-400" },
     "bg-yellow-500": { bg: "bg-yellow-50 dark:bg-yellow-950", text: "text-yellow-600 dark:text-yellow-400" },
     "bg-purple-500": { bg: "bg-purple-50 dark:bg-purple-950", text: "text-purple-600 dark:text-purple-400" },
     "bg-red-500": { bg: "bg-red-50 dark:bg-red-950", text: "text-red-600 dark:text-red-400" },
     "bg-orange-500": { bg: "bg-orange-50 dark:bg-orange-950", text: "text-orange-600 dark:text-orange-400" },
     "bg-amber-500": { bg: "bg-amber-50 dark:bg-amber-950", text: "text-amber-600 dark:text-amber-400" },
};

function DashboardStatCard({
     title,
     value,
     icon,
     color = "bg-blue-500",
}) {
     const { bg, text } = colorMap[color] ?? colorMap["bg-blue-500"];

     return (
          <div
               className="
                bg-white
                dark:bg-gray-900
                rounded-xl
                p-5
                flex
                items-center
                justify-between
                shadow-sm
                hover:shadow-md
                hover:-translate-y-0.5
                transition-all
                duration-200
            "
          >
               <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                         {title}
                    </p>

                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                         {value ?? 0}
                    </h2>
               </div>

               <div
                    className={`
                    ${bg}
                    ${text}
                    p-3
                    rounded-full
                    flex
                    items-center
                    justify-center
                `}
               >
                    {icon}
               </div>
          </div>
     );
}

export default DashboardStatCard;