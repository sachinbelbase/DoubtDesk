const Button = ({ children, variant = "primary", onClick }) => {
     return (
          <button
               onClick={onClick}
               className={`
               px-5 py-2 rounded-xl font-medium
               ${variant === "primary" ? "bg-blue-600 text-white" : "border text-blue-600"}
               `}>
               {children}
          </button>
     )
}

export default Button;