import { defineQuery } from "next-sanity"
import { client } from "../lib/client";
import { sanityFetch } from "../lib/live";

export const getAllProducts = async () => {
  const ALL_PRODUCTS_QUERY = defineQuery(`
    *[_type == 'product']
      | order(name asc)
  `);

  try {
    const products = await client.fetch(ALL_PRODUCTS_QUERY);
    return products || [];
  } catch (error) {
    console.error('Error fetching products', error);
    return [];
  }
}

export const getSingleProduct = async (slug: string) => {
  const SINGLE_PRODUCT_QUERY = defineQuery(`
    *[
      _type == 'product'
      && slug.current == $slug
      ]
    | order(name asc) [0]
  `);

  try {
    // const products = await client.fetch(SINGLE_PRODUCT_QUERY, { slug });
    const products = await sanityFetch({
      query: SINGLE_PRODUCT_QUERY, 
      params: { slug }
    });
    return products.data || null;
  } catch (error) {
    console.error('Error fetching products', error);
    return null;
  }
}

export const getSearchProducts = async (search?: string) => {
  const SEARCH_PRODUCT_QUERY = defineQuery(`
    *[
      _type == 'product'
      && name match $search
      ]
    | order(name asc)
  `);

  try {
    const products = await client.fetch(SEARCH_PRODUCT_QUERY, { search });
    return products || [];
  } catch (error) {
    console.error('Error fetching products', error);
    return [];
  }
}

export const getCategoryProducts = async (slug: string) => {
  const CATEGORY_PRODUCT_QUERY = defineQuery(`
    *[
      _type == 'product'
      && references(
          *[
            _type == 'category'
            && slug.current == $slug
          ]._id
        )
      ]
    | order(name asc)
  `);

  try {
    const products = await client.fetch(CATEGORY_PRODUCT_QUERY, { slug });
    return products || [];
  } catch (error) {
    console.error('Error fetching products', error);
    return [];
  }
}