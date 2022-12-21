import * as yup from 'yup';

const productSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Le nom de l'article est obligatoire.")
    .min(3, "Le nom de l'article doit contenir au moins 3 caractères.")
    .max(50, "Le nom de l'article ne doit pas dépasser 50 caractères."),
  category: yup.string().required('La catégorie est obligatoire.'),
  description: yup.string(),
  price: yup
    .number()
    .min(0, "Le prix de l'article ne peut pas être inférieur à 0"),
  color: yup.string().min(1, 'La couleur est incorrect.'),
  size: yup.string().min(1, 'La dimension est incorrect.'),
  qty: yup
    .number()
    .min(0, "La quantité de l'article ne peut pas être inférieur à 0"),
  photoPrincipal: yup.string(),
});

const productVariantSchema = yup.object().shape({
  price: yup
    .number()
    .required("Le prix de l'article est obligatoire.")
    .min(0, "Le prix de l'article ne peut pas être inférieur à 0"),
  color: yup
    .string()
    .required("La couleur de l'article est obligatoire.")
    .min(1, 'La couleur est incorrect.'),
  size: yup
    .string()
    .required("La dimension de l'article est obligatoire.")
    .min(1, 'La dimension est incorrect.'),
  qty: yup
    .number()
    .required("La quantité de l'article est obligatoire.")
    .min(0, "La quantité de l'article ne peut pas être inférieur à 0"),
  photoPrincipal: yup.string(),
});

const productPhotoSchema = yup.object().shape({
  image: yup.string().required('La photo est obligatoire.'),
});

export { productSchema, productVariantSchema, productPhotoSchema };
