import type { ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import type { AuthAction, AuthState } from '@/types';
import { clearSession, getSession, saveSession } from '@/lib/auth';
import { mockLogin, mockSignup } from '@/lib/mockAuth';
import { AuthContext } from './AuthContext.context';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
    case 'RESTORE_SESSION':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        loading: false,
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const session = getSession();
    if (session) {
      dispatch({ type: 'RESTORE_SESSION', payload: session });
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { user, token } = await mockLogin(email, password);
    saveSession(token, user);
    dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    const { user, token } = await mockSignup(name, email, password);
    saveSession(token, user);
    dispatch({ type: 'SIGNUP_SUCCESS', payload: { user, token } });
  }, []);

  const logout = useCallback(() => {
    clearSession();
    dispatch({ type: 'LOGOUT' });
  }, []);

  const value = useMemo(() => ({
    ...state,
    login,
    signup,
    logout,
  }), [state, login, signup, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
