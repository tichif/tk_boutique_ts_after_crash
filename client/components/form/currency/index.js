import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { Form as FormikForm, Formik, ErrorMessage } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { currency as currencyDefaultValues } from '../../../validations/values/currency';
import currencySchema from '../../../validations/yup/currencySchema';
import {
  createCurrencyHandler,
  resetNotifications,
  getCurrencyHandler,
  updateCurrencyHandler,
} from '../../../redux/actions/currency';
import Loader from '../../utilities/Loader';

const CurrencyForm = () => {
  const inputRef = useRef();

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.currencyCreate
  );
  const {
    loading: loadingDetail,
    currency,
    error: errorDetail,
  } = useSelector((state) => state.currencyDetail);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
    message,
  } = useSelector((state) => state.currencyUpdate);

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
      toast.success(message || 'Devise créée avec succès.');
      dispatch(resetNotifications());
      setTimeout(() => {
        router.push('/admin/currencies');
      }, 2000);
    }
  }, [success, dispatch, successUpdate]);

  useEffect(() => {
    if (id) {
      if (!currency || currency._id !== id) {
        dispatch(getCurrencyHandler(id));
      }
    }
  }, [id, currency, dispatch]);

  if (loading || loadingDetail || loadingUpdate) {
    return <Loader />;
  }

  return (
    <>
      <Formik
        initialValues={currency || currencyDefaultValues}
        validationSchema={currencySchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          if (currency) {
            dispatch(updateCurrencyHandler(id, values));
          } else {
            dispatch(createCurrencyHandler(values));
          }
          setSubmitting(false);
          if (success || successUpdate) {
            resetForm(currencyDefaultValues);
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
                placeholder='Entrez le nom de la devise'
                className={touched.name && errors.name ? 'is-invalid' : null}
                ref={inputRef}
              ></Form.Control>
              <ErrorMessage
                name='name'
                component='p'
                className='my-2 text-danger'
              />
            </Form.Group>
            <Form.Group controlId='symbol' className='my-3'>
              <Form.Label>Symbole</Form.Label>
              <Form.Control
                type='text'
                name='symbol'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.symbol}
                placeholder='Entrez le symbole de la devise'
                className={
                  touched.symbol && errors.symbol ? 'is-invalid' : null
                }
              ></Form.Control>
              <ErrorMessage
                name='symbol'
                component='p'
                className='my-2 text-danger'
              />
            </Form.Group>
            <Form.Group controlId='amount' className='my-3'>
              <Form.Label>Valeur</Form.Label>
              <Form.Control
                type='number'
                name='amount'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.amount}
                placeholder='Entrez la valeur de la devise en gourdes'
                className={
                  touched.amount && errors.amount ? 'is-invalid' : null
                }
              ></Form.Control>
              <ErrorMessage
                name='amount'
                component='p'
                className='my-2 text-danger'
              />
            </Form.Group>

            <Button type='submit' variant='primary'>
              {currency ? 'Editer' : 'Créer'}
            </Button>
          </FormikForm>
        )}
      </Formik>
    </>
  );
};

export default CurrencyForm;
