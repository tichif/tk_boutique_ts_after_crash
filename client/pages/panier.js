import { useEffect, useMemo } from 'react';
import { Row, Col, ListGroup, Button, Card, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Layout from '../components/Layout';
import { useMe } from '../context/userContext';
import { useCart } from '../context/cartContext';
import Image from '../components/utilities/Image';
import { getAmountInCurrency } from '../utils/number';
import { convertDate } from '../utils/date';
import { wrapper } from '../redux/store';
import {
  getPrincipalCurrencyHandler,
  resetNotifications,
} from '../redux/actions/currency';

const Panier = () => {
  const router = useRouter();
  const { productId, variantId, qty } = router.query;

  const dispatch = useDispatch();

  const { user } = useMe();

  const {
    state: { cart, error: errorCart },
    addToCart,
    removeToCart,
    clearError,
  } = useCart();

  const { currency, error } = useSelector((state) => state.currencyPrincipal);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetNotifications());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (errorCart) {
      toast.error(errorCart);
      clearError();
    }
  }, [errorCart, dispatch]);

  useEffect(() => {
    if (productId && qty) {
      addToCart(productId, variantId, qty);
    }
  }, [productId, variantId, qty]);

  function deleteHandler(key) {
    if (window.confirm('Etes vous sur(e) vouloir supprimer cet article ?')) {
      removeToCart(key);
    }
  }

  const totalProduct = useMemo(
    () => cart.reduce((acc, item) => acc + item.qty, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((acc, item) => acc + item.qty * item.price, 0),
    [cart]
  );

  function checkoutHandler() {
    console.log('Checkout');
  }

  function orderHandler() {
    console.log('Order handler');
  }

  return (
    <Layout title='Panier'>
      <Row>
        <Col md={8}>
          <h1 style={{ fontSize: '1.8rem', padding: '1rem 0' }}>Panier</h1>
          {cart && cart.length < 1 ? (
            <Alert variant='warning'>
              Vous n'avez pas d'articles dans le panier.
            </Alert>
          ) : (
            <ListGroup variant='flush'>
              {cart.map((product) => (
                <ListGroup.Item key={product.key}>
                  <Row>
                    <Col md={2}>
                      <Image
                        value={product.photo}
                        width={product.width / 15}
                        height={product.height / 15}
                        alt={product.name}
                      />
                    </Col>
                    <Col md={3}>
                      <Link href={`/article/${product.slug}`}>
                        {product.name}
                      </Link>
                    </Col>
                    <Col md={3}>
                      <p>HTG {product.price}</p>
                      <p>Couleur: {product.color}</p>
                      <p>Taille: {product.size}</p>
                      <p>Quantité: {product.qty}</p>
                      <p>
                        Ajouté le:{' '}
                        {convertDate(product.date, {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour12: true,
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}
                      </p>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant='danger'
                        onClick={() => deleteHandler(product.key)}
                      >
                        <i className='fas fa-trash'></i> Supprimer
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h4 style={{ fontSize: '1.1rem', padding: '0.5rem 0' }}>
                  Sous-total ({totalProduct}{' '}
                  {totalProduct > 1 ? 'articles' : 'article'})
                </h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4 style={{ fontSize: '1.1rem', padding: '0.5rem 0' }}>
                  HTG ({totalPrice.toFixed(2)}-{' '}
                  {getAmountInCurrency(totalPrice, currency)})
                </h4>
              </ListGroup.Item>
              <ListGroup.Item>
                {user && user.type !== 'admin' && (
                  <Button
                    type='button'
                    className='btn-block'
                    disabled={cart.length === 0}
                    onClick={checkoutHandler}
                  >
                    Commander
                  </Button>
                )}
              </ListGroup.Item>
              {/* Amin button */}
              <ListGroup.Item>
                {user && user.type === 'admin' && (
                  <Button
                    variant='success'
                    type='button'
                    className='btn-block'
                    disabled={cart.length === 0}
                    onClick={orderHandler}
                  >
                    Payer
                  </Button>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    await store.dispatch(getPrincipalCurrencyHandler());
  }
);

export default Panier;
