import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { useAuth } from "../../hooks/useAuth";
import { useNotifications } from "../../hooks/useNotifications";
import { loginUser } from "../../api/authService";

function Login() {

     const navigate = useNavigate();
     const { login } = useAuth();
     const { refreshNotifications } = useNotifications();

     const [formData, setFormData] = useState({
          email: "",
          password: "",
     });

     const [error, setError] = useState("");
     const [loading, setLoading] = useState(false);

     const handleChange = (e) => {
          setFormData((prev) => ({
               ...prev,
               [e.target.name]: e.target.value,
          }));

          setError("");
     };

     const handleSubmit = async (e) => {
          e.preventDefault();

          if (!formData.email.trim() || !formData.password.trim()) {
               setError("Please enter your email and password.");
               return;
          }

          try {
               setLoading(true);

               const authData = await loginUser({
                    email: formData.email,
                    password: formData.password,
               });

               login(authData);
               refreshNotifications();

               navigate(`/${authData.user.role}/dashboard`, {
                    replace: true,
               });
          } catch (err) {
               console.error(err);

               setError(
                    err.response?.data?.detail ||
                    err.message ||
                    "Login failed. Please try again."
               );
          } finally {
               setLoading(false);
          }
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
                                   label="NCIT Email"
                                   type="email"
                                   name="email"
                                   value={formData.email}
                                   onChange={handleChange}
                                   placeholder="yourname@ncit.edu.np"
                                   required
                              />

                              <Input
                                   label="Password"
                                   type="password"
                                   name="password"
                                   value={formData.password}
                                   onChange={handleChange}
                                   required
                              />

                              {error && (
                                   <p className="text-sm text-red-500 text-center">
                                        {error}
                                   </p>
                              )}

                              <Button
                                   type="submit"
                                   className="w-full"
                                   disabled={loading}
                              >
                                   {loading ? "Signing In..." : "Log In"}
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