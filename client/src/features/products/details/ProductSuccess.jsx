import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Rating } from '@/components/ui/Rating';
import { priceFormatter } from '../utils';
import { ProductNavigation } from './ProductNavigation';

export const ProductSuccess = ({ product, prevProduct, nextProduct }) => (
  <Card
    as='section'
    className='product-details'
    aria-labelledby='product-title'
  >
    <ProductNavigation prevProduct={prevProduct} nextProduct={nextProduct} />

    <div className='media'>
      <img
        className='image'
        src={product.image}
        alt={product.title}
        draggable='false'
        decoding='async'
      />
    </div>

    <Card.Content className='content'>
      <Badge className='category'>{product.category}</Badge>

      <h1 id='product-title' className='font-normal text-3xl'>
        {product.title}
      </h1>

      <Rating value={product.rating.rate} count={product.rating.count} />

      <p className='price font-semibold text-2xl'>
        {priceFormatter.format(product.price)}
      </p>

      <p className='description text-lg'>{product.description}</p>
    </Card.Content>
  </Card>
);
