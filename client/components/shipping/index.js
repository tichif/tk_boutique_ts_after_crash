import { useState, Suspense, lazy, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

import CheckoutSteps from '../utilities/CheckoutSteps';
import Loader from '../utilities/Loader';
import { useCart } from '../../context/cartContext';

const WithoutShipping = lazy(() => import('../shipping/WithoutShipping'));
const WithShipping = lazy(() => import('../shipping/WithShipping'));

const Shipping = () => {
  const [shipping, setShipping] = useState(false);

  const { cart } = useCart();

  const router = useRouter();

  useEffect(() => {
    if (!cart) {
      router.push('/panier');
    }
  }, [cart]);

  return (
    <>
      <CheckoutSteps step1 step2 />
      <h1>Livraison</h1>
      <div className='my-3'>
        <Button
          disabled={!shipping}
          onClick={() => setShipping(false)}
          className='mx-3'
        >
          Sans livraison
        </Button>
        <Button disabled={shipping} onClick={() => setShipping(true)}>
          Avec livraison
        </Button>
      </div>
      <Suspense fallback={<Loader />}>
        {shipping && <WithShipping />}
        {!shipping && <WithoutShipping />}
      </Suspense>
    </>
  );
};

export default Shipping;
