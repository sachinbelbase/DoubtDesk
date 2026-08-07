import {
     GraduationCap,
     BookOpen,
     CircleHelp,
     MessageSquareText,
     Clock3,
} from "lucide-react";

function AdminStats({ stats }) {
     if (!stats) return null;

     const cards = [
          {
               title: "Students",
               value: stats.total_students,
               icon: <GraduationCap size={24} />,
               bg: "bg-amber-50",
               text: "text-amber-600",
          },
          {
               title: "Teachers",
               value: stats.total_teachers,
               icon: <BookOpen size={24} />,
               bg: "bg-blue-50",
               text: "text-blue-600",
          },
          {
               title: "Questions",
               value: stats.total_questions,
               icon: <CircleHelp size={24} />,
               bg: "bg-red-50",
               text: "text-red-600",
          },
          {
               title: "Answered",
               value: stats.answered_questions,
               icon: <MessageSquareText size={24} />,
               bg: "bg-green-50",
               text: "text-green-600",
          },
          {
               title: "Open",
               value: stats.open_questions,
               icon: <Clock3 size={24} />,
               bg: "bg-orange-50",
               text: "text-orange-600",
          },
     ];

     return (
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
               {cards.map((card) => (
                    <div
                         key={card.title}
                         className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                    >
                         <div className="flex items-center justify-between">
                              <div>
                                   <h3 className="text-gray-500 text-sm font-medium dark:text-white">
                                        {card.title}
                                   </h3>
                                   <p className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">
                                        {card.value ?? 0}
                                   </p>
                              </div>

                              <div className={`${card.bg} ${card.text} p-3 rounded-full`}>
                                   {card.icon}
                              </div>
                         </div>
                    </div>
               ))}
          </div>
     );
}

export default AdminStats;