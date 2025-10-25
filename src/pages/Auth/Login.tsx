import { Button } from "@/components/forms/Button";
import { Input } from "@/components/forms/Input";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import { useToast } from "@/hooks/useToast";
import { validateLoginForm } from "@/lib/validation";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
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
    initialValues: { email: "", password: "" },
    validate: validateLoginForm,
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password);
        showToast("success", "Login successful!");
        navigate("/dashboard");
      } catch (error) {
        showToast(
          "error",
          error instanceof Error ? error.message : "Login failed",
        );
      }
    },
  });

  return (
    <AuthLayout>
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Login to TicketFlow
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Login
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/auth/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
