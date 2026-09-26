import { createBrowserRouter } from 'react-router';
import { RootLayout } from '@/layouts';
import { routes } from './routes';
import { paths } from './paths';

/** The main router for the application. */
export const router = createBrowserRouter([
  {
    path: paths.home,
    Component: RootLayout,
    children: routes,
  },
]);
