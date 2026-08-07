import { Search } from "lucide-react";

function SearchBar({
     placeholder,
     value,
     onChange,
}) {
     return (
          <div className="relative">

               <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
               />

               <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="
          w-full
          pl-11
          pr-4
          py-2.5

          bg-white
          dark:bg-gray-900

          border
          border-gray-200
          dark:border-gray-700

          text-gray-900
          dark:text-white

          placeholder:text-gray-400
          dark:placeholder:text-gray-500

          rounded-xl

          focus:outline-none
          focus:ring-2
          focus:ring-blue-500

          transition-colors
          duration-300
        "
               />

          </div>
     );
}

export default SearchBar;