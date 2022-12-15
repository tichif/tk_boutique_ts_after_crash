import * as yup from 'yup';

const profileSchema = yup.object().shape({
  name: yup
    .string()
    .required('Ton nom est obligatoire.')
    .min(5, 'Ton nom doit contenir au moins 5 caratères.')
    .max(150, 'Ton nom ne doit contenir pas plus 150 caractères.')
    .matches(/^[a-zA-ZÀ-ÿ-. ]*$/, 'Ton nom est incorrect'),
  email: yup
    .string()
    .trim()
    .required('Ton email est obligatoire.')
    .email('Ton email est incorrect.'),
  telephone: yup
    .string()
    .required('Ton numéro de téléphone est obligatoire.')
    .trim()
    .matches(/^\d{8}$/, 'Le numéro est incorrect.'),
  password: yup
    .string()
    .min(8, 'Ton mot de pase doit contenir au moins 8 caratctères.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Ton mot de passe doit contenir au moins un chiffre - au moins une lettre majuscule - au moins une lettre minuscule et un caractère spécial.'
    ),
  passwordConfirmation: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      'Les mots de passe ne sont pas identiques'
    ),
});

export default profileSchema;
