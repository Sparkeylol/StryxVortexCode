import Stripe from 'stripe';

export default new Stripe(
  process.env.STRIPE_SECRET_KEY_LIVE ?? process.env.STRIPE_SK,
  {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2020-08-27',
    // Register this as an official Stripe plugin.
    // https://stripe.com/docs/building-plugins#setappinfo
    appInfo: {
      name: 'Stryx',
      version: '1.0.0',
    },
  },
);
