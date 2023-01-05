import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Col, Row, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import Image from '../../../utilities/Image';
import { resetNotifications } from '../../../../redux/actions/product';
import { convertMultipleWords } from '../../../../utils/string';
import { getAmountInCurrency } from '../../../../utils/number';

const ProductDetail = () => {
  const dispatch = useDispatch();

  const { error, product } = useSelector((state) => state.productDetail);

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
    if (error) {
      toast.error(error);
      dispatch(resetNotifications());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (product) {
      if (product.photoPrincipal && product.photoPrincipal) {
        setImagePrincipal(product.photoPrincipal);
        setImageToShow(product.photoPrincipal);
        setAlt(product.name);
      }
      setSecondaryImages(product.photosSecondaries);
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

  function photoClicked(image) {
    setImageToShow(image);
  }

  // add product to cart
  function addToCart() {}

  // click variant
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
      {product && (
        <>
          <Head>
            <title>
              {product && convertMultipleWords(product.name)} | TK Boutique
            </title>
          </Head>
          <Link href='/shop' className='my-3 btn btn-light'>
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
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product && product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>
                    Catégorie:{' '}
                    {product &&
                      product.category &&
                      convertMultipleWords(product.category.name)}
                  </p>
                </ListGroup.Item>
                {product && product.description && (
                  <ListGroup.Item>
                    <h3>Description</h3>
                    <p>{product.description}</p>
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
                  </Row>
                  <Row>
                    {secondaryImages.length > 0
                      ? secondaryImages.map((image) => (
                          <Col
                            md={6}
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
                        ))
                      : product &&
                        product.photosSecondaries &&
                        product.photosSecondaries.length > 0 &&
                        product.photosSecondaries.map((image) => (
                          <Col
                            md={6}
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
                    <p className='mt-3'>
                      Cliquer sur une image pour l'afficher.
                    </p>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductDetail;
