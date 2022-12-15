import * as yup from 'yup';

const currencySchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Le nom de la devise est obligatoire')
    .min(3, 'Le nom de la devise doit contenir au moins 3 caratères.')
    .max(150, 'Le nom de la devise ne doit contenir pas plus 150 caractères.')
    .matches(/^[a-zA-ZÀ-ÿ-. ]*$/, 'Le nom de la devise est incorrect.'),
  symbol: yup
    .string()
    .trim()
    .required('Le symbole de la devise est obligatoire')
    .min(1, 'Le symbole de la devise doit contenir au moins 1 caratères.')
    .max(
      150,
      'Le symbole de la devise ne doit contenir pas plus 150 caractères.'
    ),
  amount: yup
    .number()
    .required('La valeur de la devise est obligatoire.')
    .min(1, 'La devise ne peut pas être inférieur ou égale à 0'),
});

export default currencySchema;
