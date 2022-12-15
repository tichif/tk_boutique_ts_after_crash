import { DocumentDefinition, FilterQuery, QueryOptions } from 'mongoose';

import Order, { OrderDocument } from '../models/order.model';

export async function createOrder(
  data: DocumentDefinition<
    Omit<OrderDocument, 'createdAt' | 'updatedAt' | 'deliveryAt'>
  >
) {
  return Order.create(data);
}

export async function findOrderById(
  id: string,
  options: QueryOptions = { lean: true }
) {
  return Order.findById(id, {}, options);
}

export async function getOrders(
  limit: number,
  skip: number,
  sort: string = '-createdAt',
  select?: string
) {
  if (select) {
    return Order.find().select(select).sort(sort).skip(skip).limit(limit);
  } else {
    return Order.find().sort(sort).skip(skip).limit(limit);
  }
}

export async function getOrdersForUser(
  userId: string,
  limit: number,
  skip: number,
  sort: string = '-createdAt',
  select?: string
) {
  if (select) {
    return Order.find({ 'user.userId': userId })
      .select(select)
      .sort(sort)
      .skip(skip)
      .limit(limit);
  } else {
    return Order.find({ 'user.userId': userId })
      .sort(sort)
      .skip(skip)
      .limit(limit);
  }
}

export async function countOrders(userId: string = '') {
  if (userId) {
    return Order.countDocuments({ 'user.userId': userId });
  }
  return Order.countDocuments();
}
