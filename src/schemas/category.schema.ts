import { trim } from 'lodash';
import { string, object, TypeOf } from 'zod';

export const createCategorySchema = object({
  body: object({
    name: string({
      required_error: 'Le nom de la catégorie est obligatoire.',
    })
      .trim()
      .min(3, 'Le nom de la catégorie doit contenir au moins 3 caractères.')
      .max(
        50,
        'Le nom de la catégorie ne peut pas contenir plus de 50 caractères.'
      ),
  }),
});

export const getCategorySchema = object({
  params: object({
    categoryId: string({
      required_error: "L'ID de la catégorie est obligatoire.",
    }),
  }),
});

export const updateCategorySchema = object({
  params: object({
    categoryId: string({
      required_error: "L'ID de la catégorie est obligatoire.",
    }),
  }),
  body: object({
    name: string({
      required_error: 'Le nom de la catégorie est obligatoire.',
    })
      .trim()
      .min(3, 'Le nom de la catégorie doit contenir au moins 3 caractères.')
      .max(
        50,
        'Le nom de la catégorie ne peut pas contenir plus de 50 caractères.'
      ),
  }),
});

export const deleteCategorySchema = object({
  params: object({
    categoryId: string({
      required_error: "L'ID de la catégorie est obligatoire.",
    }),
  }),
});

export type CreateCategoryType = TypeOf<typeof createCategorySchema>['body'];
export type GetCategoryType = TypeOf<typeof getCategorySchema>['params'];
export type UpdateCategoryType = TypeOf<typeof updateCategorySchema>;
export type DeleteCategoryType = TypeOf<typeof deleteCategorySchema>['params'];
