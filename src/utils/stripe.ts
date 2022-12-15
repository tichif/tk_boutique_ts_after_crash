import Stripe from 'stripe';

import config from '../config';

const stripe = new Stripe(config.stripeKey, {
  apiVersion: '2022-08-01',
});

export default stripe;
