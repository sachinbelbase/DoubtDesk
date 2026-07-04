function Select({
     label,
     name,
     value,
     onChange,
     options = [],
     placeholder = "Select an option",
     error,
     required = false,
}) {
     return (
          <div className="space-y-2">

               {label && (
                    <label
                         htmlFor={name}
                         className="block text-sm font-semibold text-gray-700"
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
          rounded-lg
          border
          px-4
          py-3
          outline-none
          transition
          ${error
                              ? "border-red-500 focus:ring-2 focus:ring-red-400"
                              : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                         }
        `}
               >
                    <option value="">{placeholder}</option>

                    {options.map((option) => {
                         if (typeof option === "object") {
                              return (
                                   <option
                                        key={option.id}
                                        value={option.name}
                                   >
                                        {option.name}
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