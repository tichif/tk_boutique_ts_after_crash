import { Router } from 'express';

import {
  createCurrencyHandler,
  deleteCurrencyHandler,
  getCurrenciesHandler,
  getCurrencyHandler,
  getCurrencyPrincipalHandler,
  makeCurrencyPrincipalHandler,
  unmakeCurrencyPrincipalHandler,
  updateCurrencyHandler,
} from '../controllers/currency.controller';
import {
  createCurrencySchema,
  deleteCurrencySchema,
  getCurrencySchema,
  updateCurrencySchema,
} from '../schemas/currency.schema';
import validate from '../middleware/validate';
import { authorize, requiredUser } from '../middleware/auth';
import { advancedResultSchema } from '../schemas/advancedResult.schema';
import cleanCache from '../middleware/cleanCache';

const router = Router();

router.post(
  '/',
  requiredUser,
  authorize('admin'),
  validate(createCurrencySchema),
  cleanCache,
  createCurrencyHandler
);

router.get('/', validate(advancedResultSchema), getCurrenciesHandler);

router.get('/principal', getCurrencyPrincipalHandler);

router
  .route('/:currencyId')
  .get(validate(getCurrencySchema), getCurrencyHandler)
  .put(
    requiredUser,
    authorize('admin'),
    validate(updateCurrencySchema),
    cleanCache,
    updateCurrencyHandler
  )
  .delete(
    requiredUser,
    authorize('admin'),
    validate(deleteCurrencySchema),
    cleanCache,
    deleteCurrencyHandler
  );

router.patch(
  '/:currencyId/make-principal',
  requiredUser,
  authorize('admin'),
  validate(getCurrencySchema),
  cleanCache,
  makeCurrencyPrincipalHandler
);

router.patch(
  '/:currencyId/unmake-principal',
  requiredUser,
  authorize('admin'),
  validate(getCurrencySchema),
  cleanCache,
  unmakeCurrencyPrincipalHandler
);

export default router;
