import { matchesSchema } from '@/lib/validation';

const PRODUCT_SCHEMA = Object.freeze({
  id: 'number',
  title: 'string',
  price: 'number',
  description: 'string',
  category: 'string',
  image: 'string',
  rating: {
    rate: 'number',
    count: 'number',
  },
});

export const validateProduct = (product) => {
  if (!matchesSchema(product, PRODUCT_SCHEMA))
    throw new Error('Invalid product data format.');

  return product;
};

export const validateProducts = (products) => {
  if (!matchesSchema(products, [PRODUCT_SCHEMA]))
    throw new Error('Invalid products data format.');

  return products;
};
