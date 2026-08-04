import { Search } from "lucide-react";

import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

// import { categories } from "../../data/categories";
// import { difficulties } from "../../data/difficulties";

import { sorts } from "../../data/sorts";
import { statusFilters } from "../../data/statusFilters";


function SearchSection({
     search,
     sort,
     onSearchChange,
     onSortChange,
     onSearch,
     statusFilter,
     onStatusFilterChange,

}) 
     {

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
                              onKeyDown={(e) => {
                                   if (e.key === "Enter") {
                                        onSearch();
                                   }
                              }}
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

                    {/* Status Filter */}

                    <div className="lg:col-span-2">

                         <Select
                              name="statusFilter"
                              value={statusFilter}
                              onChange={onStatusFilterChange}
                              options={statusFilters}
                              placeholder="Status"
                         />

                    </div>

          
                         {/* Sort */}

                         <div className="lg:col-span-2">

                              <Select
                                   name="sort"
                                   value={sort}
                                   onChange={onSortChange}
                                   options={sorts}
                                   placeholder="Sort"
                              />

                         </div>


                    {/* Button */}

                    <div className="lg:col-span-2">

                         <Button 
                         className="w-full"
                         onClick={onSearch}
                         >
                              Search
                         </Button>

                    </div>

               </div>

          </div>
     );
}

export default SearchSection;