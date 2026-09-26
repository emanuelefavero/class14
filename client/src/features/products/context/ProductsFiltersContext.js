import { createContext, useContext } from 'react';

export const ProductsFiltersContext = createContext(null);

export const useProductsFilters = () => {
  const context = useContext(ProductsFiltersContext);
  if (!context)
    throw new Error(
      'useProductsFilters must be used within a ProductsFiltersProvider',
    );
  return context;
};
