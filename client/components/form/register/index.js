import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { Form as FormikForm, Formik, ErrorMessage } from 'formik';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';

import registerSchema from '../../../validations/yup/registerSchema';
import { register } from '../../../validations/values/register';
import Loader from '../../utilities/Loader';
import {
  registerUserHandler,
  resetNotifications,
} from '../../../redux/actions/auth';

const RegisterForm = () => {
  const inputRef = useRef();

  const dispatch = useDispatch();
  const { loading, error, success, message } = useSelector(
    (state) => state.userRegister
  );

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
        initialValues={register}
        validationSchema={registerSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          dispatch(registerUserHandler(values));
          setSubmitting(false);
          if (success) {
            resetForm(register);
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
                placeholder='Entrez le nom'
                className={touched.name && errors.name ? 'is-invalid' : null}
                ref={inputRef}
              ></Form.Control>
              <ErrorMessage
                name='name'
                component='p'
                className='my-2 text-danger'
              />
            </Form.Group>
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
              ></Form.Control>
              <ErrorMessage
                name='email'
                component='p'
                className='my-2 text-danger'
              />
            </Form.Group>
            <Form.Group controlId='telephone' className='my-3'>
              <Form.Label>Téléphone (de format: 55555555)</Form.Label>
              <Form.Control
                type='text'
                placeholder='Entrez le numéro de téléphone'
                name='telephone'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.telephone}
                className={
                  touched.telephone && errors.telephone ? 'is-invalid' : null
                }
              ></Form.Control>
              <ErrorMessage
                name='telephone'
                component='p'
                className='my-2 text-danger'
              />
            </Form.Group>
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
              Créer compte
            </Button>
          </FormikForm>
        )}
      </Formik>
      <Row className='py-2'>
        <Col>
          En appuyant sur Créer, vous acceptez notre{' '}
          <Link href='/politique-de-confidentialite'>
            Politique de Confidentialité
          </Link>
        </Col>
        <Col>
          Vous avez un compte ? <Link href='se-connecter'>Se connecter</Link>
        </Col>
      </Row>
    </>
  );
};

export default RegisterForm;
