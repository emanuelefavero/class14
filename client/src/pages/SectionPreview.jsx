import { Link } from 'react-router';
import { paths } from '@/router/paths';
import './SectionPreview.css';

export const SectionPreview = ({ title, description }) => (
  <section className='section-preview'>
    <p className='section-preview-label'>Class14 / {title}</p>
    <h1>{title}</h1>
    <p className='section-preview-description'>{description}</p>
    <p className='section-preview-status'>Il catalogo sarà disponibile qui.</p>
    <Link to={paths.home} className='link'>
      Torna alla Home
    </Link>
  </section>
);
