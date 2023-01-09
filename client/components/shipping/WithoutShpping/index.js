import { Button } from 'react-bootstrap';

import { useOrder } from '../../../context/orderContext';

const WithoutShipping = () => {
  const { addShippingInfos } = useOrder();

  function clickHandler() {
    addShippingInfos({
      address: 'N/A',
      price: 0,
    });
  }

  return (
    <>
      <Button variant='primary' onClick={clickHandler}>
        Continuer
      </Button>
    </>
  );
};

export default WithoutShipping;
