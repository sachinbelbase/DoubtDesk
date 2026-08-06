import { Search } from "lucide-react";

function SearchBar({
     placeholder,
     value,
     onChange,
}) {
     return (
          <div className="relative w-full">

               <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
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
                              border
                              rounded-xl
                              focus:outline-none
                              focus:ring-2
                              focus:ring-blue-500
                              bg-white
                         "
               />
               

          </div>
     );
}

export default SearchBar;