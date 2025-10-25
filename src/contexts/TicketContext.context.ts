import { createContext } from 'react';
import type { TicketState, Ticket } from '@/types';

interface TicketContextValue extends TicketState {
  addTicket: (ticket: Omit<Ticket, 'id' | 'createdAt'>) => void;
  updateTicket: (ticket: Ticket) => void;
  deleteTicket: (id: string) => void;
}

export const TicketContext = createContext<TicketContextValue | undefined>(undefined);
