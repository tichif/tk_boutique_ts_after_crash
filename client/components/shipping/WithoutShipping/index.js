import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

import { useOrder } from '../../../context/orderContext';

const WithoutShipping = () => {
  const { addShippingInfos } = useOrder();
  const router = useRouter();

  function clickHandler() {
    addShippingInfos({
      address: 'N/A',
      price: 0,
    });
    router.push('/methode-paiement');
  }

  return (
    <>
      <p>Si vous ne vous pas voulez pas de livraison, cliquez sur continuer</p>
      <Button variant='primary' onClick={clickHandler} className='my-3'>
        Continuer
      </Button>
    </>
  );
};

export default WithoutShipping;
