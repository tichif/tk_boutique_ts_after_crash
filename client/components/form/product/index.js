import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Form as FormikForm, Formik, ErrorMessage } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { product as productDefaultValues } from '../../../validations/values/product';
import { productSchema } from '../../../validations/yup/productSchema';
import {
  createProductHandler,
  resetNotifications,
  getProductHandler,
  updateProductHandler,
} from '../../../redux/actions/product';
import { listCategoriesHandler } from '../../../redux/actions/category';
import Loader from '../../utilities/Loader';
import { convertMultipleWords } from '../../../utils/string';
import Image from 'next/image';

const ProductForm = () => {
  const inputRef = useRef();

  const [imagePreview, setImagePreview] = useState();

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.productCreate
  );
  const { error: errorCategory, categories } = useSelector(
    (state) => state.categoryList
  );
  const {
    loading: loadingDetail,
    product,
    error: errorDetail,
  } = useSelector((state) => state.productDetail);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
    message,
  } = useSelector((state) => state.productUpdate);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    dispatch(listCategoriesHandler('select=name'));
  }, [dispatch]);

  useEffect(() => {
    if (error || errorCategory || errorDetail || errorUpdate) {
      toast.error(error || errorCategory || errorDetail || errorUpdate);
      dispatch(resetNotifications());
    }
  }, [error, dispatch, errorCategory, errorDetail, errorUpdate]);

  useEffect(() => {
    if (success || successUpdate) {
      toast.success(message || 'Article créé avec succès.');
      dispatch(resetNotifications());
      setTimeout(() => {
        router.push('/admin/products');
      }, 2000);
    }
  }, [success, dispatch, successUpdate, message]);

  useEffect(() => {
    if (id) {
      if (!product || product._id !== id) {
        dispatch(getProductHandler(id));
      }
    }
  }, [id, product, dispatch]);

  useEffect(() => {
    if (product) {
      setImagePreview(product.photoPrincipal.url);
    }
  }, [product]);

  if (loading || loadingDetail || loadingUpdate) {
    return <Loader />;
  }

  return (
    <>
      <Formik
        initialValues={
          (product && {
            name: product.name,
            price: product.price,
            qty: product.qty,
            color: product.color,
            size: product.size,
            description: product.description,
            category: product.category._id,
          }) ||
          productDefaultValues
        }
        validationSchema={productSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          if (product) {
            dispatch(updateProductHandler(id, values));
          } else {
            dispatch(createProductHandler(values));
          }
          setSubmitting(false);
          if (success || successUpdate) {
            resetForm(productDefaultValues);
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
            <Form.Group controlId='name' className='my-3'>
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type='text'
                name='name'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder="Entrez le nom de l'article"
                className={touched.name && errors.name ? 'is-invalid' : null}
                ref={inputRef}
              ></Form.Control>
              <ErrorMessage
                name='name'
                component='p'
                className='my-2 text-danger'
              />
            </Form.Group>
            <Form.Group controlId='category' className='my-3'>
              <Form.Label>Catégorie</Form.Label>
              <Form.Control
                as='select'
                className={touched.name && errors.name ? 'is-invalid' : null}
                name='category'
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value='' disabled>
                  Choisissez une catégorie
                </option>
                {categories &&
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {convertMultipleWords(category.name)}
                    </option>
                  ))}
              </Form.Control>
              <ErrorMessage
                name='category'
                component='p'
                className='my-2 text-danger'
              />
            </Form.Group>
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
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Entrez la description'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                className={
                  touched.description && errors.description
                    ? 'is-invalid'
                    : null
                }
                name='description'
                rows={5}
              ></Form.Control>
              <ErrorMessage
                name='description'
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
              {product ? 'Editer' : 'Créer'}
            </Button>
          </FormikForm>
        )}
      </Formik>
    </>
  );
};

export default ProductForm;
