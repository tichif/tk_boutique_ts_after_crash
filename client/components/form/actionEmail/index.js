import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { Form as FormikForm, Formik, ErrorMessage } from 'formik';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';

import emailSchema from '../../../validations/yup/emailSchema';
import { emailDefaultValues } from '../../../validations/values/email';
import Loader from '../../utilities/Loader';
import {
  resendActivationEMailHandler,
  sendResetPasswordEMailHandler,
  resetNotifications,
} from '../../../redux/actions/auth';

const ActionEmailForm = ({ resetPassword }) => {
  const inputRef = useRef();

  const dispatch = useDispatch();
  const { loading, error, success, message } = useSelector(
    (state) => state.resendActivationEmail
  );

  const {
    loading: loadingReset,
    error: errorReset,
    success: successReset,
    message: messageReset,
  } = useSelector((state) => state.sendResetPasswordEmail);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (error || errorReset) {
      toast.error(error || errorReset);
      dispatch(resetNotifications());
    }

    if (success || successReset) {
      toast.success(message || messageReset);
      dispatch(resetNotifications());
    }
  }, [
    error,
    success,
    dispatch,
    message,
    errorReset,
    successReset,
    messageReset,
  ]);

  if (loading || loadingReset) {
    return <Loader />;
  }

  return (
    <>
      <Formik
        initialValues={emailDefaultValues}
        validationSchema={emailSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          dispatch(
            resetPassword
              ? sendResetPasswordEMailHandler(values)
              : resendActivationEMailHandler(values)
          );
          setSubmitting(false);
          if (success || successReset) {
            resetForm(emailDefaultValues);
          }
        }}
      >
        {({ values, handleBlur, handleChange, errors, touched }) => (
          <FormikForm className='my-3'>
            <Form.Group controlId='email' className='my-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Entrez email'
                name='email'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className={touched.email && errors.email ? 'is-invalid' : null}
                ref={inputRef}
              ></Form.Control>
              <ErrorMessage
                name='email'
                component='p'
                className='my-2 text-danger'
              />
            </Form.Group>

            <Button type='submit' variant='primary'>
              Envoyer
            </Button>
          </FormikForm>
        )}
      </Formik>
      <Row className='py-2'>
        <Col>
          Pas de compte ? <Link href='/creer-compte'>Créer un compte</Link>
        </Col>
      </Row>
      <Row className='py-2'>
        <Col>
          <Link href='/se-connecter'>Se connecter</Link>
        </Col>
      </Row>
    </>
  );
};

ActionEmailForm.defaultProps = {
  resetPassword: false,
};

export default ActionEmailForm;
