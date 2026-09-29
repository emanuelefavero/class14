import { BookOpenText, FolderKanban, Menu, Users, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { paths } from '@/router/paths';
import './Header.css';

export const Header = ({ navLinks = [] }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navIcons = {
    [paths.topics]: BookOpenText,
    [paths.projects]: FolderKanban,
    [paths.students]: Users,
  };

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
          <span className='brand-copy'>
            <strong>Class14</strong>
            <small>Learning hub</small>
          </span>
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
            {navLinks.map(({ to, label }) => {
              const Icon = navIcons[to];

              return (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === paths.home}
                    className='nav-link'
                    onClick={() => setMenuOpen(false)}
                  >
                    {Icon && <Icon aria-hidden='true' />}
                    {label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <span className='cohort-badge'>
          <span aria-hidden='true' />
          WDPT14
        </span>
      </div>
    </header>
  );
};
