import { useState } from 'react';
import { ProductsFiltersContext } from './ProductsFiltersContext';

const INITIAL_FILTERS = Object.freeze({
  maxPrice: null,
});

export const ProductsFiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const updateMaxPrice = (maxPrice) =>
    setFilters((prevFilters) => ({ ...prevFilters, maxPrice }));

  const resetFilters = () => setFilters(INITIAL_FILTERS);

  return (
    <ProductsFiltersContext value={{ filters, updateMaxPrice, resetFilters }}>
      {children}
    </ProductsFiltersContext>
  );
};
