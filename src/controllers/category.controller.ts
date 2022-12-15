import { Request, Response, NextFunction } from 'express';
import { omit } from 'lodash';

import asyncHandler from '../middleware/asyncHandler';
import { AdvancedResultType } from '../schemas/advancedResult.schema';
import {
  CreateCategoryType,
  DeleteCategoryType,
  GetCategoryType,
  UpdateCategoryType,
} from '../schemas/category.schema';
import {
  createCategory,
  findCategoryById,
  getCategories,
  countCategories,
} from '../services/category.service';
import ErrorResponse from '../utils/Error';
import client from '../utils/redis';

// @route   POST /api/v2/categories
// @desc    Create category
// @access  Private - Admin
export const createCategoryHandler = asyncHandler(
  async (
    req: Request<{}, {}, CreateCategoryType>,
    res: Response,
    next: NextFunction
  ) => {
    const { name } = req.body;

    const createdCategory = await createCategory({
      name: name.toLowerCase(),
    });

    return res.status(201).json({
      success: true,
      data: omit(createdCategory.toJSON(), ['createdAt', 'updatedAt', '__v']),
    });
  }
);

// @route   GET /api/v2/categories
// @desc    Get all categories
// @access  Public
export const getCategoriesHandler = asyncHandler(
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
    const total = await countCategories();

    const result = await getCategories(
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

// @route   GET /api/v2/categories/:categoryId
// @desc    Get a category
// @access  Public
export const getCategoryHandler = asyncHandler(
  async (req: Request<GetCategoryType>, res: Response, next: NextFunction) => {
    const { categoryId } = req.params;
    const key = req.url;

    const cachedData = await client.get(key);

    // cached data
    if (cachedData) {
      return res.status(200).json({
        success: true,
        data: JSON.parse(cachedData),
      });
    }

    const category = await findCategoryById(categoryId);

    if (!category) {
      return next(new ErrorResponse("Cette catégorie n'existe pas.", 404));
    }

    await client.set(key, JSON.stringify(category), {
      EX: 5 * 60, // 5mn
    });

    return res.status(200).json({
      success: true,
      data: category,
    });
  }
);

// @route   PUT /api/v2/categories/:categoryId
// @desc    Update category
// @access  Private - Admin
export const updateCategoryHandler = asyncHandler(
  async (
    req: Request<UpdateCategoryType['params'], {}, UpdateCategoryType['body']>,
    res: Response,
    next: NextFunction
  ) => {
    const { categoryId } = req.params;

    const { name } = req.body;

    const category = await findCategoryById(categoryId, { lean: false });

    if (!category) {
      return next(new ErrorResponse("Cette catégorie n'existe pas.", 404));
    }

    category.name = name.toLowerCase() || category.name;
    const updatedCategory = await category.save({ validateBeforeSave: true });

    return res.status(200).json({
      success: true,
      data: updatedCategory,
    });
  }
);

// @route   DELETE /api/v2/categories/:categoryId
// @desc    Delete category
// @access  Private - Admin
export const deleteCategoryHandler = asyncHandler(
  async (
    req: Request<DeleteCategoryType>,
    res: Response,
    next: NextFunction
  ) => {
    const { categoryId } = req.params;

    const category = await findCategoryById(categoryId, { lean: false });

    if (!category) {
      return next(new ErrorResponse("Cette catégorie n'existe pas.", 404));
    }

    await category.remove();

    return res.status(200).json({
      success: true,
      data: 'Catégorie supprimée avec succès.',
    });
  }
);
