import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

let toastId = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, message, type, exiting: false }]);

    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 300);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 300);
  }, []);

  const getTypeStyles = (type) => {
    switch (type) {
      case 'success': return { bg: 'bg-white', border: 'border-emerald-200', icon: <CheckCircle2 size={18} className="text-emerald-500" />, shadow: 'shadow-emerald-500/10' };
      case 'warning': return { bg: 'bg-white', border: 'border-orange-200', icon: <AlertTriangle size={18} className="text-orange-500" />, shadow: 'shadow-orange-500/10' };
      case 'error': return { bg: 'bg-white', border: 'border-red-200', icon: <XCircle size={18} className="text-red-500" />, shadow: 'shadow-red-500/10' };
      case 'info': return { bg: 'bg-white', border: 'border-blue-200', icon: <Info size={18} className="text-blue-500" />, shadow: 'shadow-blue-500/10' };
      default: return { bg: 'bg-white', border: 'border-slate-200', icon: <Info size={18} className="text-slate-500" />, shadow: 'shadow-slate-500/10' };
    }
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => {
          const styles = getTypeStyles(toast.type);
          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-center gap-3 px-4 py-3 min-w-[280px] max-w-sm rounded-xl border shadow-lg transition-all duration-300 ease-in-out ${styles.bg} ${styles.border} ${styles.shadow} ${toast.exiting ? 'opacity-0 translate-x-8 scale-95' : 'opacity-100 translate-x-0 scale-100'}`}
            >
              <div className="shrink-0">
                {styles.icon}
              </div>
              <span className="flex-1 text-sm font-semibold text-slate-700 leading-tight">
                {toast.message}
              </span>
              <button 
                className="shrink-0 p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200"
                onClick={() => removeToast(toast.id)}
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};
