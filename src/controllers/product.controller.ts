import { Request, Response, NextFunction } from 'express';
import { omit } from 'lodash';

import ErrorResponse from '../utils/Error';
import { AdvancedResultType } from '../schemas/advancedResult.schema';
import client from '../utils/redis';
import asyncHandler from '../middleware/asyncHandler';
import { uploadImage, deleteImage } from '../utils/cloudinary';
import {
  AddProductVariantType,
  AddSecondaryPhotoToProductType,
  AddSecondaryPhotoToProductVariantType,
  CheckProductAvailabilityType,
  CreateProductType,
  GetProductBySlugType,
  GetProductsRelatedType,
  GetProductType,
  GetProductVariantType,
  UpdateProductType,
  UpdateProductVariantType,
} from '../schemas/product.schema';
import {
  createProduct,
  countProducts,
  getProducts,
  findProductById,
  findProductByQuery,
  findProductByIdAndUpdate,
  findProductsByQuery,
} from '../services/product.service';
import { Photo, ProductDocument } from '../models/product.model';
import { GetCategoryType } from '../schemas/category.schema';

interface ProductData {
  name: string;
  category: string;
  description: string;
  price?: number;
  color?: string;
  qty?: number;
  size?: string;
  photoPrincipal?: Photo;
}

interface ProductVariantData {
  price: number;
  color: string;
  qty: number;
  size: string;
  photoPrincipal?: Photo;
}

// @route   POST /api/v2/products
// @desc    Create Product
// @access  Private - Admin
export const createProductHandler = asyncHandler(
  async (
    req: Request<{}, {}, CreateProductType>,
    res: Response,
    next: NextFunction
  ) => {
    const {
      name,
      category,
      description,
      photoPrincipal,
      size,
      qty,
      color,
      price,
    } = req.body;

    const data: ProductData = {
      name,
      category,
      description,
      size,
      qty,
      color,
      price,
    };

    if (photoPrincipal) {
      const result = await uploadImage(photoPrincipal);
      if (result) {
        data.photoPrincipal = {
          public_id: result.public_id,
          url: result.url,
          width: result.width,
          height: result.height,
        };
      }
    }

    const product = await createProduct(data);

    return res.status(201).json({
      success: true,
      data: omit(product.toJSON(), ['__v', 'createdAt', 'updatedAt']),
    });
  }
);

// @route   GET /api/v2/products || /api/v2/categories/:categoryId/products
// @desc    Get all products || Get all products for a specific category
// @access  Public
export const getProductsHandler = asyncHandler(
  async (
    req: Request<GetCategoryType, {}, {}, AdvancedResultType>,
    res: Response,
    next: NextFunction
  ) => {
    const { categoryId } = req.params;

    if (categoryId) {
      // check cached data
      const cachedData = await client.get(categoryId);
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
      const total = await countProducts({ category: categoryId });

      const result = await getProducts(
        { category: categoryId },
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
      await client.set(categoryId, JSON.stringify(dataToCached), {
        EX: 5 * 60, //5mn
      });

      return res.status(200).json({
        success: true,
        count: result.length,
        pagination,
        data: result,
      });
    } else {
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
      const total = await countProducts({});

      const result = await getProducts(
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
  }
);

// @route   GET /api/v2/products/:productId
// @desc    Get a Product
// @access  Public
export const getProductHandler = asyncHandler(
  async (
    req: Request<GetProductType['params']>,
    res: Response,
    next: NextFunction
  ) => {
    const { productId } = req.params;
    const key = req.url;

    const cachedData = await client.get(key);

    // cached data
    if (cachedData) {
      return res.status(200).json({
        success: true,
        data: JSON.parse(cachedData),
      });
    }

    const product = await findProductById(productId, {}, [
      'name',
      'description',
      'qty',
      'price',
      'color',
      'size',
      'variant',
      'photoPrincipal',
      'photosSecondaries',
      'slug',
    ]);

    if (!product) {
      return next(new ErrorResponse("Cet article n'existe pas.", 404));
    }

    await client.set(key, JSON.stringify(product), {
      EX: 5 * 60, // 5mn
    });

    return res.status(200).json({
      success: true,
      data: product,
    });
  }
);

// @route   GET /api/v2/products/get/:slug
// @desc    Get a Product with its slug
// @access  Public
export const getProductBySlugHandler = asyncHandler(
  async (
    req: Request<GetProductBySlugType>,
    res: Response,
    next: NextFunction
  ) => {
    const { slug } = req.params;
    const key = req.url;

    const cachedData = await client.get(key);

    // cached data
    if (cachedData) {
      return res.status(200).json({
        success: true,
        data: JSON.parse(cachedData),
      });
    }

    const product = await findProductByQuery({ slug }, {}, [
      'name',
      'description',
      'qty',
      'price',
      'color',
      'size',
      'variant',
      'photoPrincipal',
      'photosSecondaries',
      'slug',
    ]);

    if (!product) {
      return next(new ErrorResponse("Cet article n'existe pas.", 404));
    }

    await client.set(key, JSON.stringify(product), {
      EX: 5 * 60, // 5mn
    });

    return res.status(200).json({
      success: true,
      data: product,
    });
  }
);

// @route   GET /api/v2/products/:productId/:categoryId/related
// @desc    Get products in the same category than a given product
// @access  Public
export const getProductsRelatedHandler = asyncHandler(
  async (
    req: Request<GetProductsRelatedType>,
    res: Response,
    next: NextFunction
  ) => {
    const { productId, categoryId } = req.params;
    const key = req.url;

    const cachedData = await client.get(key);

    // cached data
    if (cachedData) {
      return res.status(200).json({
        success: true,
        data: JSON.parse(cachedData),
      });
    }

    const products = await findProductsByQuery(
      { _id: { $ne: productId }, category: categoryId },
      {},
      [
        'name',
        'qty',
        'price',
        'color',
        'size',
        'variant',
        'photoPrincipal',
        'slug',
      ]
    );

    await client.set(key, JSON.stringify(products), {
      EX: 5 * 60, // 5mn
    });

    return res.status(200).json({
      success: true,
      data: products,
    });
  }
);

// @route   PUT /api/v2/products/:productId
// @desc    Update a Product
// @access  Private - Admin
export const updateProductHandler = asyncHandler(
  async (
    req: Request<UpdateProductType['params'], {}, UpdateProductType['body']>,
    res: Response,
    next: NextFunction
  ) => {
    const { productId } = req.params;

    const {
      name,
      category,
      description,
      photoPrincipal,
      size,
      qty,
      color,
      price,
    } = req.body;

    const product = await findProductById(productId, { lean: false }, [
      'name',
      'description',
      'qty',
      'price',
      'color',
      'size',
      'variant',
      'photoPrincipal',
    ]);

    if (!product) {
      return next(new ErrorResponse("Cet article n'existe pas.", 404));
    }

    if (
      (color || price || size || qty) &&
      product?.variant &&
      product.variant.length > 0
    ) {
      return next(
        new ErrorResponse(
          'Désolé, vous ne pouvez modifier ni le prix, ni la quantité, ni la couleur de cet article.',
          400
        )
      );
    }

    product.name = name || product.name;
    product.category = category || product.category;
    product.description = description || product.description;
    product.size = size || product.size;
    product.color = color || product.color;
    product.qty = qty || product.qty;
    product.price = price || product.price;

    if (photoPrincipal) {
      const result = await uploadImage(photoPrincipal);
      if (result) {
        if (product.photoPrincipal?.public_id) {
          await deleteImage(product.photoPrincipal?.public_id);
        }
        product.photoPrincipal = {
          public_id: result.public_id,
          url: result.url,
          width: result.width,
          height: result.height,
        };
      }
    }

    const updatedProduct = await findProductByIdAndUpdate(productId, product);

    return res.status(200).json({
      success: true,
      data: omit(updatedProduct && updatedProduct.toJSON(), [
        '__v',
        'createdAt',
        'updatedAt',
      ]),
    });
  }
);

// @route   DELETE /api/v2/products/:productId
// @desc    Delete a Product
// @access  Private - Admin
export const deleteProductHandler = asyncHandler(
  async (
    req: Request<GetProductType['params']>,
    res: Response,
    next: NextFunction
  ) => {
    const { productId } = req.params;

    const product = await findProductById(productId, { lean: false }, ['name']);

    if (!product) {
      return next(new ErrorResponse("Cet article n'existe pas.", 404));
    }

    await product.remove();

    return res.status(200).json({
      success: true,
      data: 'Article supprimé avec succès',
    });
  }
);

// @route   PUT /api/v2/products/:productId/photos
// @desc    Add secondary image to a product
// @access  Private - Admin
export const addSecondaryPhotoToProductHandler = asyncHandler(
  async (
    req: Request<
      AddSecondaryPhotoToProductType['params'],
      {},
      AddSecondaryPhotoToProductType['body']
    >,
    res: Response,
    next: NextFunction
  ) => {
    const { productId } = req.params;
    const { image } = req.body;

    const product = await findProductById(productId, {}, ['photosSecondaries']);

    if (!product) {
      return next(new ErrorResponse("Cet article n'existe pas.", 404));
    }

    const result = await uploadImage(image);

    if (!result) {
      return next(new ErrorResponse('Erreur. Essayez à nouveau.', 400));
    }

    if (product.photosSecondaries) {
      product.photosSecondaries.push({
        public_id: result.public_id,
        url: result.url,
        width: result.width,
        height: result.height,
      });
    }

    const updatedProduct = await findProductByIdAndUpdate(product._id, product);

    return res.status(200).json({
      success: true,
      data: updatedProduct && updatedProduct.photosSecondaries,
    });
  }
);

// @route   GET /api/v2/products/:productId/photos
// @desc    Get secondaries photos for a product
// @access  Public
export const getProductSecondaryPhotosHandler = asyncHandler(
  async (
    req: Request<GetProductType['params']>,
    res: Response,
    next: NextFunction
  ) => {
    const { productId } = req.params;
    const key = req.url;

    const cachedData = await client.get(key);

    // cached data
    if (cachedData) {
      return res.status(200).json({
        success: true,
        data: JSON.parse(cachedData),
      });
    }

    const product = await findProductById(productId, {}, ['photosSecondaries']);

    if (!product) {
      return next(new ErrorResponse("Cet article n'existe pas.", 404));
    }

    await client.set(key, JSON.stringify(product.photosSecondaries), {
      EX: 5 * 60, // 5mn
    });

    return res.status(200).json({
      success: true,
      data: product.photosSecondaries,
    });
  }
);

// @route   Delete /api/v2/products/:productId/photos?public_id=
// @desc    Delete secondaries photos for a product
// @access  Private - Admin
export const deletePublicSecondaryForProductHandler = asyncHandler(
  async (
    req: Request<GetProductType['params'], {}, {}, GetProductType['query']>,
    res: Response,
    next: NextFunction
  ) => {
    const { productId } = req.params;
    const { public_id } = req.query;

    const product = await findProductById(productId, {}, ['photosSecondaries']);

    if (!product) {
      return next(new ErrorResponse("Cet article n'existe pas.", 404));
    }

    if (public_id) {
      await deleteImage(public_id);
      product.photosSecondaries = product.photosSecondaries?.filter(
        (image) => image.public_id !== public_id
      );
    }

    const updatedProduct = await findProductByIdAndUpdate(product._id, product);

    return res.status(200).json({
      success: true,
      data: updatedProduct && updatedProduct.photosSecondaries,
    });
  }
);

// @route   PUT /api/v2/products/:productId/variants
// @desc    Add variant for a product
// @access  Private - Admin
export const addProductVariantHandler = asyncHandler(
  async (
    req: Request<
      AddProductVariantType['params'],
      {},
      AddProductVariantType['body']
    >,
    res: Response,
    next: NextFunction
  ) => {
    const { productId } = req.params;
    const { price, qty, color, size, photoPrincipal } = req.body;

    const product = await findProductById(productId, {}, [
      'qty',
      'price',
      'color',
      'size',
      'variant',
    ]);

    if (!product) {
      return next(new ErrorResponse("Cet article n'existe pas.", 404));
    }

    if (product.qty || product.size || product.color || product.price) {
      return next(
        new ErrorResponse(
          'Désolé, vous ne pouvez pas ajouter de variant à cet article.',
          400
        )
      );
    }

    const data: ProductVariantData = {
      price,
      qty,
      color,
      size,
    };

    if (photoPrincipal) {
      const result = await uploadImage(photoPrincipal);
      if (result) {
        data.photoPrincipal = {
          public_id: result.public_id,
          url: result.url,
          width: result.width,
          height: result.height,
        };
      }
    }

    if (product.variant) {
      product?.variant.push(data);
    }

    const updatedProduct = await findProductByIdAndUpdate(product._id, product);

    return res.status(200).json({
      success: true,
      data: updatedProduct && updatedProduct.variant,
    });
  }
);

// @route   GET /api/v2/products/:productId/variants
// @desc    Get product's variants
// @access  Public
export const getProductVariantHandler = asyncHandler(
  async (
    req: Request<GetProductType['params']>,
    res: Response,
    next: NextFunction
  ) => {
    const { productId } = req.params;
    const key = req.url;

    const cachedData = await client.get(key);

    // cached data
    if (cachedData) {
      return res.status(200).json({
        success: true,
        data: JSON.parse(cachedData),
      });
    }

    const product = await findProductById(productId, {}, ['variant']);

    if (!product) {
      return next(new ErrorResponse("Cet article n'existe pas.", 404));
    }

    await client.set(key, JSON.stringify(product.variant), {
      EX: 5 * 60, // 5mn
    });

    return res.status(200).json({
      success: true,
      data: product.variant,
    });
  }
);

// @route   GET /api/v2/products/:productId/variants/:variantId
// @desc    Get specific product's variants
// @access  Public
export const getSpecificProductVariantHandler = asyncHandler(
  async (
    req: Request<GetProductVariantType['params']>,
    res: Response,
    next: NextFunction
  ) => {
    const { productId, variantId } = req.params;
    const key = req.url;

    const cachedData = await client.get(key);

    // cached data
    if (cachedData) {
      return res.status(200).json({
        success: true,
        data: JSON.parse(cachedData),
      });
    }

    const product = await findProductById(productId, {}, ['variant']);

    if (!product) {
      return next(new ErrorResponse("Cet article n'existe pas.", 404));
    }

    // @ts-ignore
    const productVariant = product.variant?.find(
      // @ts-ignore
      (p) => p._id.toString() === variantId
    );

    if (!productVariant) {
      return next(new ErrorResponse("Cet article n'existe pas.", 404));
    }

    await client.set(key, JSON.stringify(productVariant), {
      EX: 5 * 60, // 5mn
    });

    return res.status(200).json({
      success: true,
      data: productVariant,
    });
  }
);

// @route   PUT /api/v2/products/:productId/variants/:variantId
// @desc    Update specific product's variants
// @access  Private - Admin
export const updateSpecificProductVariantHandler = asyncHandler(
  async (
    req: Request<
      UpdateProductVariantType['params'],
      {},
      UpdateProductVariantType['body']
    >,
    res: Response,
    next: NextFunction
  ) => {
    const { productId, variantId } = req.params;
    const { price, size, color, qty, photoPrincipal } = req.body;

    const product = await findProductById(productId, {}, ['variant']);

    if (!product) {
      return next(new ErrorResponse("Cet article n'existe pas.", 404));
    }

    // @ts-ignore
    const productVariant = product.variant?.find(
      // @ts-ignore
      (p) => p._id.toString() === variantId
    );

    if (!productVariant) {
      return next(new ErrorResponse("Cet article n'existe pas.", 404));
    }

    productVariant.price = price || productVariant.price;
    productVariant.size = size || productVariant.size;
    productVariant.qty = qty || productVariant.qty;
    productVariant.color = color || productVariant.color;

    if (photoPrincipal) {
      const result = await uploadImage(photoPrincipal);
      if (result) {
        if (productVariant.photoPrincipal) {
          await deleteImage(productVariant.photoPrincipal.public_id);
        }
        productVariant.photoPrincipal = {
          public_id: result.public_id,
          url: result.url,
          width: result.width,
          height: result.height,
        };
      }
    }

    product.variant = product.variant?.map((p) =>
      // @ts-ignore
      p._id === productVariant._id ? productVariant : p
    );

    const updatedProduct = await findProductByIdAndUpdate(product._id, product);

    return res.status(200).json({
      success: true,
      data: updatedProduct && updatedProduct.variant,
    });
  }
);

// @route   DELETE /api/v2/products/:productId/variants/:variantId
// @desc    Delete specific product's variants
// @access  Private - Admin
export const deleteSpecificProductVariantHandler = asyncHandler(
  async (
    req: Request<GetProductVariantType['params']>,
    res: Response,
    next: NextFunction
  ) => {
    const { productId, variantId } = req.params;

    const product = await findProductById(productId, {}, ['variant']);

    if (!product) {
      return next(new ErrorResponse("Cet article n'existe pas.", 404));
    }

    // @ts-ignore
    const productVariant = product.variant?.find(
      // @ts-ignore
      (p) => p._id.toString() === variantId
    );

    if (!productVariant) {
      return next(new ErrorResponse("Cet article n'existe pas.", 404));
    }

    product.variant = product.variant?.filter(
      // @ts-ignore
      (p) => p._id.toString() !== variantId
    );

    const updatedProduct = await findProductByIdAndUpdate(product._id, product);

    return res.status(200).json({
      success: true,
      data: updatedProduct && updatedProduct.variant,
    });
  }
);

// @route   PUT /api/v2/products/:productId/variants/:variantId/photos
// @desc    Add secondary photo to product variant
// @access  Private - Admin
export const addSecondaryPhotoToProductVariantHandler = asyncHandler(
  async (
    req: Request<
      AddSecondaryPhotoToProductVariantType['params'],
      {},
      AddSecondaryPhotoToProductVariantType['body']
    >,
    res: Response,
    next: NextFunction
  ) => {
    const { productId, variantId } = req.params;
    const { image } = req.body;

    const product = await findProductById(productId, {}, ['variant']);

    if (!product) {
      return next(new ErrorResponse("Cet article n'existe pas.", 404));
    }

    // @ts-ignore
    const productVariant = product.variant?.find(
      // @ts-ignore
      (p) => p._id.toString() === variantId
    );

    if (!productVariant) {
      return next(new ErrorResponse("Cet article n'existe pas.", 404));
    }

    const result = await uploadImage(image);
    if (result) {
      if (productVariant.photosSecondaries) {
        productVariant.photosSecondaries.push({
          public_id: result.public_id,
          url: result.url,
          width: result.width,
          height: result.height,
        });
      }
    }

    product.variant = product.variant?.map((p) =>
      // @ts-ignore
      p._id === productVariant._id ? productVariant : p
    );

    await findProductByIdAndUpdate(product._id, product);

    return res.status(200).json({
      success: true,
      data: productVariant.photosSecondaries,
    });
  }
);

// @route   Delete /api/v2/products/:productId/variants/:variantId/photos?public_id
// @desc    Delete secondary photo to product variant
// @access  Private - Admin
export const deleteSecondaryPhotoToProductVariantHandler = asyncHandler(
  async (
    req: Request<
      GetProductVariantType['params'],
      {},
      {},
      GetProductVariantType['query']
    >,
    res: Response,
    next: NextFunction
  ) => {
    const { productId, variantId } = req.params;
    const { public_id } = req.query;

    const product = await findProductById(productId, {}, ['variant']);

    if (!product) {
      return next(new ErrorResponse("Cet article n'existe pas.", 404));
    }

    // @ts-ignore
    const productVariant = product.variant?.find(
      // @ts-ignore
      (p) => p._id.toString() === variantId
    );

    if (!productVariant) {
      return next(new ErrorResponse("Cet article n'existe pas.", 404));
    }

    if (public_id) {
      await deleteImage(public_id);
      productVariant.photosSecondaries =
        productVariant.photosSecondaries?.filter(
          (image) => image.public_id !== public_id
        );
    }

    product.variant = product.variant?.map((p) =>
      // @ts-ignore
      p._id === productVariant._id ? productVariant : p
    );

    await findProductByIdAndUpdate(product._id, product);

    return res.status(200).json({
      success: true,
      data: productVariant.photosSecondaries,
    });
  }
);

// @route   GET /api/v2/products/:productId/variants/:variantId/photos
// @desc    Get secondary photo to product variant
// @access  Public
export const getSecondaryPhotosToProductVariantHandler = asyncHandler(
  async (
    req: Request<GetProductVariantType['params']>,
    res: Response,
    next: NextFunction
  ) => {
    const { productId, variantId } = req.params;

    const key = req.url;

    const cachedData = await client.get(key);

    // cached data
    if (cachedData) {
      return res.status(200).json({
        success: true,
        data: JSON.parse(cachedData),
      });
    }

    const product = await findProductById(productId, {}, ['variant']);

    if (!product) {
      return next(new ErrorResponse("Cet article n'existe pas.", 404));
    }

    // @ts-ignore
    const productVariant = product.variant?.find(
      // @ts-ignore
      (p) => p._id.toString() === variantId
    );

    if (!productVariant) {
      return next(new ErrorResponse("Cet article n'existe pas.", 404));
    }

    await client.set(key, JSON.stringify(productVariant.photosSecondaries), {
      EX: 5 * 60, // 5mn
    });

    return res.status(200).json({
      success: true,
      data: productVariant.photosSecondaries,
    });
  }
);

// @route   POST /api/v2/products/products-available
// @desc    Check if product is available
// @access  Public
export const checkProductAvailabilityHandler = asyncHandler(
  async (
    req: Request<{}, {}, CheckProductAvailabilityType>,
    res: Response,
    next: NextFunction
  ) => {
    const productsAvailable: boolean[] = [];

    const { products } = req.body;

    // check products length
    if (products.length === 0) {
      return next(new ErrorResponse('Pas de produits!!!!', 400));
    }

    // check product by id
    for (let i = 0; i < products.length; i++) {
      const retrievedProduct = await findProductById(
        products[i].productId,
        { lean: false },
        ['qty', 'variant']
      );
      if (!retrievedProduct) {
        productsAvailable.push(false);
        return;
      }
      // check if variant product exists
      if (products[i].variantId && !retrievedProduct.qty) {
        const variant = retrievedProduct.variant?.find(
          // @ts-ignore
          (v) => v._id.toString() === products[i].variantId
        );

        if (!variant || variant.qty <= products[i].qty) {
          productsAvailable.push(false);
          return;
        }
        productsAvailable.push(true);
      }
      // check qty available for parent product
      else {
        // @ts-ignore
        if (retrievedProduct.qty <= products[i].qty) {
          productsAvailable.push(false);
        } else {
          productsAvailable.push(true);
        }
      }
    }

    // return response
    if (productsAvailable.includes(false)) {
      return next(
        new ErrorResponse(
          'Certains produits ne sont pas disponibles pour le moment.',
          400
        )
      );
    }

    return res.status(200).json({ success: true });
  }
);
