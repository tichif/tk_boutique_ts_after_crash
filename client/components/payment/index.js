import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Button, Row, Col, ListGroup, Card, Form } from 'react-bootstrap';
import Link from 'next/link';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import Loader from '../utilities/Loader';
import CheckoutSteps from '../utilities/CheckoutSteps';
import Image from '../utilities/Image';
import { useOrder } from '../../context/orderContext';
import { useCart } from '../../context/cartContext';
import {
  resetNotifications,
  getPrincipalCurrencyHandler,
} from '../../redux/actions/currency';
import { convertMultipleWords } from '../../utils/string';
import { getAmountInCurrency, addDecimal } from '../../utils/number';
import {
  getMoncashInfosHandler,
  processMoncashPaymentHandler,
} from '../../redux/actions/moncash';
import { getStripeIntentHandler } from '../../redux/actions/stripe';
import { createOrderHandler } from '../../redux/actions/order';

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const elements = useElements();
  const stripe = useStripe();

  const [card, setCard] = useState();
  const [clearForm, setClearForm] = useState(false);

  const { transactionId } = router.query;

  const { loading, error, currency } = useSelector(
    (state) => state.currencyPrincipal
  );

  const {
    loading: loadingMoncashCreate,
    error: errorMoncashCreate,
    url,
  } = useSelector((state) => state.moncashCreate);
  const {
    loading: loadingMoncashDetail,
    error: errorMoncashDetail,
    infos,
  } = useSelector((state) => state.moncashDetail);
  const {
    loading: loadingStripe,
    error: errorStripe,
    clientSecret,
  } = useSelector((state) => state.stripeIntent);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success,
    orderId,
  } = useSelector((state) => state.orderCreate);

  const {
    state: { cart },
    clearCart,
  } = useCart();
  const {
    state: { shippingInfos, paymentInfos },
    clearInfos,
  } = useOrder();

  // error
  useEffect(() => {
    if (
      error ||
      errorMoncashCreate ||
      errorMoncashDetail ||
      errorStripe ||
      errorCreate
    ) {
      toast.error(
        error ||
          errorMoncashCreate ||
          errorMoncashDetail ||
          errorStripe ||
          errorCreate
      );
      dispatch(resetNotifications());
    }
  }, [
    error,
    dispatch,
    errorMoncashCreate,
    errorCreate,
    errorMoncashDetail,
    errorStripe,
  ]);

  // check cart and shipping infos
  useEffect(() => {
    if (!cart) {
      router.push('/panier');
    }

    if (!shippingInfos) {
      router.push('/livraison');
    } else if (!paymentInfos) {
      router.push('/methode-paiement');
    }
  }, []);

  // url
  useEffect(() => {
    if (url) {
      window.location.href = url;
    }
  }, [url]);

  // success
  useEffect(() => {
    if (success) {
      clearInfos();
      clearCart();
      router.push(`/orders/${orderId}`);
    }
  }, [success, router, orderId]);

  // currency
  useEffect(() => {
    dispatch(getPrincipalCurrencyHandler());
  }, [
    error,
    dispatch,
    errorMoncashCreate,
    errorCreate,
    errorMoncashDetail,
    errorStripe,
  ]);

  // transactionId
  useEffect(() => {
    if (transactionId) {
      dispatch(getMoncashInfosHandler(transactionId));
    }
  }, [transactionId, dispatch]);

  // if moncash infos is ok
  useEffect(() => {
    if (infos) {
      if (
        transactionId === infos.transactionId &&
        Math.round(totalPrice) === Number(infos.amount)
      ) {
        const order = {
          currency,
          products: cart,
          paymentMethod: paymentInfos,
          transactionId,
          taxPrice,
          shippingPrice,
          discountPrice,
          totalPrice,
        };

        if (shippingInfos.lat) {
          order.shippingAddress = shippingInfos;
        }

        dispatch(createOrderHandler(order));
      }
    }
  }, [infos, dispatch]);

  // stripe client secret
  useEffect(() => {
    console.log('entre nan stripe');
    if (clientSecret) {
      console.log(clientSecret);
      payWithStripe(clientSecret);
    }
  }, [clientSecret]);

  const cartPrice = Math.round(
    useMemo(
      () => cart.reduce((acc, item) => acc + item.qty * item.price, 0),
      [cart]
    )
  );
  const shippingPrice = Math.round(
    Number(shippingInfos && shippingInfos.price)
  );
  const taxPrice = Math.round(useMemo(() => cartPrice * 0.1, [cartPrice]));
  const discountPrice = Math.round(
    useMemo(
      () =>
        cartPrice < 3000
          ? 0
          : cartPrice >= 3000 && cartPrice < 5000
          ? cartPrice * 0.1
          : cartPrice * 0.2,
      [cart]
    )
  );
  const totalPrice = Math.round(
    useMemo(
      () => cartPrice + shippingPrice + taxPrice - discountPrice,
      [cartPrice, shippingPrice, taxPrice, discountPrice]
    )
  );
  const discountPercentage =
    cartPrice < 3000
      ? '0%'
      : cartPrice >= 3000 && cartPrice < 5000
      ? '10%'
      : '20%';

  // moncash handler
  function payWithMoncashHandler() {
    dispatch(processMoncashPaymentHandler(Math.round(totalPrice)));
  }

  // stripe handler
  function submitHandler(e) {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Veuillez réessayer s'il vous plait");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    setCard(cardElement);
    dispatch(getStripeIntentHandler(Math.round(totalPrice / currency.amount)));
  }

  async function payWithStripe(token) {
    const { paymentIntent, error } = await stripe.confirmCardPayment(token, {
      payment_method: {
        card: card,
      },
    });

    if (error) {
      toast.error(error);
      return;
    }

    setClearForm(true);

    const order = {
      currency,
      products: cart,
      paymentMethod: paymentInfos,
      transactionId: paymentIntent.id,
      taxPrice,
      shippingPrice,
      discountPrice,
      totalPrice,
    };

    if (shippingInfos.lat) {
      order.shippingAddress = shippingInfos;
    }

    dispatch(createOrderHandler(order));
  }

  if (
    loading ||
    loadingMoncashCreate ||
    loadingMoncashDetail ||
    loadingCreate
  ) {
    return <Loader />;
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Livraison</h2>
              <p>
                <strong>Addresse: </strong>
                {shippingInfos && shippingInfos.address}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Mode de paiement</h2>
              <strong>Mode:</strong>{' '}
              {paymentInfos && convertMultipleWords(paymentInfos)}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Articles</h2>
              <ListGroup>
                {cart.map((product) => (
                  <ListGroup.Item key={product.key}>
                    <Row>
                      <Col md={1}>
                        <Image
                          value={product.photo}
                          alt={product.name}
                          width={product.width / 20}
                          height={product.height / 20}
                        />
                      </Col>
                      <Col className='ml-5'>
                        <Link href={`/article/${product.slug}`}>
                          {product.name}
                        </Link>
                      </Col>
                      <Col md={6}>
                        {product.qty} X {product.price} = HTG{' '}
                        {product.qty * product.price} /{' '}
                        {currency &&
                          getAmountInCurrency(
                            product.qty * product.price,
                            currency
                          )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2 style={{ textAlign: 'center' }}>Résumé</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Articles</Col>
                  <Col>
                    HTG {addDecimal(cartPrice)} /{' '}
                    {currency && getAmountInCurrency(cartPrice, currency)}{' '}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Livraison</Col>
                  <Col>
                    HTG {addDecimal(shippingPrice)} /{' '}
                    {currency && getAmountInCurrency(shippingPrice, currency)}{' '}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Taxe</Col>
                  <Col>
                    HTG {addDecimal(taxPrice)} /{' '}
                    {currency && getAmountInCurrency(taxPrice, currency)}{' '}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Rabais: {discountPercentage}</Col>
                  <Col>
                    HTG {addDecimal(discountPrice)} /{' '}
                    {currency && getAmountInCurrency(discountPrice, currency)}{' '}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>
                    HTG {addDecimal(totalPrice)} /{' '}
                    {currency && getAmountInCurrency(totalPrice, currency)}{' '}
                  </Col>
                </Row>
              </ListGroup.Item>
              {!url && paymentInfos && paymentInfos === 'moncash' && (
                <ListGroup.Item>
                  <Button
                    className='btn-block'
                    onClick={payWithMoncashHandler}
                    disabled={
                      loading ||
                      loadingMoncashCreate ||
                      loadingMoncashDetail ||
                      loadingStripe ||
                      loadingCreate
                    }
                  >
                    Payer avec Moncash
                  </Button>
                </ListGroup.Item>
              )}
              {paymentInfos && paymentInfos === 'stripe' && !clearForm && (
                <ListGroup.Item>
                  <Form id='payment-form' onSubmit={submitHandler}>
                    <CardElement id='card-element' />
                    <Button
                      type='submit'
                      className='btn-block mt-4'
                      disabled={!stripe || loadingStripe}
                    >
                      Payer
                    </Button>
                  </Form>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default index;
