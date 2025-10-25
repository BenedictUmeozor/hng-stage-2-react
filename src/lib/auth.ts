import type { User } from '@/types';

const SESSION_KEY = 'ticketapp_session';

interface Session {
  token: string;
  user: User;
}

export const saveSession = (token: string, user: User): void => {
  const session: Session = { token, user };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

export const getSession = (): Session | null => {
  const sessionStr = localStorage.getItem(SESSION_KEY);
  if (!sessionStr) return null;
  
  try {
    return JSON.parse(sessionStr) as Session;
  } catch {
    return null;
  }
};

export const clearSession = (): void => {
  localStorage.removeItem(SESSION_KEY);
};
