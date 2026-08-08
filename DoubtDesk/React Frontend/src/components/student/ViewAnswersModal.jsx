import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import AnswerList from "./AnswerList";
import { getAnswers } from "../../api/answerService";

function ViewAnswersModal({ question, onClose }) {
     const [answers, setAnswers] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState("");

     useEffect(() => {
          const fetchAnswers = async () => {
               try {
                    setLoading(true);

                    const response = await getAnswers(question.question_id);

                    setAnswers(response.data);
               } catch (err) {
                    console.error(err);

                    setError(
                         err.response?.data?.detail ||
                         "Failed to load answers."
                    );
               } finally {
                    setLoading(false);
               }
          };

          fetchAnswers();
     }, [question.question_id]);

     return (
          <Modal
               isOpen={true}
               onClose={onClose}
               title="Question & Answers"
          >
               <div className="space-y-6">

                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 bg-white dark:bg-gray-900">

                         <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                              {question.title}
                         </h2>

                         <p className="mt-3 text-gray-600 dark:text-gray-300 whitespace-pre-line">
                              {question.question_text}
                         </p>

                    </div>

                    <div>

                         <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                              Answers
                         </h3>

                         {loading ? (
                              <p className="text-gray-600 dark:text-gray-300">Loading answers...</p>
                         ) : error ? (
                              <p className="text-red-600 dark:text-red-400">{error}</p>
                         ) : (
                              <AnswerList answers={answers} />
                         )}

                    </div>

               </div>
          </Modal>
     );
}

export default ViewAnswersModal;