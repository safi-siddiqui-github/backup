import { defineQuery } from "next-sanity"
import { client } from "../lib/client";

export enum COUPON_CODE {
  HAPPY20 = 'HAPPY20',
}

export const getActiveSale = async (couponCode: COUPON_CODE) => {
  const ACTIVE_SALE_QUERY = defineQuery(`
    *[
      _type == 'sale'
      && isActive == true
      && couponCode == $couponCode
      ]
      | order(validFrom desc) 
      [0]
  `);

  try {
    const sale = await client.fetch(ACTIVE_SALE_QUERY, { couponCode });
    return sale || null;
  } catch (error) {
    console.error('Error fetching sale', error);
    return null;
  }
}
