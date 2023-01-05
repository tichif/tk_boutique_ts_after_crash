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
          </Row>
        </>
      )}
    </>
  );
};

export default ProductDetail;
