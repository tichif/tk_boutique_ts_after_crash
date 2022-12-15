import { Router } from 'express';

import validate from '../middleware/validate';
import { requiredUser, authorize } from '../middleware/auth';
import { createOrderSchema, getOrderByIdSchema } from '../schemas/order.schema';
import {
  createOrderByAdminHandler,
  createOrderHandler,
  getAllOrdersForUserAdminHandler,
  getAllOrdersForUserHandler,
  getAllOrdersHandler,
  getOrderByIdByAdminHandler,
  getOrderByIdHandler,
  updateOrderDeliveryHandler,
} from '../controllers/order.controller';
import { advancedResultSchema } from '../schemas/advancedResult.schema';
import { getUserIdSchema } from '../schemas/user.schema';
import cleanCache from '../middleware/cleanCache';

const router = Router();

router.post('/', requiredUser, validate(createOrderSchema), createOrderHandler);
router.get(
  '/',
  requiredUser,
  authorize('admin'),
  validate(advancedResultSchema),
  getAllOrdersHandler
);

router.post(
  '/admin',
  requiredUser,
  authorize('admin'),
  validate(createOrderSchema),
  createOrderByAdminHandler
);

router.get(
  '/admin/:orderId',
  requiredUser,
  authorize('admin'),
  validate(getOrderByIdSchema),
  getOrderByIdByAdminHandler
);

router.get(
  '/user/:userId',
  requiredUser,
  validate(getUserIdSchema),
  validate(advancedResultSchema),
  getAllOrdersForUserHandler
);

router.get(
  '/user/:userId/admin',
  requiredUser,
  authorize('admin'),
  validate(getUserIdSchema),
  validate(advancedResultSchema),
  getAllOrdersForUserAdminHandler
);

router.get(
  '/:orderId',
  requiredUser,
  validate(getOrderByIdSchema),
  getOrderByIdHandler
);

router.patch(
  '/:orderId',
  requiredUser,
  authorize('admin'),
  validate(getOrderByIdSchema),
  cleanCache,
  updateOrderDeliveryHandler
);

export default router;
