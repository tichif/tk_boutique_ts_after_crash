import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { Form as FormikForm, Field, Formik, ErrorMessage } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import contactSchema from '../../../validations/yup/contactSchema';
import { contact } from '../../../validations/values/contact';
import Loader from '../../utilities/Loader';
import {
  contactHandler,
  resetNotifications,
} from '../../../redux/actions/contact';

const ContactForm = () => {
  const inputRef = useRef();

  const dispatch = useDispatch();
  const { loading, error, success, msg } = useSelector(
    (state) => state.contact
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
      toast.success(msg);
      dispatch(resetNotifications);
    }
  }, [error, success, dispatch, msg]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Formik
        initialValues={contact}
        validationSchema={contactSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          dispatch(contactHandler(values));
          setSubmitting(false);
          if (success) {
            resetForm(contact);
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
            <Form.Group controlId='subject' className='my-3'>
              <Form.Label>Sujet</Form.Label>
              <Form.Control
                type='text'
                placeholder='Entrez le but de votre message'
                name='subject'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.subject}
                className={
                  touched.subject && errors.subject ? 'is-invalid' : null
                }
              ></Form.Control>
              <ErrorMessage
                name='subject'
                component='p'
                className='my-2 text-danger'
              />
            </Form.Group>
            <Form.Group controlId='body' className='my-3'>
              <Form.Label>Message</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Message'
                rows={5}
                name='message'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message}
                className={
                  touched.message && errors.message ? 'is-invalid' : null
                }
              />
              <ErrorMessage
                name='message'
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
    </>
  );
};

export default ContactForm;
