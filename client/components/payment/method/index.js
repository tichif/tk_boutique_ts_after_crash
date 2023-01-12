import { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import FormContainer from '../../utilities/FormContainer';
import { useOrder } from '../../../context/orderContext';
import CheckoutSteps from '../../utilities/CheckoutSteps';
import { useCart } from '../../../context/cartContext';

const PaymentMethod = () => {
  const {
    state: { shippingInfos },
    addPaymentInfos,
  } = useOrder();

  const { cart } = useCart();

  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    if (!cart) {
      router.push('/panier');
    } else if (!shippingInfos) {
      router.push('/livraison');
    }
  }, [shippingInfos, router, cart]);

  function submitHandler(e) {
    e.preventDefault();
    if (!paymentMethod) {
      toast.error('Vous devez choisr un mode paiment pour continuer.');
      return;
    }
    addPaymentInfos(paymentMethod);
    router.push('/payer');
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
        <h1>Mode de paiement</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend'>Sélectionner mode de paiement</Form.Label>
            <Col>
              <Form.Check
                type='radio'
                label='Moncash'
                id='moncash'
                name='paymentMethod'
                value='moncash'
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
            <Col>
              <Form.Check
                type='radio'
                label='Carte de crédit'
                id='stripe'
                name='paymentMethod'
                value='stripe'
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          <div className='mt-4'>
            <Button
              variant='danger'
              className='mr-5'
              onClick={() => router.push('/livraison')}
            >
              <i className='fas fa-arrow-left'></i> Retour
            </Button>
            <Button type='submit' variant='success'>
              Suivant <i className='fas fa-arrow-right'></i>
            </Button>
          </div>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentMethod;
