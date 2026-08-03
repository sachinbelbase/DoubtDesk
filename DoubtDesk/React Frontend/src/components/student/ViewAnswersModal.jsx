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

                    <div className="border rounded-xl p-5 bg-white">

                         <h2 className="text-xl font-semibold">
                              {question.title}
                         </h2>

                         <p className="mt-3 text-gray-600 whitespace-pre-line">
                              {question.question_text}
                         </p>

                    </div>

                    <div>

                         <h3 className="text-lg font-semibold mb-4">
                              Answers
                         </h3>

                         {loading ? (
                              <p>Loading answers...</p>
                         ) : error ? (
                              <p className="text-red-600">{error}</p>
                         ) : (
                              <AnswerList answers={answers} />
                         )}

                    </div>

               </div>
          </Modal>
     );
}

export default ViewAnswersModal;