const Card = ({ children }) => {
     return (
          <div
               className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">

               {children}

          </div>
     )
}
export default Card;