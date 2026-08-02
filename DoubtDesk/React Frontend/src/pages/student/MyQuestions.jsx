import { useEffect, useState } from "react";
import { getMyQuestions, deleteQuestion } from "../../api/questionService";
import EditQuestionModal from "../../components/student/EditQuestionModal";
import DashboardLayout from "../../components/layout/DashboardLayout";
import QuestionFeed from "../../components/student/QuestionFeed";

function MyQuestions() {

     const [questions, setQuestions] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState("");

     const [editingQuestion, setEditingQuestion] = useState(null);

     const fetchQuestions = async () => {
          try {
               setLoading(true);
               setError("");

               const response = await getMyQuestions();

               setQuestions(response.data);

          } catch (err) {
               console.error(err);

               setError(
                    err.response?.data?.detail ||
                    "Failed to load questions."
               );
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchQuestions();
     }, []);

     const handleEdit = (question) => {
          setEditingQuestion(question);
     };

     const handleDelete = async (question) => {
          const confirmed = window.confirm(
               `Delete "${question.title}"?\n\nThis action cannot be undone.`
          );

          if (!confirmed) return;

          try {
               await deleteQuestion(question.question_id);

               fetchQuestions();
          } catch (err) {
               console.error(err);

               alert(
                    err.response?.data?.detail ||
                    "Failed to delete question."
               );
          }
     };

     if (loading) {
          return (
               <DashboardLayout role="student">
                    <p>Loading...</p>
               </DashboardLayout>
          );
     }

     if (error) {
          return (
               <DashboardLayout role="student">
                    <p className="text-red-600">{error}</p>
               </DashboardLayout>
          );
     }

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
                    questions={questions}
                    title="Your Questions"
                    emptyMessage="You haven't asked any questions yet."
                    showActions={true}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
               />
               {editingQuestion && (
                    <EditQuestionModal
                         question={editingQuestion}
                         onClose={() => setEditingQuestion(null)}
                         onSuccess={fetchQuestions}
                         
                    />
               )}

          </DashboardLayout>
     );
}

export default MyQuestions;
