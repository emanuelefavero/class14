import { CircleCheck, X } from 'lucide-react';
import { useToast } from '@/features/context/useToast';
import './Toast.css';

export const Toast = () => {
  const { toast, hideToast } = useToast();

  return (
    <div className='toast-region' aria-live='polite' aria-atomic='true'>
      {toast && (
        <div className='toast'>
          <span className='toast-icon' aria-hidden='true'>
            <CircleCheck />
          </span>

          <div className='toast-copy'>
            <strong>Risorsa aggiunta</strong>
            <p>{toast.message}</p>
          </div>

          <button
            className='toast-close'
            type='button'
            onClick={hideToast}
            aria-label='Chiudi la notifica'
          >
            <X aria-hidden='true' />
          </button>
        </div>
      )}
    </div>
  );
};
