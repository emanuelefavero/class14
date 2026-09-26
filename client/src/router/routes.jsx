import { AboutUs, Home, NotFound, Product, Products } from '@/pages';
import { paths } from './paths';

/** App route tree.
 * `handle.navigation` marks routes shown in the main Navbar.
 * */
export const routes = [
  // /
  {
    index: true,
    Component: Home,
    handle: {
      navigation: {
        to: paths.home,
        label: 'Home',
      },
    },
  },

  // /products, /products/:productId
  {
    path: 'products',
    handle: {
      navigation: {
        to: paths.products,
        label: 'Products',
      },
    },

    children: [
      {
        index: true,
        Component: Products,
      },

      {
        path: ':productId',
        Component: Product,
      },
    ],
  },

  // /about-us
  {
    path: 'about-us',
    Component: AboutUs,
    handle: {
      navigation: {
        to: paths.aboutUs,
        label: 'About Us',
      },
    },
  },

  // 404
  {
    path: '*',
    Component: NotFound,
  },
];

/** Flat list of navigation links for the main Navbar. */
export const navLinks = routes.flatMap((route) =>
  route.handle?.navigation ? [route.handle.navigation] : [],
);
