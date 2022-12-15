import { Router } from 'express';

import validate from '../middleware/validate';
import { requiredUser } from '../middleware/auth';
import { processStripePaymentHandler } from '../controllers/stripe.controller';
import { processStripePaymentSchema } from '../schemas/stripe.schema';

const router = Router();

router.post(
  '/',
  requiredUser,
  validate(processStripePaymentSchema),
  processStripePaymentHandler
);

export default router;
