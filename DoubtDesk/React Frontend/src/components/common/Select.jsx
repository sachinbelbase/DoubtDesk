function Select({
     label,
     name,
     value = "",
     onChange,
     options = [],
     placeholder = "Select an option",
     error,
     required = false,
     className = "",
}) {
     return (
          <div className="space-y-2">

               {label && (
                    <label
                         htmlFor={name}
                         className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                         {label}
                         {required && <span className="text-red-500"> *</span>}
                    </label>
               )}

               <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`
          w-full
          rounded-xl
          border
          border-gray-300
          dark:border-gray-700
          px-4
          py-3
          text-sm
          bg-white
          dark:bg-gray-800
          text-gray-900
          dark:text-gray-100
          outline-none
          transition-all
          duration-200
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
          dark:focus:ring-blue-900
          ${error
                              ? "border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-900"
                              : ""
                         }
          ${className}
        `}
               >
                    <option value="">{placeholder}</option>

                    {options.map((option) => {
                         if (typeof option === "object") {
                              return (
                                   <option
                                        key={option.id ?? option.value}
                                        value={option.value ?? option.name}
                                   >
                                        {option.label ?? option.name}
                                   </option>
                              );
                         }

                         return (
                              <option
                                   key={option}
                                   value={option}
                              >
                                   {option}
                              </option>
                         );
                    })}
               </select>

               {error && (
                    <p className="text-sm text-red-500">
                         {error}
                    </p>
               )}

          </div>
     );
}

export default Select;