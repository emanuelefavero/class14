import { Link } from 'react-router';
import { Button } from '@/components/ui/Button';
import { paths } from '@/router/paths';

export const ProductError = ({ message, onRetry }) => (
  <section className='product-error' role='alert'>
    <h1 className='font-normal text-3xl'>Unable to load product</h1>
    <p className='description'>{message}</p>

    <div className='actions'>
      {onRetry && <Button onClick={onRetry}>Retry</Button>}
      <Link to={paths.products} className='link'>
        Back to products
      </Link>
    </div>
  </section>
);
