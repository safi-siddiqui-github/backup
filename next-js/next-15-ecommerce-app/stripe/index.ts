'server only';

import Stripe from 'stripe';

const apiKey = process.env.STRIPE_SECRET_KEY;

if (!apiKey) {
  throw new Error('Stripe secret key is missing in environment variables');
}

// Create and export the Stripe instance
export const stripe = new Stripe(apiKey, {
  apiVersion: '2024-12-18.acacia',
});

export default stripe;