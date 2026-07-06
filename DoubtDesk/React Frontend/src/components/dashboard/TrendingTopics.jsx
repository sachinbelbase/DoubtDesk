import Card from "../common/Card";
import { trendingTopics } from "../../data/trendingTopics";

function TrendingTopics() {
     return (

          <Card>
               <h2 className="text-2xl font-bold mb-5">
                    Trending Topics
               </h2>

               <div className="flex flex-wrap gap-3">

                    {trendingTopics.map((topic) => (

                         <button
                              key={topic}
                              className="
                                   px-4
                                   py-2
                                   rounded-full
                                   bg-blue-100
                                   text-blue-700
                                   hover:bg-blue-600
                                   hover:text-white
                                   transition"
                         >
                              #{topic}
                         </button>

                    ))}
               </div>

          </Card>
     );
}
export default TrendingTopics;