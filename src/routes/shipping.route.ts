import { Router } from 'express';

import validate from '../middleware/validate';
import { shippingHandler } from '../controllers/shipping.controller';
import { shippingSchema } from '../schemas/shipping.schema';
import { requiredUser } from '../middleware/auth';

const router = Router();

router.post('/', requiredUser, validate(shippingSchema), shippingHandler);

export default router;
