import * as yup from 'yup';

const emailSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Ton email est obligatoire.')
    .email('Ton email est incorrect.'),
});

export default emailSchema;
