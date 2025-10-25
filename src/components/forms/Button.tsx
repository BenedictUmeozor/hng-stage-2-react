import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  isLoading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  isLoading,
  children,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const baseClasses =
    "px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClasses =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : variant === "danger"
        ? "bg-red-600 text-white hover:bg-red-700"
        : "bg-gray-200 text-gray-900 hover:bg-gray-300";

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses} ${className || ""}`}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
