import { useState, Suspense, lazy } from 'react';
import { Button } from 'react-bootstrap';

import CheckoutSteps from '../utilities/CheckoutSteps';
import Loader from '../utilities/Loader';
// import WithShipping from '../shipping/WithShipping';
// import WithoutShipping from '../shipping/WithoutShipping';
const WithoutShipping = lazy(() => import('../shipping/WithoutShipping'));
const WithShipping = lazy(() => import('../shipping/WithShipping'));

const Shipping = () => {
  const [shipping, setShipping] = useState(true);
  return (
    <>
      <CheckoutSteps step1 step2 />
      <h1>Livraison</h1>
      <Suspense fallback={<Loader />}>
        {shipping && <WithShipping />}
        {!shipping && <WithoutShipping />}
      </Suspense>
    </>
  );
};

export default Shipping;
