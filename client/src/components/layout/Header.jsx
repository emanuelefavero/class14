import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { paths } from '@/router/paths';
import './Header.css';

export const Header = ({ navLinks = [] }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className='header'>
      <div className='container header-inner'>
        <Link
          to={paths.home}
          className='brand'
          aria-label='Class14, vai alla Home'
          onClick={() => setMenuOpen(false)}
        >
          <span className='brand-mark' aria-hidden='true'>
            14
          </span>
          <span>Class14</span>
        </Link>

        <button
          className='menu-toggle'
          type='button'
          aria-label={menuOpen ? 'Chiudi il menu' : 'Apri il menu'}
          aria-controls='primary-navigation'
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden='true' /> : <Menu aria-hidden='true' />}
        </button>

        <nav
          id='primary-navigation'
          className={menuOpen ? 'primary-nav is-open' : 'primary-nav'}
          aria-label='Navigazione principale'
        >
          <ul className='route-list'>
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === paths.home}
                  className='nav-link'
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};
