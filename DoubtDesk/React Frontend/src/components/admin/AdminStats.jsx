function AdminStats({ stats }) {
     if (!stats) return null;

     const cards = [
          {
               title: "Students",
               value: stats.total_students,
          },
          {
               title: "Teachers",
               value: stats.total_teachers,
          },
          {
               title: "Questions",
               value: stats.total_questions,
          },
          {
               title: "Answered",
               value: stats.answered_questions,
          },
          {
               title: "Open",
               value: stats.open_questions,
          },
     ];

     return (
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
               {cards.map((card) => (
                    <div
                         key={card.title}
                         className="bg-white rounded-xl shadow p-6"
                    >
                         <h3 className="text-gray-500 text-sm">{card.title}</h3>

                         <p className="text-3xl font-bold mt-2">
                              {card.value}
                         </p>
                    </div>
               ))}
          </div>
     );
}

export default AdminStats;