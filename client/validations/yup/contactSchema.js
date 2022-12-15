import * as yup from 'yup';

const contactSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Ton nom est obligatoire')
    .min(5, 'Ton nom doit contenir au moins 5 caratères.')
    .max(150, 'Ton nom ne doit contenir pas plus 150 caractères.')
    .matches(/^[a-zA-ZÀ-ÿ-. ]*$/, 'Ton nom est incorrect.'),
  email: yup
    .string()
    .trim()
    .email('Ton email est incorrect.')
    .required('Ton email est obligatoire'),
  message: yup
    .string()
    .trim()
    .required('Ton message est obligatoire.')
    .min(10, 'Ton message doit contenir au moins 10 caractères.')
    .max(500, 'Ton message ne doit pas contenir plus de 500 caractères'),
});

export default contactSchema;
