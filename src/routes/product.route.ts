import { Router } from 'express';

import validate from '../middleware/validate';
import {
  createProductHandler,
  getProductHandler,
  getProductsHandler,
  getProductBySlugHandler,
  updateProductHandler,
  deleteProductHandler,
  getProductsRelatedHandler,
  addSecondaryPhotoToProductHandler,
  getProductSecondaryPhotosHandler,
  deletePublicSecondaryForProductHandler,
  addProductVariantHandler,
  getProductVariantHandler,
  getSpecificProductVariantHandler,
  updateSpecificProductVariantHandler,
  deleteSpecificProductVariantHandler,
  addSecondaryPhotoToProductVariantHandler,
  deleteSecondaryPhotoToProductVariantHandler,
  getSecondaryPhotosToProductVariantHandler,
  checkProductAvailabilityHandler,
} from '../controllers/product.controller';
import {
  createProductSchema,
  getProductSchema,
  getProductBySlugSchema,
  updateProductSchema,
  getProductsRelatedSchema,
  addSecondaryPhotoToProductSchema,
  addProductVariantSchema,
  getProductVariantSchema,
  updateProductVariantSchema,
  addSecondaryPhotoToProductVariantSchema,
  checkProductAvailabilitySchema,
} from '../schemas/product.schema';
import { authorize, requiredUser } from '../middleware/auth';
import { advancedResultSchema } from '../schemas/advancedResult.schema';
import cleanCache from '../middleware/cleanCache';

const router = Router({ mergeParams: true });

router
  .route('/')
  .post(
    requiredUser,
    authorize('admin'),
    validate(createProductSchema),
    cleanCache,
    createProductHandler
  )
  .get(validate(advancedResultSchema), getProductsHandler);

router.post(
  '/products-available',
  validate(checkProductAvailabilitySchema),
  checkProductAvailabilityHandler
);

router.get(
  '/get/:slug',
  validate(getProductBySlugSchema),
  getProductBySlugHandler
);

router
  .route('/:productId')
  .get(validate(getProductSchema), getProductHandler)
  .put(
    requiredUser,
    authorize('admin'),
    validate(updateProductSchema),
    cleanCache,
    updateProductHandler
  )
  .delete(
    requiredUser,
    authorize('admin'),
    validate(getProductSchema),
    cleanCache,
    deleteProductHandler
  );

router
  .route('/:productId/photos')
  .put(
    requiredUser,
    authorize('admin'),
    validate(addSecondaryPhotoToProductSchema),
    cleanCache,
    addSecondaryPhotoToProductHandler
  )
  .get(validate(getProductSchema), getProductSecondaryPhotosHandler)
  .delete(
    requiredUser,
    authorize('admin'),
    validate(getProductSchema),
    cleanCache,
    deletePublicSecondaryForProductHandler
  );

router
  .route('/:productId/variants')
  .put(
    requiredUser,
    authorize('admin'),
    validate(addProductVariantSchema),
    cleanCache,
    addProductVariantHandler
  )
  .get(validate(getProductSchema), getProductVariantHandler);

router
  .route('/:productId/variants/:variantId')
  .get(validate(getProductVariantSchema), getSpecificProductVariantHandler)
  .put(
    requiredUser,
    authorize('admin'),
    validate(updateProductVariantSchema),
    cleanCache,
    updateSpecificProductVariantHandler
  )
  .delete(
    requiredUser,
    authorize('admin'),
    validate(getProductVariantSchema),
    cleanCache,
    deleteSpecificProductVariantHandler
  );

router
  .route('/:productId/variants/:variantId/photos')
  .put(
    requiredUser,
    authorize('admin'),
    validate(addSecondaryPhotoToProductVariantSchema),
    cleanCache,
    addSecondaryPhotoToProductVariantHandler
  )
  .delete(
    requiredUser,
    authorize('admin'),
    validate(getProductVariantSchema),
    cleanCache,
    deleteSecondaryPhotoToProductVariantHandler
  )
  .get(
    validate(getProductVariantSchema),
    getSecondaryPhotosToProductVariantHandler
  );

router.get(
  '/:productId/:categoryId/related',
  validate(getProductsRelatedSchema),
  getProductsRelatedHandler
);

export default router;
