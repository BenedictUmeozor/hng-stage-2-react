import type { ReactNode } from 'react';
import { useCallback, useMemo, useReducer } from 'react';
import type { TicketAction, TicketState, Ticket } from '@/types';
import { TicketContext } from './TicketContext.context';

const mockTickets: Ticket[] = [
  { id: '1', title: 'Fix login bug', description: 'Users cannot login with valid credentials', status: 'open', priority: 'high', createdAt: '2025-10-20T10:00:00Z' },
  { id: '2', title: 'Update homepage design', description: 'Refresh landing page with new branding', status: 'open', priority: 'medium', createdAt: '2025-10-21T14:30:00Z' },
  { id: '3', title: 'Add dark mode', description: 'Implement dark theme toggle', status: 'open', priority: 'low', createdAt: '2025-10-22T09:15:00Z' },
  { id: '4', title: 'Database optimization', description: 'Improve query performance', status: 'in_progress', priority: 'high', createdAt: '2025-10-19T08:00:00Z' },
  { id: '5', title: 'API documentation', description: 'Write comprehensive API docs', status: 'in_progress', priority: 'medium', createdAt: '2025-10-20T16:45:00Z' },
  { id: '6', title: 'Setup CI/CD pipeline', description: 'Automated testing and deployment', status: 'closed', priority: 'high', createdAt: '2025-10-18T11:20:00Z' },
  { id: '7', title: 'Email notifications', description: 'Send alerts for ticket updates', status: 'closed', priority: 'medium', createdAt: '2025-10-17T13:00:00Z' }
];

const initialState: TicketState = {
  tickets: mockTickets,
  loading: false,
};

const ticketReducer = (state: TicketState, action: TicketAction): TicketState => {
  switch (action.type) {
    case 'SET_TICKETS':
      return { ...state, tickets: action.payload, loading: false };
    case 'ADD_TICKET':
      return { ...state, tickets: [...state.tickets, action.payload] };
    case 'UPDATE_TICKET':
      return {
        ...state,
        tickets: state.tickets.map(t => t.id === action.payload.id ? action.payload : t)
      };
    case 'DELETE_TICKET':
      return {
        ...state,
        tickets: state.tickets.filter(t => t.id !== action.payload)
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export function TicketProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(ticketReducer, initialState);

  const addTicket = useCallback((ticket: Omit<Ticket, 'id' | 'createdAt'>) => {
    const newTicket: Ticket = {
      ...ticket,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_TICKET', payload: newTicket });
  }, []);

  const updateTicket = useCallback((ticket: Ticket) => {
    dispatch({ type: 'UPDATE_TICKET', payload: ticket });
  }, []);

  const deleteTicket = useCallback((id: string) => {
    dispatch({ type: 'DELETE_TICKET', payload: id });
  }, []);

  const value = useMemo(() => ({
    ...state,
    addTicket,
    updateTicket,
    deleteTicket,
  }), [state, addTicket, updateTicket, deleteTicket]);

  return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>;
}
