import { ProductCard } from './ProductCard';
import './ProductList.css';

export const ProductList = ({ products }) => (
  <ul className='product-list'>
    {products.map((product) => (
      <li key={product.id} className='item'>
        <ProductCard product={product} />
      </li>
    ))}
  </ul>
);
