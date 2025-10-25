import type { Ticket } from '@/types';

const TICKETS_STORAGE_KEY = 'ticketapp_tickets';

export function saveTickets(tickets: Ticket[]): void {
  try {
    localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(tickets));
  } catch (error) {
    console.error('Failed to save tickets to localStorage:', error);
  }
}

export function loadTickets(): Ticket[] | null {
  try {
    const stored = localStorage.getItem(TICKETS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as Ticket[];
    }
    return null;
  } catch (error) {
    console.error('Failed to load tickets from localStorage:', error);
    return null;
  }
}

export function clearTickets(): void {
  try {
    localStorage.removeItem(TICKETS_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear tickets from localStorage:', error);
  }
}
