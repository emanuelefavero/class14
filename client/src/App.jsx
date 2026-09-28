import { BrowserRouter, Route, Routes } from 'react-router';
import {
  ProductsFiltersProvider,
  ProductsProvider,
} from './features/products/context';
import { AboutUs, Home, NotFound, Product, Products } from './pages';
import { RootLayout } from './RootLayout';
import { paths } from './router/paths';

const providers = [
  ProductsFiltersProvider,
  ProductsProvider,
  BrowserRouter,
  Routes,
];

const Nest = ({ providers, children }) =>
  providers.reduceRight(
    (nested, Provider) => <Provider>{nested}</Provider>,
    children,
  );

export const App = () => (
  <Nest providers={providers}>
    <Route path={paths.home} element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path={paths.products} element={<Products />} />
      <Route path={paths.productPattern} element={<Product />} />
      <Route path={paths.aboutUs} element={<AboutUs />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  </Nest>
);
