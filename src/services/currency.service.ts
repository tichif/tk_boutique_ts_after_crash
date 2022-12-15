import { FilterQuery, QueryOptions, DocumentDefinition } from 'mongoose';

import Currency, { CurrencyInterface } from '../models/currency.model';

export async function createCurrency(
  data: DocumentDefinition<
    Omit<CurrencyInterface, 'createdAt' | 'updatedAt' | 'isPrincipal'>
  >
) {
  return await Currency.create(data);
}

export async function findCurrencyById(
  id: string,
  options: QueryOptions = { lean: true }
) {
  return await Currency.findById(id, {}, options).select(
    'name amount symbol isPrincipal'
  );
}

export async function findCurrencyByIdANdDelete(id: string) {
  return await Currency.findByIdAndDelete(id);
}

export async function findCurrencyWithQuery(
  query: FilterQuery<CurrencyInterface>,
  options: QueryOptions = { lean: true }
) {
  return await Currency.findOne(query, options).select(
    'name amount isPrincipal symbol'
  );
}

export async function getCurrencies(
  query: FilterQuery<CurrencyInterface>,
  limit: number,
  skip: number,
  sort: string = '-createdAt',
  select?: string
) {
  if (select) {
    return await Currency.find(query)
      .select(select)
      .sort(sort)
      .skip(skip)
      .limit(limit);
  } else {
    return await Currency.find(query).sort(sort).skip(skip).limit(limit);
  }
}

export async function countCurrencies() {
  return await Currency.countDocuments();
}
