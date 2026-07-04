import CategoryCard from "./CategoryCard";

import { categories } from "../../data/categories";

function CategoryGrid() {

     return (

          <section className="mb-10">

               <div className="flex justify-between items-center mb-5">

                    <h2 className="text-2xl font-bold">
                         Browse Categories
                    </h2>

               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {categories.map((category) => (

                         <CategoryCard
                              key={category.id}
                              category={category}
                         />

                    ))}

               </div>

          </section>

     );

}

export default CategoryGrid;