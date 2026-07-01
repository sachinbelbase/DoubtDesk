const Select = ({ options }) => {

     return (
          <select
               className="border p-3 rounded-xl w-full">
               {
                    options.map(item =>
                         <option key={item}>
                              {item}
                         </option>
                    )
               }
          </select>
     )
}

export default Select;