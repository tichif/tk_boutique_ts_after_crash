import { object, number, TypeOf } from 'zod';

export const processStripePaymentSchema = object({
  body: object({
    amount: number({
      required_error: ' Le montant est obligatoire.',
    }).min(0, ' Le montant est incorrect'),
  }),
});

export type ProcessStripePaymentType = TypeOf<
  typeof processStripePaymentSchema
>['body'];
