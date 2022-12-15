import { trim } from 'lodash';
import { string, object, number, boolean, TypeOf } from 'zod';

export const createCurrencySchema = object({
  body: object({
    name: string({
      required_error: 'Le nom de la devise est obligatoire.',
    })
      .trim()
      .min(3, 'Le nom de la devise doit contenir au moins 3 caractères.')
      .max(
        50,
        'Le nom de la devise ne peut pas contenir plus de 50 caractères.'
      ),
    amount: number({
      required_error: 'La valeur de la devise est obligatoire.',
    }).gte(0, 'La devise ne peut pas être inférieur ou égale à 0'),
    symbol: string({
      required_error: 'Le symbole est obligatoire.',
    })
      .trim()
      .max(50, "'Le symbole ne peut pas contenir plus de 50 caractères."),
  }),
});

export const getCurrencySchema = object({
  params: object({
    currencyId: string({
      required_error: "L'ID de la devise est obligatoire.",
    }),
  }),
});

export const updateCurrencySchema = object({
  params: object({
    currencyId: string({
      required_error: "L'ID de la devise est obligatoire.",
    }),
  }),
  body: object({
    name: string({
      required_error: 'Le nom de la devise est obligatoire.',
    })
      .trim()
      .min(3, 'Le nom de la devise doit contenir au moins 3 caractères.')
      .max(
        50,
        'Le nom de la devise ne peut pas contenir plus de 50 caractères.'
      ),
    amount: number({
      required_error: 'La valeur de la devise est obligatoire.',
    }).gte(0, 'La devise ne peut pas être inférieur ou égale à 0'),
    symbol: string({
      required_error: 'Le symbole est obligatoire.',
    })
      .trim()
      .max(50, "'Le symbole ne peut pas contenir plus de 50 caractères."),
  }),
});

export const deleteCurrencySchema = object({
  params: object({
    currencyId: string({
      required_error: "L'ID de la devise est obligatoire.",
    }),
  }),
});

export type CreateCurrencyType = TypeOf<typeof createCurrencySchema>['body'];
export type GetCurrencyType = TypeOf<typeof getCurrencySchema>['params'];
export type UpdateCurrencyType = TypeOf<typeof updateCurrencySchema>;
export type DeleteCurrencyType = TypeOf<typeof deleteCurrencySchema>['params'];
