const Input = ({ label, placeholder, type = "text", value, onChange }) => {

     return (
          <div>
               <label>
                    {label}
               </label>

               <input type={type} value={value} onChange={onChange} placeholder={placeholder} className="w-full border p-3 rounded-xl outline-none"
               />
          </div>
     )
}

export default Input;