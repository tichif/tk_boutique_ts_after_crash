import { object, string, TypeOf } from 'zod';

export const shippingSchema = object({
  body: object({
    address: string({
      required_error: "L'adresse est obligatoire.",
    })
      .trim()
      .min(5, "L'adresse est incorrect")
      .max(100, "L'adresse est incorrect."),
  }),
});

export type ShippingType = TypeOf<typeof shippingSchema>['body'];
