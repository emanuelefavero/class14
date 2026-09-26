import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Spinner } from '@/components/ui/Spinner';
import { paths } from '@/router/paths';
import { fetchProduct } from '../api';
import { ProductError } from './ProductError';
import { ProductSuccess } from './ProductSuccess';
import './ProductDetails.css';

const INITIAL_STATE = Object.freeze({ step: 'idle' });

export const ProductDetails = ({ productId }) => {
  const navigate = useNavigate();
  const [state, setState] = useState(INITIAL_STATE);
  const isValidProductId = Number.isInteger(productId) && productId > 0;

  const loadProduct = useCallback(() => {
    setState({ step: 'loading' });

    const prevProductRequest =
      productId > 1 ? fetchProduct(productId - 1) : Promise.resolve(null);

    return Promise.all([
      fetchProduct(productId),
      prevProductRequest,
      fetchProduct(productId + 1),
    ])
      .then(([data, prevProduct, nextProduct]) => {
        if (data === null) {
          navigate(paths.products, { replace: true });
          return;
        }

        setState({ step: 'success', data, prevProduct, nextProduct });
      })
      .catch((error) => {
        console.error('Failed to load product:', error);
        setState({ step: 'error', error });
      });
  }, [productId, navigate]);

  useEffect(() => {
    if (!isValidProductId) {
      navigate(paths.products, { replace: true });
      return;
    }

    loadProduct();
  }, [isValidProductId, navigate, loadProduct]);

  switch (state.step) {
    case 'idle':
    case 'loading':
      return <Spinner />;
    case 'error':
      return (
        <ProductError
          message='Something went wrong. Please try again.'
          onRetry={loadProduct}
        />
      );
    case 'success':
      return (
        <ProductSuccess
          product={state.data}
          prevProduct={state.prevProduct}
          nextProduct={state.nextProduct}
        />
      );
    default:
      return null;
  }
};
