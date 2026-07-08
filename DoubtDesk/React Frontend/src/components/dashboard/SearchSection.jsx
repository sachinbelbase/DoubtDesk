import { Search } from "lucide-react";

import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

import { categories } from "../../data/categories";
import { difficulties } from "../../data/difficulties";

function SearchSection({
     search,
     category,
     difficulty,
     onSearchChange,
     onCategoryChange,
     onDifficultyChange,
}) {
     return (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 mb-8">

               <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">

                    {/* Search */}

                    <div className="lg:col-span-6 relative">

                         <Input
                              name="search"
                              type="text"
                              placeholder="Search questions..."
                              value={search}
                              onChange={onSearchChange}
                         />

                         <Search
                              size={18}
                              className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-400
              pointer-events-none
            "
                         />

                    </div>

                    {/* Category */}

                    <div className="lg:col-span-2">

                         <Select
                              name="category"
                              value={category}
                              onChange={onCategoryChange}
                              options={categories}
                              placeholder="Category"
                         />

                    </div>

                    {/* Difficulty */}

                    <div className="lg:col-span-2">

                         <Select
                              name="difficulty"
                              value={difficulty}
                              onChange={onDifficultyChange}
                              options={difficulties}
                              placeholder="Difficulty"
                         />

                    </div>

                    {/* Button */}

                    <div className="lg:col-span-2">

                         <Button className="w-full">
                              Search
                         </Button>

                    </div>

               </div>

          </div>
     );
}

export default SearchSection;