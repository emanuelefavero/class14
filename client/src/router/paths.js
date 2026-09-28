import { generatePath } from 'react-router';

/** Canonical route patterns and paths. */
export const paths = Object.freeze({
  home: '/',
  products: '/products',
  product: '/products/:productId',
  aboutUs: '/about-us',
});

/** Build concrete paths for routes with dynamic segments. */
export const getPath = {
  product: (productId) =>
    generatePath(paths.product, {
      productId: String(productId),
    }),
};

export const navLinks = [
  { to: paths.home, label: 'Home' },
  { to: paths.products, label: 'Products' },
  { to: paths.aboutUs, label: 'About Us' },
];
