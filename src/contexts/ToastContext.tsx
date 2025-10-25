import type { ReactNode } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { ToastContext } from './ToastContext.context';
import type { ToastType } from '@/types';

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const showToast = useCallback((type: ToastType['type'], message: string) => {
    const id = Date.now().toString();
    const newToast: ToastType = { id, type, message };
    
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-lg min-w-[300px] max-w-md
              ${toast.type === 'success' ? 'bg-green-50 border-l-4 border-green-500 text-green-900' : ''}
              ${toast.type === 'error' ? 'bg-red-50 border-l-4 border-red-500 text-red-900' : ''}
              ${toast.type === 'info' ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-900' : ''}
              ${toast.type === 'warning' ? 'bg-yellow-50 border-l-4 border-yellow-500 text-yellow-900' : ''}`}
          >
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
