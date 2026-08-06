import { useAuth } from "../../hooks/useAuth";

const WelcomeBanner = () => {
     const { user } = useAuth();

     const role = user?.role;

     let defaultName = "Student";
     let message = "Ready to ask or explore another doubt today?";

     if (role === "teacher") {
          defaultName = "Teacher";
          message = "Help students by answering their questions today.";
     }

     if (role === "admin") {
          defaultName = "Admin";
          message = "Manage users, teachers, and questions efficiently.";
     }

     return (
          <section className="bg-blue-500 text-white rounded-2xl px-8 py-5 mb-6">

               <div className="flex items-center justify-between">

                    <div>
                         <h1 className="text-2xl font-bold">
                              Welcome back, {user?.name || defaultName}!
                         </h1>

                         <p className="text-blue-100 mt-1">
                              {message}
                         </p>
                    </div>

               </div>

          </section>
     );
};

export default WelcomeBanner;