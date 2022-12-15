import { Router } from 'express';

import validate from '../middleware/validate';
import { requiredUser } from '../middleware/auth';
import {
  getMoncashPaymentHandler,
  processMoncashPaymentHandler,
} from '../controllers/moncash.controller';
import {
  getMoncashPaymentSchema,
  processMoncashPaymentSchema,
} from '../schemas/moncash.schema';

const router = Router();

router.post(
  '/',
  requiredUser,
  validate(processMoncashPaymentSchema),
  processMoncashPaymentHandler
);

router.get(
  '/:transactionId',
  requiredUser,
  validate(getMoncashPaymentSchema),
  getMoncashPaymentHandler
);

export default router;
