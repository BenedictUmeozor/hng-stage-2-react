import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import { TicketProvider } from "./contexts/TicketContext";
import { ToastProvider } from "./contexts/ToastContext";
import "./index.css";
import router from "./lib/router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <AuthProvider>
        <TicketProvider>
          <RouterProvider router={router} />
        </TicketProvider>
      </AuthProvider>
    </ToastProvider>
  </StrictMode>,
);
