const leaders = [

     {
          name: "Alex",
          points: 250
     },

     {
          name: "Sophia",
          points: 220
     },

     {
          name: "John",
          points: 180
     }

];

function Leaderboard() {

     return (

          <div className="bg-white rounded-xl shadow p-5">

               <h2 className="text-lg font-semibold mb-4">

                    🏆 Top Contributors

               </h2>

               <div className="space-y-4">

                    {

                         leaders.map((user, index) => (

                              <div
                                   key={index}
                                   className="flex justify-between"
                              >

                                   <span>

                                        {user.name}

                                   </span>

                                   <span className="font-semibold text-blue-600">

                                        {user.points}

                                   </span>

                              </div>

                         ))

                    }

               </div>

          </div>

     )

}

export default Leaderboard;