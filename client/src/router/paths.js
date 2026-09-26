import { generatePath } from 'react-router';

/** Canonical absolute paths used for links and programmatic navigation. */
export const paths = Object.freeze({
  home: '/',
  products: '/products',
  product: (productId) =>
    generatePath('/products/:productId', {
      productId: String(productId),
    }),
  aboutUs: '/about-us',
});
