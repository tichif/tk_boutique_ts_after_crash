import { useEffect } from 'react';
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import Layout from '../components/Layout';
import { useMe } from '../context/userContext';
import { useCart } from '../context/cartContext';
// import { addToCart } from '../redux/actions/cart';

const Panier = () => {
  const router = useRouter();
  const { productId, variantId, qty } = router.query;

  // const dispatch = useDispatch();

  // const { cartItems } = useSelector((state) => state.cart);

  const { state, addToCart } = useCart();

  useEffect(() => {
    if (productId || qty) {
      // dispatch(addToCart(productId, variantId, qty));
      addToCart(productId, variantId, qty);
    }
  }, [productId, variantId, qty]);
  return (
    <Layout title='Panier'>
      <h1>Panier</h1>
      {JSON.stringify(state.cart)}
    </Layout>
  );
};

export default Panier;
