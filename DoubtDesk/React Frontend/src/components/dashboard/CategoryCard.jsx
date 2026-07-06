import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import Card from "../common/Card";

function CategoryCard({ category }) {
     const navigate = useNavigate();

     const handleClick = () => {
          // i will change this when i will make a category page for each category
          navigate("/student/dashboard");
     };

     return (
          <div
               onClick={handleClick}
               className="cursor-pointer"
          >
               <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

                    <div className="space-y-2">

                         <div className="text-4xl">
                              {category.icon}
                         </div>

                         <h2 className="text-lg font-semibold text-gray-900">
                              {category.name}
                         </h2>

                         <p className="text-sm text-gray-500">
                              {category.description}
                         </p>

                         <div className="flex items-center justify-between pt-2">

                              <p className="text-sm text-gray-600">
                                   <span className="font-semibold">
                                        {category.questions}
                                   </span>{" "}
                                   Questions
                              </p>

                              <ArrowUpRight
                                   size={18}
                                   className="
                                        text-gray-400
                                        group-hover:text-blue-600
                                        transition-colors
                                   "
                              />

                         </div>

                    </div>

               </Card>
          </div>
     );
}

export default CategoryCard;