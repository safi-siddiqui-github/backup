import { NextResponse } from 'next/server';
import { stripe as stripeClient } from '@/stripe';
import { CreateCheckoutSessionMetaData } from '@/stripe/helpers';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { writeClient } from '@/sanity/lib/writeClient';
import { internalGroqTypeReferenceTo, Order } from '@/sanity.types';

// Common Headers
export interface CommonHeaders {
  accept?: string; // e.g., "*/*; q=0.5, application/xml"
  "accept-encoding"?: string; // e.g., "gzip"
  "cache-control"?: string; // e.g., "no-cache"
  "content-length"?: string; // e.g., "4054"
  "content-type"?: string; // e.g., "application/json; charset=utf-8"
  host?: string; // e.g., "localhost:3000"
}

// Stripe-Specific Headers
export interface StripeHeaders {
  "stripe-signature"?: string; // e.g., "t=...,v1=...,v0=..."
  "user-agent"?: string; // e.g., "Stripe/1.0 (+https://stripe.com/docs/webhooks)"
}

// Clerk-Specific Headers
export interface ClerkHeaders {
  "x-clerk-auth-message"?: string; // Often empty
  "x-clerk-auth-reason"?: string; // e.g., "dev-browser-missing"
  "x-clerk-auth-signature"?: string; // Often empty
  "x-clerk-auth-status"?: string; // e.g., "signed-out"
  "x-clerk-auth-token"?: string; // Often empty
  "x-clerk-clerk-url"?: string; // e.g., "http://localhost:3000/webhook"
}

// Forwarded Headers
export interface ForwardedHeaders {
  "x-forwarded-for"?: string; // e.g., "::1"
  "x-forwarded-host"?: string; // e.g., "localhost:3000"
  "x-forwarded-port"?: string; // e.g., "3000"
  "x-forwarded-proto"?: string; // e.g., "http"
}

// Combined Headers Interface for Type Safety
export interface WebhookHeaders
  extends CommonHeaders,
  StripeHeaders,
  ClerkHeaders,
  ForwardedHeaders { }

export async function POST(request: Request) {
  try {
    // Assuming headers() returns a Headers object
    const rawH = await headers();

    const headersList: Record<string, string> = {};
    rawH.forEach((value: string, key: string) => {
      headersList[key.toLowerCase()] = value;
    });

    // Use type assertion to ensure the headers conform to the WebhookHeaders interface
    const typedHeaders = headersList as WebhookHeaders;

    // Now you can safely access headers with type checking
    const stripeSignature = typedHeaders["stripe-signature"] ?? null;
    if (!stripeSignature) {
      return NextResponse.json({ error: 'Stripe signature is missing' }, { status: 400 });
    }

    // Stripe wehbook secret
    const wehbookSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY;
    if (!wehbookSecret) {
      return NextResponse.json({ error: 'Stripe webhook secret is missing' }, { status: 400 });
    }

    // Stripe event
    const body = await request.text();
    let event: Stripe.Event;
    try {
      event = stripeClient.webhooks.constructEvent(body, stripeSignature, wehbookSecret);
    } catch (error) {
      console.error('Stripe webhook verification failed:', error);
      return NextResponse.json({ error: 'Stripe webhook verification failed' }, { status: 400 });
    }

    if (event?.type == 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      try {
        await createSanityOrder(session);
      } catch (error) {
        console.error('Sanity order creation failed', error);
        return NextResponse.json({ error: 'Sanity order creation failed' }, { status: 400 });
      }
    }

    return NextResponse.json({ success: true, message: 'Sanity order created' });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

async function createSanityOrder(session: Stripe.Checkout.Session) {
  const {
    id: stripeCheckoutSessionId,
    payment_intent,
    customer,
    metadata,
    currency: currencyCode,
    total_details,
    amount_total,
    payment_status
  } = session;

  const {
    customerClerkId,
    customerEmail,
    customerName,
    orderNumber
  } = metadata as CreateCheckoutSessionMetaData;

  const {
    data: lineItemsData
  } = await stripeClient.checkout.sessions.listLineItems(stripeCheckoutSessionId, { expand: ['data.price.product'] });

  const products: Order['products'] = lineItemsData.map(({ price, quantity }) => ({
    _key: crypto.randomUUID(), // Call the function to generate a UUID string
    product: {
      _type: "reference", // Explicitly set to "reference"
      _ref: (price?.product as Stripe.Product)?.metadata?.id || "", // Fallback to an empty string if id is undefined
    },
    quantity: quantity || 0, // Use "Quantity" to match the expected type casing
  }));

  const amountDiscount = total_details?.amount_discount ? total_details.amount_discount / 100 : 0;
  const totalPrice = amount_total ? amount_total / 100 : 0;
  const status = payment_status ?? undefined;
  const orderDate = new Date().toISOString();
  const currenyTypeCorrected = currencyCode ?? undefined;
  const paymentIntentTypeCorrected = payment_intent as string ?? undefined;
  const customerTypeCorrected = customer as string ?? undefined;

  type CreateOrderInput = {
    _type: "order";
    customerEmail: string | undefined;
    customerName: string | undefined;
    status: string | undefined;
    amountDiscount: number | undefined;
    currency: string | undefined;
    stripePaymentIntentId: string | undefined;
    totalPrice: number | undefined;
    orderDate: string;
    stripeCustomerId: string | undefined;
    stripeCheckoutSessionId: string;
    clerkUserId: string | undefined;
    orderNumber: string | undefined;
    products: Array<{
      product?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "product";
      };
      quantity?: number;
      _key: string;
    }> | undefined;
  };

  const order = await writeClient.create<CreateOrderInput>({
    _type: 'order',
    customerEmail,
    customerName,
    status,
    amountDiscount,
    currency: currenyTypeCorrected,
    stripePaymentIntentId: paymentIntentTypeCorrected,
    totalPrice,
    orderDate,
    stripeCustomerId: customerTypeCorrected,
    stripeCheckoutSessionId,
    clerkUserId: customerClerkId,
    orderNumber,
    products,
  });

  return order;
}