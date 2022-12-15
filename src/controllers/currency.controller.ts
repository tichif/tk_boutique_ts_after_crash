import { Request, Response, NextFunction } from 'express';
import { omit } from 'lodash';

import asyncHandler from '../middleware/asyncHandler';
import { AdvancedResultType } from '../schemas/advancedResult.schema';
import {
  CreateCurrencyType,
  DeleteCurrencyType,
  GetCurrencyType,
  UpdateCurrencyType,
} from '../schemas/currency.schema';
import {
  createCurrency,
  findCurrencyById,
  findCurrencyWithQuery,
  getCurrencies,
  countCurrencies,
} from '../services/currency.service';
import ErrorResponse from '../utils/Error';
import client from '../utils/redis';

// @route   POST /api/v2/currencies
// @desc    Create currency
// @access  Private - Admin
export const createCurrencyHandler = asyncHandler(
  async (
    req: Request<{}, {}, CreateCurrencyType>,
    res: Response,
    next: NextFunction
  ) => {
    const data = req.body;

    const createdCurrency = await createCurrency({
      ...data,
      name: data.name.toLowerCase(),
    });

    return res.status(201).json({
      success: true,
      data: omit(createdCurrency.toJSON(), ['__v', 'createdAt', 'updatedAt']),
    });
  }
);

// @route   GET /api/v2/currencies
// @desc    Get all currency
// @access  Public
export const getCurrenciesHandler = asyncHandler(
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
    // no cached data
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
    const total = await countCurrencies();

    const result = await getCurrencies(
      JSON.parse(queryStr),
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

// @route   GET /api/v2/currencies/:currencyId
// @desc    Get a currency
// @access  Public
export const getCurrencyHandler = asyncHandler(
  async (req: Request<GetCurrencyType>, res: Response, next: NextFunction) => {
    const { currencyId } = req.params;
    const key = req.url;

    const cachedData = await client.get(key);

    // cached data
    if (cachedData) {
      return res.status(200).json({
        success: true,
        data: JSON.parse(cachedData),
      });
    }

    const currency = await findCurrencyById(currencyId);

    if (!currency) {
      return next(new ErrorResponse("Cette devise n'existe pas.", 404));
    }

    await client.set(key, JSON.stringify(currency), {
      EX: 5 * 60, // 5mn
    });

    return res.status(200).json({
      success: true,
      data: currency,
    });
  }
);

// @route   GET /api/v2/currencies/principal
// @desc    Get a principal currency
// @access  Public
export const getCurrencyPrincipalHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const key = req.url;

    const cachedData = await client.get(key);

    if (cachedData) {
      return res.status(200).json({
        success: true,
        data: JSON.parse(cachedData),
      });
    }

    const currency = await findCurrencyWithQuery({ isPrincipal: true });

    if (!currency) {
      return next(
        new ErrorResponse(
          "Désolé, il n'y a pas encore de devise principale",
          400
        )
      );
    }

    await client.set(key, JSON.stringify(currency));

    return res.status(200).json({
      success: true,
      data: currency,
    });
  }
);

// @route   PUT /api/v2/currencies/:currencyId
// @desc    Update currency
// @access  Private - Admin
export const updateCurrencyHandler = asyncHandler(
  async (
    req: Request<UpdateCurrencyType['params'], {}, UpdateCurrencyType['body']>,
    res: Response,
    next: NextFunction
  ) => {
    const { currencyId } = req.params;

    const { name, amount, symbol } = req.body;

    const currency = await findCurrencyById(currencyId, { lean: false });

    if (!currency) {
      return next(new ErrorResponse("Cette devise n'existe pas.", 404));
    }

    currency.name = name.toLowerCase() || currency.name;
    currency.amount = amount || currency.amount;
    currency.symbol = symbol || currency.symbol;
    const updatedCurrency = await currency.save({ validateBeforeSave: true });

    return res.status(200).json({
      success: true,
      data: updatedCurrency,
    });
  }
);

// @route   DELETE /api/v2/currencies/:currencyId
// @desc    Delete currency
// @access  Private - Admin
export const deleteCurrencyHandler = asyncHandler(
  async (
    req: Request<DeleteCurrencyType>,
    res: Response,
    next: NextFunction
  ) => {
    const { currencyId } = req.params;

    const currency = await findCurrencyById(currencyId, { lean: false });

    if (!currency) {
      return next(new ErrorResponse("Cette devise n'existe pas.", 404));
    }

    if (currency.isPrincipal) {
      return next(
        new ErrorResponse(
          "Vous ne pouvez pas supprimer cette devise parce qu'elle est utilisé comme devise principale sur le site.",
          400
        )
      );
    }

    await currency.remove();

    return res.status(200).json({
      success: true,
      data: 'Devise supprimé avec succès.',
    });
  }
);

// @route   PATCH /api/v2/currencies/:currencyId/make-principal
// @desc    Make currency as principal
// @access  Private - Admin
export const makeCurrencyPrincipalHandler = asyncHandler(
  async (req: Request<GetCurrencyType>, res: Response, next: NextFunction) => {
    const { currencyId } = req.params;

    const currency = await findCurrencyById(currencyId, { lean: false });

    if (!currency) {
      return next(new ErrorResponse("Cette devise n'existe pas.", 404));
    }

    currency.isPrincipal = true;

    const updatedCurrency = await currency.save();

    return res.status(200).json({
      success: true,
      data: updatedCurrency,
    });
  }
);

// @route   PATCH /api/v2/currencies/:currencyId/unmake-principal
// @desc    Unmake currency as principal
// @access  Private - Admin
export const unmakeCurrencyPrincipalHandler = asyncHandler(
  async (req: Request<GetCurrencyType>, res: Response, next: NextFunction) => {
    const { currencyId } = req.params;

    const currency = await findCurrencyById(currencyId, { lean: false });

    if (!currency) {
      return next(new ErrorResponse("Cette devise n'existe pas.", 404));
    }

    currency.isPrincipal = false;

    const updatedCurrency = await currency.save();

    return res.status(200).json({
      success: true,
      data: updatedCurrency,
    });
  }
);
