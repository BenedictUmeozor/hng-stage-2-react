import type { Ticket, TicketState } from "@/types";
import { createContext } from "react";

interface TicketContextValue extends TicketState {
  addTicket: (ticket: Omit<Ticket, "id" | "createdAt">) => void;
  updateTicket: (ticket: Ticket) => void;
  deleteTicket: (id: string) => void;
}

export const TicketContext = createContext<TicketContextValue | undefined>(
  undefined,
);
