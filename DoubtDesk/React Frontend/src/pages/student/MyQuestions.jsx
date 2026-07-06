import DashboardLayout from "../../components/layout/DashboardLayout";
import QuestionFeed from "../../components/student/QuestionFeed";
import { useMyQuestions } from "../../hooks/useMyQuestions";

function MyQuestions() {

     const { myQuestions } = useMyQuestions();

     return (
          <DashboardLayout role="student">

               <div className="mb-6">

                    <h1 className="text-3xl font-bold">
                         My Questions
                    </h1>

                    <p className="text-gray-500 mt-2">
                         Questions you've asked, all in one place.
                    </p>

               </div>

               <QuestionFeed
                    questions={myQuestions}
                    title="Your Questions"
                    emptyMessage="You haven't asked any questions yet."
               />

          </DashboardLayout>
     );
}

export default MyQuestions;
