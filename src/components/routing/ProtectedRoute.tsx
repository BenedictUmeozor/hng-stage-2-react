import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  
  return <>{children}</>;
}
