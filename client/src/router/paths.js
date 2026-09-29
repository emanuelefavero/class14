import { generatePath } from 'react-router';

/** Canonical route patterns and paths. */
export const paths = Object.freeze({
  home: '/',
  topics: '/topics',
  projects: '/projects',
  students: '/students',
  cheatsheets: '/cheatsheets',
  resources: '/resources',
  // Temporary reference feature, removed when the Projects flow replaces it.
  products: '/products',
  product: '/products/:productId',
});

/** Build concrete paths for routes with dynamic segments. */
export const getPath = {
  product: (productId) =>
    generatePath(paths.product, {
      productId: String(productId),
    }),
};

export const navLinks = [
  { to: paths.topics, label: 'Argomenti' },
  { to: paths.projects, label: 'Progetti' },
  { to: paths.students, label: 'Studenti' },
];
