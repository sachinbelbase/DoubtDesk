import { Link } from "react-router-dom";
import { MessageCircleQuestion, LogIn, UserPlus } from "lucide-react";


function Home() {

     return (

          <div
               className="
               min-h-screen
               flex
               items-center
               justify-center

               bg-gray-50
               dark:bg-gray-950

               transition-colors
               duration-300
               "
          >

               <div
                    className="
                    max-w-md
                    w-full

                    bg-white
                    dark:bg-gray-900

                    rounded-2xl

                    shadow-lg

                    p-8

                    text-center
                    "
               >

                    {/* Logo */}

                    <div
                         className="
                         w-16
                         h-16

                         mx-auto
                         mb-5

                         rounded-2xl

                         bg-blue-600

                         flex
                         items-center
                         justify-center

                         text-white
                         "
                    >
                         <MessageCircleQuestion size={32} />
                    </div>



                    {/* Title */}

                    <h1
                         className="
                         text-3xl
                         font-bold

                         text-gray-900
                         dark:text-white

                         mb-3
                         "
                    >
                         DoubtDesk
                    </h1>


                    <p
                         className="
                         text-gray-600
                         dark:text-gray-400

                         mb-8
                         "
                    >
                         Anonymous learning platform where students
                         can ask questions and get help.
                    </p>



                    {/* Buttons */}

                    <div className="space-y-4">


                         <Link
                              to="/login"

                              className="
                              flex
                              items-center
                              justify-center
                              gap-2

                              w-full

                              py-3

                              rounded-xl

                              bg-blue-600
                              hover:bg-blue-700

                              text-white

                              font-semibold

                              transition
                              "
                         >

                              <LogIn size={20} />

                              Login

                         </Link>



                         <Link
                              to="/register"

                              className="
                              flex
                              items-center
                              justify-center
                              gap-2

                              w-full

                              py-3

                              rounded-xl

                              border

                              border-blue-600

                              text-blue-600

                              dark:text-blue-400

                              hover:bg-blue-50

                              dark:hover:bg-gray-800

                              font-semibold

                              transition
                              "
                         >

                              <UserPlus size={20} />

                              Create Account

                         </Link>


                    </div>


               </div>


          </div>

     );
}


export default Home;