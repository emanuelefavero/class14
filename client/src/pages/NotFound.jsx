import { Link } from 'react-router';
import { paths } from '@/router/paths';
import './SectionPreview.css';

export const NotFound = () => (
  <section className='section-preview'>
    <p className='section-preview-label'>Errore 404</p>
    <h1>Pagina non trovata</h1>
    <p className='section-preview-description'>
      L'indirizzo richiesto non corrisponde a una pagina di Class14.
    </p>
    <Link to={paths.home} className='link'>
      Torna alla Home
    </Link>
  </section>
);
