import { object, number, TypeOf, string } from 'zod';

export const processMoncashPaymentSchema = object({
  body: object({
    amount: number({
      required_error: ' Le montant est obligatoire.',
    }).min(0, ' Le montant est incorrect'),
  }),
});

export const getMoncashPaymentSchema = object({
  params: object({
    transactionId: string({
      required_error: "L'ID de transaction est obligatoire",
    }),
  }),
});

export type ProcessMoncashPaymentType = TypeOf<
  typeof processMoncashPaymentSchema
>['body'];

export type GetMoncashPaymentType = TypeOf<
  typeof getMoncashPaymentSchema
>['params'];
