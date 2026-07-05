import { Link } from "react-router-dom";

function NotFound() {
     return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
               <h1 className="text-6xl font-bold text-blue-600">404</h1>
               <p className="text-xl text-gray-700 mt-4">
                    This page doesn't exist.
               </p>
               <p className="text-gray-500 mt-2">
                    Check the URL, or head back to a page that does.
               </p>
               <Link
                    to="/"
                    className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
               >
                    Back to Home
               </Link>
          </div>
     );
}

export default NotFound;
