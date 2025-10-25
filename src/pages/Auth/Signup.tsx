import { Button } from "@/components/forms/Button";
import { Input } from "@/components/forms/Input";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import { useToast } from "@/hooks/useToast";
import { validateSignupForm } from "@/lib/validation";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

export default function Signup() {
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm({
    initialValues: { name: "", email: "", password: "", confirmPassword: "" },
    validate: validateSignupForm,
    onSubmit: async (values) => {
      try {
        await signup(values.name, values.email, values.password);
        showToast("success", "Account created successfully!");
        navigate("/dashboard");
      } catch (error) {
        showToast(
          "error",
          error instanceof Error ? error.message : "Signup failed",
        );
      }
    },
  });

  return (
    <AuthLayout>
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">Join TicketFlow</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="name"
            type="text"
            label="Full Name"
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            error={touched.name ? errors.name : undefined}
            required
          />
          <Input
            id="email"
            type="email"
            label="Email"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            error={touched.email ? errors.email : undefined}
            required
          />
          <Input
            id="password"
            type="password"
            label="Password"
            value={values.password}
            onChange={(e) => handleChange("password", e.target.value)}
            onBlur={() => handleBlur("password")}
            error={touched.password ? errors.password : undefined}
            required
          />
          <Input
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            value={values.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            onBlur={() => handleBlur("confirmPassword")}
            error={touched.confirmPassword ? errors.confirmPassword : undefined}
            required
          />
          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Sign Up
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
