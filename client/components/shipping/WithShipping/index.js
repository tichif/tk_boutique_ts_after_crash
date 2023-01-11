import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Formik, ErrorMessage, Form as FormikForm } from 'formik';
import { Form, Button } from 'react-bootstrap';

import Loader from '../../utilities/Loader';
import { useOrder } from '../../../context/orderContext';
import {
  getShippingHandler,
  resetNotifications,
} from '../../../redux/actions/shipping';
import { shippingDefaultValues } from '../../../validations/values/shipping';
import shippingSchema from '../../../validations/yup/shippingSchema';
import FormContainer from '../../utilities/FormContainer';

const WithShipping = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [address, setAddress] = useState('');

  const { addShippingInfos } = useOrder();

  const { loading, success, infos, error } = useSelector(
    (state) => state.shippingDetail
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetNotifications());
    }
  }, [error, dispatch]);

  function clickHandler() {
    if (infos) {
      addShippingInfos({
        address,
        price: infos.price,
        lat: infos.latitude,
        lng: infos.longitude,
      });
      router.push('/methode-paiement');
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <p>
        Pour avoir le prix de livraison, entrez l'adresse de livraison dans le
        formulaire suivant:
      </p>
      <FormContainer>
        <Formik
          initialValues={shippingDefaultValues}
          validationSchema={shippingSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            dispatch(getShippingHandler(values));
            setAddress(values.address);
            setSubmitting(false);
            if (success) {
              resetForm();
            }
          }}
        >
          {({ values, handleBlur, handleChange, errors, touched }) => (
            <FormikForm className='my-3'>
              <Form.Group controlId='address' className='my-3'>
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  type='text'
                  placeholder="Entrez l'adresse de livraison"
                  name='address'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  className={
                    touched.address && errors.address ? 'is-invalid' : null
                  }
                ></Form.Control>
                <ErrorMessage
                  name='address'
                  component='p'
                  className='my-2 text-danger'
                />
              </Form.Group>

              <Button type='submit' variant='primary'>
                Vérifier
              </Button>
            </FormikForm>
          )}
        </Formik>
        {success && (
          <>
            <div className='mt-3'>
              <p>Le prix de livraison est: HTG {infos.price} </p>
            </div>
            <Button
              variant='success'
              disabled={!success || error}
              className='mt-3 ml-auto'
              onClick={clickHandler}
            >
              Continuer <i className='fas fa-arrow-right'></i>
            </Button>
          </>
        )}
      </FormContainer>
    </>
  );
};

export default WithShipping;
