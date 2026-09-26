import { useParams } from 'react-router';
import { ProductDetails } from '@/features/products';

export const Product = () => {
  const { productId } = useParams();

  return <ProductDetails productId={Number(productId)} />;
};
