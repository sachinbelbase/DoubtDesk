function QuestionFilter() {
     return (
          <div className="flex justify-between items-center mb-6">

               <h2 className="text-2xl font-bold">
                    Recent Questions
               </h2>

               <select className="border rounded-lg px-4 py-2">

                    <option>Latest</option>

                    <option>Most Answered</option>

                    <option>Most Viewed</option>

               </select>

          </div>
     );
}

export default QuestionFilter;