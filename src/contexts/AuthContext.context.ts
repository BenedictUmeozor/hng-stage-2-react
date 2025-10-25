import { createContext } from 'react';
import type { AuthState } from '@/types';

export interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

AuthContext.displayName = 'AuthContext';
