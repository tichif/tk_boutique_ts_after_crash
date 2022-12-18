import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { Form as FormikForm, Formik, ErrorMessage } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { category as categoryDefaultValues } from '../../../validations/values/category';
import categorySchema from '../../../validations/yup/categorySchema';
import {
  createCategoryHandler,
  resetNotifications,
  getCategoryHandler,
  updateCategoryHandler,
} from '../../../redux/actions/category';
import Loader from '../../utilities/Loader';

const CategoryForm = () => {
  const inputRef = useRef();

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.categoryCreate
  );
  const {
    loading: loadingDetail,
    category,
    error: errorDetail,
  } = useSelector((state) => state.categoryDetail);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
    message,
  } = useSelector((state) => state.categoryUpdate);

  const router = useRouter();
  const { id } = router.query;

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
      toast.success(message || 'Catégorie créée avec succès.');
      dispatch(resetNotifications());
      setTimeout(() => {
        router.push('/admin/categories');
      }, 2000);
    }
  }, [success, dispatch, successUpdate, message]);

  useEffect(() => {
    if (id) {
      if (!category || category._id !== id) {
        dispatch(getCategoryHandler(id));
      }
    }
  }, [id, category, dispatch]);

  if (loading || loadingDetail || loadingUpdate) {
    return <Loader />;
  }

  return (
    <>
      <Formik
        initialValues={category || categoryDefaultValues}
        validationSchema={categorySchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          if (category) {
            dispatch(updateCategoryHandler(id, values));
          } else {
            dispatch(createCategoryHandler(values));
          }
          setSubmitting(false);
          if (success || successUpdate) {
            resetForm(categoryDefaultValues);
          }
        }}
      >
        {({ values, handleBlur, handleChange, errors, touched }) => (
          <FormikForm className='my-3'>
            <Form.Group controlId='name' className='my-3'>
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type='text'
                name='name'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder='Entrez le nom de la catégorie'
                className={touched.name && errors.name ? 'is-invalid' : null}
                ref={inputRef}
              ></Form.Control>
              <ErrorMessage
                name='name'
                component='p'
                className='my-2 text-danger'
              />
            </Form.Group>

            <Button type='submit' variant='primary'>
              {category ? 'Modifier' : 'Créer'}
            </Button>
          </FormikForm>
        )}
      </Formik>
    </>
  );
};

export default CategoryForm;
