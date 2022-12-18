import { number, string, object, TypeOf, array } from 'zod';

export const createProductSchema = object({
  body: object({
    name: string({
      required_error: "Le nom de l'article est obligatoire.",
    })
      .trim()
      .min(3, "Le nom de l'article doit contenir au moins 3 caractères.")
      .max(50, "Le nom de l'article ne doit pas dépasser 50 caractères."),
    category: string({
      required_error: 'La catégorie est obligatoire.',
    }),
    description: string(),
    price: number().min(
      0,
      "Le prix de l'article ne peut pas être inférieur à 0"
    ),
    color: string().min(1, 'La couleur est incorrect.'),
    size: string().min(1, 'La dimension est incorrect.'),
    qty: number().min(
      0,
      "La quantité de l'article ne peut pas être inférieur à 0"
    ),
    photoPrincipal: string(),
  }).partial({
    photoPrincipal: true,
    color: true,
    size: true,
    price: true,
    qty: true,
  }),
});

export const getProductsRelatedSchema = object({
  params: object({
    productId: string({
      required_error: "L'ID de l'article est obligatoire",
    }),
    categoryId: string({
      required_error: "L'ID de l'article est obligatoire",
    }),
  }),
});

export const getProductSchema = object({
  params: object({
    productId: string({
      required_error: "L'ID de l'article est obligatoire",
    }),
  }),
  query: object({
    public_id: string(),
  }).partial({
    public_id: true,
  }),
});

export const getProductBySlugSchema = object({
  params: object({
    slug: string({
      required_error: "L'ID de l'article est obligatoire",
    }),
  }),
});

export const updateProductSchema = object({
  params: object({
    productId: string({
      required_error: "L'ID de l'article est obligatoire",
    }),
  }),
  body: object({
    name: string({
      required_error: "Le nom de l'article est obligatoire.",
    })
      .trim()
      .min(3, "La nom de l'article doit contenir au moins 3 caractères.")
      .max(50, "Le nom de l'article ne doit pas dépasser 50 caractères."),
    category: string({
      required_error: 'La catégorie est obligatoire.',
    }),
    description: string(),
    price: number().min(
      0,
      "Le prix de l'article ne peut pas être inférieur à 0"
    ),
    color: string().min(1, 'La couleur est incorrect.'),
    size: string().min(1, 'La dimension est incorrect.'),
    qty: number().min(
      0,
      "La quantité de l'article ne peut pas être inférieur à 0"
    ),
    photoPrincipal: string(),
  }).partial({
    photoPrincipal: true,
    color: true,
    size: true,
    price: true,
    qty: true,
  }),
});

export const addSecondaryPhotoToProductSchema = object({
  params: object({
    productId: string({
      required_error: "L'ID de l'article est obligatoire",
    }),
  }),
  body: object({
    image: string({
      required_error: "L'image est obligatoire",
    }),
  }),
});

export const addProductVariantSchema = object({
  params: object({
    productId: string({
      required_error: "L'ID de l'article est obligatoire",
    }),
  }),
  body: object({
    color: string({
      required_error: "La couleur de l'article est obligatoire.",
    }).min(1, 'La couleur est incorrect.'),
    size: string({
      required_error: "La dimension de l'article est obligatoire.",
    }).min(1, 'La dimension est incorrect.'),
    qty: number({
      required_error: "La quantité de l'article est obligatoire.",
    }).min(0, "La quantité de l'article ne peut pas être inférieur à 0"),
    price: number({
      required_error: "La quantité de l'article est obligatoire.",
    }).min(0, "La quantité de l'article ne peut pas être inférieur à 0"),
    photoPrincipal: string(),
  }).partial({
    photoPrincipal: true,
  }),
});

export const updateProductVariantSchema = object({
  params: object({
    productId: string({
      required_error: "L'ID de l'article est obligatoire",
    }),
    variantId: string({
      required_error: "L'ID du variant est obligatoire",
    }),
  }),
  body: object({
    color: string({
      required_error: "La couleur de l'article est obligatoire.",
    }).min(1, 'La couleur est incorrect.'),
    size: string({
      required_error: "La dimension de l'article est obligatoire.",
    }).min(1, 'La dimension est incorrect.'),
    qty: number({
      required_error: "La quantité de l'article est obligatoire.",
    }).min(0, "La quantité de l'article ne peut pas être inférieur à 0"),
    price: number({
      required_error: "La quantité de l'article est obligatoire.",
    }).min(0, "La quantité de l'article ne peut pas être inférieur à 0"),
    photoPrincipal: string(),
  }).partial({
    photoPrincipal: true,
  }),
});

export const getProductVariantSchema = object({
  params: object({
    productId: string({
      required_error: "L'ID de l'article est obligatoire",
    }),
    variantId: string({
      required_error: "L'ID du variant est obligatoire",
    }),
  }),
  query: object({
    public_id: string(),
  }).partial({
    public_id: true,
  }),
});

export const addSecondaryPhotoToProductVariantSchema = object({
  params: object({
    productId: string({
      required_error: "L'ID de l'article est obligatoire",
    }),
    variantId: string({
      required_error: "L'ID du variant est obligatoire",
    }),
  }),
  body: object({
    image: string({
      required_error: "L'image est obligatoire",
    }),
  }),
});

export const checkProductAvailabilitySchema = object({
  body: object({
    products: array(
      object({
        productId: string({
          required_error: "L'ID de l'article est obligatoire",
        }),
        variantId: string(),
        qty: number({
          required_error: "La quantité de l'article est obligatoire.",
        }).min(0, "La quantité de l'article ne peut pas être inférieur à 0"),
      }).partial({
        variantId: true,
      })
    ).nonempty('Pas de produits !!!!'),
  }),
});

export type CreateProductType = TypeOf<typeof createProductSchema>['body'];
export type GetProductType = TypeOf<typeof getProductSchema>;
export type GetProductsRelatedType = TypeOf<
  typeof getProductsRelatedSchema
>['params'];
export type GetProductBySlugType = TypeOf<
  typeof getProductBySlugSchema
>['params'];
export type UpdateProductType = TypeOf<typeof updateProductSchema>;
export type AddSecondaryPhotoToProductType = TypeOf<
  typeof addSecondaryPhotoToProductSchema
>;
export type AddProductVariantType = TypeOf<typeof addProductVariantSchema>;
export type UpdateProductVariantType = TypeOf<
  typeof updateProductVariantSchema
>;
export type GetProductVariantType = TypeOf<typeof getProductVariantSchema>;
export type AddSecondaryPhotoToProductVariantType = TypeOf<
  typeof addSecondaryPhotoToProductVariantSchema
>;
export type CheckProductAvailabilityType = TypeOf<
  typeof checkProductAvailabilitySchema
>['body'];
