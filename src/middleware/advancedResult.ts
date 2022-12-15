import { Request, Response, NextFunction } from 'express';
import { Document, Model } from 'mongoose';

import { AdvancedResultType } from '../schemas/advancedResult.schema';
import { UserDocument } from '../models/user.model';
import { CurrencyInterface } from '../models/currency.model';

type ModelType = Model<UserDocument> | Model<CurrencyInterface>;

const advancedResults =
  (model: ModelType, populate?: string) =>
  async (
    req: Request<{}, {}, {}, AdvancedResultType>,
    res: Response,
    next: NextFunction
  ) => {
    let query;

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

    // finding resource
    query = await model.find(JSON.parse(queryStr));

    // select fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');

      query = query.select(fields);
    }

    // sort fields
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
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
    const total = await model.countDocuments();

    query = query.skip(startIndex).limit(limit);

    if (populate) {
      query = query.populate(populate);
    }

    // execute the query
    const result = await query;

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

    res.locals.advancedResults = {
      success: true,
      count: result.length,
      pagination,
      data: result,
    };

    return next();
  };

export default advancedResults;
