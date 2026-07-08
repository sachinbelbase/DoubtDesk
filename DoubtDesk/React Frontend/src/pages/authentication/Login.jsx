import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";

import { useAuth } from "../../hooks/useAuth";
import { users } from "../../data/users";
import { ROLES } from "../../constants/roles";

function Login() {
     const [formData, setFormData] = useState({
          name: "",
          role: ROLES.STUDENT,
     });

     const [error, setError] = useState("");

     const { login } = useAuth();
     const navigate = useNavigate();

     const handleChange = (e) => {
          setFormData((prev) => ({
               ...prev,
               [e.target.name]: e.target.value,
          }));

          setError("");
     };

     const handleSubmit = (e) => {
          e.preventDefault();

          if (!formData.name.trim()) {
               setError("Please enter your name.");
               return;
          }

          // Mock login using users.js
          const matchedUser =
               users.find(
                    (u) =>
                         u.name.toLowerCase() === formData.name.trim().toLowerCase() &&
                         u.role.toLowerCase() === formData.role.toLowerCase()
               ) || {
                    id: Date.now(),
                    name: formData.name,
                    role: formData.role,
               };

          // Normalize role
          const userData = {
               ...matchedUser,
               role: matchedUser.role.toLowerCase(),
          };

          login(userData);

          navigate(`/${userData.role}/dashboard`);
     };

     return (
          <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
               <div className="w-full max-w-md">
                    <Card>
                         <h1 className="text-2xl font-bold text-center mb-1">
                              Welcome Back
                         </h1>

                         <p className="text-gray-500 text-center mb-6">
                              Log in to DoubtDesk
                         </p>

                         <form onSubmit={handleSubmit} className="space-y-5">
                              <Input
                                   label="Name"
                                   name="name"
                                   value={formData.name}
                                   onChange={handleChange}
                                   placeholder="e.g. Anonymous Student"
                                   error={error}
                                   required
                              />

                              <Select
                                   label="Login as"
                                   name="role"
                                   value={formData.role}
                                   onChange={handleChange}
                                   options={[
                                        ROLES.STUDENT,
                                        ROLES.TEACHER,
                                        ROLES.ADMIN,
                                   ]}
                                   placeholder="Select role"
                              />

                              <Button type="submit" className="w-full">
                                   Log In
                              </Button>
                         </form>

                         <p className="text-center text-sm text-gray-500 mt-5">
                              Don't have an account?{" "}
                              <Link
                                   to="/register"
                                   className="text-blue-600 font-semibold hover:underline"
                              >
                                   Sign up
                              </Link>
                         </p>
                    </Card>
               </div>
          </div>
     );
}

export default Login;