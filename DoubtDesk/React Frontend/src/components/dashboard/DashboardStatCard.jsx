const colorMap = {
     "bg-blue-500": { bg: "bg-blue-50", text: "text-blue-600" },
     "bg-green-500": { bg: "bg-green-50", text: "text-green-600" },
     "bg-yellow-500": { bg: "bg-yellow-50", text: "text-yellow-600" },
     "bg-purple-500": { bg: "bg-purple-50", text: "text-purple-600" },
     "bg-red-500": { bg: "bg-red-50", text: "text-red-600" },
     "bg-orange-500": { bg: "bg-orange-50", text: "text-orange-600" },
     "bg-amber-500": { bg: "bg-amber-50", text: "text-amber-600" },
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
                    <p className="text-sm font-medium text-gray-500">
                         {title}
                    </p>

                    <h2 className="text-3xl font-bold text-gray-900 mt-1">
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