import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

import Loader from '../utilities/Loader';
import {
  getOrderForAdminHandler,
  resetNotifications,
  updateOrderStatusHandler,
} from '../../redux/actions/order';
import { convertDate } from '../../utils/date';

const OrderInfos = () => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;

  const { loading, error, order } = useSelector((state) => state.orderDetail);

  const {
    loading: loadingUpdate,
    success,
    errorUpdate,
  } = useSelector((state) => state.orderUpdateStatus);

  useEffect(() => {
    if (error || errorUpdate) {
      toast.error(error || errorUpdate);
      dispatch(resetNotifications());
    }
  }, [error, dispatch, errorUpdate]);

  useEffect(() => {
    if (success) {
      toast.success('Commande livrée avec succès');
      dispatch(resetNotifications());
      dispatch(getOrderForAdminHandler(id));
    }
  }, [success]);

  useEffect(() => {
    if (!order || order._id !== id) {
      dispatch(getOrderForAdminHandler(id));
    }
  }, [id, order, dispatch, success]);

  if (loading || loadingUpdate) {
    return <Loader />;
  }

  const getAmountInCurrency = (total, currency) => {
    if (currency) {
      return currency.symbol + (total / currency.amount).toFixed(2);
    }
  };

  function handleClick(orderId) {
    if (
      window.confirm(
        'Etes vous sur(e) de vouloir marquer cette commande comme livrée ?'
      )
    ) {
      dispatch(updateOrderStatusHandler(orderId));
    }
  }

  return (
    <>
      <Head>
        <title>Commande {order && order._id}</title>
      </Head>
      <Link href='/admin/orders' className='my-3 btn btn-light'>
        <i className='fas fa-arrow-left'></i> Retour
      </Link>
      <Row className='align-items-center mb-4'>
        <h2>Commande {order && order._id}</h2>
      </Row>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Informations personnelles</h2>
              <p>
                <strong>Nom:</strong> {order && order.user && order.user.name}
              </p>
              <p>
                <strong>Email:</strong>{' '}
                {order && order.user && order.user.email}
              </p>
              <p>
                <strong>Status de livraison:</strong>{' '}
                {order && order.isDelivered ? (
                  <i className='fas fa-check' style={{ color: 'green' }}></i>
                ) : (
                  <i className='fas fa-times' style={{ color: 'red' }}></i>
                )}
              </p>
              <p>
                Livré le:{' '}
                {order &&
                  (order.isDelivered
                    ? convertDate(order.deliveryAt, {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour12: true,
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })
                    : 'N/A')}
              </p>
              <p>
                Adresse:{' '}
                {order && order.shippingAddress
                  ? order.shippingAddress.address
                  : 'N/A'}
              </p>
              <p>
                <strong>Date de commande:</strong>{' '}
                {order &&
                  convertDate(order.createdAt, {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour12: true,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Informations de paiement</h2>
              <p>
                <strong>Mode de paiement:</strong>{' '}
                {order && order.paymentMethod}
              </p>
              <p>
                <strong>Numéro de transaction:</strong>{' '}
                {order && order.transactionId}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Articles</h2>
              {order && order.products && (
                <ListGroup>
                  {order &&
                    order.products &&
                    order.products.map((item, i) => (
                      <ListGroup.Item key={i}>
                        <Row>
                          <Col>
                            <Link href={`/article/${item.productId}`}>
                              {item.name} (taille: {item.size}; couleur:
                              {item.color})
                            </Link>
                          </Col>
                          <Col md={6}>
                            {item.qty} x {item.price} = HTG{' '}
                            {item.qty * item.price} /{' '}
                            {getAmountInCurrency(
                              item.qty * item.price,
                              order.currency
                            )}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Résumé</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Articles:</Col>
                  <Col>
                    {order &&
                      order.products &&
                      order.products.reduce((acc, item) => acc + item.qty, 0)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Livraison:</Col>
                  <Col>
                    HTG {order && order.shippingPrice} /{' '}
                    {order &&
                      getAmountInCurrency(order.shippingPrice, order.currency)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Taxe:</Col>
                  <Col>
                    HTG {order && order.taxPrice} /{' '}
                    {order &&
                      getAmountInCurrency(order.taxPrice, order.currency)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Rabais:</Col>
                  <Col>
                    HTG {order && order.discountPrice} /{' '}
                    {order &&
                      getAmountInCurrency(order.discountPrice, order.currency)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>
                    HTG {order && order.totalPrice} /{' '}
                    {order &&
                      getAmountInCurrency(order.totalPrice, order.currency)}
                  </Col>
                </Row>
              </ListGroup.Item>
              {!order?.isDelivered && (
                <Button
                  type='button'
                  className='btn btn-block mt-2'
                  onClick={() => handleClick(order._id)}
                >
                  Marquer comme livrée
                </Button>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderInfos;
