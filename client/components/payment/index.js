import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Button, Row, Col, ListGroup, Card } from 'react-bootstrap';
import Link from 'next/link';

import Loader from '../utilities/Loader';
import CheckoutSteps from '../utilities/CheckoutSteps';
import Image from '../utilities/Image';
import { useOrder } from '../../context/orderContext';
import { useCart } from '../../context/cartContext';
import {
  resetNotifications,
  getPrincipalCurrencyHandler,
} from '../../redux/actions/currency';
import { convertDate } from '../../utils/date';
import { getAmountInCurrency, addDecimal } from '../../utils/number';

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { loading, error, currency } = useSelector(
    (state) => state.currencyPrincipal
  );

  const {
    state: { cart },
    clearCart,
  } = useCart();
  const {
    state: { shippingInfos, paymentInfos },
    clearInfos,
  } = useOrder();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetNotifications());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (!cart) {
      router.push('/panier');
    }

    if (!shippingInfos) {
      router.push('/livraison');
    } else if (!paymentInfos) {
      router.push('/methode-paiement');
    }
  }, [paymentInfos, shippingInfos, cart]);

  useEffect(() => {
    dispatch(getPrincipalCurrencyHandler());
  }, [dispatch]);

  const cartPrice = useMemo(
    () => cart.reduce((acc, item) => acc + item.qty * item.price, 0),
    [cart]
  );
  const shippingPrice = Number(shippingInfos.price);
  const taxPrice = useMemo(() => cartPrice * 0.1, [cartPrice]);
  const discountPrice = useMemo(
    () =>
      cartPrice < 3000
        ? 0
        : cartPrice >= 3000 && cartPrice < 5000
        ? cartPrice * 0.1
        : cartPrice * 0.2,
    [cart]
  );
  const totalPrice = useMemo(
    () => cartPrice + shippingPrice + taxPrice - discountPrice,
    [cartPrice, shippingPrice, taxPrice, discountPrice]
  );
  const discountPercentage =
    cartPrice < 3000
      ? '0%'
      : cartPrice >= 3000 && cartPrice < 5000
      ? '10%'
      : '20%';

  if (loading) {
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
                {shippingInfos.address}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Mode de paiement</h2>
              <strong>Mode:</strong> {paymentInfos}
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
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default index;
