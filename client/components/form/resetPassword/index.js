import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form as FormikForm, Formik, ErrorMessage } from 'formik';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';

import passwordSchema from '../../../validations/yup/passwordSchema';
import { password } from '../../../validations/values/password';
import Loader from '../../utilities/Loader';
import {
  resetPasswordHandler,
  resetNotifications,
} from '../../../redux/actions/auth';

const ResetPasswordForm = () => {
  const { query } = useRouter();
  const { token } = query;

  const dispatch = useDispatch();
  const { loading, error, success, message } = useSelector(
    (state) => state.resetPassword
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetNotifications());
    }

    if (success) {
      toast.success(message);
      dispatch(resetNotifications);
    }
  }, [error, success, dispatch, message]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Formik
        initialValues={password}
        validationSchema={passwordSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          dispatch(resetPasswordHandler(token, values));
          setSubmitting(false);
          if (success) {
            resetForm(password);
          }
        }}
      >
        {({ values, handleBlur, handleChange, errors, touched }) => (
          <FormikForm className='my-3'>
            <Form.Group controlId='password' className='my-3'>
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type='password'
                placeholder='Entrez mot de passe'
                rows={5}
                name='password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className={
                  touched.password && errors.password ? 'is-invalid' : null
                }
              />
              <ErrorMessage
                name='password'
                component='p'
                className='my-2 text-danger'
              />
              <small>
                Le mot de passe doit contenir au moins un chiffre, au moins une
                lettre majuscule, au moins une lettre minuscule et un caractère
                spécial.
              </small>
            </Form.Group>
            <Form.Group controlId='passwordConfirmation' className='my-3'>
              <Form.Label>Confirmer mot de passe</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirmer mot de passe'
                rows={5}
                name='passwordConfirmation'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.passwordConfirmation}
                className={
                  touched.passwordConfirmation && errors.passwordConfirmation
                    ? 'is-invalid'
                    : null
                }
              />
              <ErrorMessage
                name='passwordConfirmation'
                component='p'
                className='my-2 text-danger'
              />
            </Form.Group>
            <Button type='submit' variant='primary'>
              Modifier le mot de passe
            </Button>
          </FormikForm>
        )}
      </Formik>
      <Row className='py-2'>
        <Col>
          <Link href='/se-connecter'>Se connecter</Link>
        </Col>
      </Row>
    </>
  );
};

export default ResetPasswordForm;
