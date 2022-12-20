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
  deleteProductHandler,
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
  const {
    loading: loadingDelete,
    error: errorDelete,
    success,
  } = useSelector((state) => state.productDelete);

  const [image, setImage] = useState(process.env.NEXT_PUBLIC_LOGO_ADDRESS);
  const [height, setHeight] = useState(500);
  const [width, setWidth] = useState(500);
  const [alt, setAlt] = useState('TK Boutique');

  useEffect(() => {
    if (!product || product._id !== id) {
      dispatch(getProductHandler(id));
    }
  }, [product, id, dispatch, errorDelete]);

  useEffect(() => {
    if (error || errorDelete) {
      toast.error(error || errorDelete);
      dispatch(resetNotifications());
    }
  }, [error, dispatch, errorDelete]);

  useEffect(() => {
    if (product && product.photoPrincipal && product.photoPrincipal.url) {
      setImage(product.photoPrincipal.url);
      setHeight(product.photoPrincipal.height / 2.5);
      setWidth(product.photoPrincipal.width / 2.5);
      setAlt(product.name);
    }
  }, [product]);

  useEffect(() => {
    if (success) {
      dispatch(resetNotifications());
      router.push('/admin/products');
    }
  }, [success, dispatch]);

  if (loading || loadingDelete) {
    return <Loader />;
  }

  function photoClicked(photo) {
    setImage(photo.url);
    setHeight(photo.height / 2.5);
    setWidth(photo.width / 2.5);
  }

  function goToVariants(id) {
    router.push(`/admin/products/${id}/variants`);
  }

  function goToEdit(id) {
    router.push(`/admin/products/${id}/edit`);
  }

  function goToImages(id) {
    router.push(`/admin/products/${id}/images`);
  }

  function deleteHandler(id) {
    if (
      window.confirm(
        'Etes vous sur(e) de vouloir supprimer cette article ? Cette action peut occasionner un dysfonctionnement du site.'
      )
    ) {
      deleteProductHandler(id);
    }
  }

  function clickHandler(variant) {
    console.log(variant);
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
                {product.variant.map((v) => (
                  <Button
                    key={v._id}
                    onClick={() => clickHandler(v)}
                    className='btn-block'
                  >
                    {v.color} / {v.size}
                  </Button>
                ))}
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <h3>Photos</h3>
              <Row>
                {product && product.photoPrincipal && (
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
                )}
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
        <Col md={3}>
          <Card>
            <Button
              variant='success'
              className='btn-md'
              onClick={() => goToImages(product && product._id)}
            >
              <i className='far fa-eye'></i> Voir Photos
            </Button>
            <Button
              variant='warning'
              className='btn-md mt-2'
              onClick={() => goToEdit(product && product._id)}
            >
              <i className='fas fa-edit'></i> Editer
            </Button>
            {product &&
              (!product.qty ||
                !product.size ||
                !product.color ||
                !product.price) && (
                <Button
                  variant='info'
                  className='btn-md mt-2'
                  onClick={() => goToVariants(product && product._id)}
                >
                  <i className='fas fa-eye'></i> Voir variants
                </Button>
              )}
            <Button
              variant='danger'
              className='btn-md mt-2'
              onClick={() => deleteHandler(product && product._id)}
            >
              <i className='fas fa-trash'></i> Supprimer
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductPage;
