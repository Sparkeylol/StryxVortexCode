/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise;

// eslint-disable-next-line import/prefer-default-export
export const getStripe = (): Stripe => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PK_LIVE
        ?? process.env.NEXT_PUBLIC_STRIPE_PK,
    );
  }

  return stripePromise;
};
