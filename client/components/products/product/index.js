import Link from 'next/link';
import { Card } from 'react-bootstrap';

import { getAmountInCurrency } from '../../../utils/number';

const Product = ({ product, currency }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link href={`/article/${product.slug}`}>
        <Card.Img variant='top' src={product.photoPrincipal.url} />
      </Link>
      <Card.Body>
        <Link href={`/article/${product.slug}`}>
          <Card.Title as='h4'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='h6' className='mb-2'>
          {product.category.name}
        </Card.Text>
        <Card.Text as='h6' className='mb-2'>
          HTG {product.price ? product.price : product.variant[0]?.price} -{' '}
          {getAmountInCurrency(
            product.price ? product.price : product.variant[0]?.price,
            currency
          )}
        </Card.Text>
        <Card.Text as='h6'>
          {(product && product.qty === 0) || product.variant[0]?.qty === 0 ? (
            <p className='text-danger'>Non Disponible</p>
          ) : (product && product.qty <= 3) || product.variant[0]?.qty <= 3 ? (
            <p className='text-warning'>Presque ecoule</p>
          ) : (
            <p>Disponible</p>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
