import './CatalogIcon.css';

export const CatalogIcon = ({ src, size = 'row' }) => {
  if (!src) return null;

  return (
    <span className={`catalog-icon catalog-icon--${size}`} aria-hidden='true'>
      <img src={src} alt='' />
    </span>
  );
};

export const CatalogTitle = ({ children, icon, size = 'row' }) => (
  <span className='catalog-title-with-icon'>
    <CatalogIcon src={icon} size={size} />
    <span>{children}</span>
  </span>
);
