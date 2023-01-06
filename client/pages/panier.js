import { useEffect } from 'react';
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import Layout from '../components/Layout';
import { useMe } from '../context/userContext';
import { addToCart } from '../redux/actions/cart';

const Panier = () => {
  const router = useRouter();
  const { productId, variantId, qty } = router.query;

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (productId || qty) {
      dispatch(addToCart(productId, variantId, qty));
    }
  }, [productId, variantId, qty, dispatch]);
  return (
    <Layout title='Panier'>
      <h1>Panier</h1>
      {JSON.stringify(cartItems)}
    </Layout>
  );
};

export default Panier;
