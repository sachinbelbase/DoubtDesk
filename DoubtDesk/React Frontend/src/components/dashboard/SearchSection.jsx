import Input from "../common/Input";
import Select from "../common/Select";

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
          <div className="bg-white rounded-xl shadow p-5 mb-8">

               <div className="grid md:grid-cols-3 gap-4">

                    {/* Search */}

                    <Input
                         name="search"
                         type="text"
                         placeholder="Search questions..."
                         value={search}
                         onChange={onSearchChange}
                    />

                    {/* Category */}

                    <Select
                         name="category"
                         value={category}
                         onChange={onCategoryChange}
                         options={categories}
                         placeholder="All Categories"
                    />

                    {/* Difficulty */}

                    <Select
                         name="difficulty"
                         value={difficulty}
                         onChange={onDifficultyChange}
                         options={difficulties}
                         placeholder="All Levels"
                    />

               </div>

          </div>
     );
}

export default SearchSection;