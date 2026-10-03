import { useEffect, useState } from 'react';
import { ToastContext } from './ToastContext';

const toastDuration = 4500;

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return undefined;

    const timeoutId = window.setTimeout(() => {
      setToast(null);
    }, toastDuration);

    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  const showToast = (message) => {
    setToast({ message });
  };

  const hideToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
};
