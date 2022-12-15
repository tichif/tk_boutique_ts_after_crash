import { Request, Response, NextFunction } from 'express';

import asyncHandler from '../middleware/asyncHandler';
import ErrorResponse from '../utils/Error';
import { ShippingType } from '../schemas/shipping.schema';
import getDistanceFromLatLonInKm from '../utils/distance';
import { getLatLng } from '../utils/geocoder';

// @route   POST /api/v2/shipping
// @desc    Get shipping price
// @access  Private
export const shippingHandler = asyncHandler(
  async (
    req: Request<{}, {}, ShippingType>,
    res: Response,
    next: NextFunction
  ) => {
    const { address } = req.body;

    // get lat and lng from geocoder
    const { lat, lng } = await getLatLng(address);

    if (!lat || !lng) {
      return next(
        new ErrorResponse(`Désolé, nous ne livrons pas ${address}.`, 400)
      );
    }

    const distance = getDistanceFromLatLonInKm(lat, lng); // in km

    if (distance < 2.5) {
      return res.status(200).json({
        success: true,
        data: {
          shippingPrice: 300,
          latitude: lat,
          longitude: lng,
        },
      });
    } else if (distance >= 2.5 && distance < 5.29) {
      return res.status(200).json({
        success: true,
        data: {
          shippingPrice: 500,
          latitude: lat,
          longitude: lng,
        },
      });
    } else {
      return next(
        new ErrorResponse(
          `Désolé, nous ne livrons pas à cette adresse: ${address}.`,
          400
        )
      );
    }
  }
);
