import { loadStripe } from '@stripe/stripe-js';

export type CreateCheckoutSessionMetaData = {
  orderNumber: string,
  customerName: string,
  customerEmail: string,
  customerClerkId: string,
}

const pubApiKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
if (!pubApiKey) throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is missing!')

export async function createCheckoutSession(items: any[], metaData: CreateCheckoutSessionMetaData) {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items,
      metaData,
      successUrl: `${process.env.NEXT_PUBLIC_VERCEL_URL || window.location.origin}/orders`,
      cancelUrl: `${process.env.NEXT_PUBLIC_VERCEL_URL || window.location.origin}/cart`,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create checkout session');
  }

  const { sessionId } = await response.json();
  const stripeClient = await loadStripe(pubApiKey!);

  if (!stripeClient) {
    throw new Error('Stripe client initialization failed');
  }

  await stripeClient?.redirectToCheckout({ sessionId });
}
