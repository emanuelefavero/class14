import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { paths } from '@/router/paths';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export const ProductNavigation = ({ prevProduct, nextProduct }) => {
  const navigate = useNavigate();

  if (!prevProduct && !nextProduct) return null;

  return (
    <Card.Header
      as='nav'
      className='product-navigation'
      aria-label='Product navigation'
    >
      {prevProduct && (
        <Button
          variant={Button.variant.ghost}
          aria-label='Previous product'
          onClick={() => navigate(paths.product(prevProduct.id))}
        >
          <ArrowLeft className='icon' aria-hidden='true' />
          <span className='label'>Previous</span>
        </Button>
      )}

      {nextProduct && (
        <Button
          variant={Button.variant.ghost}
          className='next'
          aria-label='Next product'
          onClick={() => navigate(paths.product(nextProduct.id))}
        >
          <span className='label'>Next</span>
          <ArrowRight className='icon' aria-hidden='true' />
        </Button>
      )}
    </Card.Header>
  );
};
