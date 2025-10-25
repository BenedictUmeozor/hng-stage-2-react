import { createContext } from 'react';
import type { ToastType } from '@/types';

export interface ToastContextValue {
  showToast: (type: ToastType['type'], message: string) => void;
}

export const ToastContext = createContext<ToastContextValue | undefined>(undefined);

ToastContext.displayName = 'ToastContext';
