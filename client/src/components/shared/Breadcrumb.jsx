import { Link } from 'react-router';
import './Breadcrumb.css';

export const Breadcrumb = ({ items }) => {
  return (
    <nav className='breadcrumb' aria-label='Breadcrumb'>
      <ol>
        {items.map((item) => (
          <li key={item.to ?? item.label}>
            {item.to ? (
              <Link to={item.to}>{item.label}</Link>
            ) : (
              <span aria-current='page'>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
