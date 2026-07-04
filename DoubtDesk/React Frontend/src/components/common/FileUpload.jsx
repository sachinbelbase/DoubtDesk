function Checkbox({
     label,
     name,
     checked,
     onChange,
}) {
     return (
          <label className="flex items-center gap-3 cursor-pointer">
               <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    className="h-4 w-4"
               />

               <span className="text-gray-700">
                    {label}
               </span>
          </label>
     );
}

export default Checkbox;