import { useEffect } from 'react';
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';

import Layout from '../components/Layout';
import { useMe } from '../context/userContext';
import { useCart } from '../context/cartContext';

const Panier = () => {
  const router = useRouter();
  const { productId, variantId, color, size, qty } = router.query;
  return (
    <Layout title='Panier'>
      <h1>Panier</h1>
    </Layout>
  );
};

export default Panier;
