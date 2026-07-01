const TextArea = ({ label, placeholder }) => {

     return (
          <div>
               <label>{label}</label>
               <textarea
                    placeholder={placeholder}
                    className="w-full border rounded-xl p-3 h-32"
               />
          </div>
     )
}

export default TextArea;