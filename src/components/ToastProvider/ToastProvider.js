import React from 'react';

import useKeyDown from '../../hooks/useKeyDown';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const createToast = (toast) => {
    setToasts([
      ...toasts,
      {
        id: crypto.randomUUID(),
        ...toast,
      },
    ]);
  };

  const dismissToast = (id) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, []);

  useKeyDown('Escape', handleEscape);

  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
