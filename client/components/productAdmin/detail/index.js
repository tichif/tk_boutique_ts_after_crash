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

  function photoClicked(photo) {
    setImage(photo.url);
    setHeight(photo.height / 2.5);
    setWidth(photo.width / 2.5);
  }

  return (
    <>
      <Head>
        <title>
          {product && convertMultipleWords(product.name)} | TK Boutique
        </title>
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
            {product && product.variant.length > 0 && (
              <ListGroup.Item>
                <h3>Variant</h3>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <h3>Photos</h3>
              <Row>
                <Col
                  md={3}
                  onClick={() =>
                    photoClicked(product && product.photoPrincipal)
                  }
                >
                  <Image
                    value={product && product.photoPrincipal.url}
                    width={product && product.photoPrincipal.width / 15}
                    height={product && product.photoPrincipal.height / 15}
                    src={product && product.name}
                  />
                </Col>
                {product &&
                  product.photosSecondaries.length > 0 &&
                  product.photosSecondaries.map((image) => (
                    <Col
                      md={3}
                      key={image.public_id}
                      onClick={() => photoClicked(image)}
                    >
                      <Image
                        value={image.url}
                        width={image.width / 15}
                        height={image.height / 15}
                        src={product && product.name}
                      />
                    </Col>
                  ))}
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductPage;
