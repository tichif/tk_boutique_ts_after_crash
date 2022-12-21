import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Form as FormikForm, Formik, ErrorMessage } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { photo as photoDefaultValues } from '../../../validations/values/product';
import { productPhotoSchema } from '../../../validations/yup/productSchema';
import {
  addProductPhotoHandler,
  resetNotifications,
  addProductVariantPhotoHandler,
} from '../../../redux/actions/product';
import Loader from '../../utilities/Loader';

const ProductForm = () => {
  const [imagePreview, setImagePreview] = useState();

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.productPhotoCreate
  );

  const router = useRouter();
  const { id, variantId } = router.query;

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetNotifications());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success) {
      toast.success('Photo ajoutée avec succès.');
      dispatch(resetNotifications());
      setTimeout(() => {
        if (variantId) {
          router.push(`/admin/products/${id}/variants/${variantId}/images`);
        } else {
          router.push(`/admin/products/${id}/images`);
        }
      }, 2000);
    }
  }, [success, dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Formik
        initialValues={photoDefaultValues}
        validationSchema={productPhotoSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          if (variantId) {
            dispatch(addProductVariantPhotoHandler(id, variantId, values));
          } else {
            dispatch(addProductPhotoHandler(id, values));
          }
          setSubmitting(false);
          setImagePreview();
          if (success) {
            resetForm(photoDefaultValues);
          }
        }}
      >
        {({ setFieldValue }) => (
          <FormikForm className='my-3'>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='file'
                label='Custom file input'
                name='image'
                accept='image/*'
                onChange={(e) => {
                  const reader = new FileReader();
                  reader.onload = () => {
                    if (reader.readyState === 2) {
                      setImagePreview(reader.result);
                      setFieldValue('image', reader.result);
                    }
                  };
                  reader.readAsDataURL(e.target.files[0]);
                }}
              />
              <ErrorMessage
                name='image'
                component='p'
                className='my-2 text-danger'
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
              Ajouter
            </Button>
          </FormikForm>
        )}
      </Formik>
    </>
  );
};

export default ProductForm;
