import Card from "../common/Card";
import Button from "../common/Button";

function CategoryCard({ category }) {

     return (

          <Card>

               <div className="space-y-4">

                    {/* Icon */}

                    <div className="text-5xl">
                         {category.icon}
                    </div>

                    {/* Category Name */}

                    <h2 className="text-xl font-bold">
                         {category.name}
                    </h2>

                    {/* Description */}

                    <p className="text-gray-500">
                         {category.description}
                    </p>

                    {/* Question Count */}

                    <p className="text-sm text-gray-600">
                         <span className="font-semibold">
                              {category.questions}
                         </span>{" "}
                         Questions
                    </p>

                    {/* Button */}

                    <Button variant="primary">
                         Explore
                    </Button>

               </div>

          </Card>

     );

}

export default CategoryCard;