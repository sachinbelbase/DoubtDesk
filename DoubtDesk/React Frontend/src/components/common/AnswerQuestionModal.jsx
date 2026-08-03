import { useState } from "react";

import Modal from "./Modal";
import TextArea from "./TextArea";
import Button from "./Button";

import { createAnswer } from "../../api/answerService";

function AnswerQuestionModal({
     question,
     onClose,
     onSuccess,
}) {

     const [answerText, setAnswerText] = useState("");
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState("");

     const handleSubmit = async (e) => {

          e.preventDefault();

          if (!answerText.trim()) {
               setError("Answer is required.");
               return;
          }

          try {

               setLoading(true);

               await createAnswer({
                    question_id: question.question_id,
                    answer_text: answerText,
               });

               await onSuccess?.();

               onClose();

          } catch (err) {

               console.error(err);

               setError(
                    err.response?.data?.detail ||
                    "Failed to submit answer."
               );

          } finally {

               setLoading(false);

          }

     };

     return (

          <Modal
               isOpen={true}
               onClose={onClose}
               title="Answer Question"
          >

               <div className="space-y-6">

                    <div>

                         <h3 className="text-xl font-semibold">
                              {question.title}
                         </h3>

                         <p className="text-gray-600 mt-2 whitespace-pre-line">
                              {question.question_text}
                         </p>

                    </div>

                    {error && (

                         <div className="rounded-lg border border-red-300 bg-red-100 px-4 py-3 text-red-700">

                              {error}

                         </div>

                    )}

                    <form
                         onSubmit={handleSubmit}
                         className="space-y-6"
                    >

                         <TextArea
                              label="Your Answer"
                              rows={8}
                              value={answerText}
                              onChange={(e) => {
                                   setAnswerText(e.target.value);
                                   setError("");
                              }}
                              placeholder="Write your answer..."
                              required
                         />

                         <div className="flex justify-end gap-3">

                              <Button
                                   type="button"
                                   variant="secondary"
                                   onClick={onClose}
                              >
                                   Cancel
                              </Button>

                              <Button
                                   type="submit"
                                   disabled={loading}
                              >
                                   {loading
                                        ? "Submitting..."
                                        : "Submit Answer"}
                              </Button>

                         </div>

                    </form>

               </div>

          </Modal>

     );
}

export default AnswerQuestionModal;