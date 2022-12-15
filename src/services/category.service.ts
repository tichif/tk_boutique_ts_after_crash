import { FilterQuery, QueryOptions, DocumentDefinition } from 'mongoose';

import Category, { CategoryDocument } from '../models/category.model';

export async function createCategory(
  data: DocumentDefinition<
    Omit<CategoryDocument, 'createdAt' | 'updatedAt' | 'productsCount'>
  >
) {
  return await Category.create(data);
}

export async function findCategoryById(
  id: string,
  options: QueryOptions = { lean: true }
) {
  return await Category.findById(id, {}, options).select('name');
}

export async function findCategoryByIdANdDelete(id: string) {
  return await Category.findByIdAndDelete(id);
}

export async function findCategoryWithQuery(
  query: FilterQuery<CategoryDocument>,
  options: QueryOptions = { lean: true }
) {
  return await Category.findOne(query, options).select('name');
}

export async function getCategories(
  query: FilterQuery<CategoryDocument>,
  limit: number,
  skip: number,
  sort: string = '-createdAt',
  select?: string
) {
  if (select) {
    return await Category.find(query)
      .select(select)
      .sort(sort)
      .skip(skip)
      .limit(limit);
  } else {
    return await Category.find(query).sort(sort).skip(skip).limit(limit);
  }
}

export async function countCategories() {
  return await Category.countDocuments();
}
