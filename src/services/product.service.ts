import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

import Product, { ProductDocument } from '../models/product.model';

export async function createProduct(
  data: DocumentDefinition<
    Omit<
      ProductDocument,
      | 'createdAt'
      | 'updatedAt'
      | 'variant'
      | 'photosSecondaries'
      | 'photoPrincipal'
      | 'size'
      | 'price'
      | 'color'
      | 'qty'
      | 'slug'
    >
  >
) {
  return await Product.create(data);
}

export async function getProducts(
  query: FilterQuery<ProductDocument>,
  limit: number,
  skip: number,
  sort: string = '-createdAt',
  select?: string
) {
  if (select) {
    return await Product.find(query)
      .select(select)
      .populate('category', 'name')
      .sort(sort)
      .skip(skip)
      .limit(limit);
  } else {
    return await Product.find(query)
      .populate('category', 'name')
      .sort(sort)
      .skip(skip)
      .limit(limit);
  }
}

export async function countProducts(query: FilterQuery<ProductDocument>) {
  return await Product.countDocuments(query);
}

export async function findProductById(
  id: string,
  options: QueryOptions = { lean: true },
  select: string[]
) {
  return await Product.findById(id, {}, options)
    .select(select.join(' '))
    .populate('category', 'name');
}

export async function findProductsByQuery(
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true },
  select: string[]
) {
  return await Product.find(query, {}, options)
    .select(select.join(' '))
    .populate('category', 'name')
    .limit(4);
}

export async function findProductByQuery(
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true },
  select: string[]
) {
  return await Product.findOne(query, {}, options)
    .select(select.join(' '))
    .populate('category', 'name');
}

export async function findProductByIdAndUpdate(
  productId: string,
  data: UpdateQuery<ProductDocument>,
  options: QueryOptions = { upsert: true, new: true }
) {
  return await Product.findByIdAndUpdate(productId, data, options);
}
