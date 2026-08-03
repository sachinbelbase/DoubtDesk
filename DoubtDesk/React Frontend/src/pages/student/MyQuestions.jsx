import { useEffect, useState } from "react";
import { getMyQuestions, deleteQuestion } from "../../api/questionService";
import ConfirmModal from "../../components/common/ConfirmModal";
import EditQuestionModal from "../../components/student/EditQuestionModal";
import DashboardLayout from "../../components/layout/DashboardLayout";
import QuestionFeed from "../../components/student/QuestionFeed";
import ViewAnswersModal from "../../components/student/ViewAnswersModal";

function MyQuestions() {

     const [questions, setQuestions] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState("");

     const [editingQuestion, setEditingQuestion] = useState(null);
     const [viewingQuestion, setViewingQuestion] = useState(null);
     const [deletingQuestion, setDeletingQuestion] = useState(null);
     const [deleting, setDeleting] = useState(false);

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

     const handleViewAnswers = (question) => {
          setViewingQuestion(question);
     };


     const handleEdit = (question) => {
          setEditingQuestion(question);
     };

     const handleDelete = (question) => {
          setDeletingQuestion(question);
     };

     const confirmDelete = async () => {

          try {

               setDeleting(true);

               await deleteQuestion(deletingQuestion.question_id);

               setDeletingQuestion(null);

               await fetchQuestions();

          } catch (err) {

               console.error(err);

               alert(
                    err.response?.data?.detail ||
                    "Failed to delete question."
               );

          } finally {

               setDeleting(false);

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
                    showViewAnswers={true}
                    onViewAnswers={handleViewAnswers}
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

               {viewingQuestion && (
                    <ViewAnswersModal
                         question={viewingQuestion}
                         onClose={() => setViewingQuestion(null)}
                    />
               )}

               {deletingQuestion && (
                    <ConfirmModal
                         isOpen={true}
                         title="Delete Question"
                         message="Are you sure you want to delete this question? This action cannot be undone."
                         confirmText="Delete"
                         cancelText="Cancel"
                         loading={deleting}
                         onClose={() => setDeletingQuestion(null)}
                         onConfirm={confirmDelete}
                    />
               )}

          </DashboardLayout>
     );
}

export default MyQuestions;
