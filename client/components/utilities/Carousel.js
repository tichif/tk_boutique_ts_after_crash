import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Carousel, CarouselItem } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { resetNotifications } from '../../redux/actions/currency';
import Image from './Image';
import { getAmountInCurrency } from '../../utils/number';

const CarouselComponent = () => {
  const dispatch = useDispatch();

  const { currency, error } = useSelector((state) => state.currencyPrincipal);
  const { products, error: errorProducts } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    if (error || errorProducts) {
      toast.error(error || errorProducts);
      dispatch(resetNotifications);
    }
  }, [error, errorProducts, dispatch]);

  return (
    <Carousel
      pause='hover'
      className='bg-dark'
      nextLabel='Suivant'
      prevLabel='Précédent'
    >
      {products &&
        products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link href={`/articles/${product.slug}`}>
              <Image
                value={product.photoPrincipal.url}
                alt={product.name}
                width={product.photoPrincipal.width / 5}
                height={product.photoPrincipal.height / 5}
              />
              <Carousel.Caption>
                <h2>
                  {product.name} (HTG{' '}
                  {product.price ? product.price : product.variant[0]?.price} -{' '}
                  {getAmountInCurrency(
                    product.price ? product.price : product.variant[0]?.price,
                    currency
                  )}
                  )
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default CarouselComponent;
