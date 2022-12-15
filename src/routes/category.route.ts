import { Router } from 'express';

import {
  createCategoryHandler,
  deleteCategoryHandler,
  getCategoriesHandler,
  getCategoryHandler,
  updateCategoryHandler,
} from '../controllers/category.controller';
import {
  createCategorySchema,
  deleteCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} from '../schemas/category.schema';
import validate from '../middleware/validate';
import { authorize, requiredUser } from '../middleware/auth';
import { advancedResultSchema } from '../schemas/advancedResult.schema';
import cleanCache from '../middleware/cleanCache';
import productRouter from './product.route';

const router = Router();

router.use('/:categoryId/products', productRouter);

router.post(
  '/',
  requiredUser,
  authorize('admin'),
  validate(createCategorySchema),
  cleanCache,
  createCategoryHandler
);

router.get('/', validate(advancedResultSchema), getCategoriesHandler);

router
  .route('/:categoryId')
  .get(validate(getCategorySchema), getCategoryHandler)
  .put(
    requiredUser,
    authorize('admin'),
    validate(updateCategorySchema),
    cleanCache,
    updateCategoryHandler
  )
  .delete(
    requiredUser,
    authorize('admin'),
    validate(deleteCategorySchema),
    cleanCache,
    deleteCategoryHandler
  );

export default router;
