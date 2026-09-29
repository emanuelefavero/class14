import { SearchX } from 'lucide-react';
import { Link } from 'react-router';
import { paths } from '@/router/paths';
import './Catalog.css';

export const NotFound = () => (
  <section className='catalog-page'>
    <div className='catalog-message'>
      <span className='catalog-state-icon'>
        <SearchX aria-hidden='true' />
      </span>
      <p className='catalog-eyebrow'>Errore 404</p>
      <h1>Pagina non trovata</h1>
      <p>L'indirizzo richiesto non corrisponde a una pagina di Class14.</p>
      <Link to={paths.home} className='link'>
        Torna alla Home
      </Link>
    </div>
  </section>
);
