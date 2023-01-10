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
                <strong>Addresse:</strong>
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
                      <Col>
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
        <Col md={4}></Col>
      </Row>
    </>
  );
};

export default index;
