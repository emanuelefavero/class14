import { ProductCatalog } from '@/features/products';
import { ProductsFiltersForm } from '@/features/products/filters/ProductsFiltersForm';

export const Products = () => (
  <>
    <ProductsFiltersForm />
    <ProductCatalog />
  </>
);
