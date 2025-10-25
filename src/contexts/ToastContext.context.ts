import type { ToastType } from "@/types";
import { createContext } from "react";

export interface ToastContextValue {
  showToast: (type: ToastType["type"], message: string) => void;
}

export const ToastContext = createContext<ToastContextValue | undefined>(
  undefined,
);

ToastContext.displayName = "ToastContext";
