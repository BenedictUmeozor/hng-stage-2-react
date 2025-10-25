import type { ReactNode } from "react";

export interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface DecorativeCircleProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
}
