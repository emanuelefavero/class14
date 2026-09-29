import { Link } from 'react-router';
import { paths } from '@/router/paths';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container footer-inner'>
        <p className='font-semibold'>
          Class14 <span>· WDPT14</span>
        </p>
        <nav aria-label='Materiali'>
          <Link to={paths.cheatsheets}>Cheat sheet</Link>
          <Link to={paths.resources}>Risorse</Link>
        </nav>
        <p>Un progetto di Emanuele Favero</p>
      </div>
    </footer>
  );
};
