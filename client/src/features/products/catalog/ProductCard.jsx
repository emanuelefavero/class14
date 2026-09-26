import { Link } from 'react-router';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Rating } from '@/components/ui/Rating';
import { paths } from '@/router/paths';
import { priceFormatter } from '../utils';
import './ProductCard.css';

export const ProductCard = ({ product }) => {
  return (
    <Card
      as={Link}
      to={paths.product(product.id)}
      className='product-card'
      aria-label={`View ${product.title}`}
    >
      <Card.Header className='media'>
        <img
          className='image'
          src={product.image}
          alt={product.title}
          draggable='false'
          loading='lazy'
          decoding='async'
        />
      </Card.Header>

      <Card.Content className='content'>
        <Badge className='category'>{product.category}</Badge>

        <Card.Title as='h3' className='title'>
          {product.title}
        </Card.Title>

        <Rating value={product.rating.rate} count={product.rating.count} />

        <p className='price font-semibold'>
          {priceFormatter.format(product.price)}
        </p>
      </Card.Content>
    </Card>
  );
};
