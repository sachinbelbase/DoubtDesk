import { useState } from "react";
import TextArea from "../common/TextArea";
import Button from "../common/Button";
import { useAuth } from "../../hooks/useAuth";
import { useAnswers } from "../../hooks/useAnswers";

function AnswerForm({ questionId }) {

     const { user } = useAuth();
     const { addAnswer, getAnswersForQuestion } = useAnswers();

     const [text, setText] = useState("");
     const [error, setError] = useState("");

     const existingAnswers = getAnswersForQuestion(questionId);

     const handleChange = (e) => {
          setText(e.target.value);
          setError("");
     };

     const handleSubmit = (e) => {
          e.preventDefault();

          if (!text.trim()) {
               setError("Write an answer before submitting.");
               return;
          }

          addAnswer(questionId, text.trim(), user?.name);
          setText("");
          setError("");
     };

     return (
          <div className="mt-4 space-y-4">

               {existingAnswers.length > 0 && (
                    <div className="space-y-3">

                         {existingAnswers.map((answer) => (
                              <div
                                   key={answer.id}
                                   className="bg-blue-50 rounded-lg p-4"
                              >
                                   <p className="text-gray-800">
                                        {answer.text}
                                   </p>

                                   <p className="text-sm text-gray-500 mt-2">
                                        — {answer.teacherName}, {answer.time}
                                   </p>
                              </div>
                         ))}

                    </div>
               )}

               <form onSubmit={handleSubmit} className="space-y-3">

                    <TextArea
                         name="answer"
                         rows={3}
                         placeholder="Write your answer..."
                         value={text}
                         onChange={handleChange}
                         error={error}
                    />

                    <div className="flex justify-end">
                         <Button type="submit" size="sm">
                              Post Answer
                         </Button>
                    </div>

               </form>

          </div>
     );
}

export default AnswerForm;
