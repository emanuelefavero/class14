import { generatePath } from 'react-router';

const productPattern = '/products/:productId';

/** Canonical absolute paths used for links and programmatic navigation. */
export const paths = Object.freeze({
  home: '/',
  products: '/products',
  productPattern,
  product: (productId) =>
    generatePath(productPattern, {
      productId: String(productId),
    }),
  aboutUs: '/about-us',
});

export const navLinks = [
  { to: paths.home, label: 'Home' },
  { to: paths.products, label: 'Products' },
  { to: paths.aboutUs, label: 'About Us' },
];
