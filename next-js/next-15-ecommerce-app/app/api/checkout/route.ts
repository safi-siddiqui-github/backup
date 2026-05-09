import { NextResponse } from 'next/server';
import { stripe } from '@/stripe';
import { CreateCheckoutSessionMetaData } from '@/stripe/helpers';
import { CartItem } from '@/zustand/store';
import { urlFor } from '@/sanity/lib/image';

type BodyProps = {
  items: CartItem[],
  metaData: CreateCheckoutSessionMetaData,
  successUrl: string,
  cancelUrl: string,
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { items, metaData, successUrl, cancelUrl }: BodyProps = body;
    const { customerEmail } = metaData;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    const itemsWP = items?.filter(item => !item.product.price);
    if (itemsWP.length > 0) {
      return NextResponse.json({ error: 'Items without price' }, { status: 400 });
    }

    const customers = await stripe.customers.list({ email: customerEmail, limit: 1 });
    let customerId: string | undefined;
    if (customers?.data?.length > 0) {
      customerId = customers?.data[0].id;
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : 'always',
      customer_email: !customerId ? customerEmail : undefined,
      metadata: metaData,
      mode: 'payment',
      allow_promotion_codes: true,
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: items?.map(({ product, quantity }) => ({
        quantity,
        price_data: {
          currency: 'usd',
          unit_amount: Math.round((product.price ?? 0) * 100), // Convert price to cents
          product_data: {
            name: product.name || 'Unnamed Product',
            description: `Product ID ${product._id}`,
            metadata: {
              id: product._id
            },
            images: product.image ? [urlFor(product.image).url()] : undefined
          },
        }
      }))
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
