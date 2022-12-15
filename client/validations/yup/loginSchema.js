import * as yup from 'yup';

const registerSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Ton email est obligatoire.')
    .email('Ton email est incorrect.'),
  password: yup.string().required('Ton mot de passe est obligatoire.'),
});

export default registerSchema;
