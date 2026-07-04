import DashboardLayout from "../../components/layout/DashboardLayout";
import AskQuestionForm from "../../components/student/AskQuestionForm";

function AskQuestion() {
     return (
          <DashboardLayout role="student">

               <div className="mb-6">

                    <h1 className="text-3xl font-bold">
                         Ask a New Question
                    </h1>

                    <p className="text-gray-500 mt-2">
                         Ask your doubts anonymously and receive answers from teachers and students.
                    </p>

               </div>

               <AskQuestionForm />

          </DashboardLayout>
     );
}

export default AskQuestion;