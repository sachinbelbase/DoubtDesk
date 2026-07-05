import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import Button from "../components/common/Button";

import { useAuth } from "../hooks/useAuth";
import { ROLES } from "../constants/roles";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: ROLES.STUDENT,
  });
  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // TEMP: no backend yet - this only creates a local session.
    // Swap this block for authService.registerRequest(formData) later.
    const newUser = { id: Date.now(), ...formData };
    login(newUser);
    navigate(`/${newUser.role}/dashboard`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <Card>
          <h1 className="text-2xl font-bold text-center mb-1">
            Create Account
          </h1>
          <p className="text-gray-500 text-center mb-6">
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

            <Select
              label="I am a"
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={[ROLES.STUDENT, ROLES.TEACHER, ROLES.ADMIN]}
              placeholder="Select role"
            />

            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold">
              Log in
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
