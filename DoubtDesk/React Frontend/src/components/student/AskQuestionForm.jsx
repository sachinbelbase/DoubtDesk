import { useState } from "react";

import Card from "../common/Card";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import Select from "../common/Select";
import Button from "../common/Button";

import { createQuestion } from "../../api/questionService";

function AskQuestionForm() {

     // Initial Form Values
     const initialFormData = {
          title: "",
          question_text: "",
          visibility: "CLASS",
     };

     const [formData, setFormData] = useState(initialFormData);

     const [errors, setErrors] = useState({});

     const [loading, setLoading] = useState(false);

     const [successMessage, setSuccessMessage] = useState("");

     const [serverError, setServerError] = useState("");

     // Handle Input Changes
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

     // Validate Form
     const validateForm = () => {
          const newErrors = {};

          if (!formData.title.trim()) {
               newErrors.title = "Question title is required.";
          }

          if (!formData.question_text.trim()) {
               newErrors.question_text = "Description is required.";
          }

          setErrors(newErrors);

          return Object.keys(newErrors).length === 0;
     };

     // Reset Form
     const resetForm = () => {
          setFormData(initialFormData);
          setErrors({});
          setSuccessMessage("");
          setServerError("");
     };

     // Handle Submit
     const handleSubmit = async (e) => {
          e.preventDefault();

          if (!validateForm()) return;

          setLoading(true);
          setServerError("");
          setSuccessMessage("");

          try {
               const response = await createQuestion(formData);

               setSuccessMessage(response.data.message);

               setFormData(initialFormData);
               setErrors({});
          } catch (error) {
               console.error(error);

               setServerError(
                    error.response?.data?.detail || "Failed to submit question."
               );
          } finally {
               setLoading(false);
          }
     };

     return (
          <Card>

               <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
               >

                    {/* Backend Error */}

                    {serverError && (
                         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                              {serverError}
                         </div>
                    )}

                    {/* Success Message */}

                    {successMessage && (
                         <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                              {successMessage}
                         </div>
                    )}

                    {/* Question Title */}

                    <Input
                         label="Question Title"
                         name="title"
                         type="text"
                         placeholder="Enter your question title..."
                         value={formData.title}
                         onChange={handleChange}
                         error={errors.title}
                         required
                    />

                    {/* Description */}

                    <TextArea
                         label="Question Description"
                         name="question_text"
                         rows={6}
                         placeholder="Describe your question clearly..."
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
                         required
                    />
 
                    {/* Buttons */}

                    <div className="flex justify-end gap-4">

                         <Button
                              type="button"
                              variant="secondary"
                              onClick={resetForm}
                              disabled={loading}
                         >
                              Cancel
                         </Button>

                         <Button
                              type="submit"
                              variant="primary"
                              disabled={loading}
                         >
                              {loading ? "Submitting..." : "Submit Question"}
                         </Button>

                    </div>

               </form>

          </Card>
     );
}

export default AskQuestionForm;
