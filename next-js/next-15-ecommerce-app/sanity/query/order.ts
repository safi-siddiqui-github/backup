import { defineQuery } from "next-sanity";
import { client } from "../lib/client";

export const getUserOrders = async (userId: string) => {
  const USER_ORDERS_QUERY = defineQuery(`
    *[
      _type == 'order'
      && clerkUserId == $userId
      ]
    | order(orderDate desc) 
    {
      ...,
      products[]{
        ...,
        product->
      }
    }
  `);

  try {
    const orders = await client.fetch(USER_ORDERS_QUERY, { userId }, { useCdn: false });
    return orders || [];
  } catch (error) {
    console.error('Error fetching orders', error);
    return [];
  }
}

export const getUserSingleOrder = async (userId: string, slug: string) => {
  const USER_SINGLE_ORDER_QUERY = defineQuery(`
    *[
      _type == 'order'
      && clerkUserId == $userId
      && orderNumber == $slug
    ] [0] {
      ...,
      products[]{
        ...,
        product->
      }
    }
  `);

  try {
    const order = await client.fetch(USER_SINGLE_ORDER_QUERY, { userId, slug });
    return order || null;
  } catch (error) {
    console.error('Error fetching order', error);
    return null;
  }
}
