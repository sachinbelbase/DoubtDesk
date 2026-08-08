import { useState } from "react";
import TextArea from "../common/TextArea";
import Button from "../common/Button";
import { createAnswer } from "../../api/answerService";

function AnswerForm({ questionId, onSuccess }) {
     const [text, setText] = useState("");
     const [error, setError] = useState("");
     const [loading, setLoading] = useState(false);

     const handleChange = (e) => {
          setText(e.target.value);
          setError("");
     };

     const handleSubmit = async (e) => {
          e.preventDefault();

          if (!text.trim()) {
               setError("Answer cannot be empty.");
               return;
          }

          try {
               setLoading(true);

               await createAnswer({
                    question_id: questionId,
                    answer_text: text,
               });

               setText("");

               if (onSuccess) {
                    onSuccess();
               }
          } catch (err) {
               console.error(err);
               setError(
                    err.response?.data?.detail ||
                    "Failed to post answer."
               );
          } finally {
               setLoading(false);
          }
     };

     return (
          <form onSubmit={handleSubmit} className="space-y-3 mt-6 dark:bg-gray-900">
               <TextArea
                    name="answer"
                    rows={4}
                    placeholder="Write your answer..."
                    value={text}
                    onChange={handleChange}
                    error={error}
               />

               <div className="flex justify-end dark:bg-gray-950">
                    <Button type="submit" disabled={loading}>
                         {loading ? "Posting..." : "Post Answer"}
                    </Button>
               </div>
          </form>
     );
}

export default AnswerForm;