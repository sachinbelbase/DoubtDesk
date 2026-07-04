function FileUpload({
     label,
     name,
     onChange,
}) {
     return (
          <div className="space-y-2">
               {label && (
                    <label
                         htmlFor={name}
                         className="block text-sm font-semibold text-gray-700"
                    >
                         {label}
                    </label>
               )}

               <input
                    id={name}
                    name={name}
                    type="file"
                    onChange={onChange}
                    className="
          w-full
          rounded-lg
          border
          border-gray-300
          p-3
        "
               />
          </div>
     );
}

export default FileUpload;