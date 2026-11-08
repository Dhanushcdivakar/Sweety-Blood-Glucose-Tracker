import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Droplet } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { loginSchema } from "../schemas/authSchema";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Alert from "../components/common/Alert";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (serverError) setServerError("");
  };

  const handleFillDemo = () => {
    setFormData({
      email: "demo@sweety.com",
      password: "password123",
    });
    setErrors({});
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError("");

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      await login(result.data);
      navigate("/");
    } catch (err) {
      setServerError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-primary-600 text-white shadow-md mb-3">
          <Droplet className="w-7 h-7 fill-current" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Welcome to Sweety
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Your personal daily blood glucose tracker
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-2xl sm:px-8">
          {/* Quick Demo Credentials Pill */}
          <div className="mb-6 p-3 bg-primary-50/70 border border-primary-200/80 rounded-xl flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-primary-900">Demo Account:</span>
              <p className="text-primary-700">demo@sweety.com • password123</p>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="px-2.5 py-1 bg-white hover:bg-primary-100/60 text-primary-700 font-semibold border border-primary-200 rounded-lg transition-colors shadow-2xs"
            >
              Autofill
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {serverError && (
              <Alert
                type="error"
                message={serverError}
                onDismiss={() => setServerError("")}
              />
            )}

            <Input
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2"
              loading={loading}
            >
              Sign in
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-primary-600 hover:text-primary-700 hover:underline"
            >
              Create one now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

