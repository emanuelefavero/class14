import { Link } from 'react-router';
import { paths } from '@/router/paths';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container footer-inner'>
        <div className='footer-brand'>
          <span aria-hidden='true'>14</span>
          <p className='font-semibold'>
            Class14 <small>Learning hub · WDPT14</small>
          </p>
        </div>
        <nav aria-label='Materiali'>
          <Link to={paths.cheatsheets}>Cheat sheet</Link>
          <Link to={paths.resources}>Risorse</Link>
        </nav>
        <p className='footer-credit'>Un progetto di Emanuele Favero</p>
      </div>
    </footer>
  );
};
