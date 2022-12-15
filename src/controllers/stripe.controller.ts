import { Request, Response, NextFunction } from 'express';

import asyncHandler from '../middleware/asyncHandler';
import ErrorResponse from '../utils/Error';
import stripe from '../utils/stripe';
import { ProcessStripePaymentType } from '../schemas/stripe.schema';

// @route   POST /api/v2/stripe
// @desc    Get stripe payment intent
// @access  Private
export const processStripePaymentHandler = asyncHandler(
  async (
    req: Request<{}, {}, ProcessStripePaymentType>,
    res: Response,
    next: NextFunction
  ) => {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
    });

    return res.status(200).json({
      success: true,
      data: paymentIntent.client_secret,
    });
  }
);
