import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
     registerStudentRequest,
     registerTeacherRequest,
} from "../../api/authService";

import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";

import { ROLES } from "../../constants/roles";

function Register() {
     const [formData, setFormData] = useState({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: ROLES.STUDENT,

          // Student
          program: "",
          semester: "",
          section: "",

          // Teacher
          department: "",
     });
     const [errors, setErrors] = useState({});

     const navigate = useNavigate();

     const handleChange = (e) => {
          setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
          setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
     };

     const validate = () => {
          const newErrors = {};

          if (!formData.name.trim()) {
               newErrors.name = "Name is required.";
          }

          if (!formData.email.trim()) {
               newErrors.email = "Email is required.";
          } else if (!formData.email.endsWith("@ncit.edu.np")) {
               newErrors.email = "Use your NCIT email.";
          }

          if (!formData.password) {
               newErrors.password = "Password is required.";
          } else if (formData.password.length < 8) {
               newErrors.password = "Password must be at least 8 characters.";
          }

          if (formData.password !== formData.confirmPassword) {
               newErrors.confirmPassword = "Passwords do not match.";
          }

          if (formData.role === ROLES.STUDENT) {

               if (!formData.program)
                    newErrors.program = "Select program.";

               if (!formData.semester)
                    newErrors.semester = "Select semester.";

               if (!formData.section)
                    newErrors.section = "Select your class.";
          }

          if (formData.role === ROLES.TEACHER) {

               if (!formData.department.trim())
                    newErrors.department = "Department is required.";
          }

          setErrors(newErrors);

          return Object.keys(newErrors).length === 0;
     };

     const handleSubmit = async (e) => {
          e.preventDefault();

          if (!validate()) return;

          try {
               if (formData.role === ROLES.STUDENT) {
                    await registerStudentRequest({
                         name: formData.name,
                         email: formData.email,
                         password: formData.password,
                         program: formData.program,
                         semester: Number(formData.semester),
                         section: formData.section,
                    });
               } else if (formData.role === ROLES.TEACHER) {
                    await registerTeacherRequest({
                         name: formData.name,
                         email: formData.email,
                         password: formData.password,
                         department: formData.department,
                    });
               }

               alert("Registration successful! Please login.");

               navigate("/login");

          } catch (error) {
               console.error(error);

               alert(
                    error.response?.data?.detail ||
                    "Registration failed."
               );
          }
     };

     return (
          <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4">
               <div className="w-full max-w-md">
                    <Card>
                         <h1 className="text-2xl font-bold text-center mb-1 text-gray-900 dark:text-white">
                              Create Account
                         </h1>
                         <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
                              Join DoubtDesk to start asking and answering
                         </p>

                         <form onSubmit={handleSubmit} className="space-y-5">
                              <Input
                                   label="Full Name"
                                   name="name"
                                   value={formData.name}
                                   onChange={handleChange}
                                   placeholder="Your name"
                                   error={errors.name}
                                   required
                              />

                              <Input
                                   label="Email"
                                   name="email"
                                   type="email"
                                   value={formData.email}
                                   onChange={handleChange}
                                   placeholder="you@example.com"
                                   error={errors.email}
                                   required
                              />

                              <Input
                                   label="Password"
                                   type="password"
                                   name="password"
                                   value={formData.password}
                                   onChange={handleChange}
                                   error={errors.password}
                                   required
                              />

                              <Input
                                   label="Confirm Password"
                                   type="password"
                                   name="confirmPassword"
                                   value={formData.confirmPassword}
                                   onChange={handleChange}
                                   error={errors.confirmPassword}
                                   required
                              />

                              <Select
                                   label="I am a"
                                   name="role"
                                   value={formData.role}
                                   onChange={handleChange}
                                   options={[ROLES.STUDENT, ROLES.TEACHER, /*ROLES.ADMIN*/]}
                                   placeholder="Select role"
                              />

                              {formData.role === ROLES.STUDENT && (
                                   <>
                                        <Select
                                             label="Program"
                                             name="program"
                                             value={formData.program}
                                             onChange={handleChange}
                                             options={[
                                                  "BCA",
                                                  "BSc CSIT",
                                                  "BIT",
                                                  "BIM",
                                             ]}
                                             error={errors.program}
                                        />

                                        <Select
                                             label="Semester"
                                             name="semester"
                                             value={formData.semester}
                                             onChange={handleChange}
                                             options={[
                                                  1,
                                                  2,
                                                  3,
                                                  4,
                                                  5,
                                                  6,
                                                  7,
                                                  8,
                                             ]}
                                             error={errors.semester}
                                        />

                                        <Select
                                             label="Class"
                                             name="section"
                                             value={formData.section}
                                             onChange={handleChange}
                                             options={[
                                                  "Morning",
                                                  "Day",
                                             ]}
                                             error={errors.section}
                                        />
                                   </>
                              )}


                              {formData.role === ROLES.TEACHER && (
                                   <Input
                                        label="Department"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        error={errors.department}
                                        required
                                   />
                              )}

                              <Button type="submit" className="w-full">
                                   Sign Up
                              </Button>
                         </form>

                         <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-5">
                              Already have an account?{" "}
                              <Link to="/login" className="text-blue-600 dark:text-blue-400 font-semibold">
                                   Log in
                              </Link>
                         </p>
                    </Card>
               </div>
          </div>
     );
}

export default Register;