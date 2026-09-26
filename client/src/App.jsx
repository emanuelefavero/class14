import { RouterProvider } from 'react-router';
import { router } from './router/router';
import {
  ProductsProvider,
  ProductsFiltersProvider,
} from './features/products/context';

const providers = [ProductsFiltersProvider, ProductsProvider];

const Nest = ({ providers, children }) =>
  providers.reduceRight(
    (nested, Provider) => <Provider>{nested}</Provider>,
    children,
  );

export const App = () => (
  <Nest providers={providers}>
    <RouterProvider router={router} />
  </Nest>
);
