import { useState } from "react";

import Card from "../common/Card";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import Select from "../common/Select";
import Checkbox from "../common/Checkbox";
import FileUpload from "../common/FileUpload";
import Button from "../common/Button";

import { categories } from "../../data/categories";
import { difficulties } from "../../data/difficulties";
import { useAuth } from "../../hooks/useAuth";
import { useMyQuestions } from "../../hooks/useMyQuestions";

function AskQuestionForm() {

     const { user } = useAuth();
     const { addQuestion } = useMyQuestions();

     // Initial Form Values
     const initialFormData = {
          title: "",
          description: "",
          category: "",
          difficulty: "Easy",
          tags: "",
          anonymous: true,
          attachment: null,
     };

     // Form Data State
     const [formData, setFormData] = useState(initialFormData);

     // Validation Errors
     const [errors, setErrors] = useState({});

     // Success Message
     const [successMessage, setSuccessMessage] = useState("");

     // Handle Input Changes
     const handleChange = (e) => {
          const { name, value, type, checked, files } = e.target;

          setFormData((prev) => ({
               ...prev,
               [name]:
                    type === "checkbox"
                         ? checked
                         : type === "file"
                              ? files[0]
                              : value,
          }));

          // Clear error when user starts typing
          setErrors((prev) => ({
               ...prev,
               [name]: "",
          }));
     };

     // Validate Form
     const validateForm = () => {

          const newErrors = {};

          if (!formData.title.trim()) {
               newErrors.title = "Question title is required.";
          }

          if (!formData.description.trim()) {
               newErrors.description = "Description is required.";
          }

          if (!formData.category) {
               newErrors.category = "Please select a category.";
          }

          setErrors(newErrors);

          return Object.keys(newErrors).length === 0;
     };

     // Reset Form
     const resetForm = () => {
          setFormData(initialFormData);
          setErrors({});
          setSuccessMessage("");
     };

     // Handle Submit
     const handleSubmit = (e) => {
          e.preventDefault();

          if (!validateForm()) return;

          const newQuestion = {
               id: Date.now(),
               title: formData.title,
               description: formData.description,
               category: formData.category,
               author: formData.anonymous ? "Anonymous" : (user?.name || "Anonymous"),
               answers: 0,
               views: 0,
               time: "Just now",
          };

          addQuestion(newQuestion);

          setSuccessMessage("Question submitted successfully!");

          setFormData(initialFormData);

          setErrors({});
     };

     return (
          <Card>

               <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
               >

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
                         label="Description"
                         name="description"
                         rows={6}
                         placeholder="Explain your question clearly..."
                         value={formData.description}
                         onChange={handleChange}
                         error={errors.description}
                         required
                    />

                    {/* Category & Difficulty */}

                    <div className="grid md:grid-cols-2 gap-5">

                         <Select
                              label="Category"
                              name="category"
                              value={formData.category}
                              onChange={handleChange}
                              options={categories}
                              placeholder="Select Category"
                              error={errors.category}
                              required
                         />

                         <Select
                              label="Difficulty"
                              name="difficulty"
                              value={formData.difficulty}
                              onChange={handleChange}
                              options={difficulties}
                              placeholder="Select Difficulty"
                         />

                    </div>

                    {/* Tags */}

                    <Input
                         label="Tags"
                         name="tags"
                         type="text"
                         placeholder="React, JavaScript, CSS..."
                         value={formData.tags}
                         onChange={handleChange}
                    />

                    {/* File Upload */}

                    <FileUpload
                         label="Attachment (Optional)"
                         name="attachment"
                         onChange={handleChange}
                    />

                    {/* Anonymous */}

                    <Checkbox
                         label="Post Anonymously"
                         name="anonymous"
                         checked={formData.anonymous}
                         onChange={handleChange}
                    />

                    {/* Buttons */}

                    <div className="flex justify-end gap-4">

                         <Button
                              type="button"
                              variant="secondary"
                              onClick={resetForm}
                         >
                              Cancel
                         </Button>

                         <Button
                              type="submit"
                              variant="primary"
                         >
                              Submit Question
                         </Button>

                    </div>

               </form>

          </Card>
     );
}

export default AskQuestionForm;
