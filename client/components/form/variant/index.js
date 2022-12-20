import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Form as FormikForm, Formik, ErrorMessage } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { variant as variantDefaultValues } from '../../../validations/values/product';
import { productVariantSchema } from '../../../validations/yup/productSchema';
import {
  createProductVariantHandler,
  resetNotifications,
  updateProductVariantHandler,
  getProductVariantHandler,
} from '../../../redux/actions/product';
import Loader from '../../utilities/Loader';
import Image from 'next/image';

const ProductForm = () => {
  const inputRef = useRef();

  const [imagePreview, setImagePreview] = useState();

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.productVariantCreate
  );
  const {
    loading: loadingDetail,
    variant,
    error: errorDetail,
  } = useSelector((state) => state.productVariantDetail);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
    message,
  } = useSelector((state) => state.productVariantUpdate);

  const router = useRouter();
  const { id, variantId } = router.query;

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (error || errorDetail || errorUpdate) {
      toast.error(error || errorDetail || errorUpdate);
      dispatch(resetNotifications());
    }
  }, [error, dispatch, errorDetail, errorUpdate]);

  useEffect(() => {
    if (success || successUpdate) {
      toast.success(message || 'variant créé avec succès.');
      dispatch(resetNotifications());
      setTimeout(() => {
        router.push(`/admin/products/${id}/variants`);
      }, 2000);
    }
  }, [success, dispatch, successUpdate, message]);

  useEffect(() => {
    if (id && variantId) {
      if (!variant || variant._id !== variantId) {
        dispatch(getProductVariantHandler(id, variantId));
      }
    }
  }, [id, variant, dispatch]);

  useEffect(() => {
    if (variant) {
      setImagePreview(variant.photoPrincipal.url);
    }
  }, [variant]);

  if (loading || loadingDetail || loadingUpdate) {
    return <Loader />;
  }

  return (
    <>
      <Formik
        initialValues={variant || variantDefaultValues}
        validationSchema={productVariantSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          if (variant) {
            dispatch(updateProductVariantHandler(id, variantId, values));
          } else {
            dispatch(createProductVariantHandler(id, values));
          }
          setSubmitting(false);
          if (success) {
            resetForm(variantDefaultValues);
          }
        }}
      >
        {({
          values,
          handleBlur,
          handleChange,
          errors,
          touched,
          setFieldValue,
        }) => (
          <FormikForm className='my-3'>
            <Form.Group controlId='colors' className='my-3'>
              <Form.Label>Couleur</Form.Label>
              <Form.Control
                type='text'
                placeholder="Entrez la couleur de l'article"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.color}
                className={touched.color && errors.color ? 'is-invalid' : null}
                name='color'
                ref={inputRef}
              ></Form.Control>
              <ErrorMessage
                name='color'
                component='p'
                className='my-2 text-danger'
              />
            </Form.Group>
            <Form.Group controlId='colors' className='my-3'>
              <Form.Label>Taille</Form.Label>
              <Form.Control
                type='text'
                placeholder="Entrez la taille de l'article"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.size}
                className={touched.size && errors.size ? 'is-invalid' : null}
                name='size'
              ></Form.Control>
              <ErrorMessage
                name='size'
                component='p'
                className='my-2 text-danger'
              />
            </Form.Group>
            <Form.Group controlId='price' className='my-3'>
              <Form.Label>Prix en HTG</Form.Label>
              <Form.Control
                type='number'
                placeholder='Entrez le prix'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
                className={touched.price && errors.price ? 'is-invalid' : null}
                name='price'
              ></Form.Control>
              <ErrorMessage
                name='price'
                component='p'
                className='my-2 text-danger'
              />
            </Form.Group>
            <Form.Group controlId='qty' className='my-3'>
              <Form.Label>Quantité</Form.Label>
              <Form.Control
                type='number'
                placeholder='Entrez la quantité'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.qty}
                className={touched.qty && errors.qty ? 'is-invalid' : null}
                name='qty'
              ></Form.Control>
              <ErrorMessage
                name='qty'
                component='p'
                className='my-2 text-danger'
              />
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='file'
                label='Custom file input'
                name='photoPrincipal'
                accept='image/*'
                onChange={(e) => {
                  const reader = new FileReader();
                  reader.onload = () => {
                    if (reader.readyState === 2) {
                      setImagePreview(reader.result);
                      setFieldValue('photoPrincipal', reader.result);
                    }
                  };
                  reader.readAsDataURL(e.target.files[0]);
                }}
              />
              <p>L'image ne doit pas dépaser 1MB.</p>
            </Form.Group>
            <div className='my-3'>
              {imagePreview && (
                <>
                  <p>Preview de l'image:</p>
                  <Image
                    src={imagePreview}
                    alt='image'
                    height={100}
                    width={100}
                  />
                </>
              )}
            </div>
            <Button type='submit' variant='primary'>
              {variant ? 'Editer' : 'Créer'}
            </Button>
          </FormikForm>
        )}
      </Formik>
    </>
  );
};

export default ProductForm;
