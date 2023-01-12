import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { Form as FormikForm, Formik, ErrorMessage } from 'formik';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

import loginSchema from '../../../validations/yup/loginSchema';
import { login } from '../../../validations/values/login';
import Loader from '../../utilities/Loader';
import { loginHandler, resetNotifications } from '../../../redux/actions/auth';
import { useMe } from '../../../context/userContext';

const LoginForm = () => {
  const inputRef = useRef();

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.authLogin);

  const { loading: loadingMe, user, refetchUser } = useMe();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const router = useRouter();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetNotifications());
    }

    if (success) {
      dispatch(resetNotifications());
      refetchUser();
      window.location.href = '/profil';
    }
  }, [error, success, dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Formik
        initialValues={login}
        validationSchema={loginSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          dispatch(loginHandler(values));
          setSubmitting(false);
          if (success) {
            resetForm(login);
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
            </Form.Group>

            <Button type='submit' variant='primary'>
              Se connecter
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
          <Link href='/auth/mot-de-passe-oublie'>Mot de passe oublié ?</Link>
        </Col>
      </Row>
    </>
  );
};

export default LoginForm;
