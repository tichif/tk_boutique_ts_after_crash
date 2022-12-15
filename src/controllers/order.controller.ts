import { Request, Response, NextFunction } from 'express';
import { omit } from 'lodash';

import asyncHandler from '../middleware/asyncHandler';
import ErrorResponse from '../utils/Error';
import sendMail from '../utils/sendMail';
import Logging from '../utils/log';
import {
  countOrders,
  createOrder,
  findOrderById,
  getOrders,
  getOrdersForUser,
} from '../services/order.service';
import { CreateOrderType, GetOrderByIdType } from '../schemas/order.schema';
import config from '../config';
import {
  orderCreatedByAdmin,
  orderForAdmin,
  orderUser,
  updateOrderDelivery,
  updateOrderDeliveryAdmin,
} from '../templates/order.template';
import client from '../utils/redis';
import { OrderDocument } from '../models/order.model';
import { AdvancedResultType } from '../schemas/advancedResult.schema';
import { GetUserIdType } from '../schemas/user.schema';

// @route   POST /api/v2/orders
// @desc    Create order
// @access  Private
export const createOrderHandler = asyncHandler(
  async (
    req: Request<{}, {}, CreateOrderType>,
    res: Response,
    next: NextFunction
  ) => {
    const data = req.body;

    const createdOrder = await createOrder({
      ...data,
      isDelivered: false,
      user: {
        name: res.locals.user.name,
        email: res.locals.user.email,
        userId: res.locals.user._id,
      },
    });

    try {
      await sendMail({
        from: config.fromEmail,
        to: createdOrder.user.email,
        subject: `Facture de la commande ${createdOrder._id}`,
        html: orderUser(createdOrder),
      });

      await sendMail({
        from: config.fromEmail,
        to: config.fromEmail,
        subject: `Facture de la commande de ${createdOrder.user.name}`,
        html: orderForAdmin(createdOrder),
      });

      return res.status(201).json({
        success: true,
        data: omit(createdOrder.toJSON(), '__v'),
      });
    } catch (error: any) {
      Logging.error(error);
    }
  }
);

// @route   POST /api/v2/orders/admin
// @desc    Create order by admin
// @access  Private - Admin
export const createOrderByAdminHandler = asyncHandler(
  async (
    req: Request<{}, {}, CreateOrderType>,
    res: Response,
    next: NextFunction
  ) => {
    const data = req.body;

    const createdOrder = await createOrder({
      ...data,
      isDelivered: false,
      user: {
        name: res.locals.user.name,
        email: res.locals.user.email,
        userId: res.locals.user._id,
      },
    });

    try {
      await sendMail({
        from: config.fromEmail,
        to: config.fromEmail,
        subject: 'Vous avez passé une commande au comptant',
        html: orderCreatedByAdmin(createdOrder),
      });

      return res.status(201).json({
        success: true,
        data: omit(createdOrder.toJSON(), '__v'),
      });
    } catch (error: any) {
      Logging.error(error);
    }
  }
);

// @route   GET /api/v2/orders/:orderId
// @desc    Get order's infos by its ID
// @access  Private
export const getOrderByIdHandler = asyncHandler(
  async (req: Request<GetOrderByIdType>, res: Response, next: NextFunction) => {
    const { orderId } = req.params;

    const key = req.url;

    const cachedData = await client.get(key);

    // cached data
    if (cachedData) {
      const order = JSON.parse(cachedData) as OrderDocument;

      if (order.user.userId.toString() !== res.locals.user._id.toString()) {
        return next(
          new ErrorResponse("Vous n'êtes pas authorisé à poursuire.", 401)
        );
      }

      return res.status(200).json({
        success: true,
        data: omit(order, '__v'),
      });
    }

    const order = await findOrderById(orderId, { lean: false });

    if (!order) {
      return next(new ErrorResponse("Cette commande n'existe pas", 404));
    }

    if (order.user.userId.toString() !== res.locals.user._id.toString()) {
      return next(
        new ErrorResponse("Vous n'êtes pas authorisé à poursuire.", 401)
      );
    }

    await client.set(key, JSON.stringify(order), {
      EX: 5 * 60, // 5mn
    });

    return res.status(200).json({
      success: true,
      data: omit(order.toJSON(), '__v'),
    });
  }
);

// @route   GET /api/v2/orders/admin/:orderId
// @desc    Get order's infos by its ID for admin
// @access  Private - Admin
export const getOrderByIdByAdminHandler = asyncHandler(
  async (req: Request<GetOrderByIdType>, res: Response, next: NextFunction) => {
    const { orderId } = req.params;

    const key = req.url;

    const cachedData = await client.get(key);

    // cached data
    if (cachedData) {
      const order = JSON.parse(cachedData) as OrderDocument;

      return res.status(200).json({
        success: true,
        data: order,
      });
    }

    const order = await findOrderById(orderId, { lean: false });

    if (!order) {
      return next(new ErrorResponse("Cette commande n'existe pas", 404));
    }

    await client.set(key, JSON.stringify(omit(order.toJSON(), '__v')), {
      EX: 5 * 60, // 5mn
    });

    return res.status(200).json({
      success: true,
      data: omit(order.toJSON(), '__v'),
    });
  }
);

// @route   GET /api/v2/orders
// @desc    Get all orders
// @access  Private - Admin
export const getAllOrdersHandler = asyncHandler(
  async (
    req: Request<{}, {}, {}, AdvancedResultType>,
    res: Response,
    next: NextFunction
  ) => {
    // check cached data
    const cachedData = await client.get(req.url);
    if (cachedData) {
      return res.status(200).json({
        success: true,
        ...JSON.parse(cachedData),
      });
    }

    let sort: string = '';
    let select: string = '';
    // copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'limit', 'sort', 'page'];

    // Loop over removeFields and delete them from reqQuery
    // @ts-ignore
    removeFields.forEach((param: string) => delete reqQuery[param]);

    // create a query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operator like $gt, $gte, $lt, $lte, $in
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    // select fields
    if (req.query.select) {
      select = req.query.select.split(',').join(' ');
    }

    // sort fields
    if (req.query.sort) {
      sort = req.query.sort.split(',').join(' ');
    }

    // Pagination
    let page: number;
    let limit: number;
    if (req.query.page) {
      page = +req.query.page;
    } else {
      page = 1;
    }
    if (req.query.limit) {
      limit = +req.query.limit;
    } else {
      limit = 10;
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await countOrders();

    const result = await getOrders(limit, startIndex, sort, select);

    // pagination result
    const pagination: {
      next?: {
        page: number;
        limit: number;
      };
      prev?: {
        page: number;
        limit: number;
      };
    } = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    const dataToCached = {
      count: result.length,
      pagination,
      data: result,
    };
    await client.set(req.url, JSON.stringify(dataToCached), {
      EX: 5 * 60, //5mn
    });

    return res.status(200).json({
      success: true,
      count: result.length,
      pagination,
      data: result,
    });
  }
);

// @route   GET /api/v2/orders/user/:userId
// @desc    Get all orders
// @access  Private
export const getAllOrdersForUserHandler = asyncHandler(
  async (
    req: Request<GetUserIdType, {}, {}, AdvancedResultType>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req.params;

    if (userId !== res.locals.user._id.toString()) {
      return next(
        new ErrorResponse("Vous n'êtes pas authorisé à poursuire.", 401)
      );
    }

    // check cached data
    const cachedData = await client.get(req.url);
    if (cachedData) {
      return res.status(200).json({
        success: true,
        ...JSON.parse(cachedData),
      });
    }

    let sort: string = '';
    let select: string = '';
    // copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'limit', 'sort', 'page'];

    // Loop over removeFields and delete them from reqQuery
    // @ts-ignore
    removeFields.forEach((param: string) => delete reqQuery[param]);

    // select fields
    if (req.query.select) {
      select = req.query.select.split(',').join(' ');
    }

    // sort fields
    if (req.query.sort) {
      sort = req.query.sort.split(',').join(' ');
    }

    // Pagination
    let page: number;
    let limit: number;
    if (req.query.page) {
      page = +req.query.page;
    } else {
      page = 1;
    }
    if (req.query.limit) {
      limit = +req.query.limit;
    } else {
      limit = 10;
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await countOrders(userId);

    const result = await getOrdersForUser(
      userId,
      limit,
      startIndex,
      sort,
      select
    );

    // pagination result
    const pagination: {
      next?: {
        page: number;
        limit: number;
      };
      prev?: {
        page: number;
        limit: number;
      };
    } = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    const dataToCached = {
      count: result.length,
      pagination,
      data: result,
    };
    await client.set(req.url, JSON.stringify(dataToCached), {
      EX: 5 * 60, //5mn
    });

    return res.status(200).json({
      success: true,
      count: result.length,
      pagination,
      data: result,
    });
  }
);

// @route   GET /api/v2/orders/user/:userId/admin
// @desc    Get all orders
// @access  Private
export const getAllOrdersForUserAdminHandler = asyncHandler(
  async (
    req: Request<GetUserIdType, {}, {}, AdvancedResultType>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req.params;

    // check cached data
    const cachedData = await client.get(req.url);
    if (cachedData) {
      return res.status(200).json({
        success: true,
        ...JSON.parse(cachedData),
      });
    }

    let sort: string = '';
    let select: string = '';
    // copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'limit', 'sort', 'page'];

    // Loop over removeFields and delete them from reqQuery
    // @ts-ignore
    removeFields.forEach((param: string) => delete reqQuery[param]);

    // select fields
    if (req.query.select) {
      select = req.query.select.split(',').join(' ');
    }

    // sort fields
    if (req.query.sort) {
      sort = req.query.sort.split(',').join(' ');
    }

    // Pagination
    let page: number;
    let limit: number;
    if (req.query.page) {
      page = +req.query.page;
    } else {
      page = 1;
    }
    if (req.query.limit) {
      limit = +req.query.limit;
    } else {
      limit = 10;
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await countOrders(userId);

    const result = await getOrdersForUser(
      userId,
      limit,
      startIndex,
      sort,
      select
    );

    // pagination result
    const pagination: {
      next?: {
        page: number;
        limit: number;
      };
      prev?: {
        page: number;
        limit: number;
      };
    } = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    const dataToCached = {
      count: result.length,
      pagination,
      data: result,
    };
    await client.set(req.url, JSON.stringify(dataToCached), {
      EX: 5 * 60, //5mn
    });

    return res.status(200).json({
      success: true,
      count: result.length,
      pagination,
      data: result,
    });
  }
);

// @route   PATCH /api/v2/orders/:orderId
// @desc    Update order delivery status
// @access  Private - Admin
export const updateOrderDeliveryHandler = asyncHandler(
  async (req: Request<GetOrderByIdType>, res: Response, next: NextFunction) => {
    const { orderId } = req.params;

    const order = await findOrderById(orderId, { lean: false });

    if (!order) {
      return next(new ErrorResponse("Cette commande n'existe pas", 404));
    }

    if (order.isDelivered) {
      return next(new ErrorResponse('Cette commande a déjà été livrée.', 400));
    }

    order.isDelivered = true;
    order.deliveryAt = new Date();
    const updatedOrder = await order.save();

    try {
      await sendMail({
        from: config.fromEmail,
        to: updatedOrder.user.email,
        subject: `Commande ${updatedOrder._id} livrée`,
        html: updateOrderDelivery(updatedOrder),
      });

      await sendMail({
        from: config.fromEmail,
        to: config.fromEmail,
        subject: `Commande ${updatedOrder._id} livrée`,
        html: updateOrderDeliveryAdmin(updatedOrder),
      });

      return res.status(200).json({
        success: true,
        data: omit(updatedOrder.toJSON(), '__v'),
      });
    } catch (error: any) {
      Logging.error(error.message);
    }
  }
);
