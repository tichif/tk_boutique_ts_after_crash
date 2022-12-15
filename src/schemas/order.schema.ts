import { object, string, number, array, TypeOf } from 'zod';

export const createOrderSchema = object({
  body: object({
    products: array(
      object({
        productId: string({
          required_error: "L'ID du produit est obligatoire.",
        }).trim(),
        variantId: string().trim(),
        name: string({
          required_error: "Le nom de l'article est obligatoire.",
        }).trim(),
        size: string({
          required_error: "La taille de l'article est obligatoire.",
        }).trim(),
        color: string({
          required_error: "La couleur de l'article est obligatoire.",
        }).trim(),
        qty: number({
          required_error: "La quantité de l'article est obligatoire.",
        }).min(1, "La quantité de l'article ne peut pas être inférieur à 1."),
        price: number({
          required_error: "Le prix de l'article est obligatoire.",
        }).min(1, "Le prix de l'article ne peut pas être inférieur à 1."),
      }).partial({
        variantId: true,
      })
    ).min(1, 'La qantité de produit ne peut pas être inférieur à 1.'),
    paymentMethod: string({
      required_error: 'Le moyen de payment est obligatoire.',
    }).trim(),
    transactionId: string({
      required_error: "L'ID de transaction est obligatoire.",
    }).trim(),
    currency: object({
      name: string({
        required_error: 'Le nom de la devise est obligatoire.',
      }).trim(),
      symbol: string({
        required_error: 'Le symbole de la devise est obligatoire.',
      }).trim(),
      amount: number({
        required_error: 'La valeur de la devise est obligatoire.',
      }).min(1, 'La valeur de la devise  ne peut pas être inférieur à 1.'),
    }),
    taxPrice: number({
      required_error: 'Le montant de la taxe est obligatoire.',
    }).min(0),
    shippingPrice: number({
      required_error: 'Le montant de la livraison est obligatoire.',
    }).min(0),
    discountPrice: number({
      required_error: 'Le montant du rabais est obligatoire.',
    }).min(0),
    totalPrice: number({
      required_error: 'Le montant total est obligatoire.',
    }).min(0),
    shippingAddress: object({
      coordinates: object({
        lat: number(),
        lng: number(),
      }),
      address: string(),
    }),
  }).partial({
    shippingAddress: true,
  }),
});

export const getOrderByIdSchema = object({
  params: object({
    orderId: string({
      required_error: "L'ID de la commande est obligatoire",
    }),
  }),
});

export type CreateOrderType = TypeOf<typeof createOrderSchema>['body'];
export type GetOrderByIdType = TypeOf<typeof getOrderByIdSchema>['params'];
