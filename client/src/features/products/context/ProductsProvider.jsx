import { useCallback, useState } from 'react';
import { fetchProducts } from '../api';
import { ProductsContext } from './ProductsContext';

const INITIAL_STATE = Object.freeze({ step: 'idle' });

export const ProductsProvider = ({ children }) => {
  const [state, setState] = useState(INITIAL_STATE);

  const loadProducts = useCallback(() => {
    setState({ step: 'loading' });

    return fetchProducts()
      .then((data) => setState({ step: 'success', data }))
      .catch((error) => {
        console.error('Failed to load products:', error);

        setState({
          step: 'error',
          error,
        });
      });
  }, []);

  const value = {
    state,
    loadProducts,
  };

  return <ProductsContext value={value}>{children}</ProductsContext>;
};
