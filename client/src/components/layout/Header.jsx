import './Header.css';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { paths } from '@/router/paths';
import { ProductsFiltersForm } from '@/features/products/filters/ProductsFiltersForm';
import { Button } from '@/components/ui/Button';
import { BackButton } from '../shared/BackButton';

export const Header = ({ logo, navLinks = [] }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isProductsPath = pathname === paths.products;
  const isHomePath = pathname === paths.home;

  const handleLogoClick = () =>
    isHomePath ? window.location.reload() : navigate(paths.home);

  return (
    <header className='header'>
      <div className='container'>
        <div className='logo-and-stuff'>
          {logo && (
            <Button
              variant={Button.variant.ghost}
              className='logo font-semibold text-xl'
              onClick={handleLogoClick}
              aria-label={isHomePath ? 'Reload homepage' : 'Go to homepage'}
            >
              {logo}
            </Button>
          )}

          <BackButton variant={Button.variant.ghost} />
        </div>

        <div className='actions'>
          {isProductsPath && <ProductsFiltersForm />}

          {navLinks.length > 0 && (
            <nav aria-label='Main Navigation'>
              <ul className='route-list'>
                {navLinks.map((route) => (
                  <li key={route.to}>
                    <NavLink to={route.to} className='nav-link'>
                      {route.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};
