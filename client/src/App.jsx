import { BrowserRouter, Route, Routes } from 'react-router';
import {
  ProductsFiltersProvider,
  ProductsProvider,
} from './features/products/context';
import { Home, NotFound, Product, Products, SectionPreview } from './pages';
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
      <Route
        path={paths.topics}
        element={
          <SectionPreview
            title='Argomenti'
            description='Esplora gli argomenti del percorso e i progetti che li collegano.'
          />
        }
      />
      <Route
        path={paths.projects}
        element={
          <SectionPreview
            title='Progetti'
            description='Scopri i progetti della classe, i materiali e le repository disponibili.'
          />
        }
      />
      <Route
        path={paths.students}
        element={
          <SectionPreview
            title='Studenti'
            description='Conosci gli studenti della WDPT14 e il loro percorso nel catalogo.'
          />
        }
      />
      <Route
        path={paths.cheatsheets}
        element={
          <SectionPreview
            title='Cheat sheet'
            description='Ritrova i PDF di ripasso associati ai progetti del corso.'
          />
        }
      />
      <Route
        path={paths.resources}
        element={
          <SectionPreview
            title='Risorse'
            description='Consulta documentazione, tutorial e strumenti collegati ai progetti.'
          />
        }
      />
      <Route path={paths.products} element={<Products />} />
      <Route path={paths.product} element={<Product />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  </Nest>
);
