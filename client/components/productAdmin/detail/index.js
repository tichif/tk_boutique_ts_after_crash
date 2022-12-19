import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Col, Row, ListGroup, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../../utilities/Loader';
import {
  getProductHandler,
  resetNotifications,
} from '../../../redux/actions/product';
import Image from '../../utilities/Image';
import { convertMultipleWords } from '../../../utils/string';

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();

  const { loading, error, product } = useSelector(
    (state) => state.productDetail
  );

  const [image, setImage] = useState(process.env.NEXT_PUBLIC_LOGO_ADDRESS);
  const [height, setHeight] = useState(500);
  const [width, setWidth] = useState(500);
  const [alt, setAlt] = useState('TK Boutique');

  useEffect(() => {
    if (!product || product._id !== id) {
      dispatch(getProductHandler(id));
    }
  }, [product, id, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetNotifications());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (product && product.photoPrincipal && product.photoPrincipal.url) {
      setImage(product.photoPrincipal.url);
      setHeight(product.photoPrincipal.height / 2.5);
      setWidth(product.photoPrincipal.width / 2.5);
      setAlt(product.name);
    }
  }, [product]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>{product && convertMultipleWords(product.name)}</title>
      </Head>
      <Link href='/admin/products' className='my-3 btn btn-light'>
        <i className='fas fa-arrow-left'></i> Retour
      </Link>
      <Row>
        <Col md={6}>
          <Image value={image} height={height} width={width} alt={alt} />
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>
              <h3>{product && convertMultipleWords(product.name)}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                Catégorie:{' '}
                {product &&
                  product.category &&
                  convertMultipleWords(product.category.name)}
              </p>
              <p>
                <strong>Couleur</strong>: {product && product.color}
              </p>
              <p>
                <strong>Taille</strong>: {product && product.size}
              </p>
              <p>
                <strong>Prix</strong>: {product && product.price} HTG
              </p>
              <p>
                <strong>Quantité</strong>: {product && product.qty}
              </p>
            </ListGroup.Item>
            {product && product.description && (
              <ListGroup.Item>
                <h3>Description</h3>
                <p>{product && product.description}</p>
              </ListGroup.Item>
            )}
            <ListGroup.Item></ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductPage;
