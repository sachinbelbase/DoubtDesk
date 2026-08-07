import { Search } from "lucide-react";

import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

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
}) {
     return (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 mb-8">

               {/* Heading */}
               <div className="mb-5">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                         Search Questions
                    </h2>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                         Find questions by title or content.
                    </p>
               </div>

               {/* Search */}
               <div className="relative mb-5">
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
            dark:text-gray-500
            pointer-events-none
          "
                    />
               </div>

               {/* Filters */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <Select
                         name="statusFilter"
                         value={statusFilter}
                         onChange={onStatusFilterChange}
                         options={statusFilters}
                         placeholder="Status"
                    />

                    <Select
                         name="sort"
                         value={sort}
                         onChange={onSortChange}
                         options={sorts}
                         placeholder="Sort"
                    />

                    <Button
                         className="w-full"
                         onClick={onSearch}
                    >
                         Search
                    </Button>

               </div>

          </div>
     );
}

export default SearchSection;