import * as yup from 'yup';

const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Ton mot de passe est obligatoire.')
    .min(8, 'Ton mot de pase doit contenir au moins 8 caratctères.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Ton mot de passe doit contenir au moins un chiffre - au moins une lettre majuscule - au moins une lettre minuscule et un caractère spécial.'
    ),
  passwordConfirmation: yup
    .string()
    .required('Tu dois confirmer ton mot de passe !!!')
    .oneOf(
      [yup.ref('password'), null],
      'Les mots de passe ne sont pas identiques'
    ),
});

export default passwordSchema;
