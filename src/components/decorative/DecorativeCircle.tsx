import type { DecorativeCircleProps } from "@/types";

const DecorativeCircle = ({
  className = "",
  size = "md",
  color = "bg-blue-200",
}: DecorativeCircleProps) => {
  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-48 h-48",
    lg: "w-64 h-64",
    xl: "w-96 h-96",
  };

  return (
    <div
      className={`rounded-full ${color} ${sizeClasses[size]} ${className}`}
      aria-hidden="true"
    />
  );
};

export default DecorativeCircle;
