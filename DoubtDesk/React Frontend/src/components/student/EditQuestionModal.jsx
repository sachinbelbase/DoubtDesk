import { useEffect, useState } from "react";

import Card from "../common/Card";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import Select from "../common/Select";
import Button from "../common/Button";

import { updateQuestion } from "../../api/questionService";

function EditQuestionModal({
     question,
     onClose,
     onSuccess,
}) {
     const [formData, setFormData] = useState({
          title: "",
          question_text: "",
          visibility: "CLASS",
     });

     const [loading, setLoading] = useState(false);
     const [errors, setErrors] = useState({});
     const [serverError, setServerError] = useState("");

     useEffect(() => {
          if (question) {
               setFormData({
                    title: question.title,
                    question_text: question.question_text,
                    visibility: question.visibility,
               });
          }
     }, [question]);

     const handleChange = (e) => {
          const { name, value } = e.target;

          setFormData((prev) => ({
               ...prev,
               [name]: value,
          }));

          setErrors((prev) => ({
               ...prev,
               [name]: "",
          }));

          setServerError("");
     };

     const validate = () => {
          const newErrors = {};

          if (!formData.title.trim()) {
               newErrors.title = "Title is required.";
          }

          if (!formData.question_text.trim()) {
               newErrors.question_text = "Description is required.";
          }

          setErrors(newErrors);

          return Object.keys(newErrors).length === 0;
     };

     const handleSubmit = async (e) => {
          e.preventDefault();

          if (!validate()) return;

          setLoading(true);

          try {
               await updateQuestion(
                    question.question_id,
                    formData
               );

               onSuccess();

               onClose();

          } catch (error) {
               console.error(error);

               setServerError(
                    error.response?.data?.detail ||
                    "Failed to update question."
               );
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

               <div className="w-full max-w-2xl">

                    <Card>

                         <h2 className="text-2xl font-bold mb-6">
                              Edit Question
                         </h2>

                         {serverError && (
                              <div className="mb-4 rounded-lg border border-red-300 bg-red-100 px-4 py-3 text-red-700">
                                   {serverError}
                              </div>
                         )}

                         <form
                              onSubmit={handleSubmit}
                              className="space-y-5"
                         >

                              <Input
                                   label="Question Title"
                                   name="title"
                                   value={formData.title}
                                   onChange={handleChange}
                                   error={errors.title}
                                   required
                              />

                              <TextArea
                                   label="Question Description"
                                   name="question_text"
                                   rows={6}
                                   value={formData.question_text}
                                   onChange={handleChange}
                                   error={errors.question_text}
                                   required
                              />

                              <Select
                                   label="Visibility"
                                   name="visibility"
                                   value={formData.visibility}
                                   onChange={handleChange}
                                   options={[
                                        "CLASS",
                                        "COLLEGE",
                                   ]}
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
                                             ? "Saving..."
                                             : "Save Changes"}
                                   </Button>

                              </div>

                         </form>

                    </Card>

               </div>

          </div>
     );
}

export default EditQuestionModal;