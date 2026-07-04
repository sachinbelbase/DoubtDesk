function Button({
     children,
     type = "button",
     variant = "primary",
     size = "md",
     onClick,
     disabled = false,
     className = "",
}) {
     const variants = {
          primary: "bg-blue-600 text-white hover:bg-blue-700",
          secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
          outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
          danger: "bg-red-600 text-white hover:bg-red-700",
     };

     const sizes = {
          sm: "px-3 py-2 text-sm",
          md: "px-5 py-2.5",
          lg: "px-6 py-3 text-lg",
     };

     return (
          <button
               type={type}
               onClick={onClick}
               disabled={disabled}
               className={`
        rounded-lg
        font-medium
        transition
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
          >
               {children}
          </button>
     );
}

export default Button;