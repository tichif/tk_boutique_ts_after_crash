import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

import asyncHandler from '../middleware/asyncHandler';
import ErrorResponse from '../utils/Error';
import {
  ProcessMoncashPaymentType,
  GetMoncashPaymentType,
} from '../schemas/moncash.schema';
import moncash from '../utils/moncash';

// @route   POST /api/v2/moncash
// @desc    Get moncash payment url
// @access  Private
export const processMoncashPaymentHandler = asyncHandler(
  async (
    req: Request<{}, {}, ProcessMoncashPaymentType>,
    res: Response,
    next: NextFunction
  ) => {
    const { amount } = req.body;

    const payment = {
      amount,
      orderId: uuidv4(),
    };

    const payment_creator = moncash.payment;
    payment_creator.create(payment, function (err: any, paymentData: any) {
      if (err) {
        return next(new ErrorResponse(err.message, 500));
      }
      return res.status(200).json({
        success: true,
        data: payment_creator.redirect_uri(paymentData),
      });
    });
  }
);

// @route   GET /api/v2/moncash/:transactionID
// @desc    Get moncash payment data
// @access  Private
export const getMoncashPaymentHandler = asyncHandler(
  async (
    req: Request<GetMoncashPaymentType>,
    res: Response,
    next: NextFunction
  ) => {
    const { transactionId } = req.params;

    moncash.capture.getByTransactionId(
      transactionId,
      function (err: any, data: any) {
        if (err) {
          return next(new ErrorResponse(err.message, 500));
        }
        return res.status(200).json({
          success: true,
          data: {
            statusCode: data.httpStatusCode,
            transactionId: data.payment.transaction_id,
            amount: data.payment.cost,
          },
        });
      }
    );
  }
);
