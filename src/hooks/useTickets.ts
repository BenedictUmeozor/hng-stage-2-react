import { useContext } from 'react';
import { TicketContext } from '@/contexts/TicketContext.context';

export function useTickets() {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within TicketProvider');
  }
  return context;
}
