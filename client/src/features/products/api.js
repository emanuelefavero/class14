import { fetchData } from '@/lib/api';
import { delay } from '@/lib/utils';
import { productSchema, productsSchema } from './schemas';

const PRODUCTS_URL = 'https://fakestoreapi.com/products';

let productsCache = null;
const productCache = new Map();

export const fetchProducts = () => {
  if (productsCache) return productsCache;

  productsCache = Promise.all([
    fetchData(PRODUCTS_URL).then((data) => productsSchema.parse(data)),
    delay(300),
  ])
    .then(([data]) => data)
    .catch((error) => {
      productsCache = null;
      throw error;
    });

  return productsCache;
};

export const fetchProduct = (productId) => {
  if (productCache.has(productId)) {
    return productCache.get(productId);
  }

  const request = fetchData(`${PRODUCTS_URL}/${productId}`)
    .then((data) => {
      if (!data) return null;

      return productSchema.parse(data);
    })
    .catch((error) => {
      productCache.delete(productId);
      throw error;
    });

  productCache.set(productId, request);

  return request;
};
