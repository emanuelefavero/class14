import { isAxiosError } from 'axios';
import { Link } from 'react-router';
import { paths } from '@/router/paths';

export const CatalogState = ({ state, subject }) => {
  if (state.step === 'idle' || state.step === 'loading') {
    return <p role='status'>Caricamento {subject}…</p>;
  }

  if (isAxiosError(state.error) && state.error.response?.status === 404) {
    return (
      <div className='catalog-message'>
        <h1>Contenuto non trovato</h1>
        <p>Il contenuto richiesto non è presente nel catalogo.</p>
        <Link className='link' to={paths.home}>
          Torna alla Home
        </Link>
      </div>
    );
  }

  return (
    <div className='catalog-message' role='alert'>
      <p>Non è stato possibile caricare {subject}. Riprova più tardi.</p>
    </div>
  );
};
