import { Express } from 'express';

import contactRoute from './contact.route';
import authRoutes from './auth.route';
import profileRoute from './profile.route';
import currencyRoute from './currency.route';
import categoryRoute from './category.route';
import userRoute from './user.route';
import productRoute from './product.route';
import shippingRoute from './shipping.route';
import moncashRoute from './moncash.route';
import stripeRoute from './stripe.route';
import orderRoute from './order.route';

export default function (app: Express) {
  // contact
  app.use('/api/v2/contact', contactRoute);

  // authentication
  app.use('/api/v2/auth', authRoutes);

  // Profile
  app.use('/api/v2/profile', profileRoute);

  // currencies
  app.use('/api/v2/currencies', currencyRoute);

  // categories
  app.use('/api/v2/categories', categoryRoute);

  // users
  app.use('/api/v2/users', userRoute);

  // products
  app.use('/api/v2/products', productRoute);

  // shipping
  app.use('/api/v2/shipping', shippingRoute);

  // moncash
  app.use('/api/v2/moncash', moncashRoute);

  // stripe
  app.use('/api/v2/stripe', stripeRoute);

  // orders
  app.use('/api/v2/orders', orderRoute);
}
