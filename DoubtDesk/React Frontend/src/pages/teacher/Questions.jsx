import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import QuestionFeed from "../../components/student/QuestionFeed";

import { getQuestions } from "../../api/questionService";

function Questions() {
     const [questions, setQuestions] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState("");

     useEffect(() => {
          const fetchQuestions = async () => {
               try {
                    const response = await getQuestions();

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

          fetchQuestions();
     }, []);

     if (loading) {
          return (
               <DashboardLayout role="teacher">
                    <p>Loading...</p>
               </DashboardLayout>
          );
     }

     if (error) {
          return (
               <DashboardLayout role="teacher">
                    <p className="text-red-600">{error}</p>
               </DashboardLayout>
          );
     }

     return (
          <DashboardLayout role="teacher">

               <div className="mb-6">
                    <h1 className="text-3xl font-bold">
                         Student Questions
                    </h1>

                    <p className="text-gray-500 mt-2">
                         Browse and answer students' questions.
                    </p>
               </div>

               <QuestionFeed
                    questions={questions}
                    title="All Questions"
                    emptyMessage="No questions available."
               />

          </DashboardLayout>
     );
}

export default Questions;