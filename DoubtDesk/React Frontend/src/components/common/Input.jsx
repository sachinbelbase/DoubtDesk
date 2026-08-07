function Input({
     label,
     type = "text",
     name,
     value = "",
     onChange,
     placeholder,
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

               <input
                    id={name}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`
          w-full
          rounded-xl
          border
          border-gray-300
          dark:border-gray-700
          px-4
          pr-10
          py-3
          text-sm
          bg-white
          dark:bg-gray-800
          text-gray-900
          dark:text-gray-100
          placeholder:text-gray-400
          dark:placeholder:text-gray-500
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
               />

               {error && (
                    <p className="text-sm text-red-500">
                         {error}
                    </p>
               )}

          </div>
     );
}

export default Input;