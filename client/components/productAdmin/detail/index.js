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

  const [imageToShow, setImageToShow] = useState();
  const [alt, setAlt] = useState('TK Boutique');
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const [price, setPrice] = useState();
  const [qty, setQty] = useState();
  const [variantId, setVariantId] = useState();
  const [secondaryImages, setSecondaryImages] = useState([]);
  const [imagePrincipal, setImagePrincipal] = useState();

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
    if (product) {
      if (product.photoPrincipal && product.photoPrincipal) {
        setImagePrincipal(product.photoPrincipal);
        setImageToShow(product.photoPrincipal);
        setAlt(product.name);
      }
      // no variants and have price
      if (product.price && product.color && product.size && product.qty) {
        setPrice(product.price);
        setQty(product.qty);
        setColor(product.color);
        setSize(product.size);
      } else if (product.variant.length) {
        // have variant
        setPrice(product.variant[0].price);
        setQty(product.variant[0].qty);
        setColor(product.variant[0].color);
        setSize(product.variant[0].size);
        setSecondaryImages(product.variant[0].photosSecondaries);
      } else {
        // no variants and price
        setPrice(0);
        setQty(0);
        setColor('');
        setSize('');
      }
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

  function photoClicked(image) {
    setImageToShow(image);
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
      dispatch(deleteProductHandler(id));
    }
  }

  function clickHandler(variant) {
    setPrice(variant.price);
    setQty(variant.qty);
    setColor(variant.color);
    setSize(variant.size);
    setVariantId(variant._id);
    setImagePrincipal(variant.photoPrincipal);
    setSecondaryImages(variant.photosSecondaries);
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
          {imageToShow && (
            <Image
              value={imageToShow.url}
              height={imageToShow.height / 2.5}
              width={imageToShow.width / 2.5}
              alt={alt}
            />
          )}
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
                <strong>Couleur</strong>: {color}
              </p>
              <p>
                <strong>Taille</strong>: {size}
              </p>
              <p>
                <strong>Prix</strong>: {price} HTG
              </p>
              <p>
                <strong>Quantité</strong>: {qty}
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
                {imagePrincipal && (
                  <Col md={3} onClick={() => photoClicked(imagePrincipal)}>
                    <Image
                      value={imagePrincipal.url}
                      width={imagePrincipal.width / 15}
                      height={imagePrincipal.height / 15}
                      alt={product && product.name}
                    />
                  </Col>
                )}
                {secondaryImages.length > 0 &&
                  secondaryImages.map((image) => (
                    <Col
                      md={3}
                      key={image.public_id}
                      onClick={() => photoClicked(image)}
                      className='my-3'
                    >
                      <Image
                        value={image.url}
                        width={image.width / 15}
                        height={image.height / 15}
                        alt={product && product.name}
                      />
                    </Col>
                  ))}
                <p className='mt-3'>Cliquer sur une image pour l'afficher.</p>
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
