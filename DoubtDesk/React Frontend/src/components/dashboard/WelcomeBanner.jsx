import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../common/Button";


const WelcomeBanner = () => {
     const navigate = useNavigate();
     const { user } = useAuth();

     return (
          <section className="bg-blue-600 text-white rounded-2xl px-8 py-5 mb-6">

               <div className="flex items-center justify-between">

                    <div>
                         <h1 className="text-2xl font-bold">
                              Welcome back, {user?.name || "Student"}!
                         </h1>

                         <p className="text-blue-100 mt-1">
                              Ready to solve another doubt today?
                         </p>
                    </div>

                    <Button onClick={() => navigate("/student/ask-question")}>
                         Ask Question
                    </Button>

               </div>

          </section>
     );
};

export default WelcomeBanner;