import * as yup from 'yup';

const categorySchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Le nom de la catégorie est obligatoire')
    .min(3, 'Le nom de la catégorie doit contenir au moins 3 caratères.')
    .max(
      150,
      'Le nom de la catégorie ne doit contenir pas plus 150 caractères.'
    )
    .matches(/^[a-zA-ZÀ-ÿ-. ]*$/, 'Le nom de la catégorie est incorrect.'),
});

export default categorySchema;
