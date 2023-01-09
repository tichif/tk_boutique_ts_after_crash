import * as yup from 'yup';

const shippingSchema = yup.object().shape({
  address: yup
    .string()
    .trim()
    .required("L'adresse est obligatoire.")
    .min(5, "L'adresse est incorrect")
    .max(100, "L'adresse est incorrect."),
});

export default shippingSchema;
