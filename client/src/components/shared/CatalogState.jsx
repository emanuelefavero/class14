import { isAxiosError } from 'axios';
import { CircleAlert, LoaderCircle, SearchX } from 'lucide-react';
import { Link } from 'react-router';
import { paths } from '@/router/paths';

export const CatalogState = ({ state, subject }) => {
  if (state.step === 'idle' || state.step === 'loading') {
    return (
      <div className='catalog-state-panel' role='status'>
        <span className='catalog-state-icon is-loading'>
          <LoaderCircle aria-hidden='true' />
        </span>
        <h2>Caricamento in corso</h2>
        <p className='catalog-muted'>Sto preparando i dati {subject}.</p>
        <div className='catalog-skeleton' aria-hidden='true'>
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }

  if (isAxiosError(state.error) && state.error.response?.status === 404) {
    return (
      <div className='catalog-message'>
        <span className='catalog-state-icon'>
          <SearchX aria-hidden='true' />
        </span>
        <h1>Contenuto non trovato</h1>
        <p>Il contenuto richiesto non è presente nel catalogo.</p>
        <Link className='link' to={paths.home}>
          Torna alla Home
        </Link>
      </div>
    );
  }

  return (
    <div className='catalog-state-panel' role='alert'>
      <span className='catalog-state-icon'>
        <CircleAlert aria-hidden='true' />
      </span>
      <h2>Dati non disponibili</h2>
      <p>Non è stato possibile caricare {subject}. Riprova più tardi.</p>
    </div>
  );
};
