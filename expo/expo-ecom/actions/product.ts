import { Product } from '@/app/lib/types';
import axios from 'axios';

export async function getProducts(): Promise<Product[]> {
  const res = await axios.get('https://api.escuelajs.co/api/v1/products');
  const { data } = res;

  //   const optimize = data.products.map((each) => {
  //     return { ...each, slug: slugify(each.title) };
  //   });

  return data;
}

export async function getCategoryProducts(slug:string): Promise<Product[]> {
  const res = await axios.get(`https://api.escuelajs.co/api/v1/products/?categorySlug=${slug}`);
  const { data } = res;
  return data;
}
