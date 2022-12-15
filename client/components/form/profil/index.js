import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form as FormikForm, Formik, ErrorMessage } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import profileSchema from '../../../validations/yup/profileSchema';
import { profile } from '../../../validations/values/profile';
import Loader from '../../utilities/Loader';
import {
  loadUserProfileHandler,
  resetNotifications,
  updateUserProfileHandler,
} from '../../../redux/actions/user';

const ProfileForm = () => {
  const dispatch = useDispatch();

  const { loading, error, user } = useSelector((state) => state.userProfile);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success,
  } = useSelector((state) => state.userProfileUpdate);

  useEffect(() => {
    dispatch(loadUserProfileHandler());
  }, [dispatch, success]);

  useEffect(() => {
    if (error || errorUpdate) {
      toast.error(error || errorUpdate);
      dispatch(resetNotifications());
    }

    if (success) {
      toast.success(success);
      dispatch(resetNotifications());
    }
  }, [error, dispatch, errorUpdate, success]);

  if (loading || loadingUpdate) {
    return <Loader />;
  }

  return (
    <>
      <Formik
        initialValues={
          user
            ? {
                name: user.name,
                email: user.email,
                telephone: user.telephone,
                password: '',
                passwordConfirmation: '',
              }
            : profile
        }
        validationSchema={profileSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          const data = {
            name: values.name,
            email: values.email,
            telephone: values.telephone,
            password: values.password ? values.password : undefined,
            passwordConfirmation: values.passwordConfirmation
              ? values.passwordConfirmation
              : undefined,
          };
          dispatch(updateUserProfileHandler(data));
          setSubmitting(false);
          // if (success) {
          //   resetForm(profile);
          // }
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
                readOnly
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
              Modifier
            </Button>
          </FormikForm>
        )}
      </Formik>
    </>
  );
};

export default ProfileForm;
